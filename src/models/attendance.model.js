const { Schema, model } = require("mongoose");
const dayjs = require("dayjs");

const attendanceSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    checkIn: {
      type: Date,
      required: true,
    },
    checkOut: {
      type: Date,
      required: false,
    },
    status: {
      type: String,
      enum: ["present", "late", "absent", "leave", "half-day", "early-leave"],
      default: "present",
    },
    remark: {
      type: String,
    },
  },
  { timestamps: true }
);

attendanceSchema.pre("save", function (next) {
  const workStart = dayjs().utc().hour(2).minute(30).second(0).millisecond(0);
  const workEnd = dayjs().utc().hour(11).minute(0).second(0).millisecond(0);

  // const timeMid = "2025-11-16T05:30:00.000Z";
  const checkIn = this.checkIn ? dayjs(this.checkIn) : null;
  const checkOut = this.checkOut ? dayjs(this.checkOut) : null;

  if (checkIn.isSame(workStart)) {
    this.status == null;
    return next();
  }

  // 1️⃣ ABSENT → No check-in & no check-out
  if (!checkIn && !checkOut) {
    this.status = "absent";
    return next();
  }

  // 3️⃣ LATE → check-in is greater than workStart (late check-in)
  if (checkIn && checkIn.isAfter(workStart)) {
    this.status = "late";
    return next();
  }

  // 2️⃣ HALF-DAY → Check-in but NO check-out
  if (checkIn && !checkOut) {
    this.status = "half-day";
    return next();
  }

  if (checkIn && checkOut && checkOut.isBefore(workEnd)) {
    this.status = "early-leave";
    return next();
  }

  // 4️⃣ PRESENT → Normal check-in / check-out
  if (checkIn && checkOut) {
    this.status = "present";
    return next();
  }

  next();
});

const AttendanceSchema = model("Attendance", attendanceSchema);
module.exports = AttendanceSchema;

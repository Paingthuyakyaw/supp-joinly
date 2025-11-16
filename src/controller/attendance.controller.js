const dayjs = require("dayjs");
const AttendanceSchema = require("../models/attendance.model");
const utc = require("dayjs/plugin/utc");
dayjs.extend(utc);

// check-in
exports.checkIn = async (req, res) => {
  try {
    const { checkIn, remark } = req.body;

    const workStart = dayjs().utc().hour(2).minute(30).second(0).millisecond(0);

    const workEnd = dayjs().utc().hour(11).minute(0).second(0).millisecond(0);

    const userAttendance = await AttendanceSchema.find({
      date: dayjs().utc().startOf("day"),
    });

    if (userAttendance) {
      return res.status(400).json({
        message: "You already checked in today",
      });
    }

    if (dayjs(workEnd).isAfter(workEnd)) {
      return res.status(400).json({
        message: "You are absent",
      });
    }

    let attendance;

    if (dayjs(checkIn).isAfter(workStart)) {
      attendance = await new AttendanceSchema({
        userId: req.user.id,
        date: dayjs().utc().startOf("day"),
        checkIn,
        checkOut: null,
        remark,
        status: "late",
      });
    } else {
      attendance = await new AttendanceSchema({
        userId: req.user.id,
        date: dayjs().utc(),
        checkIn,
        checkOut: null,
        remark,
        status: "present",
      });
    }

    const attendanceData = await attendance.save();

    return res.status(201).json({
      data: attendanceData,
      message: "Attendance created",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Server Error",
      error: err,
    });
  }
};

// check-out
exports.checkOut = async () => {};

// attandance user
exports.activeUser = async (req, res) => {
  try {
    const data = await AttendanceSchema.find();

    return res.status(200).json({
      message: "Attandance User",
      data: data,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Server Error",
      error: err,
    });
  }
};

const dayjs = require("dayjs");
const AttendanceSchema = require("../models/attendance.model");
const utc = require("dayjs/plugin/utc");
const UserSchema = require("../models/user.model");
dayjs.extend(utc);

// check-in
exports.checkIn = async (req, res) => {
  try {
    const { checkIn, remark } = req.body;

    const workStart = dayjs().utc().hour(2).minute(30).second(0).millisecond(0);

    const workEnd = dayjs().utc().hour(11).minute(0).second(0).millisecond(0);

    const userAttendance = await AttendanceSchema.findOne({
      userId: req.user.id,
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
        date: dayjs().utc().startOf("day"),
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
exports.checkOut = async (req, res) => {
  try {
    const { date } = req.body;

    const checkInUser = await AttendanceSchema.findOne({
      userId: req.user.id,
      date: dayjs().utc().startOf("day"),
    });

    if (!checkInUser) {
      return res.status(400).json({
        message: "You're not attendance",
      });
    }

    const data = checkInUser.updateOne({ userId: req.user.id, checkOut: date });

    return res.status(200).json({ message: "0k", data });
  } catch (err) {
    return res.status(500).json({
      message: "Server Error",
      error: err,
    });
  }
};

// attandance user
exports.activeUser = async (req, res) => {
  try {
    const page = parseInt(req?.query.page) || 1;
    const size = parseInt(req?.query.size) || 10;
    const skip = (page - 1) * size;
    const total = await AttendanceSchema.countDocuments();

    const data = await AttendanceSchema.find({
      date: dayjs().utc().startOf("day"),
    })
      .skip(skip)
      .limit(size)
      .populate("userId", "username email");

    return res.status(200).json({
      message: "Attandance User",
      data: data,
      pagination: {
        page,
        size,
        total,
        totalPage: Math.ceil(total / size),
      },
    });
  } catch (err) {
    return res.status(500).json({
      message: "Server Error",
      error: err,
    });
  }
};

// unattandance user
exports.unActiveUser = async (req, res) => {
  try {
    const unCheckUserId = await AttendanceSchema.find({
      date: dayjs().utc().startOf("day"),
    });

    const unActiveUser = await UserSchema.find({
      _id: {
        $nin: unCheckUserId.map((a) => a.userId),
      },
    }).populate("attendance");

    return res.status(200).json({
      message: "Uncheck User List",
      data: unActiveUser,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Server Error",
      error: err,
    });
  }
};

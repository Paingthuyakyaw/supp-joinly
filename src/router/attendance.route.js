const { checkIn } = require("../controller/attendance.controller");

const attendanceRouter = require("express").Router();

attendanceRouter.post("/check-in", checkIn);

module.exports = attendanceRouter;

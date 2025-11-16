const { checkIn, activeUser } = require("../controller/attendance.controller");

const attendanceRouter = require("express").Router();

attendanceRouter.post("/check-in", checkIn);
attendanceRouter.get("/active-user", activeUser);

module.exports = attendanceRouter;

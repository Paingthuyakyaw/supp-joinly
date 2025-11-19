const {
  checkIn,
  activeUser,
  unActiveUser,
} = require("../controller/attendance.controller");

const attendanceRouter = require("express").Router();

attendanceRouter.post("/check-in", checkIn);
attendanceRouter.get("/active-user", activeUser);
attendanceRouter.get("/unactive-user", unActiveUser);

module.exports = attendanceRouter;

const {
  checkIn,
  activeUser,
  unActiveUser,
  checkOut,
} = require("../controller/attendance.controller");

const attendanceRouter = require("express").Router();

attendanceRouter.post("/check-in", checkIn);
attendanceRouter.post("/check-out", checkOut);
attendanceRouter.get("/active-user", activeUser);
attendanceRouter.get("/unactive-user", unActiveUser);

module.exports = attendanceRouter;

const express = require("express");
const {
  createTask,
  readTasks,
  readSingleTask,
  deleteTask,
  updateTask,
  modifyTask,
} = require("../controller/taskController");
const Task = require("../model/taskmodel");
const router = express.Router();
router.route("/").get(readTasks).post(createTask);
router
  .route("/:id")
  .get(readSingleTask)
  .delete(deleteTask)
  .patch(updateTask)
  .put(modifyTask);
// Optimized in Line 11 & 12
// router.post("/", createTask);
// router.get("/", readTasks);
// router.get("/:id", readSingleTask);
// router.delete("/:id", deleteTask);
// router.patch("/:id", updateTask);

module.exports = router;

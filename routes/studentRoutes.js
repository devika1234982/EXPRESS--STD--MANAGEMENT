// import express from "express";
// import { verifyToken } from "../middleware/authMiddleware.js";
// import {
//   createStudent,
//   getAllStudents,
//   getStudentById,
//   updateStudent,
//   deleteStudent
// } from "../controller/studentController.js";

// const router = express.Router();

// router.post("/", verifyToken, createStudent);
// router.get("/", verifyToken, getAllStudents);
// router.get("/:id", verifyToken, getStudentById);
// router.put("/:id", verifyToken, updateStudent);
// router.delete("/:id", verifyToken, deleteStudent);

// export default router;


import express from "express";
import { addStudent, getStudents, updateStudents, deleteStudent } from "../controller/studentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Protected routes
router.post("/", protect, addStudent);
router.get("/", protect, getStudents);
router.put("/:id", protect, updateStudents);
router.delete("/:id", protect, deleteStudent);

export default router;

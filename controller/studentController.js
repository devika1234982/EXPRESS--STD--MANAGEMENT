// import Student from "../models/student.js";

// export const createStudent = async (req, res) => {
//   try {
//     const student = await Student.create(req.body);
//     res.json(student);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// export const getAllStudents = async (req, res) => {
//   try {
//     const students = await Student.find();
//     res.json(students);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// export const getStudentById = async (req, res) => {
//   try {
//     const student = await Student.findById(req.params.id);
//     if (!student)
//       return res.status(404).json({ error: "Student not found" });

//     res.json(student);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// export const updateStudent = async (req, res) => {
//   try {
//     const updated = await Student.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );

//     if (!updated)
//       return res.status(404).json({ error: "Student not found" });

//     res.json(updated);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };


// export const deleteStudent = async (req, res) => {
//   try {
//     const deleted = await Student.findByIdAndDelete(req.params.id);

//     if (!deleted)
//       return res.status(404).json({ error: "Student not found" });

//     res.json({ message: "Student deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// import Student from "../models/student.js";

// export const addStudent = async (req,res)=>{
//     const student=await Student.create(req.body);
//     res.status(201).json(student);
// };

// export const getStudents=async(req,res)=>{
//     const students = await Student.find();
//     res.json(students);
// }
// export const updateStudents = async (req,res)=>{
//     const student= await Student.findByIdAndUpdate(
//         req.params.id,
//         req.body,
//         {new:true}
//     );
// }
// export const deleteStudent = async(req,res)=>{
//     const student = await Student.findByIdAndDelete(req.params.id);
//     res.json({message:"student deleted"})
// }



import Student from "../models/student.js";

// ADD STUDENT
export const addStudent = async (req, res) => {
    try {
        const student = await Student.create(req.body);
        res.status(201).json(student);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to add student" });
    }
};

// GET ALL STUDENTS
export const getStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to fetch students" });
    }
};

// UPDATE STUDENT
export const updateStudents = async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!student) return res.status(404).json({ message: "Student not found" });
        res.json(student);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to update student" });
    }
};

// DELETE STUDENT
export const deleteStudent = async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);
        if (!student) return res.status(404).json({ message: "Student not found" });
        res.json({ message: "Student deleted" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to delete student" });
    }
};

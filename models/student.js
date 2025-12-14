// import mongoose from "mongoose";

// const studentSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true
//   },

//   email: {
//     type: String,
//     required: true
//   },

//   rollNumber: {
//     type: String,
//     required: true
//   },

//   marks: {
//     subject1: { type: Number, required: true },
//     subject2: { type: Number, required: true },
//     subject3: { type: Number, required: true }
//   }
// });

// export default mongoose.model("Student", studentSchema);

import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    course: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model("Studentss", studentSchema);

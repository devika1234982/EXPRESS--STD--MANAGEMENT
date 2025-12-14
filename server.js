// import express from "express";
// import connectDB from "./config/db.js";
// import studentRoutes from "./routes/studentRoutes.js";

// import dotenv from "dotenv";

// dotenv.config();

// const app = express();

// app.use(express.json());

// app.use(express.static("public"));

// app.use("/api/stdlist", studentRoutes);



// connectDB();

// const PORT = process.env.PORT
// app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`)
// });
 

import express from "express";
import dotenv  from "dotenv";
import connectDB from "./config/db.js";
import authRoutes  from "./routes/authRoutes.js";
import studentRoutes  from "./routes/studentRoutes.js";

dotenv.config();
connectDB();

const app =express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(express.static("public"));

app.use("/api/auth",authRoutes);
app.use("/api/students",studentRoutes);

// app.get("/",(req,res)=>{
//     res.send("server is running")
// })

const PORT = process.env.PORT || 7000;
app.listen(PORT ,()=>{
    console.log(`Server running on http://localhost:${PORT}`);
    
});
  
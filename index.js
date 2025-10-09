// import express from "express";
// import cors from "cors";
// import authRouter from "./routes/auth.js";
// import departmentRouter from "./routes/department.js";
// import employeRouter from "./routes/employe.js";
// import salaryRouter from "./routes/salary.js";
// import leaveRouter from "./routes/leave.js";
// import settingRouter from "./routes/setting.js";
// import dashboardRouter from "./routes/dashboard.js";
// import connectToDatabase from "./db/db.js";

// connectToDatabase();
// const app = express();
// app.use(cors());
// app.use(express.json());

// // Increase JSON body limit
// app.use(express.json({ limit: "20mb" }));
// app.use(express.urlencoded({ limit: "20mb", extended: true }));

// app.use(express.static("public/uploads"));
// app.use("/api/auth", authRouter);
// app.use("/api/department", departmentRouter);
// app.use("/api/employe", employeRouter);
// app.use("/api/salary", salaryRouter);
// app.use("/api/setting", settingRouter);
// app.use("/api/leave", leaveRouter);
// app.use("/api/dashboard", dashboardRouter);

// app.listen(process.env.PORT, () => {
//   console.log(`Server is running on port ${process.env.PORT}`);
// });

import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.js";
import departmentRouter from "./routes/department.js";
import employeRouter from "./routes/employe.js";
import salaryRouter from "./routes/salary.js";
import leaveRouter from "./routes/leave.js";
import settingRouter from "./routes/setting.js";
import dashboardRouter from "./routes/dashboard.js";
import connectToDatabase from "./db/db.js";

connectToDatabase();
const app = express();

// ✅ 1️⃣ CORS কনফিগার করো সঠিকভাবে
app.use(
  cors({
    origin: "https://employe-frontend.vercel.app", // চাইলে নির্দিষ্ট origin দিতে পারো, যেমন "https://yourfrontend.vercel.app"
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// ✅ 2️⃣ JSON body limit বাড়াও
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true, limit: "20mb" }));

// ✅ 3️⃣ Static files serve
app.use(express.static("public/uploads"));

// ✅ 4️⃣ Routes
app.use("/api/auth", authRouter);
app.use("/api/department", departmentRouter);
app.use("/api/employe", employeRouter);
app.use("/api/salary", salaryRouter);
app.use("/api/setting", settingRouter);
app.use("/api/leave", leaveRouter);
app.use("/api/dashboard", dashboardRouter);

app.listen(process.env.PORT || 5000, () => {
  console.log(`✅ Server is running on port ${process.env.PORT || 5000}`);
});

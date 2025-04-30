import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import connectDB from "./config/db.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

connectDB();


import companyRoutes from "./routes/company.routes.js";
import employeeRoutes from "./routes/employee.routes.js";

app.use("/api/company", companyRoutes);
app.use("/api/employee", employeeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));

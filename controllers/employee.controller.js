import Employee from "../models/Employee.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Employee Registration
export const registerEmployee = async (req, res) => {
  try {
    const { employeeID, password } = req.body;

   
    const existing = await Employee.findOne({ employeeID });
    if (existing) return res.status(400).json({ msg: "Employee ID already exists 🫣" });

    const hashedPass = await bcrypt.hash(password, 10);
    const newEmp = new Employee({ ...req.body, password: hashedPass });
    await newEmp.save();

    res.status(201).json({ msg: "Employee registered 🎊" });
  } catch (err) {
    res.status(500).json({ msg: "Server error 🚨", err });
  }
};


// Employee Login
export const loginEmployee = async (req, res) => {
  try {
    const { email, password } = req.body; 
    

    const employee = await Employee.findOne({ email }); // Match the schema field
    if (!employee) return res.status(404).json({ msg: "Employee not found 🥲" });


    const isMatch = await bcrypt.compare(password, employee.password);
    if (!isMatch) return res.status(401).json({ msg: "Invalid credentials 🚫" });

  
    const token = jwt.sign({ id: employee._id }, process.env.JWT_SECRET, { expiresIn: "2h" });


    res.json({ token, employee });
  } catch (err) {
    res.status(500).json({ msg: "Login error 💥", err });
  }
};


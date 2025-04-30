import Company from "../models/Company.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const registerCompany = async (req, res) => {
  try {
    const { email, phone, password } = req.body;


    const existing = await Company.findOne({ $or: [{ email }, { phone }] });
    if (existing) return res.status(400).json({ msg: "Email or phone already exists 😶" });

 
    const hashedPass = await bcrypt.hash(password, 10);


    const newCompany = new Company({ ...req.body, password: hashedPass });
    await newCompany.save();

    res.status(201).json({ msg: "Company registered 🎉" });
  } catch (err) {
    res.status(500).json({ msg: "Server error 💥", err });
  }
};


export const loginCompany = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    
    const company = await Company.findOne({ email });
    if (!company) return res.status(404).json({ msg: "Company not found 😵" });


    const isMatch = await bcrypt.compare(password, company.password);
    if (!isMatch) return res.status(401).json({ msg: "Wrong password 😬" });


    const token = jwt.sign({ id: company._id }, process.env.JWT_SECRET, { expiresIn: "2h" });
    

    res.json({ token, company });
  } catch (err) {
    res.status(500).json({ msg: "Login error 💥", err });
  }
};

import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  companyID: { type: String },
  employeeID: { type: String, unique: true },
  name: String,
  email: String,
  phone: String,
  department: String,
  jobTitle: String,
  gender: String,
  dob: Date,
  joiningDate: Date,
  address: {
    line1: String,
    line2: String,
    city: String,
    state: String,
    country: String,
    pincode: String,
  },
  status: { type: String, default: "Active" },
  password: String,
  createdAt: { type: Date, default: Date.now }
});

const Employee = mongoose.model("Employee", employeeSchema);
export default Employee;

import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
  companyID: { type: String, unique: true }, // 👈 your custom string ID
  companyName: String,
  ownerName: String,
  email: { type: String, unique: true },
  phone: { type: String, unique: true },
  password: String,
  address: {
    line1: String,
    line2: String,
    city: String,
    state: String,
    country: String,
    pincode: String,
  },

  industryType: String,
  website: String,
  Bio: { type: String, default: "Write something about your company" },
  createdAt: { type: Date, default: Date.now },
  status: { type: String, default: "Active" }
});

const Company = mongoose.model("Company", companySchema);
export default Company;

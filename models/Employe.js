import mongoose from "mongoose";
import { Schema } from "mongoose";

const employeSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  employeId: { type: String, required: true, unique: true },
  dob: { type: Date },
  gender: { type: String },
  maritalStatus: { type: String },
  designation: { type: String },
  department: {
    type: Schema.Types.ObjectId,
    ref: "Department",
    required: true,
  },
  salary: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Employe = mongoose.model("Employe", employeSchema);
export default Employe;

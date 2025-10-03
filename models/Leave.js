import mongoose from "mongoose";
import { Schema } from "mongoose";

const leaveSchema = new Schema({
  employeId: { type: Schema.Types.ObjectId, ref: "Employe", requied: true },
  leaveType: {
    type: String,
    enum: ["Sick Leave", "Casual Leave", "Annual Leave"],
  },
  fromDate: { type: Date, requied: true },
  toDate: { type: Date, requied: true },
  reason: { type: String, requied: true },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },
  appliedAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Leave = mongoose.model("Leave", leaveSchema);
export default Leave;

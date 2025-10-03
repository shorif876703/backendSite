import mongoose from "mongoose";
import Employe from "./Employe.js";
import Leave from "./Leave.js";
import Salary from "./Salary.js";

const departmentSchema = new mongoose.Schema({
  dep_name: { type: String, required: true },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

departmentSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    try {
      const employes = await Employe.find({ department: this._id });
      const empIds = employes.map((emp) => emp._id);

      await Employe.deleteMany({ department: this._id });
      await Leave.deleteMany({ employeId: { $in: empIds } });
      await Salary.deleteMany({ employeId: { $in: empIds } });
      next();
    } catch (error) {
      next(error);
    }
  }
);

const Department = mongoose.model("Department", departmentSchema);
export default Department;

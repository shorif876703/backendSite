import Department from "../models/Department.js";
import Employe from "../models/Employe.js";
import Leave from "../models/Leave.js";

const getSummery = async (req, res) => {
  try {
    const totalEmployes = await Employe.countDocuments();
    const totalDepartments = await Department.countDocuments();
    const totalSalaries = await Employe.aggregate([
      { $group: { _id: null, totalSalary: { $sum: "$salary" } } },
    ]);
    const leaveApplied = await Leave.distinct("employeId");
    const leaveStatus = await Leave.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);
    const leaveSummery = {
      appliedFor: leaveApplied.length,
      approved: leaveStatus.find((item) => item._id === "Approved")?.count || 0,
      rejected: leaveStatus.find((item) => item._id === "Rejected")?.count || 0,
      pending: leaveStatus.find((item) => item._id === "Pending")?.count || 0,
    };

    return res.status(200).json({
      success: true,
      totalEmployes,
      totalDepartments,
      totalSalary: totalSalaries[0]?.totalSalary || 0,
      leaveSummery,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "dashboard summery error" });
  }
};

export { getSummery };

import Employe from "../models/Employe.js";
import Leave from "../models/Leave.js";

const addLeave = async (req, res) => {
  try {
    const { userId, leaveType, fromDate, toDate, reason } = req.body;
    const employe = await Employe.findOne({ userId });
    const newLeave = new Leave({
      employeId: employe._id,
      leaveType,
      fromDate,
      toDate,
      reason,
    });
    await newLeave.save();
    return res.status(200).json({ success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "add leave server error" });
  }
};

const getLeave = async (req, res) => {
  try {
    const { id } = req.params;
    let leaves = await Leave.find({ employeId: id });
    if (!leaves || leaves.length === 0) {
      const employe = await Employe.findOne({ userId: id });
      leaves = await Leave.find({ employeId: employe.id });
    }

    return res.status(200).json({ success: true, leaves });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "add leave server error" });
  }
};

const getLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find().populate({
      path: "employeId",
      populate: [
        {
          path: "department",
          select: "dep_name",
        },
        {
          path: "userId",
          select: "name",
        },
      ],
    });
    return res.status(200).json({ success: true, leaves });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "add leave server error" });
  }
};

const getLeaveDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const leave = await Leave.findById({ _id: id }).populate({
      path: "employeId",
      populate: [
        {
          path: "department",
          select: "dep_name",
        },
        {
          path: "userId",
          select: "name, profileImage",
        },
      ],
    });
    return res.status(200).json({ success: true, leave });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "add leave server error" });
  }
};

const updateLeave = async (req, res) => {
  try {
    const { id } = req.params;
    const leave = await Leave.findByIdAndUpdate(
      { _id: id },
      { status: req.body.status }
    );
    if (!leave) {
      return res
        .status(404)
        .json({ success: false, error: "leave not founded" });
    }
    return res.status(200).json({ success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "update leave server error" });
  }
};

export { addLeave, getLeave, getLeaves, getLeaveDetail, updateLeave };

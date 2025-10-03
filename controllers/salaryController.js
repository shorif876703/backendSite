import Employe from "../models/Employe.js";
import Salary from "../models/Salary.js";

const addSalary = async (req, res) => {
  try {
    const { employeId, basicSalary, allowances, deductions, payDate } =
      req.body;
    const totalSalary =
      parseInt(basicSalary) + parseInt(allowances) - parseInt(deductions);
    const newSalary = new Salary({
      employeId,
      basicSalary,
      allowances,
      deductions,
      netSalary: totalSalary,
      payDate,
    });
    await newSalary.save();
    return res.status(200).json({ success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "add salary server error" });
  }
};

const getSalary = async (req, res) => {
  try {
    const { id, role } = req.params;

    let salary;
    if (role === "admin") {
      salary = await Salary.find({ employeId: id }).populate(
        "employeId",
        "employeId"
      );
    } else {
      const employe = await Employe.findOne({ userId: id });
      salary = await Salary.find({ employeId: employe._id }).populate(
        "employeId",
        "employeId"
      );
    }

    return res.status(200).json({ success: true, salary });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "get salary server error" });
  }
};
export { addSalary, getSalary };

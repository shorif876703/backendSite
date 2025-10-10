import multer from "multer";
import path from "path";
import Employe from "../models/Employe.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import cloudinary from "../utils/cloudinary.js";

const storage = multer.diskStorage({
  destination: (req, file, cd) => {
    cd(null, "public/uploads");
  },
  filename: (req, file, cd) => {
    cd(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

const addEmploye = async (req, res) => {
  try {
    const {
      name,
      email,
      employeId,
      dob,
      gender,
      maritalStatus,
      designation,
      department,
      salary,
      password,
      role,
    } = req.body;

    let photoUrl = "";
    if (req.file) {
      // Cloudinary তে upload
      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        folder: "employees",
      });
      photoUrl = uploadResult.secure_url;
    }

    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, error: "User alrady resistered in Employe" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashPassword,
      role,
      profileImage: req.file ? req.file.filename : "",
    });
    const savedUser = await newUser.save();

    const newEmploye = new Employe({
      userId: savedUser._id,
      employeId,
      dob,
      gender,
      maritalStatus,
      designation,
      department,
      salary,
      photo: photoUrl,
    });

    await newEmploye.save();
    return res.status(200).json({ success: true, message: "employe created" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "server error in adding employe" });
  }
};

const getEmployes = async (req, res) => {
  try {
    const employes = await Employe.find()
      .populate("userId", { password: 0 })
      .populate("department");
    return res.status(200).json({ success: true, employes });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "get employe server error" });
  }
};

const getEmploye = async (req, res) => {
  const { id } = req.params;
  try {
    let employe;
    employe = await Employe.findById({ _id: id })
      .populate("userId", { password: 0 })
      .populate("department");
    if (!employe) {
      employe = await Employe.findOne({ userId: id })
        .populate("userId", { password: 0 })
        .populate("department");
    }
    return res.status(200).json({ success: true, employe });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "get employe server error" });
  }
};

const updateEmploye = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, maritalStatus, designation, department, salary } = req.body;
    const employe = await Employe.findById({ _id: id });
    if (!employe) {
      return res
        .status(404)
        .json({ success: false, error: "employe not found" });
    }
    const user = await User.findById({ _id: employe.userId });
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    const updateUser = await User.findByIdAndUpdate(
      { _id: employe.userId },
      { name }
    );
    const updateEmploye = await Employe.findByIdAndUpdate(
      { _id: id },
      { maritalStatus, designation, salary, department }
    );
    if (!updateEmploye || !updateUser) {
      return res
        .status(404)
        .json({ success: false, error: "document not found" });
    }
    return res.status(200).json({ success: true, message: "Employe update" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Update employe server error" });
  }
};

const fetchEmployesByDepId = async (req, res) => {
  const { id } = req.params;
  try {
    const employes = await Employe.find({ department: id });
    return res.status(200).json({ success: true, employes });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "get employesByDepId server error" });
  }
};

export {
  addEmploye,
  upload,
  getEmployes,
  getEmploye,
  updateEmploye,
  fetchEmployesByDepId,
};

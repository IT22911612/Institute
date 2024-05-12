const express = require("express");
const marksModel = require("../models/marksModel");

const router = express.Router();

router.get("/_marks", async (req, res) => {
    try {
        const marks = await marksModel.find({});
        res.json({ success: true, data: marks });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

router.post("/create_marks", async (req, res) => {
    const { subject, grade, mark } = req.body;
    if (!isGoogleFormLink(mark)) {
        return res.status(400).json({ success: false, message: "Invalid link format. Only Google Form links are allowed." });
    }
    try {
        const newMark = new marksModel(req.body);
        await newMark.save();
        res.json({ success: true, message: "Mark created successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

router.put("/update_marks/:id", async (req, res) => {
    const id = req.params.id;
    const updatedData = req.body;
    const { subject, grade, mark } = req.body;
    if (mark && !isGoogleFormLink(mark)) {
        return res.status(400).json({ success: false, message: "Invalid link format. Only Google Form links are allowed." });
    }
    try {
        const { id } = req.params;
        const updatedMark = await marksModel.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedMark) {
            return res.status(404).json({ success: false, message: "Mark not found" });
        }
        res.json({ success: true, message: "Mark updated successfully", data: updatedMark });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

router.delete("/delete_marks/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedMark = await marksModel.findByIdAndDelete(id);
        if (!deletedMark) {
            return res.status(404).json({ success: false, message: "Mark not found" });
        }
        res.json({ success: true, message: "Mark deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

router.get("/count_marks", async (req, res) => {
    try {
        const marks = await marksModel.find({});
        res.status(200).json({ success: true, count: marks.length, data: marks });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

router.get("/order_marks/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const order = await marksModel.findById(id);
        if (!order) {
            return res.status(404).json({ success: false, message: "Mark not found" });
        }
        res.json({ success: true, message: "Mark fetched successfully", data: order });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

module.exports = router;
function isGoogleFormLink(link) {
    // Regular expression to match Google Form links
    const googleFormRegex = /^https?:\/\/(www\.)?docs\.google\.com\/forms\/d\/e\/[a-zA-Z0-9_-]+\/viewform\?formkey=[a-zA-Z0-9_-]+(&.*)?$/;
    return googleFormRegex.test(link);
}
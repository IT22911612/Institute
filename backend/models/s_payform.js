const mongoose = require("mongoose");

const paymentSchema = mongoose.Schema(
  {
    studentName: {
      type: String,
      required: true
    },
    paymentAmount: {
      type: Number,
      required: true
    },
    paymentDate: {
      type: Date,
      required: true
    },
    bankName: {
      type: String,
      required: true
    },
    branchName: {
      type: String,
      required: true
    },
    // Add more fields as needed
  },
  {
    timestamps: true
  }
);

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;

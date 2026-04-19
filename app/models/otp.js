const mongoose=require("mongoose");

// Defining Schema
const otpSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId,
     ref: 'user', 
     required: true
     },
  otp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: '5m' }
});

// Model
const otpModel = mongoose.model("EmailVerification", otpSchema);

module.exports= otpModel;
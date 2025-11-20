import mongoose from "mongoose";

const BoardSchema = new mongoose.Schema({
  name: { type: String, required: true }
}, { timestamps: true });

export default mongoose.models.Board || mongoose.model("Board", BoardSchema);

import mongoose from "mongoose";

const BoardSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // owner of the board
  },
  { timestamps: true }
);

export default mongoose.models.Board || mongoose.model("Board", BoardSchema);

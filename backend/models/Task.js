import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  priority: { type: String, enum: ["Low", "Medium", "High"], default: "Medium" },
  dueDate: Date,
  tags: [String],
  column: { type: String, enum: ["Todo", "In Progress", "Done"], default: "Todo" },
  boardId: { type: mongoose.Schema.Types.ObjectId, ref: "Board", required: true }
}, { timestamps: true });

export default mongoose.models.Task || mongoose.model("Task", TaskSchema);

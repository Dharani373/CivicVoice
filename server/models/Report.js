import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    image: String,
    location: String,
    category: String,
    status: {
      type: String,
      default: "Open",
    },
    upvotes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Report", reportSchema);

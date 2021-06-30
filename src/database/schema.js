import mongoose from "./connection.js";

const schema = new mongoose.Schema({
  name: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const model = mongoose.model("users", schema);

export default model;

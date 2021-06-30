import mongoose from "mongoose";

const url = process.env.MONGO_URI;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(url, options);

export default mongoose;

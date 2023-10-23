import mongoose from "mongoose";

async function connect() {
  try {
    await mongoose.connect(process.env.MONGO);
  } catch (err) {
    throw new Error("Connection failed");
  }
}

export default connect;

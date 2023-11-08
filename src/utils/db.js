import mongoose from "mongoose";

async function connect() {
  try {
    await mongoose.connect(
      "mongodb+srv://nightshiftmaster:Vlad19820708@cluster0.lrcjkhf.mongodb.net/test?retryWrites=true&w=majority"
    );
  } catch (err) {
    throw new Error("Connection failed");
  }
}

export default connect;

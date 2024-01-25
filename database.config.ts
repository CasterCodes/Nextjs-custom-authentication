import mongoose from "mongoose";

const databaseConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGOOSE_DATABASE_URL!);

    const connection = mongoose.connection;

    let connected = false;

    connection.on("connected", () => {
      connected = true;
      console.log("MongoDB connected");
    });

    return { mongoose, connected };
  } catch (error) {
    console.log({ message: "MongoDB connection error", error });
  }
};

export default databaseConnection;

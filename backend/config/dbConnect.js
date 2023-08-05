import mongoose from "mongoose";

const dbConnect = () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  mongoose.set("strictQuery", false);
  mongoose
    .connect(process.env.DB_URI)
    .then(() => console.log("conntectea"))
    .catch((err) => console.log(err))
    .finally(()=>console.log("finally"));
};

export default dbConnect;

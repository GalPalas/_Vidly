import mongoose from "mongoose";

const startDB = () => {
  mongoose
    .connect(
      "mongodb+srv://GalPalas:CaUVwKeDyp5vfJQ9@vidlydb.dfz1sqd.mongodb.net/vidly?retryWrites=true&w=majority"
    )
    .then(() => console.log("Connected to MongoDB..."))
    .catch(() => console.log("Could not connect to MongoDB..."));
};

export default startDB;

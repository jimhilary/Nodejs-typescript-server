import express from "express"
import mongoose from "mongoose"
import  serverRoutes from "./routes/server.routes";
import cors from "cors";
import dotenv from "dotenv"

dotenv.config();

const app = express();


app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.DATABASEURL as string);
mongoose.connection.on("connected", () => {
  console.log("connected to MongoDB");
});
mongoose.connection.on("error", (error) => {
  console.log("connection error", error);
});

app.use("/server", serverRoutes);

app.listen(process.env.PORT, () => {
  console.log("server connected on Port", process.env.PORT);
});

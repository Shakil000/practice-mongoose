import { Server } from "http";
import app from "./app";
import mongoose from "mongoose";

let server: Server;
const port = 3000;

async function main() {
  try {
    await mongoose.connect("mongodb+srv://shakil000:shakil000@cluster0.glpjidx.mongodb.net/Advance-Note-App?appName=Cluster0");
    console.log("Connected to mongoDB using Mongoose")
    server = app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();

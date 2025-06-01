import express from "express";
import mongoose from "mongoose";
// import bodyParser from "express";
import { config } from "dotenv";
import userRouter from "./Routes/user.js";
import productRouter from "./Routes/product.js";
import cartRouter from "./Routes/cart.js";

const app = express();
// app.use(bodyParser.json());
app.use(express.json());

//.env setup
config({ path: ".env" });

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the Contact API Web App",
  });
});

//user routes
app.use("/api/user", userRouter);

//product routes
app.use("/api/product", productRouter);

app.use("/api/cart", cartRouter);

mongoose
  .connect(process.env.MONGO_URL, {
    dbName: "project_ecommerce_api",
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

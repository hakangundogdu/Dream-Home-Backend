import express, { Express } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import propertyRoutes from "./routes/propertyRoutes";
import userRoutes from "./routes/userRoutes"; // Import user routes
import { errorHandler } from "./middleware/errorHandler";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/properties", propertyRoutes);
app.use("/api/users", userRoutes);

//Error handling middleware
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("Hello World");
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

export default app;

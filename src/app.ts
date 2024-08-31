import express, { Express } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import propertyRoutes from "./routes/propertyRoutes";
/*import authRoutes from "./routes/authRoutes";
import { errorHandler } from "./middleware/errorHandler"; */
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Routes
app.use("/api/properties", propertyRoutes);
/* app.use("/api/auth", authRoutes);

// Error handling middleware
app.use(errorHandler); */
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

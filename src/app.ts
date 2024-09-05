import express, { Express, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import propertyRoutes from "./routes/propertyRoutes";
import userRoutes from "./routes/userRoutes"; // Import user routes
import { errorHandler } from "./middleware/errorHandler";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

const allowedOrigins = [
  "http://localhost:5173",
  "https://dream-home-backend.vercel.app",
  // Add any other frontend URLs here
];

// Custom middleware for CORS
app.use((req: Request, res: Response, next: NextFunction) => {
  const origin = req.headers.origin;
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/test-cors", (req, res) => {
  res.json({ message: "CORS test successful" });
});
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

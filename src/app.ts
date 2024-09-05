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

const allowedOrigins = [
  "http://localhost:5173",
  // 'https://dream-home-backend.vercel.app',
  // Add any other frontend URLs here
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        var msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: false,
  })
);

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

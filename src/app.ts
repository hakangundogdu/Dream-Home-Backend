import express, { Express } from "express";
/* import propertyRoutes from "./routes/propertyRoutes";
import authRoutes from "./routes/authRoutes";
import { errorHandler } from "./middleware/errorHandler"; */

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Routes
/* app.use("/api/properties", propertyRoutes);
app.use("/api/auth", authRoutes);

// Error handling middleware
app.use(errorHandler); */
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;

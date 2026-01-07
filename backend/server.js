// app.js
import "dotenv/config";
import cors from "cors";
import express from "express";
import indexRouter from "./routes/indexRouter.js";

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV,
  });
});

app.use("/", indexRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Express app listening on port ${PORT}!`));

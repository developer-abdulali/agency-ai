import { clerkMiddleware } from "@clerk/express";
import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";

import { functions, inngest } from "./config/inngest.js";
import { serve } from "inngest/express";
import chatRouter from "./routes/chat.route.js";

const app = express();

app.use(express.json());
app.use(clerkMiddleware());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

const PORT = process.env.PORT || 5001;
const ENV = process.env.NODE_ENV;

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/chat", chatRouter);

const startServer = async () => {
  try {
    await connectDB();

    if (ENV !== "production") {
      app.listen(PORT, () => {
        console.log("Sever is running on " + PORT);
      });
    }
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
};

startServer();

export default app;

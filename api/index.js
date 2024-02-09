import express from "express";
import authRoute from "./route/auth.js";
import userRoutes from "./route/users.js";
import noteRoutes from "./route/notes.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
  );


app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoutes);
app.use("/api/notes", noteRoutes);

app.listen(5000, () => {
  console.log("connected");
});

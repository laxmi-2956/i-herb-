const express = require("express");
const dotenv = require("dotenv");
const passport = require("passport");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const cors = require("cors"); 
const connection = require("./db/connection");
const userRouter = require("./routes/user.routes");
const productRouter = require("./routes/product.routes");
const router = require("./routes/cart.routes");
const cartRouter = require("./routes/cart.routes");
const orderRouter = require("./routes/order.routes");
// require("./config/google.config"); // Initializes passport Google strategy

dotenv.config();
const app = express();
app.use(express.static("./uploads"));

// CORS setup
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// Session setup
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET || "u3e30",
//     resave: false,
//     saveUninitialized: false,
//     cookie: { secure: false }, // Use true in production (with HTTPS)
//   })
// );

// Passport setup
// app.use(passport.initialize());
// app.use(passport.session());

// Routes
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);


app.use(express.static("./uploads"));

// Server and DB connection
const port = process.env.PORT || 8080;
app.listen(port, async () => {
  try {
    await connection;
    console.log("MongoDB connected");
    console.log(`Server running on http://localhost:${port}`);
  } catch (error) {
    console.error("Database connection failed", error);
  }
});

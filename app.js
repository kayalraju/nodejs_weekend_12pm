require("dotenv").config();
const express = require("express");
const ejs = require("ejs");
const path = require("path");
const dbConnection = require("./app/config/dbcon");
const cors = require("cors");
const Limit = require("./app/utils/RateLimit");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const helmet = require("helmet");
const logger = require("./app/utils/logger");
const morgan = require("morgan");

const app = express();
dbConnection();

app.set("view engine", "ejs");
app.set("views", "views");

//cookie parser
app.use(cookieParser());
app.use(helmet());
app.use(morgan("dev"));
//setup session
app.use(
  session({
    secret: "keyboardcat",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 24 hours
    },
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//create a static folder
app.use(express.static("public"));
//static folder using path module
app.use(express.static(path.join(__dirname, "public")));
app.use("uploads", express.static(path.join(__dirname, "/uploads")));
app.use("/uploads", express.static("uploads"));
//corse middleware
//app.use(cors())

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow server-to-server requests with no origin
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(Limit);

//define router

const router=require('./app/router') 
app.use(router)




const Port = 3007;

// app.listen(Port,()=>{
//     console.log(`server is running on port ${Port}`)
// })

function startServer(port) {
  const server = app.listen(port, () => {
    logger.info(`Server started on ${port}`);
  });

  server.on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      logger.error(`Port ${port} busy, trying ${port + 1}`);
      startServer(port + 1);
    }
  });
}

startServer(Port);

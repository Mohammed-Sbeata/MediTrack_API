const express = require("express");
const cookieParser = require('cookie-parser');
const server = express();
const ApiError = require("./utils/apiError");
const globalError = require("./middlewares/errorMiddleware");
const dotenv = require("dotenv");
dotenv.config({quiet: true});
const dbConnection = require("./config/database");
const PORT = process.env.PORT || 8000;
const path = require("path");


dbConnection();

server.use(cookieParser());

//route
const authRoute = require('./routes/Auth/auth')

// Middlewares
server.use(express.json());
server.use('/Auth', authRoute)



server.use((req, res, next) => {
  next(new ApiError(`can't find this route: ${req.originalUrl}`, 400));
});



server.use(globalError);

const app = server.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});

process.on("unhandledRejection", (error) => {
  console.log(`unhandledRejection Errors: ${error.name} | ${error.message}`);
  app.close(() => {
    console.log("Shutting down..");
    process.exit(1);
  });
});
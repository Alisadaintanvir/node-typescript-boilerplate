require("module-alias/register");
import dotenv from "dotenv";

dotenv.config({
    path: [".env.local", ".env"],
});

if (process.env.NODE_ENV === "development") {
    require("module-alias").addAlias("@", __dirname + "/../src");
} else {
    require("module-alias").addAlias("@", __dirname);
}
// all imports should be done after module-alias

import express from "express";
import morgan from "morgan";
import cors from "cors";

const app = express();

import appRouter from "@/routers";

// internal Import
import {notFoundHandler, errorHandler} from "@/helpers/errorHandler";
import path from "path";

// var whitelist = process.env.ALLOWED_ORIGIN ? [process.env.ALLOWED_ORIGIN] : [];
// var corsOptions = {
//   origin: function (origin: any, callback: Function) {
//     if (
//       process.env.NODE_ENV?.toString() === "development" ||
//       whitelist.indexOf(origin) !== -1
//     ) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   credentials: true,
// };

// app.use(cors(corsOptions));

app.use(
    cors({
        origin: "*",
    })
);

app.use(morgan("dev"));

// database connection
// mongoose
//     .connect(process.env.MONGO_URI || "")
//     .then(async () => {
//         console.log("DB connection successfully!");
//     })
//     .catch((err) => {
//         console.log(err);
//     });

app.use(express.json());


// appRouter
app.use(appRouter);

// Set the view engine to EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// 404 not found handler
app.use(notFoundHandler);

// common error handler
app.use(errorHandler);

app.listen(process.env.PORT, () => {
    console.log(`app listening to port ${process.env.PORT}`);
});

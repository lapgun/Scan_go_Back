
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var order_productsRouter = require("./routes/order_products");
var order_statusesRouter = require("./routes/order_statuses");
var ordersRouter = require("./routes/orders");
var order_detailsRouter = require("./routes/order_details");
var categoriesRouter = require("./routes/categories");
var productsRouter = require("./routes/products");
var adminsRouter = require("./routes/admins");
var jwt = require('jsonwebtoken');
var app = express();
// view engine setup
app.use(cors());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "storage")));
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/order_products", order_productsRouter);
app.use("/order_statuses", order_statusesRouter);
app.use("/orders", ordersRouter);
app.use("/order_details", order_detailsRouter);
app.use("/categories", categoriesRouter);
app.use("/products", productsRouter);

//decode token
// var checkUserLogged = (req, res, next) => {
//   // check header or url parameters or post parameters for token
//   var token =
//     req.body.token ||
//     req.query.token ||
//     req.headers["x-access-token"] ||
//     req.headers["access-token"] ||
//     req.headers["token"] ||
//     req.header("token");
//   // decode token
//   if (token) {
//     // verifies secret and checks exp
//     jwt.verify(token, "qtahhnmsv", (err, decoded) => {
//       if (err) {
//         return res.json({
//           success: false,
//           message: "Failed to authenticate token.",
//           header: req.headers
//         });
//       } else {
//         // if everything is good, save to request for use in other routes
//         req.decoded = decoded;
//         next();
//       }
//     });
//   } else {
//     // if there is no token
//     // return an error
//     return res.status(403).send({
//       success: false,
//       message: "No token provided."
//     });
//   }
// };
// app.use(checkUserLogged);
app.use("/admins", adminsRouter);

app.listen(4000, function() {
  console.log("Node app is running on port 4000");
});
module.exports = app;

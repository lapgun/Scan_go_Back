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
var app = express();
app.use(cors());
// view engine setup
app.use(cors());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/order_products", order_productsRouter);
app.use("/order_statuses", order_statusesRouter);
app.use("/orders", ordersRouter);
app.use("/order_details", order_detailsRouter);
app.use("/categories", categoriesRouter);
app.use("/products", productsRouter);
app.use("/admins", adminsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.listen(4000, function() {
  console.log("Node app is running on port 4000");
});

module.exports = app;

const express = require("express");
const db = require("./db/models");
const Productrouter = require("./routes/products");
const Shoprouter = require("./routes/shops");
const userRoutes = require("./routes/users");
const cors = require("cors");
const path = require("path");
const passport = require("passport");
const { localStrategy } = require("./middleware/passport");
const app = express();
app.use(cors());

app.use(express.json());
app.use(passport.initialize());
passport.use(localStrategy);

app.use("/products", Productrouter);
app.use("/shops", Shoprouter);
app.use(userRoutes);
app.use("/media", express.static(path.join(__dirname, "media")));
app.use((req, res, next) => {
  next({
    status: 404,
    message: "Path not found",
  });
});

app.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .json({ message: err.message || "Internal Server Error" });
});
db.sequelize.sync({ alter: true });

app.listen(8000);

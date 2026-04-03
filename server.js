const express = require("express");
const cors = require("cors");
const session = require("express-session");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const { connectToDb } = require("./db/connect");

const passport = require("./config/passport");
const contactsRoutes = require("./routes/contacts");
const professionalRoutes = require("./routes/professional");
const authRoutes = require("./routes/auth");

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET || "default_session_secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false
    }
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/auth", authRoutes);
app.use("/contacts", contactsRoutes);
app.use("/professional", professionalRoutes);

connectToDb().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});
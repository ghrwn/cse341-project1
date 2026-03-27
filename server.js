const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const { connectToDb } = require("./db/connect");

const contactsRoutes = require("./routes/contacts");
const professionalRoutes = require("./routes/professional");

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/contacts", contactsRoutes);
app.use("/professional", professionalRoutes);

connectToDb().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});
const express = require("express");
const cors = require("cors");
const { connectToDb } = require("./db/connect");

const contactsRoutes = require("./routes/contacts");

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());

app.use("/contacts", contactsRoutes);

connectToDb().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});
const { getDb } = require("../db/connect");
const { ObjectId } = require("mongodb");

// GET all contacts
const getAllContacts = async (req, res) => {
  const db = getDb();
  const contacts = await db.collection("contacts").find().toArray();
  res.json(contacts);
};

// GET single contact by id
const getSingleContact = async (req, res) => {
  const db = getDb();
  const id = new ObjectId(req.params.id);
  const contact = await db.collection("contacts").findOne({ _id: id });
  res.json(contact);
};

module.exports = {
  getAllContacts,
  getSingleContact
};
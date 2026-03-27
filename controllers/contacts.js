const { getDb } = require("../db/connect");
const { ObjectId } = require("mongodb");

const validateContact = ({ firstName, lastName, email, favoriteColor, birthday }) => {
  if (
    !firstName || !firstName.trim() ||
    !lastName || !lastName.trim() ||
    !email || !email.trim() ||
    !favoriteColor || !favoriteColor.trim() ||
    !birthday || !birthday.trim()
  ) {
    return "All fields are required: firstName, lastName, email, favoriteColor, birthday";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "Invalid email format";
  }

  return null;
};

// GET all contacts
const getAllContacts = async (req, res) => {
  try {
    const db = getDb();
    const contacts = await db.collection("contacts").find().toArray();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET single contact by id
const getSingleContact = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid contact id" });
    }

    const db = getDb();
    const id = new ObjectId(req.params.id);
    const contact = await db.collection("contacts").findOne({ _id: id });

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST create contact
const createContact = async (req, res) => {
  try {
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;

    const validationError = validateContact({
      firstName,
      lastName,
      email,
      favoriteColor,
      birthday
    });

    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    const db = getDb();
    const result = await db.collection("contacts").insertOne({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      favoriteColor: favoriteColor.trim(),
      birthday: birthday.trim()
    });

    res.status(201).json({ id: result.insertedId });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT update contact
const updateContact = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid contact id" });
    }

    const { firstName, lastName, email, favoriteColor, birthday } = req.body;

    const validationError = validateContact({
      firstName,
      lastName,
      email,
      favoriteColor,
      birthday
    });

    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    const db = getDb();
    const id = new ObjectId(req.params.id);

    const result = await db.collection("contacts").replaceOne(
      { _id: id },
      {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        favoriteColor: favoriteColor.trim(),
        birthday: birthday.trim()
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE contact
const deleteContact = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid contact id" });
    }

    const db = getDb();
    const id = new ObjectId(req.params.id);

    const result = await db.collection("contacts").deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.status(200).json({ message: "Contact deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllContacts,
  getSingleContact,
  createContact,
  updateContact,
  deleteContact
};
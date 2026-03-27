const { getDb } = require("../db/connect");
const { ObjectId } = require("mongodb");

const validateProfessional = ({
  professionalName,
  base64Image,
  nameLink,
  primaryDescription,
  workDescription1,
  workDescription2,
  linkTitleText,
  linkedInLink,
  githubLink
}) => {
  if (
    !professionalName || !professionalName.trim() ||
    base64Image === undefined ||
    !nameLink ||
    !nameLink.firstName || !nameLink.firstName.trim() ||
    !nameLink.url || !nameLink.url.trim() ||
    !primaryDescription || !primaryDescription.trim() ||
    !workDescription1 || !workDescription1.trim() ||
    !workDescription2 || !workDescription2.trim() ||
    !linkTitleText || !linkTitleText.trim() ||
    !linkedInLink ||
    !linkedInLink.text || !linkedInLink.text.trim() ||
    !linkedInLink.link || !linkedInLink.link.trim() ||
    !githubLink ||
    !githubLink.text || !githubLink.text.trim() ||
    !githubLink.link || !githubLink.link.trim()
  ) {
    return "All fields are required: professionalName, base64Image, nameLink.firstName, nameLink.url, primaryDescription, workDescription1, workDescription2, linkTitleText, linkedInLink.text, linkedInLink.link, githubLink.text, githubLink.link";
  }

  return null;
};

// GET all professional records
const getAllProfessional = async (req, res) => {
  try {
    const db = getDb();
    const professional = await db.collection("professional").find().toArray();
    res.status(200).json(professional);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET single professional record by id
const getSingleProfessional = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid professional id" });
    }

    const db = getDb();
    const id = new ObjectId(req.params.id);
    const professional = await db.collection("professional").findOne({ _id: id });

    if (!professional) {
      return res.status(404).json({ message: "Professional record not found" });
    }

    res.status(200).json(professional);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST create professional record
const createProfessional = async (req, res) => {
  try {
    const {
      professionalName,
      base64Image,
      nameLink,
      primaryDescription,
      workDescription1,
      workDescription2,
      linkTitleText,
      linkedInLink,
      githubLink
    } = req.body;

    const validationError = validateProfessional({
      professionalName,
      base64Image,
      nameLink,
      primaryDescription,
      workDescription1,
      workDescription2,
      linkTitleText,
      linkedInLink,
      githubLink
    });

    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    const db = getDb();
    const result = await db.collection("professional").insertOne({
      professionalName: professionalName.trim(),
      base64Image,
      nameLink: {
        firstName: nameLink.firstName.trim(),
        url: nameLink.url.trim()
      },
      primaryDescription: primaryDescription.trim(),
      workDescription1: workDescription1.trim(),
      workDescription2: workDescription2.trim(),
      linkTitleText: linkTitleText.trim(),
      linkedInLink: {
        text: linkedInLink.text.trim(),
        link: linkedInLink.link.trim()
      },
      githubLink: {
        text: githubLink.text.trim(),
        link: githubLink.link.trim()
      }
    });

    res.status(201).json({ id: result.insertedId });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT update professional record
const updateProfessional = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid professional id" });
    }

    const {
      professionalName,
      base64Image,
      nameLink,
      primaryDescription,
      workDescription1,
      workDescription2,
      linkTitleText,
      linkedInLink,
      githubLink
    } = req.body;

    const validationError = validateProfessional({
      professionalName,
      base64Image,
      nameLink,
      primaryDescription,
      workDescription1,
      workDescription2,
      linkTitleText,
      linkedInLink,
      githubLink
    });

    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    const db = getDb();
    const id = new ObjectId(req.params.id);

    const result = await db.collection("professional").replaceOne(
      { _id: id },
      {
        professionalName: professionalName.trim(),
        base64Image,
        nameLink: {
          firstName: nameLink.firstName.trim(),
          url: nameLink.url.trim()
        },
        primaryDescription: primaryDescription.trim(),
        workDescription1: workDescription1.trim(),
        workDescription2: workDescription2.trim(),
        linkTitleText: linkTitleText.trim(),
        linkedInLink: {
          text: linkedInLink.text.trim(),
          link: linkedInLink.link.trim()
        },
        githubLink: {
          text: githubLink.text.trim(),
          link: githubLink.link.trim()
        }
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Professional record not found" });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE professional record
const deleteProfessional = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid professional id" });
    }

    const db = getDb();
    const id = new ObjectId(req.params.id);

    const result = await db.collection("professional").deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Professional record not found" });
    }

    res.status(200).json({ message: "Professional record deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllProfessional,
  getSingleProfessional,
  createProfessional,
  updateProfessional,
  deleteProfessional
};
const express = require("express");
const router = express.Router();
const contactsController = require("../controllers/contacts");

/*  #swagger.tags = ['Contacts']
    #swagger.summary = 'Get all contacts'
    #swagger.description = 'Returns all contacts from MongoDB'
*/
router.get("/", contactsController.getAllContacts);

/*  #swagger.tags = ['Contacts']
    #swagger.summary = 'Get one contact by id'
    #swagger.description = 'Returns a single contact by MongoDB ObjectId'
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'MongoDB contact id',
      required: true,
      type: 'string'
    }
*/
router.get("/:id", contactsController.getSingleContact);

/*  #swagger.tags = ['Contacts']
    #swagger.summary = 'Create a new contact'
    #swagger.description = 'Creates a new contact. All fields are required.'
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Contact data',
      required: true,
      schema: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        favoriteColor: 'Blue',
        birthday: '1990-01-01'
      }
    }
*/
router.post("/", contactsController.createContact);

/*  #swagger.tags = ['Contacts']
    #swagger.summary = 'Update a contact'
    #swagger.description = 'Updates a contact by id. All fields are required.'
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'MongoDB contact id',
      required: true,
      type: 'string'
    }
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Updated contact data',
      required: true,
      schema: {
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane@example.com',
        favoriteColor: 'Green',
        birthday: '1992-05-10'
      }
    }
*/
router.put("/:id", contactsController.updateContact);

/*  #swagger.tags = ['Contacts']
    #swagger.summary = 'Delete a contact'
    #swagger.description = 'Deletes a contact by id'
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'MongoDB contact id',
      required: true,
      type: 'string'
    }
*/
router.delete("/:id", contactsController.deleteContact);

module.exports = router;
const express = require('express');
const router = express.Router();
const heroControllers = require('../Controllers/hero.controllers');

// Get all data from mySQL
router.get('/all', heroControllers.getAllHeros);

// Add new data to the table
router.post('/insert', heroControllers.addNewHeros);

// Update existing data from the mySQL table
router.put('/edit', heroControllers.updateHeros);

// Delete a specific data from the mySQL table by id
router.delete('/delete/:id', heroControllers.deleteHero);

module.exports = router;
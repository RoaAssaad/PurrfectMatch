const { validationResult } = require('express-validator');
const { 
    insertCatShelter, 
    getCatShelterById, 
    updateCatShelter, 
    deleteCatShelter 
} = require('../services/cat.shelter.services');

const insertCatShelterController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors });
    }

    const { Cat_ID, Shelter_ID, Date_Arrived } = req.body;
    try {
        const newEntry = await insertCatShelter(Cat_ID, Shelter_ID, Date_Arrived);
        res.status(201).json(newEntry);
    } catch (error) {
        res.status(500).json({ message: "Error inserting cat shelter data", error });
    }
};

const getCatShelterByIdController = async (req, res) => {
    const { Cat_ID, Shelter_ID } = req.params;
    try {
        const catShelterData = await getCatShelterById(Cat_ID, Shelter_ID);
        if (!catShelterData) {
            return res.status(404).json({ message: "Cat shelter data not found" });
        }
        res.status(200).json(catShelterData);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving cat shelter data", error });
    }
};

const updateCatShelterController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors });
    }

    const { Cat_ID, Shelter_ID } = req.params;
    const { New_Shelter_ID, Date_Arrived } = req.body;
    try {
        const updatedData = await updateCatShelter(Cat_ID, Shelter_ID, New_Shelter_ID, Date_Arrived);
        res.status(200).json(updatedData);
    } catch (error) {
        res.status(500).json({ message: "Error updating cat shelter data", error });
    }
};

const deleteCatShelterController = async (req, res) => {
    const { Cat_ID, Shelter_ID } = req.params;
    try {
        await deleteCatShelter(Cat_ID, Shelter_ID);
        res.status(200).json({ message: "Cat shelter data deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting cat shelter data", error });
    }
};

module.exports = {
    insertCatShelterController,
    getCatShelterByIdController,
    updateCatShelterController,
    deleteCatShelterController
};

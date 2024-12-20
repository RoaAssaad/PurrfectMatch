const { validationResult } = require('express-validator');
const { getShelters, getShelterById, insertShelter, updateShelter, deleteShelter, searchShelters  } = require('../services/shelters.services');

const getSheltersController = async (req, res) => {
    try {
        const shelters = await getShelters();
        res.render('shelters', { title: 'Shelter Profiles', shelters });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving shelters", error: error.message });
    }
};

const getShelterByIdController = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: "Missing shelter ID" });
    }

    try {
        const shelter = await getShelterById(id);
        if (!shelter) {
            return res.status(404).json({ message: "Shelter not found" });
        }
        res.status(200).json(shelter);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving shelter", error: error.message });
    }
};

const insertShelterController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Validation error" });
    }

    const { Shelter_Name, Shelter_Address, Shelter_ContactInfo } = req.body;

    try {
        const newShelter = await insertShelter(Shelter_Name, Shelter_Address, Shelter_ContactInfo);
        res.status(201).json({ newShelter });
    } catch (error) {
        res.status(500).json({ message: "Error inserting shelter", error: error.message });
    }
};

const updateShelterController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Validation error" });
    }

    const { id } = req.params;
    const { Shelter_Name, Shelter_Address, Shelter_ContactInfo } = req.body;

    try {
        const updatedShelter = await updateShelter(id, Shelter_Name, Shelter_Address, Shelter_ContactInfo);
        if (!updatedShelter) {
            return res.status(404).json({ message: "Shelter not found" });
        }
        res.status(200).json({ updatedShelter });
    } catch (error) {
        res.status(500).json({ message: "Error updating shelter", error: error.message });
    }
};

const deleteShelterController = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: "Missing shelter ID" });
    }

    try {
        await deleteShelter(id);
        res.status(200).json({ message: "Shelter deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting shelter", error: error.message });
    }
};

const searchSheltersController = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Validation error", errors: errors.mapped() });
    }

    const { keyword } = req.query;

    try { if(!keyword){
        return res.status(401).json({message: "missing data"});
    }

        const shelters = await searchShelters(keyword);
        if(!shelters){
            res.status(200).json({message: "Shelter not found"});
        }
        res.status(200).json({ shelters });
    } catch (error) {

        res.status(500).json({ message: "Error searching shelters", error: error.message });
    }
};

module.exports = {
    getSheltersController,
    getShelterByIdController,
    insertShelterController,
    updateShelterController,
    deleteShelterController,
    searchSheltersController
};
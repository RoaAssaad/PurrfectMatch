const { validationResult } = require('express-validator');
const { getCats, getCatById, insertCat, updateCat, deleteCat, searchCats } = require('../services/cats.services');

const getCatsController = async (req, res) => {
    try {
        const cats = await getCats(); // Changed from fetchCatsData to getCats to use the service directly
        if (!cats || cats.length === 0) return res.status(404).render('cats', { title: 'No Cats Found', cats: [] });
        res.render('cats', { title: 'Cat Profiles', cats });
    } catch (error) {
        console.error('Failed to fetch cats:', error);
        res.status(500).render('error', { error: 'Internal Server Error' });
    }
};


const getCatByIdController = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: "Missing cat ID" });
    }

    try {
        const cat = await getCatById(id);
        if (!cat) {
            return res.status(404).json({ message: "Cat not found" });
        }
        res.status(200).json(cat);
    } catch (error) {
        res.status(500).json({message: "Internal server error"});
    }
};

const insertCatController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Validation error" });
    }

    const {Cat_Name, Cat_DOB, Cat_Breed,Cat_Gender,
        Cat_HealthStatus,Cat_Description,Cat_Image} = req.body;

    try {
        const newCat = await insertCat(Cat_Name, Cat_DOB, Cat_Breed,Cat_Gender,
            Cat_HealthStatus,Cat_Description,Cat_Image);
            
        res.status(201).json({ newCat });
    } catch (error) {
        res.status(500).json({message: "Internal server error"});
    }
};

const updateCatController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Validation error" });
    }

    try {
        const updatedCat = await updateCat(req.params.id, req.body);
        if (!updatedCat) {
            return res.status(404).json({ message: "Cat not found" });
        }
        res.status(200).json({ updatedCat });
    } catch (error) {
        res.status(500).json({message: "Internal server error"});
    }
};

const deleteCatController = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: "Missing cat ID" });
    }

    try {
        await deleteCat(id);
        res.status(200).json({ message: "Cat successfully deleted" });
    } catch (error) {
        res.status(500).json({message: "Internal server error"});
    }
};


const searchCatsController = async (req, res) => {
    const { keyword } = req.query;
    try {
        if(!keyword){
            return res.status(401).json({message: "missing data"});
        }
        const cats = await searchCats(keyword);
        if(!cats){
            res.status(200).json({message: "Cat not found"});
        }
    
        res.status(200).json({ cats });
    } catch (error) {
        res.status(500).json({message: "Internal server error"});
    }
};


module.exports = {
    getCatsController,
    getCatByIdController,
    insertCatController,
    updateCatController,
    deleteCatController,
    searchCatsController
};

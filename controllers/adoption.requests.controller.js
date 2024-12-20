const { validationResult } = require('express-validator');
const { 
    getAdoptionRequests, 
    getAdoptionRequestById, 
    insertAdoptionRequest, 
    updateAdoptionRequest, 
    deleteAdoptionRequest 
} = require('../services/adoption.requests.services');

const getAdoptionRequestsController = async (req, res) => {
    try {
        const requests = await getAdoptionRequests();
        res.status(200).json({ requests });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving adoption requests", error });
    }
};

const getAdoptionRequestByIdController = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: "Missing request ID" });
    }

    try {
        const request = await getAdoptionRequestById(id);
        if (!request) {
            return res.status(404).json({ message: "Adoption request not found" });
        }
        res.status(200).json(request);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving adoption request", error });
    }
};

const insertAdoptionRequestController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Validation error" });
    }

    const { Request_Date, Request_Status, User_ID, Cat_ID } = req.body;

    try {
        const newRequest = await insertAdoptionRequest(Request_Date, Request_Status, User_ID, Cat_ID);
        res.status(201).json({ newRequest });
    } catch (error) {
        res.status(500).json({ message: "Error inserting adoption request", error });
    }
};

const updateAdoptionRequestController = async (req, res) => {
    const { id } = req.params;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Validation error" });
    }

    const { Request_Date, Request_Status, User_ID, Cat_ID } = req.body;

    try {
        const updatedRequest = await updateAdoptionRequest(id, Request_Date, Request_Status, User_ID, Cat_ID);
        if (!updatedRequest) {
            return res.status(404).json({ message: "Adoption request not found" });
        }
        res.status(200).json({ updatedRequest });
    } catch (error) {
        res.status(500).json({ message: "Error updating adoption request", error });
    }
};

const deleteAdoptionRequestController = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: "Missing request ID" });
    }

    try {
        await deleteAdoptionRequest(id);
        res.status(200).json({ message: "Adoption request deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting adoption request", error });
    }
};



const createAdoptionRequest = async (req, res) => {
    const { User_ID, Cat_ID } = req.body;
    const requestDetails = {
        Request_Date: new Date(),
        Request_Status: 'Pending',
        User_ID,
        Cat_ID
    };
    try {
        const adoptionRequest = await insertAdoptionRequest(requestDetails);
        res.status(201).json(adoptionRequest);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};


module.exports = {
    getAdoptionRequestsController,
    getAdoptionRequestByIdController,
    insertAdoptionRequestController,
    updateAdoptionRequestController,
    deleteAdoptionRequestController,
    createAdoptionRequest
};

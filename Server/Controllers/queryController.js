const queryService = require("../Services/queryServices");

// Create a new query
const createQuery = async (req, res) => {
  try {

    const query = await queryService.createQuery(req.body);
    res.status(201).json(query);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all queries
const getAllQueries = async (req, res) => {
  try {
    const queries = await queryService.getAllQueries();
    res.status(200).json(queries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get query by ID
const getQueryById = async (req, res) => {
  try {
    const query = await queryService.getQueryById(req.params.id);
    if (!query) return res.status(404).json({ message: "Query not found" });
    res.status(200).json(query);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update query by ID
const updateQuery = async (req, res) => {
  try {
    const updatedQuery = await queryService.updateQuery(req.params.id, req.body);
    if (!updatedQuery) return res.status(404).json({ message: "Query not found" });
    res.status(200).json(updatedQuery);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete query by ID
const deleteQuery = async (req, res) => {
  try {
    const deletedQuery = await queryService.deleteQuery(req.params.id);
    if (!deletedQuery) return res.status(404).json({ message: "Query not found" });
    res.status(200).json({ message: "Query deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createQuery, getAllQueries, getQueryById, updateQuery, deleteQuery };

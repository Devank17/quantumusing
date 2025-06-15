const Query = require("../Models/queryModel");

const createQuery = async (queryData) => {
  return await new Query(queryData).save();
};

const getAllQueries = async () => {
  return await Query.find();
};

const getQueryById = async (id) => {
  return await Query.findById(id);
};

const updateQuery = async (id, updateData) => {
  return await Query.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteQuery = async (id) => {
  return await Query.findByIdAndDelete(id);
};

module.exports = { createQuery, getAllQueries, getQueryById, updateQuery, deleteQuery };

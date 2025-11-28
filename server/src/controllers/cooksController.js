const { Cook } = require('../models');

async function createCook(req, res) {
  const cook = await Cook.create(req.body);
  res.status(201).json(cook);
}
async function listCooks(req, res) {
  const cooks = await Cook.findAll();
  res.json(cooks);
}
async function getCook(req, res) {
  const cook = await Cook.findByPk(req.params.id);
  if(!cook) return res.status(404).json({ message: 'Not found' });
  res.json(cook);
}
async function updateCook(req, res) {
  await Cook.update(req.body, { where: { id: req.params.id } });
  const cook = await Cook.findByPk(req.params.id);
  res.json(cook);
}
async function deleteCook(req, res) {
  await Cook.destroy({ where: { id: req.params.id } });
  res.status(204).send();
}

module.exports = { createCook, listCooks, getCook, updateCook, deleteCook };

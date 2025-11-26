const { Car } = require('../models');

async function createCar(req, res) {
  const car = await Car.create(req.body);
  res.status(201).json(car);
}
async function listCars(req, res) {
  const cars = await Car.findAll();
  res.json(cars);
}
async function getCar(req, res) {
  const car = await Car.findByPk(req.params.id);
  if(!car) return res.status(404).json({ message: 'Not found' });
  res.json(car);
}
async function updateCar(req, res) {
  await Car.update(req.body, { where: { id: req.params.id } });
  const car = await Car.findByPk(req.params.id);
  res.json(car);
}
async function deleteCar(req, res) {
  await Car.destroy({ where: { id: req.params.id } });
  res.status(204).send();
}

module.exports = { createCar, listCars, getCar, updateCar, deleteCar };

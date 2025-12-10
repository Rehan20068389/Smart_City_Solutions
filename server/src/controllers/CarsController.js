// Refreance from youtube "https://www.youtube.com/watch?v=6nv3qy3oNkc"
//Refreance from youtube "https://www.youtube.com/watch?v=PoRJizFvM7s
//Refreance from chatgpt
//Refreance from w3school
const { Car } = require('../models');
 exports.createCar = async (req, res) => {//updated the car creation
   try {
    if (!req.user) return res.status(401).json({ message: 'Authentication required' });//its used for the user authentication

    const { model, type, price_per_day, location, with_driver } = req.body;
    const car = await Car.create({ //used to save the new car in the DB
      model, type, price_per_day, location,
      with_driver: !!with_driver,
      providerId: req.user.id // linked with its owner 
    });
    res.status(201).json(car);
  
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
    //my own modification 
exports.listAllCars = async (req, res) => {//here all users can see the cars which are  available
  try {
    const cars = await Car.findAll();   //to list all the cars for the user
    res.json(cars);
  } catch (error) {
    console.error("Error listing all cars:", error);
    res.status(500).json({ message: "Server error" });
  }
};

   //my own modification
exports.listProviderCars = async (req, res) => {
  try {
    const cars = await Car.findAll({
      where: { providerId: req.user.id }//showing only logedin providers cars
    });//prevents a provider from seeing others car details

    res.json(cars);
  } catch (error) {
    console.error("Error listing cars:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getCar = async (req, res) => {
  try{
  const car = await Car.findByPk(req.params.id);//getting a car by its ID
  if(!car) return res.status(404).json({ message: 'Not found' });
  res.json(car);
  }catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

exports.updateCar = async (req, res) => {
   try {
    if (!req.user) return res.status(401).json({ message: 'Authentication required' });
//only authenticated providers can only update it
    const car = await Car.findByPk(req.params.id);
    if (!car) return res.status(404).json({ message: 'Not found' });

    if (req.user.role !== 'provider' || car.providerId !== req.user.id) {
      return res.status(403).json({ message: 'Forbidden: not owner' });
    }

    await car.update (req.body);//update the car with the data 
    res.json(car);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
  
  
};
exports.deleteCar = async (req, res) => {
   try {
    if (!req.user) return res.status(401).json({ message: 'Authentication required' });

    const car = await Car.findByPk(req.params.id);
    if (!car) return res.status(404).json({ message: 'Not found' });

    if (req.user.role !== 'provider' || car.providerId !== req.user.id) {
      return res.status(403).json({ message: 'Forbidden: not owner' });
    }

    await car.destroy();
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
  
};


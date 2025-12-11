// Refreance from youtube "https://www.youtube.com/watch?v=6nv3qy3oNkc"
//Refreance from youtube "https://www.youtube.com/watch?v=PoRJizFvM7s"
//Refreance from chatgpt
//Refreance from w3school
const { Cook } = require('../models');

exports.createCook = async (req, res) => {
   try {
    if (!req.user) return res.status(401).json({ message: 'Authentication required' });

     if (req.user.role !== 'provider')
      return res.status(403).json({ message: 'Only providers can add cooks' });
   
     const { name, experience_years, specialties, daily_rate, rating } = req.body;

    const cook = await Cook.create({// saves a new cook in the database
      name, experience_years, specialties, daily_rate, rating,
      providerId: req.user.id//provider association
    });

    res.status(201).json(cook);

  } catch (err) {
    console.error("Create Cook Error:", err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
  
};
//my own modifications
exports.listAllCooks = async (req, res) => {
  try {
    const cooks = await Cook.findAll(); // here fetching athe cooks
    res.json(cooks);
  } catch (error) {
    console.error("Error listing all cooks:", error);
    res.status(500).json({ message: "Server error" });
  }
};

//my own modification
exports.listProviderCooks = async (req, res) => {
  try { 

    if (!req.user)
      return res.status(401).json({ message: "Authentication required" });

    if (req.user.role !== "provider")
      return res.status(403).json({ message: "Only providers can access this" });

    const cooks = await Cook.findAll({
      where: { providerId: req.user.id }//only loggedin providers cooks
    });

    res.json(cooks);
  } catch (err) {
    console.error("List Provider Cooks Error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.getCook = async (req, res)  =>{
  try {
  const cook = await Cook.findByPk(req.params.id);//getting a cook by its ID
  if(!cook) return res.status(404).json({ message: 'Not found' });
  res.json(cook);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
}
};
exports.updateCook = async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ message: 'Authentication required' });

    const cook = await Cook.findByPk(req.params.id);//only the authenticated provider who ownes the cook can update it
    if (!cook) return res.status(404).json({ message: 'Not found' });

    if (req.user.role !== 'provider' || cook.providerId !== req.user.id) {
      return res.status(403).json({ message: 'Forbidden: not owner' });
    }

    await cook.update({
  ...req.body,
  providerId: req.user.id  // ensure providerId stays correct
});

    res.json(cook);
  } catch (err) {
      console.error("Update Cook Error:", err);
    res.status(500).json({ error: err.message });
  }
 
 
};
exports.deleteCook = async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ message: 'Authentication required' });

    const cook = await Cook.findByPk(req.params.id);
    if (!cook) return res.status(404).json({ message: 'Not found' });

    if (req.user.role !== 'provider' || cook.providerId !== req.user.id) {
      return res.status(403).json({ message: 'Forbidden: not owner' });
    }

    await cook.destroy();
    res.status(204).send();
  } catch (err) {
    console.error("Delete Cook Error:", err);
    res.status(500).json({ error: err.message });
  }
 
};


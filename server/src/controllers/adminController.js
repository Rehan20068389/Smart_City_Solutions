//Referance from youtube:"https://youtu.be/tBObk72EYYw?si=SQoC2lo2ycZgWCoi"
//Referance from chatgpt:"https://chatgpt.com/share/693dcbc6-add0-8008-bf76-50f05659fc0d"
//Referance from youtube:"https://youtu.be/k3Vfj-e1Ma4?si=5QZWOyVmEaeme-Bu"
const { User, Car, Cook } = require('../models');

//users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      where: { role: 'user' },
      attributes: { exclude: ['password'] }
    });
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    await user.update(req.body);
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update user' });
  }
};

exports.toggleUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    user.isActive = !user.isActive;
    await user.save();
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to toggle user' });
  }
};

//providers
exports.getProviders = async (req, res) => {
  try {
    const providers = await User.findAll({
      where: { role: 'provider' },
      attributes: { exclude: ['password'] }
    });
    res.json(providers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch providers' });
  }
};

exports.toggleProvider = async (req, res) => {
  try {
    const provider = await User.findByPk(req.params.id);
    if (!provider) return res.status(404).json({ error: 'Provider not found' });

    provider.isActive = !provider.isActive;
    await provider.save();
    res.json(provider);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to toggle provider' });
  }
};

exports.deleteProvider = async (req, res) => {
  try {
    const providerId = req.params.id;

    await Car.destroy({ where: { providerId } });
    await Cook.destroy({ where: { providerId } });
    await User.destroy({ where: { id: providerId } });

    res.json({ message: 'Provider and services deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete provider' });
  }
};
exports.updateProvider = async (req, res) => {
  try {
    const provider = await User.findByPk(req.params.id);

    if (!provider) {
      return res.status(404).json({ error: "Provider not found" });
    }

    const { name, email, isActive } = req.body;

    if (name !== undefined) provider.name = name;
    if (email !== undefined) provider.email = email;
    if (isActive !== undefined) provider.isActive = isActive;

    await provider.save();
    res.json(provider);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

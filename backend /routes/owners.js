const express = require('express');
const Owner = require('../models/Owner');
const LandHolding = require('../models/LandHolding');
const router = express.Router();

// Get all owners
router.get('/', async (req, res) => {
  try {
    const owners = await Owner.find();
    res.json(owners);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Create a new owner
router.post('/', async (req, res) => {
  const { ownerName, entityType, ownerType, address } = req.body;

  try {
    let owner = await Owner.findOne({ ownerName, address });
    if (owner) {
      return res.status(400).json({ msg: 'Owner already exists' });
    }

    owner = new Owner({
      ownerName,
      entityType,
      ownerType,
      address,
    });

    await owner.save();
    res.json(owner);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Delete an owner and related land holdings
router.delete('/:id', async (req, res) => {
  try {
    const owner = await Owner.findById(req.params.id);
    if (!owner) {
      return res.status(404).json({ msg: 'Owner not found' });
    }

    await LandHolding.deleteMany({ owner: owner.id });
    await owner.remove();

    res.json({ msg: 'Owner and related land holdings removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;

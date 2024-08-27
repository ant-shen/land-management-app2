const express = require('express');
const LandHolding = require('../models/LandHolding');
const router = express.Router();

// Get all land holdings
router.get('/', async (req, res) => {
  try {
    const landHoldings = await LandHolding.find();
    res.json(landHoldings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Create a new land holding
router.post('/', async (req, res) => {
  const { name, owner, legalEntity, netMineralAcres, mineralOwnerRoyalty, sectionName, section, township, range, titleSource } = req.body;

  try {
    const landHolding = new LandHolding({
      name,
      owner,
      legalEntity,
      netMineralAcres,
      mineralOwnerRoyalty,
      sectionName,
      section,
      township,
      range,
      titleSource,
    });

    await landHolding.save();
    res.json(landHolding);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Delete a land holding
router.delete('/:id', async (req, res) => {
  try {
    const landHolding = await LandHolding.findById(req.params.id);
    if (!landHolding) {
      return res.status(404).json({ msg: 'Land Holding not found' });
    }

    await landHolding.remove();
    res.json({ msg: 'Land Holding removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;

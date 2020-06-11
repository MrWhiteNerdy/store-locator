const Store = require('../models/Store');

/**
 * @description Get all stores
 * @route GET /api/v1/stores
 */
exports.getStores = async (req, res, next) => {
  try {
    const stores = await Store.find();
    return res.status(200).json({
      success: true,
      count: stores.length,
      data: stores
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Server error' });
  }
};

/**
 * @description Create a store
 * @route POST /api/v1/stores
 */
exports.addStore = async (req, res, next) => {
  try {
    const store = await Store.create(req.body);

    return res.status(201).json({
      success: true,
      data: store
    });
  } catch (e) {
    console.error(e);

    if (e.code === 11000) {
      return res.status(400).json({ error: 'Store ID already exists' });
    }

    res.status(500).json({ error: 'Server error' });
  }
};

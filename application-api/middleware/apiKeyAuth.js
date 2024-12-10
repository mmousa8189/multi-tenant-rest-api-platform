const Application = require('../models/application.model');

module.exports = async (req, res, next) => {
  try {
    const apiKey = req.header('X-API-Key');
    if (!apiKey) {
      return res.status(401).json({ message: 'API key is required' });
    }

    const application = await Application.findOne({ apiKey, status: 'active' });
    if (!application) {
      return res.status(401).json({ message: 'Invalid API key' });
    }

    // Update last accessed time and increment request count
    application.lastAccessed = new Date();
    application.requestCount += 1;
    await application.save();

    req.application = application;
    next();
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

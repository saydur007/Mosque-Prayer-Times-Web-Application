const express = require('express');
const PrayerTime = require('../models/PrayerTime');
const db = require("../models");
const router = express.Router();

// GET all prayer times
router.get('/', async (req, res) => {
    try {
        const prayerTimes = await db.PrayerTime.findAll();;
        res.json(prayerTimes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/:date', async (req, res) => {
    try {
        const prayerTimes = await db.PrayerTime.findOne({ where: { date: req.params.date } });
        res.json(prayerTimes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
const router = require("express").Router();

const quizeModel = require('../models/quizeModel')

router.post("/quize", async (req, res) => {
    try {
        const quize = await quizeModel.create(req.body);
        if (quize) {
            res.status(200).json(quize);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
})
router.get("/quize", async (req, res) => {
    try {
        const quize = await quizeModel.find();
        if (quize) {
            res.status(200).json(quize);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
})
router.delete("/quize/:id", async (req, res) => {
    const id = req.params.id
    try {
        const quize = await quizeModel.findByIdAndDelete({ _id: id }, req.body);
        if (quize) {
            res.status(200).json(quize);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
})

module.exports = router
const express = require('express');

const router = express.Router();

const burger = require('../models/burger');

router.get('/', (req, res) => {
    burger.all( data => {
        const hbsObject = {
            burgers: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});

router.post('/api/burgers', (req, res) => {
    burger.create([
        'burgers_name', 'devoured'
    ],[ req.body.burgers_name, req.body.devoured
    ], result => {
        res.json({ id: result.insertId });
    }
    );
});
//'/api/burgers/'
router.put('/api/burgers/:id', (req, res) => {
    let condition = "id = " + req.params.id;

    burger.update({
        devoured: req.body.devoured
    }, condition, result => {
        if(result.changeRows == 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });

});


module.exports = router;
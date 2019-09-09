const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

router.get('/', (req, res) => {
    const queryText = `SELECT * FROM "class"
    JOIN "species" ON "species".class_id = "class".id
    ORDER BY "species_name" ASC;`;
    
    pool.query(queryText)
    .then((result) => {res.send(result.rows);})
    .catch((err) => {
        console.log('Error completing SELECT movie query', err);
        res.sendStatus(500);
    });
    
});

router.delete('/:id', (req, res) => {
    const queryText = 'DELETE FROM species WHERE id=$1';
    pool.query(queryText, [req.params.id])
      .then(() => { res.sendStatus(200); })
      .catch((err) => {
        console.log('Error completing DELETING animal query', err);
        res.sendStatus(500);
      });
  });

module.exports = router;
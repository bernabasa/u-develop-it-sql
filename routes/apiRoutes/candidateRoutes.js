const express = require('express');
const router = express.Router();
const db = require('../../db/db/connection');
const inputCheck = require('../../utils/inputCheck');

router.get('/api/candidiates', (req, res) => {
    const sql = `SELECT * FROM candidates`;
  
    db.query(sql, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message});
        return;
      }
      res.json({
        message: 'success',
        data: rows
      });
    });
  });

  //GET a single candidate
router.get('/api/candidate/:id', (req, res) => {

    const sql = `SELECT * FROM candidates WHERE id = ?`;
    const params = [req.params.id];
  
    db.query(sql,params, (err, row) => {
      if (err) {
        res.status(400).json({ error:err.message});
        return;
      }
      res.json({
        message: 'success',
        data:row
      });
    });
  });

 
  //Create a candidate
router.post('/api/candidate', ({ body }, res) => {
    const errors = inputCheck(
      body,
      'first_name',
      'last_name',
      'industry_connected'
    );
    if (errors) {
      res.status(400).json({ error: errors });
      return;
    }
  
  const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connectied)
                VALUES (?,?,?,?)`;
  const params = [body.first_name, body.last_name, body.industry_connected];
  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message});
      return;
    }
    res.json({
      message: 'success',
      data: body
    });
  });
  });

  router.delete('api/candidate/:id', (req, res) => {
    const sql = `DELETE FROM candidiates WHERE id = ?`;
    const params = [req.params.id];
  
    db.query(sql, params, (err, result) => {
      if (err) {
        res.statusMessage(400).json ({error: res.message});
      } else if (!result.affectedRows) {
        res.json({
          message: 'Candidate not found'
        });
      } else {
        res.json({
          message: 'deleted',
          changes: result.affectedRows,
          id: req.params.id
        });
      }
    });
  });
  
  module.exports = router;
const express = require('express');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

/* DEFINE GLOBAL VARIABLES */
const router = express.Router();
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;


/* GET TRANSACTIONS */
router.get('/transactions', async function(req, res, next) {
  const supabase = createClient(supabaseUrl, supabaseKey);
  const { data, error } = await supabase
  .from('transactions')
  .select()
  .order('id', { ascending: true })

  if (error) {
    return res.status(401).json({ error: error.message })
  } else {
    return res.status(200).json({ transactions: data })
  }
});

/* CREATE TRANSACTION */
router.post('/transactions/create', async function(req, res, next) {
  const supabase = createClient(supabaseUrl, supabaseKey);
  const { data, error } = await supabase
  .from('transactions')
  .insert([
    { 
      title: req.body.title,
      description: req.body.description,
      amount: req.body.amount,
      fromAccount: req.body.fromAccount,
      toAccount: req.body.toAccount,
      transactionDate: req.body.transactionDate,
    }
  ])

  if (error) {
    return res.status(401).json({ error: error.message })
  } else {
    return res.status(200).json({ transactions: data })
  }
});

/* UPDATE TRANSACTION */
router.put('/transactions/update', async function(req, res, next) {
  const supabase = createClient(supabaseUrl, supabaseKey);
  const { data, error } = await supabase
  .from('transactions')
  .update({
    title: req.body.title,
    description: req.body.description,
    amount: req.body.amount,
    fromAccount: req.body.fromAccount,
    toAccount: req.body.toAccount,
    transactionDate: req.body.transactionDate,
  })
  .eq('id', req.body.id)

  if (error) {
    return res.status(401).json({ error: error.message })
  } else {
    return res.status(200).json({ transactions: data })
  }
});

/* DELETE TRANSACTION */
router.delete('/transactions/delete', async function(req, res, next) {
  const supabase = createClient(supabaseUrl, supabaseKey);
  const { data, error } = await supabase
  .from('transactions')
  .delete()
  .eq('id', req.body.id)

  if (error) {
    return res.status(401).json({ error: error.message })
  } else {
    return res.status(200).json({ transactions: data })
  }
});

module.exports = router;

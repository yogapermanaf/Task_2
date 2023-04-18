const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const db = require('./connection');
const response = require('./response');

app.use(bodyParser.json());

// GET all users
app.get('/users', (req, res) => {
  db.query('SELECT * FROM tb_user', (error, result) => {
    if (error) {
      return response(500, [], error.message, res);
    }

    response(200, result, 'Get all users successfully', res);
  });
});

// GET a user by id
app.get('/users/:id', (req, res) => {
  const id = req.params.id;

  db.query(`SELECT * FROM tb_user WHERE id=${id}`, (error, result) => {
    if (error) {
      return response(500, [], error.message, res);
    }

    if (result.length === 0) {
      return response(404, [], 'User not found', res);
    }

    response(200, result[0], 'Get a user successfully', res);
  });
});

// CREATE a new user
app.post('/users', (req, res) => {
  const { name, email, phone } = req.body;

  db.query(`INSERT INTO tb_user (name, email, phone) VALUES ('${name}', '${email}', '${phone}')`, (error, result) => {
    if (error) {
      return response(500, [], error.message, res);
    }

    response(200, result, 'Create a new user successfully', res);
  });
});

// UPDATE a user by id
app.put('/users/:id', (req, res) => {
  const id = req.params.id;
  const { name, email, phone } = req.body;

  db.query(`UPDATE tb_user SET name='${name}', email='${email}', phone='${phone}' WHERE id=${id}`, (error, result) => {
    if (error) {
      return response(500, [], error.message, res);
    }

    if (result.affectedRows === 0) {
      return response(404, [], 'User not found', res);
    }

    response(200, result, 'Update a user successfully', res);
  });
});

// DELETE a user by id
app.delete('/users/:id', (req, res) => {
  const id = req.params.id;

  db.query(`DELETE FROM tb_user WHERE id=${id}`, (error, result) => {
    if (error) {
      return response(500, [], error.message, res);
    }

    if (result.affectedRows === 0) {
      return response(404, [], 'User not found', res);
    }

    response(200, result, 'Delete a user successfully', res);
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

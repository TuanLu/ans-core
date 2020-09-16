'use strict';

const express = require('express');
const mysql = require('mysql');

let connection = mysql.createConnection({
    host: 'mysqldb',
    user: 'ans_local',
    password: '12345678',
    database: 'ans_local',
    port: '3306'
});

connection.connect(function(err) {
  if (err) {
    return console.error('error: ' + err.message);
  }

  console.log('Connected to the MySQL server.');
});


// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/', async (req, res) => {
  res.send('Hello World - New Things 13');
});

const getUser = async () => {
    return new Promise( async (resolve, reject) => {
      let users = await connection.query('SELECT * FROM users WHERE id=64', (err,rows) => {
          if(err) reject('Can not connect to db');
          resolve(JSON.stringify(rows, null, 2));
      }); 
    }).catch(() =>  'Something wrong!!!');
}

app.get('/get-users', async (req, res) => {
    const users = await getUser();
    res.send(users);
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
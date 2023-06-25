const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const helmet = require('helmet');

app.use(helmet());
app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.urlencoded({ extended: true }));

const con = mysql.createConnection({
  host: '192.168.1.3',
  port: '3306',
  user: 'user1',
  password: 'root',
  database: 'parkingAppDB',
});

const server = app.listen(4547, function () {
  const host = server.address().address;
  const port = server.address().port;
});

con.connect(function (error) {
  if (error) console.log(error);
  else console.log('Connected to DB');
});

app.get('/users', function (req, res) {
  con.query('SELECT * FROM person', function (error, rows, fields) {
    if (error) {
      console.log(error);
      res.sendStatus(500);
    } else {
      console.log(rows);
      res.send(rows);
    }
  });
});

app.get('/usersLogin', function (req, res) {
  con.query('SELECT * FROM users', function (error, rows, fields) {
    if (error) {
      console.log(error);
      res.sendStatus(500);
    } else {
      console.log(rows);
      res.send(rows);
    }
  });
});

app.get('/parkingSpots', function (req, res) {
  con.query('SELECT * FROM parkingSpots', function (error, rows, fields) {
    if (error) {
      console.log(error);
      res.sendStatus(500);
    } else {
      console.log(rows);
      res.send(rows);
    }
  });
});

app.get('/records', function (req, res) {
  con.query('SELECT * FROM records', function (error, rows, fields) {
    if (error) {
      console.log(error);
      res.sendStatus(500);
    } else {
      const recordsWithImages = rows.map((row) => {
        const imageBuffer = row.licenseImage;
        if (imageBuffer) {
          const base64Image = Buffer.from(imageBuffer).toString('base64');
          return {
            ...row,
            licenseImage: base64Image,
          };
        } else {
          return row;
        }
      });

      console.log(recordsWithImages);
      res.send(recordsWithImages);
    }
  });
});

// Update parking spot status
app.put('/parkingSpots/:id', function (req, res) {
  const spotId = req.params.id;
  const { status, occupiedBy } = req.body;

  if (!spotId || !status) {
    return res.sendStatus(400); // Bad request if required fields are missing
  }

  let sql;
  let values;

  if (occupiedBy) {
    // Check if the spot can be occupied
    if (status === 'OCCUPIED') {
      sql = 'UPDATE parkingSpots SET status = ?, occupiedBy = ? WHERE id = ? AND status = "EMPTY" AND occupiedBy IS NULL';
      values = [status, occupiedBy, spotId];
    } else {
      // Check if the current user can empty the spot
      sql = 'UPDATE parkingSpots SET status = ?, occupiedBy = NULL WHERE id = ? AND (occupiedBy = ? OR occupiedBy = "admin")';
      values = [status, spotId, occupiedBy];
    }
  } else {
    // Empty the spot without checking the user
    sql = 'UPDATE parkingSpots SET status = ?, occupiedBy = NULL WHERE id = ?';
    values = [status, spotId];
  }

  con.query(sql, values, function (error, result) {
    if (error) {
      console.log(error);
      res.sendStatus(500);
    } else if (result.affectedRows === 0) {
      // If no rows were affected, it means the spot could not be updated due to invalid conditions
      res.sendStatus(403);
    } else {
      console.log(result);
      res.sendStatus(200);
    }
  });
});

// Update user data
app.put('/users/:id', function (req, res) {
  const userId = req.params.id;
  const { name, email, age, licensePlate } = req.body;

  if (!userId || !name || !email || !age || !licensePlate) {
    return res.sendStatus(400); // Bad request if required fields are missing
  }

  const sql = 'UPDATE person SET name = ?, email = ?, age = ?, licensePlate = ? WHERE id = ?';
  const values = [name, email, age, licensePlate, userId];

  con.query(sql, values, function (error, result) {
    if (error) {
      console.log(error);
      res.sendStatus(500);
    } else if (result.affectedRows === 0) {
      // If no rows were affected, it means the user could not be found
      res.sendStatus(404);
    } else {
      console.log(result);
      res.sendStatus(200);
    }
  });
});

// Error handler middleware
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});

// Not found handler middleware
app.use(function (req, res, next) {
  res.status(404).send('Not Found');
});

// Graceful shutdown
process.on('SIGINT', function () {
  console.log('Shutting down...');
  server.close(function () {
    console.log('Server stopped');
    process.exit(0);
  });
});

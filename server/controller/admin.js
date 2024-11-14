const db = require("../DBconnect");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config.js");

exports.AdminSignup = async (req, res) => {
  const newData = {
    fname: req.body.firstName,
    lname: req.body.secondName,
    dob: req.body.dob,
    email: req.body.email,
    password: req.body.password,
    secret_key: req.body.secretKey,
    phone_no: req?.body?.phone_no,
  };

  // Validate input
  if (!newData.email || !newData.password || !newData.secret_key) {
    return res.status(400).json({ message: "Please provide credentials" });
  }

  // Check if the email already exists
  db.query(
    `SELECT first_name FROM user WHERE email = ?`,
    [newData.email],
    (error, results) => {
      if (error) {
        console.error("Error fetching username: ", error);
        return res
          .status(500)
          .json({ message: "Error fetching username", success: false });
      }

      // Check if email already exists
      if (results.length > 0) {
        return res
          .status(400)
          .json({ message: "Email already in use", success: false });
      }

      // Check if the secret_key exists
      db.query(
        `SELECT taken FROM secret_key WHERE secret_key = ?`,
        [newData.secret_key],
        (error, results) => {
          if (error) {
            console.error("Error fetching secret_key: ", error);
            return res
              .status(500)
              .json({ message: "Error fetching secret_key", success: false });
          }

          if (results.length === 0) {
            return res
              .status(400)
              .json({ message: "Secret_key doesn't exist", success: false });
          }

          console.log("results: ", results);

          // Retrieve the taken status
          const taken = results[0].taken;

          if (taken) {
            return res
              .status(400)
              .json({ message: "Secret key is already taken", success: false });
          }

          // Update the secret_key to taken status
          db.query(
            "UPDATE secret_key SET taken = true WHERE secret_key = ?",
            [newData.secret_key],
            (error, results) => {
              if (error) {
                console.error("Error updating secret key status: ", error);
                return res.status(500).json({
                  message: "Error updating secret key status",
                  success: false,
                });
              }

              // Hash password
              bcrypt.genSalt(10, (err, salt) => {
                if (err) {
                  console.error("Error generating salt: ", err);
                  return res
                    .status(500)
                    .json({ message: "Error generating salt", success: false });
                }

                bcrypt.hash(newData.password, salt, (err, hashedPassword) => {
                  if (err) {
                    console.error("Error hashing password: ", err);
                    return res.status(500).json({
                      message: "Error hashing password",
                      success: false,
                    });
                  }

                  // Insert the new user into the admin table
                  db.query(
                    "INSERT INTO admin (first_name, last_name, dob, email, password, phone_no, secret_key) VALUES (?, ?, ?, ?, ?, ?, ?)",
                    [
                      newData.fname,
                      newData.lname,
                      newData.dob,
                      newData.email,
                      hashedPassword,
                      newData.phone_no,
                      newData.secret_key,
                    ],
                    (error, results) => {
                      if (error) {
                        console.error("Error inserting data: ", error);
                        return res.status(500).json({
                          message: "Error inserting data",
                          success: false,
                        });
                      }

                      // Successfully inserted the user, generate JWT token
                      console.log("results: ", results);
                      const payload = {
                        admin: {
                          id: results?.insertId,
                          secret_key: newData?.secret_key,
                        },
                      };
                      const authToken = jwt.sign(payload, JWT_SECRET);

                      return res
                        .status(201)
                        .json({ authToken: authToken, success: true });
                    }
                  );
                });
              });
            }
          );
        }
      );
    }
  );
};

exports.AdminLogin = async (req, res) => {
  const newData = {
    email: req.body.email,
    password: req.body.password,
    secret_key: req.body.secretKey,
  };

  if (!newData.email || !newData.password || !newData.secret_key) {
    return res
      .status(400)
      .json({ message: "Insufficient credentials to login as admin" });
  }

  // Check if the user exists
  db.query(
    `SELECT admin_id, password, secret_key FROM admin WHERE email = ?`,
    [newData.email],
    async (error, results) => {
      if (error) {
        console.error("Error fetching user: ", error);
        return res
          .status(500)
          .json({ message: "Error fetching user", success: false });
      }

      // Check if any result is returned
      if (results.length === 0) {
        return res
          .status(400)
          .json({ message: "Admin does not exist", success: false });
      }

      // Get the hashed password and secret key from the database
      const hashedPassword = results[0].password;
      const adminId = results[0].admin_id;
      const storedSecretKey = results[0].secret_key;

      // Compare the provided password with the hashed password
      const comparePassword = await bcrypt.compare(
        newData.password,
        hashedPassword
      );
      if (!comparePassword || newData.secret_key !== storedSecretKey) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid credentials" });
      }

      // Generate authentication token
      console.log("results: ", results);
      const payload = {
        admin: {
          id: results[0]?.admin_id,
          secretKey: results[0]?.secret_key,
        },
      };
      console.log("payload: ", payload);
      const authToken = jwt.sign(payload, JWT_SECRET);

      // Respond with the token
      return res.status(200).json({ success: true, authToken: authToken });
    }
  );
};

exports.getRegisteredUsers = async (req, res) => {
  const admin_id = req.admin.id;
  // console.log("owner Id : ",owner_id);

  if (!admin_id) {
    return res.status(400).json({ message: "No User Found" });
  }

  try {
    db.query(`SELECT * FROM user`, (error, results) => {
      if (error) {
        console.error("Database error:", error);
        return res
          .status(500)
          .json({ message: "Database error", error, success: false });
      }

      if (results.length === 0) {
        return res
          .status(404)
          .json({ message: "No user found", success: false });
      }

      return res.status(200).json({
        message: "User data fetched successfully",
        data: results,
        success: true,
      });
    });
  } catch (err) {
    console.error("Unexpected error:", err);
    return res
      .status(500)
      .json({ message: "Unexpected error", error: err, success: false });
  }
};

exports.getEmptySlots = async (req, res) => {
  const admin_id = req.admin.id;
  // console.log("owner Id : ",owner_id);

  if (!admin_id) {
    return res.status(400).json({ message: "No Slot Found" });
  }

  try {
    db.query(
      `SELECT * FROM parking_slot WHERE isEmpty = ?`,
      [true],
      (error, results) => {
        if (error) {
          console.error("Database error:", error);
          return res
            .status(500)
            .json({ message: "Database error", error, success: false });
        }

        if (results.length === 0) {
          return res
            .status(404)
            .json({ message: "No slot found", success: false });
        }

        return res.status(200).json({
          message: "empty slots fetched successfully",
          data: results,
          success: true,
        });
      }
    );
  } catch (err) {
    console.error("Unexpected error:", err);
    return res
      .status(500)
      .json({ message: "Unexpected error", error: err, success: false });
  }
};

exports.getOccupiedSlots = async (req, res) => {
  const admin_id = req.admin.id;

  if (!admin_id) {
    return res.status(400).json({ message: "No Slot Found" });
  }

  try {
    db.query(
      `
      SELECT ps.slot_no, ps.parking_id, ps.location, ps.length, ps.width, ps.height, ps.isEmpty, u.user_id, CONCAT (u.first_name, ' ', u.last_name) AS user_name
      FROM 
          parking_slot ps
      JOIN 
          parking p ON ps.parking_id = p.parking_id
      JOIN 
          car c ON p.car_id = c.car_id
      JOIN 
          user u ON c.car_owner = u.user_id
      WHERE 
          ps.isEmpty = 0`,
      (error, results) => {
        // db.query(`SELECT * FROM parking_slot WHERE isEmpty = ?`,[false], (error, results) => {
        if (error) {
          console.error("Database error:", error);
          return res
            .status(500)
            .json({ message: "Database error", error, success: false });
        }

        if (results.length === 0) {
          return res
            .status(404)
            .json({ message: "No slot found", success: false });
        }

        return res.status(200).json({
          message: "occupied slots fetched successfully",
          data: results,
          success: true,
        });
      }
    );
  } catch (err) {
    console.error("Unexpected error:", err);
    return res
      .status(500)
      .json({ message: "Unexpected error", error: err, success: false });
  }
};



exports.createSlot = async (req, res) => {
  const admin_id = req.admin.id;
  // console.log("owner Id : ",owner_id);

  if (!admin_id) {
    return res.status(400).json({ message: "No Slot Found" });
  }

  try {
    db.query(
      `INSERT INTO parking_slot()`,
      [true],
      (error, results) => {
        if (error) {
          console.error("Database error:", error);
          return res
            .status(500)
            .json({ message: "Database error", error, success: false });
        }

        if (results.length === 0) {
          return res
            .status(404)
            .json({ message: "No slot found", success: false });
        }

        return res.status(200).json({
          message: "empty slots fetched successfully",
          data: results,
          success: true,
        });
      }
    );
  } catch (err) {
    console.error("Unexpected error:", err);
    return res
      .status(500)
      .json({ message: "Unexpected error", error: err, success: false });
  }
};

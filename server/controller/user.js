const db = require("../DBconnect");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config.js');

exports.signUp = async (req, res) => {
    const newData = {
        fname: req.body.firstName,
        lname: req.body.secondName,
        dob: req.body.dob,
        email: req.body.email,
        password: req.body.password
    };

    if (!newData.email || !newData.password) {
        return res.status(400).json({ message: 'Name and email are required' });
    }

    // Check if the email already exists
    db.query(
        `SELECT first_name FROM user WHERE email = ?`,
        [newData.email],
        async (error, results) => {
            if (error) {
                console.error('Error fetching username: ', error);
                return res.status(500).json({ message: 'Error fetching username', success: false });
            }

            // Check if any result is returned
            if (results.length > 0) {
                return res.status(400).json({ message: 'Email already in use', success: false });
            }

            //hash password
            const salt = await bcrypt.genSalt(10);
            const seqPass = await bcrypt.hash(req.body.password, salt);


            // If the email is not in use, proceed to insert the new user
            db.query(
                'INSERT INTO user (first_name, last_name, dob, email, password) VALUES (?, ?, ?, ?, ?)',
                [newData.fname, newData.lname, newData.dob, newData.email, seqPass],
                (error, results) => {
                    if (error) {
                        console.error('Error inserting data: ', error);
                        return res.status(500).json({ message: 'Error inserting data', success: false });
                    }
                    // Use results.insertId instead of results.user_id
                    const payload = {
                        user: {
                            id: results.insertId
                        }
                    }
                    const authToken = jwt.sign(payload, JWT_SECRET);
                    success = true;
                    return res.status(201).json({ authToken: authToken, success: true });
                }
            );
        }
    );
};

exports.login = async (req, res) => {
    const newData = {
        email: req.body.email,
        password: req.body.password
    };

    if (!newData.email || !newData.password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    // Check if the user exists
    db.query(
        `SELECT user_id, password FROM user WHERE email = ?`,
        [newData.email],
        async (error, results) => {
            if (error) {
                console.error('Error fetching user: ', error);
                return res.status(500).json({ message: 'Error fetching user', success: false });
            }

            // Check if any result is returned
            if (results.length === 0) {
                return res.status(400).json({ message: 'User does not exist', success: false });
            }

            // Get the hashed password from the database
            const hashedPassword = results[0].password;
            const userId = results[0].user_id;
            // console.log("results : ",userId);

            // Compare the provided password with the hashed password
            const comparePassword = await bcrypt.compare(newData.password, hashedPassword);
            if (!comparePassword) {
                return res.status(400).json({ success: false, message: 'Invalid credentials' });
            }

            // Generate authentication token
            const payload = {
                user: {
                    id: results[0].user_id
                }
            };
            const authToken = jwt.sign(payload, JWT_SECRET);
            res.status(200).json({ success: true, authToken: authToken });
        }
    );
};

exports.addCar = async (req, res) => {
    const newData = {
        carName: req.body.name,
        // carModel: req.body.carModel,
        carNumber: req.body.carNumber,
        carOwner: req.user.id,
        length: 3,
        width: 3,
        height: 3,
    };

    console.log({ req: req.user });

    if (!newData.carNumber) {
        return res.status(400).json({ message: 'Car number and model are required' });
    }

    // Check if the email already exists
    db.query(
        `SELECT car_number FROM car WHERE car_number = ?`,
        [newData.carNumber],
        async (error, results) => {
            if (error) {
                console.error('Error fetching carNumber: ', error);
                return res.status(500).json({ message: 'Error fetching carNumber', success: false });
            }

            // Check if any result is returned
            if (results.length > 0) {
                return res.status(400).json({ message: 'Car already registered', success: false });
            }


            // If the car is not in use, proceed to insert the new car
            db.query(
                'INSERT INTO car (car_name, car_owner, car_number,  length, width, height) VALUES (?, ?, ?, ?, ?, ?)',
                [newData?.carName, newData?.carOwner, newData?.carNumber, newData.length, newData.width, newData.height],
                (error, results) => {
                    if (error) {
                        console.error('Error inserting data: ', error);
                        return res.status(500).json({ message: 'Error inserting data', success: false });
                    }

                    return res.status(201).json({ message: "Car added successfully", success: true });
                }
            );
        }
    );
};

exports.get_parking_slot = async (req, res) => {
    const location = req.body.location;
    if (!location) {
        return res.status(400).json({ message: 'No Location Found' });
    }

    try {
        db.query(
            `SELECT * FROM parking_slot WHERE location = ?`,
            [location],
            (error, results) => {
                if (error) {
                    console.error("Database error:", error);
                    return res.status(500).json({ message: 'Database error', error, success: false });
                }

                if (results.length === 0) {
                    return res.status(404).json({ message: 'No parking slots found for the specified location', success: false });
                }

                return res.status(200).json({ message: 'Parking slots retrieved successfully', data: results, success: true });
            }
        );
    } catch (err) {
        console.error("Unexpected error:", err);
        return res.status(500).json({ message: 'Unexpected error', error: err, success: false });
    }
};

exports.get_cars = async (req, res) => {
    const owner_id = req.user.id;
    // console.log("owner Id : ",owner_id);

    if (!owner_id) {
        return res.status(400).json({ message: 'No Cars Found' });
    }

    try {
        db.query(
            `SELECT * FROM car WHERE car_owner = ?`,
            [owner_id],
            (error, results) => {
                if (error) {
                    console.error("Database error:", error);
                    return res.status(500).json({ message: 'Database error', error, success: false });
                }

                if (results.length === 0) {
                    return res.status(404).json({ message: 'No Cars for User', success: false });
                }

                return res.status(200).json({ message: 'Cars retrieved successfully', data: results, success: true });
            }
        );
    } catch (err) {
        console.error("Unexpected error:", err);
        return res.status(500).json({ message: 'Unexpected error', error: err, success: false });
    }
};

exports.bookSlot = async (req, res) => {
    const { car_id, fromTime, toTime, isEmpty, parking_id } = req.body;

    if (!car_id || !fromTime || !toTime) {
        return res.status(400).json({ message: 'Details Not Found' });
    }
    if (!parking_id) {
        return res.status(400).json({ message: 'No Parking Id Found' });
    }

    try {
        db.query(
            `INSERT INTO parking (car_id,parking_id,p_from,p_to)
             Values(?,?,?,?)`,
            [car_id, parking_id, fromTime, toTime],
            (error, result) => {
                if (error) {
                    // console.error("Database error:", error);
                    return res.status(500).json({ message: 'Slot Not Booked', error, success: false });
                }

                db.query(
                    `UPDATE parking_slot
                        SET isEmpty = ?
                        WHERE parking_id = ?`,
                    [!isEmpty, parking_id],
                    (error, result) => {
                        if (error) {
                            console.error("Database error:", error);
                            return res.status(500).json({ message: 'Database error', error, success: false });
                        }

                        return res.status(200).json({ message: 'Parking slots Updated and Booked successfully', success: true });
                    }
                );
            },
        );
    } catch (err) {
        console.error("Unexpected error:", err);
        return res.status(500).json({ message: 'Unexpected error', error: err, success: false });
    }
}

exports.getUserDetails = async (req, res) => {
    const id = req.user.id;
    if (!id) {
        return res.status(400).json({ message: 'No Id Found' });
    }

    try {
        db.query(
            `SELECT * FROM user WHERE user_id = ?`, [id],
            (error, results) => {
                if (error) {
                    return res.status(500).json({ message: 'User Details Not Fetched', error, success: false });
                }
                return res.status(200).json({ message: 'User Details fetched successfully', data: results, success: true });
            },
        );
    } catch (err) {
        console.error("Unexpected error:", err);
        return res.status(500).json({ message: 'Unexpected error', error: err, success: false });
    }
}

exports.updateUser = async (req, res) => {
    const id = req.user.id;
    const { first_name, last_name, dob, email, phone_no } = req.body;
    if (!id || !first_name || !last_name || !dob || !email || !phone_no) {
        return res.status(400).json({ message: 'Details Not Found' });
    }

    try {
        db.query(
            `UPDATE user SET first_name = ?, last_name = ?, email = ?, dob = ?, phone_no = ? WHERE user_id = ?`,
            [first_name, last_name, email, dob, phone_no, id],
            (error, results) => {
                if (error) {
                    return res.status(500).json({ message: 'User Details Not Update', error, success: false });
                }
                return res.status(200).json({ message: 'User Details Updated successfully', success: true });
            },
        );
    } catch (err) {
        console.error("Unexpected error:", err);
        return res.status(500).json({ message: 'Updation error', error: err, success: false });
    }
}


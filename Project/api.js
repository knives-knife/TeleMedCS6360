const client = require('./connection.js')
const express = require('express');
var cors = require('cors')
const bodyParser = require('body-parser');
const app = express();

app.use(cors());
app.listen(3300, () => {
    console.log("API Output");
    console.log('Server is listening at port 3300\n');
    console.log("Keep this open as long as the front end is being used\n\n")
})
client.connect();
app.use(bodyParser.json());

// get all the users 
app.get('/admins', (req, res) => {
    client.query('Select * from admins', (err, result) => {
        if (!err) {
            res.json(result.rows);
        }
    });
    //client.end;
})
//client.connect();

// Get user by ID 
app.get('/admins/:admin_id', (req, res) => {
    client.query(`Select username, pass from admins where admin_id=${req.params.admin_id}`, (err, result) => {
        if (!err) {
            res.json({ data: result.rows });
        }
    });
    client.end;
})
//client.connect();

// Add new User
app.post('/addPatient', (req, res) => {
    const user = req.body;
    let insertQuery = `insert into Patient(id, firstname, lastname, location) 
                       values(${user.id}, '${user.firstname}', '${user.lastname}', '${user.location}')`

    client.query(insertQuery, (err, result) => {
        if (!err) {
            res.send('Insertion was successful')
        }
        else { console.log(err.message) }
    })
    client.end;
})

app.post('/admins', (req, res) => {
    const user = req.body;
    // console.log(req);
    // console.log(user);
    // console.log("password:", user.pass)
    // console.log("username:", user.username)
    // console.log('user', user)
    // check with db if creds match
    client.query(`Select admin_id from admins where username='${user.username}' and pass='${user.pass}'`, (err, result) => {
        // console.log("result:", result);
        if (!err && result !== undefined) {
            if (result.rowCount > 0) {
                res.json({ message: "Authenticated", data: result.rows[0] });
            }
            // res.json({data: result.rows});
            else {
                res.json({ message: "Not Authenticated", data: { admin_id: -1 } })
            }
        }
        else {
            res.json({ message: "Error", data: { admin_id: -2 } })
        }
    });
    //client.end;


    // res.json({mesage: 'authenticated', data: {}})
    client.end;
})

// http://localhost:3000/auth
/*app.post('/admins', function(request, response) {
    // Capture the input fields
    let username = request.body.username;
    let password = request.body.password;
    // Ensure the input fields exists and are not empty
    console.log(`username ${username}, pass${password}`)
    if (username && password) {
        
        // Execute SQL query that'll select the account from the database based on the specified username and password
        connection.query('SELECT username,pass FROM admins WHERE username = ? AND pass = ?', [username, password], function(error, results, fields) {
            // If there is an issue with the query, output the error
            if (error) throw error;
            // If the account exists
            if (results.length > 0) {
                // Authenticate the user
                request.session.loggedin = true;
                request.session.username = username;
                // Redirect to home page
                response.redirect('admin/index.html');
            } else {
                response.send('Incorrect Username and/or Password!');
            }			
            response.end();
        });
    } else {
        response.send('Please enter Username and Password!');
        response.end();
    }
});
*/
// //update user details
// app.put('/users/:id', (req, res) => {
//     let user = req.body;
//     let updateQuery = `update users
//                        set firstname = '${user.firstname}',
//                        lastname = '${user.lastname}',
//                        location = '${user.location}'
//                        where id = ${user.id}`

//     client.query(updateQuery, (err, result) => {
//         if (!err) {
//             res.send('Update was successful')
//         }
//         else { console.log(err.message) }
//     })
//     client.end;
// })


// Delete a User
app.delete('/users/:id', (req, res) => {
    let insertQuery = `delete from users where id=${req.params.id}`

    client.query(insertQuery, (err, result) => {
        if (!err) {
            res.send('Deletion was successful')
        }
        else { console.log(err.message) }
    })
    client.end;
})

app.post('/admin/SavePatient', (req, res) => {
    var patient = {
        PatientId: 0,
        FName: "",
        MName: "",
        LName: "",
        Gender: "",
        DateOfBirth: Date.now,
        PhoneNumber: "",
        Address: "",
        Username: "",
        Password: "",
    }
    patient = req.body;

    // Add Patient
    if (patient.PatientId <= 0) {
        let addQuery = `insert into Patient 
                        (
                            first_name, 
                            middle_name, 
                            last_name, 
                            gender, 
                            date_of_birth, 
                            phone_number, 
                            address, 
                            username, 
                            pass
                        ) 
                        values
                        (
                            '${patient.FName}',
                            '${patient.MName}',
                            '${patient.LName}',
                            '${patient.Gender}',
                            '${patient.DateOfBirth}',
                            '${patient.PhoneNumber}',
                            '${patient.Address}',
                            '${patient.Username}',
                            '${patient.Password}'
                        );`;
        console.log(patient);
        console.log(addQuery);
        client.query(addQuery, (err, result) => {
            if (!err) {
                res.json({ Code: "SUCCESS", Message: "Patient was created successfully!" });
            }
            else {
                res.json({ Code: "ERROR", Message: err.message });
            }
        });
    }
    // Save Patient
    else {
        let updateQuery = `update Patient 
                            set 
                                first_name = '${patient.FName}',
                                middle_name = '${patient.MName}'}',
                                last_name = '${patient.LName}',
                                gender = '${patient.Gender}',
                                date_of_birth = '${patient.DateOfBirth}',
                                phone_number = '${patient.PhoneNumber}',
                                address = '${patient.Address}',
                                username = '${patient.Username}',
                                pass = '${patient.Password}'
                            where patient_id = '${patient.PatientId}'`;
        client.query(updateQuery, (err, result) => {
            if (!err) {
                res.json({ Code: "SUCCESS", Message: "Patient successfully updated!" });
            }
            else {
                res.json({ Code: "ERROR", Message: err.message });
            }
        })
    }
    client.end;
})
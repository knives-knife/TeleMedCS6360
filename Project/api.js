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










app.post('/admins', (req, res) => {
    const user = req.body;
    // check with db if creds match
    client.query(`Select admin_id from admins where username='${user.username}' and pass='${user.pass}'`, (err, result) => {
        if (!err && result !== undefined) {
            if (result.rowCount > 0) {
                res.json({ Code: "Authenticated", data: result.rows[0], Message: "Logged in successfully!" });
            }
            else {
                res.json({ Code: "Not Authenticated", data: { admin_id: -1 }, Message: "Login failed!"  });
            }
        }
        else {
            res.json({ Code: "Error", data: { admin_id: -2 }, Message: err.message });
        }
    });
    //client.end;


    // res.json({mesage: 'authenticated', data: {}})
    client.end;
});

app.get('/admin/GetPatients', (req, res) => {
    client.query('Select * from Patient', (err, result) => {
        if (!err)
        {
            res.json( {Code: "SUCCESS", data: result.rows, Message: "Patients successfully retrieved!"});
        }
        else {
            res.json({ Code: "ERROR", Message: err.message });
        }
    })
});

app.post('/admin/GetPatientById', (req, res) => {
    client.query(`Select * from Patient where patient_id = '${req.body.patient_id}' limit 1`, (err, result) => {
        if (!err)
        {
            res.json( {Code: "SUCCESS", data:result.rows[0], Message: "Patient successfully retrieved"})
        }
        else
        {
            res.json({ Code: "ERROR", Message: err.message });
        }
    })
});

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
                                middle_name = '${patient.MName}',
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
});


// -------------Doctor--------------------------------------
app.get('/admin/GetDoctors', (req, res) => {
    client.query('Select * from doctor', (err, result) => {
        if (!err)
        {
            res.json( {Code: "SUCCESS", data: result.rows, Message: "Doctor successfully retrieved!"});
        }
        else {
            res.json({ Code: "ERROR", Message: err.message });
        }
    })
});

app.post('/admin/GetDoctorById', (req, res) => {
    client.query(`Select * from doctor where doctor_id = '${req.body.doctor_id}' limit 1`, (err, result) => {
        if (!err)
        {
            res.json( {Code: "SUCCESS", data:result.rows[0], Message: "doctor successfully retrieved"})
        }
        else
        {
            res.json({ Code: "ERROR", Message: err.message });
        }
    })
});

app.post('/admin/SaveDoctor', (req, res) => {
    var doctor = {
        doctorId: 0,
        FName: "",
        MName: "",
        LName: "",
        DateOfBirth: Date.now,
        PhoneNumber: "",
        Address: "",
        Username: "",
        Password: "",
    }
    doctor = req.body;

    // Add doctor
    if (doctor.doctorId <= 0) {
        let addQuery = `insert into doctor 
                        (
                            first_name, 
                            middle_name, 
                            last_name,  
                            date_of_birth, 
                            phone_number, 
                            address, 
                            username, 
                            pass
                        ) 
                        values
                        (
                            '${doctor.FName}',
                            '${doctor.MName}',
                            '${doctor.LName}',
                            '${doctor.DateOfBirth}',
                            '${doctor.PhoneNumber}',
                            '${doctor.Address}',
                            '${doctor.Username}',
                            '${doctor.Password}'
                        );`;
                        
        client.query(addQuery, (err, result) => {
            if (!err) {
                res.json({ Code: "SUCCESS", Message: "doctor was created successfully!" });
            }
            else {
                res.json({ Code: "ERROR", Message: err.message });
            }
        });
    }
    // Save doctor
    else {
        let updateQuery = `update doctor 
                            set 
                                first_name = '${doctor.FName}',
                                middle_name = '${doctor.MName}',
                                last_name = '${doctor.LName}',
                                date_of_birth = '${doctor.DateOfBirth}',
                                phone_number = '${doctor.PhoneNumber}',
                                address = '${doctor.Address}',
                                username = '${doctor.Username}',
                                pass = '${doctor.Password}'
                            where doctor_id = '${doctor.doctorId}'`;
        client.query(updateQuery, (err, result) => {
            if (!err) {
                res.json({ Code: "SUCCESS", Message: "doctor successfully updated!" });
            }
            else {
                res.json({ Code: "ERROR", Message: err.message });
            }
        })
    }
    client.end;
});

app.get('/admin/GetServices', (req, res) => {
    client.query('Select * from services', (err, result) => {
        if (!err)
        {
            res.json( {Code: "SUCCESS", data: result.rows, Message: "Services successfully retrieved!"});
        }
        else {
            res.json({ Code: "ERROR", Message: err.message });
        }
    })
});

app.post('/admin/SaveAppointment', (req, res) => {
    
    var appointment = {
        AppointmentId: 0,
        PatientId: 0,
        DoctorId: 0, 
        ServiceId: 0,
        Date: Date.now,
        Status: ""
    }
    appointment = req.body;

    let addQuery = `insert into appointment 
                    (
                        datetime, 
                        status, 
                        meeting_link, 
                        patient_id, 
                        doctor_id, 
                        service_id
                    ) 
                    values
                    (
                        '${appointment.Date}',
                        '${appointment.Status}',
                        'https://telemed.domain/link',
                        '${appointment.PatientId}',
                        '${appointment.DoctorId}',
                        '${appointment.ServiceId}'
                    );`;
                    
    client.query(addQuery, (err, result) => {
        if (!err) {
            res.json({ Code: "SUCCESS", Message: "Appointment was created successfully!" });
        }
        else {
            res.json({ Code: "ERROR", Message: err.message });
        }
    });
    client.end;
});
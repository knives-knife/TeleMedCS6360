const { json } = require("body-parser");
const { resolvePtr } = require("dns");

function getBasePath(path, depth) {
    let base = path;
    for (let i = 0; i < depth; i++) {
        base = base.substring(0, base.lastIndexOf("/"));
    }
    return base + "/";
}

async function getPatients() {
    let options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    let resp = await fetch('http://localhost:3300/admin/GetPatients', options);
    resp = await resp.json();
    return resp;
}

async function getPatientById(id) {
    console.log(id);
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ patient_id: id })
    }

    let resp = await fetch('http://localhost:3300/admin/GetPatientById', options);
    resp = await resp.json();

    return resp;
}

async function savePatient(e) {
    let resp = undefined;

    e.preventDefault();

    let id = "0";
    if (parent.document.URL.indexOf('=') > -1) {
        id = parent.document.URL.substring(parent.document.URL.indexOf('=') + 1, parent.document.URL.length);
    }

    var patient = {
        PatientId: id,
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

    let vals = [...e.target.elements];
    vals.forEach(x => {
        if (x.localName !== "button" && (x.value == "" || x.value === undefined || x.value == null)) {
            resp = { Code: "INVALID", Message: x.name + " is invalid" };
        }
        if (patient[x.name] !== undefined || patient[x.name] != null) {
            patient[x.name] = x.value;
        }
    });

    let basePath = getBasePath(window.location.pathname, 2);
    if (resp === undefined) {
        patient.Gender = patient.Gender.substring(0, 1);

        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(patient)
        }
        resp = await fetch('http://localhost:3300/admin/SavePatient', options)
        resp = await resp.json();

    }
    // Query ran successfully
    if (resp.Code === "SUCCESS") {
        alert(resp.Message);
        window.location.href = basePath + 'admin/patient.html'
    }
    // Invalid Input
    else if (resp.Code == "INVALID") {
        alert(resp.Message);
    }
    // Error
    else {
        alert("ERROR: " + resp.Message);
    }

}

async function getServices() {
    let options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    let resp = await fetch('http://localhost:3300/admin/GetServices', options);
    resp = await resp.json();
    return resp;
}


async function saveAppointment(e) {
    let resp = undefined;

    e.preventDefault();

    let id = "0";
    if (parent.document.URL.indexOf('=') > -1) {
        id = parent.document.URL.substring(parent.document.URL.indexOf('=') + 1, parent.document.URL.length);
    }

    var appointment = {
        AppointmentId: 0,
        PatientId: 0,
        DoctorId: 0, 
        ServiceId: 0,
        Date: Date.now,
        Status: ""
    }

    let vals = [...e.target.elements];
    vals.forEach(x => {
        if (x.localName !== "button" && (x.value == "" || x.value === undefined || x.value == null)) {
            resp = { Code: "INVALID", Message: x.name + " is invalid" };
        }
        if (appointment[x.name] !== undefined || appointment[x.name] != null) {
            appointment[x.name] = x.value;
        }
    });


    let basePath = getBasePath(window.location.pathname, 2);
    if (resp === undefined) {

        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(appointment)
        }
        resp = await fetch('http://localhost:3300/admin/SaveAppointment', options)
        resp = await resp.json();

    }
    // Query ran successfully
    if (resp.Code === "SUCCESS") {
        alert(resp.Message);
        window.location.href = basePath + 'admin/index.html'
    }
    // Invalid Input
    else if (resp.Code == "INVALID") {
        alert(resp.Message);
    }
    // Error
    else {
        alert("ERROR: " + resp.Message);
    }

}


//-------------------DOctor-------------------------

function getBasePath(path, depth) {
    let base = path;
    for (let i = 0; i < depth; i++) {
        base = base.substring(0, base.lastIndexOf("/"));
    }
    return base + "/";
}

async function getDoctors() {
    let options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    let resp = await fetch('http://localhost:3300/admin/GetDoctors', options);
    resp = await resp.json();
    return resp;
}

async function getDoctorById(id) {
    console.log(id);
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ doctor_id: id })
    }

    let resp = await fetch('http://localhost:3300/admin/GetDoctorById', options);
    resp = await resp.json();

    return resp;
}

async function saveDoctor(e) {
    let resp = undefined;

    e.preventDefault();

    let id = "0";
    if (parent.document.URL.indexOf('=') > -1) {
        id = parent.document.URL.substring(parent.document.URL.indexOf('=') + 1, parent.document.URL.length);
    }

    var doctor = {
        doctorId: id,
        FName: "",
        MName: "",
        LName: "",
        DateOfBirth: Date.now,
        PhoneNumber: "",
        Address: "",
        Username: "",
        Password: "",
    }

    let vals = [...e.target.elements];
    vals.forEach(x => {
        if (x.localName !== "button" && (x.value == "" || x.value === undefined || x.value == null)) {
            resp = { Code: "INVALID", Message: x.name + " is invalid" };
        }
        if (doctor[x.name] !== undefined || doctor[x.name] != null) {
            doctor[x.name] = x.value;
        }
    });

    let basePath = getBasePath(window.location.pathname, 2);
    if (resp === undefined) {
       // doctor.Gender = doctor.Gender.substring(0, 1);

        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(doctor)
        }
        resp = await fetch('http://localhost:3300/admin/SaveDoctor', options)
        resp = await resp.json();

    }
    // Query ran successfully
    if (resp.Code === "SUCCESS") {
        alert(resp.Message);
        window.location.href = basePath + 'admin/doctor.html'
    }
    // Invalid Input
    else if (resp.Code == "INVALID") {
        alert(resp.Message);
    }
    // Error
    else {
        alert("ERROR: " + resp.Message);
    }

}

asyn

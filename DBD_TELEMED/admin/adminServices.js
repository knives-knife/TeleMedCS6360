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

async function addPatient(e) {
    e.preventDefault();

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

    let vals = [...e.target.elements];
    vals.forEach(x => {
        if (patient[x.name] !== undefined || patient[x.name] != null) {
            patient[x.name] = x.value;
        }
    })

    patient.Gender = patient.Gender.substring(0, 1);

    let basePath = getBasePath(window.location.pathname, 2);

    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(patient)
    }
    let resp = await fetch('http://localhost:3300/admin/SavePatient', options)
    resp = await resp.json();

    // Authenticated
    if (resp.Code === "SUCCESS") {
        alert(resp.Message);
        window.location.href = basePath + 'admin/patient.html'
    }
    // Error
    else {
        alert("ERROR: " + resp.Message);
    }
}

async function savePatient(e) {
    let resp = undefined;

    e.preventDefault();

    let id = parent.document.URL.substring(parent.document.URL.indexOf('=') + 1, parent.document.URL.length);

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
    else if (resp.Code == "INVALID")
    {
        alert(resp.Message);
    }
    // Error
    else {
        alert("ERROR: " + resp.Message);
    }

}

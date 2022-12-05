function getBasePath(path, depth) {
    let base = path;
    for (let i = 0; i < depth; i++)
    {
        base = base.substring(0, base.lastIndexOf("/"));
    }
    return base + "/";
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
        console.log(x);
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
        window.location.href = basePath + '/admin/index.html'
    }
    // Error
    else {
        alert("ERROR: " + resp.Message);
    }
}

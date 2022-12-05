
async function addPatient(e) {
    e.preventDefault();
    console.log(e);
    // console.log(document);
    // let form = document.getElementById('quickForm');
    // console.log(form);
    // const fullName = document.getElementById('lname');
    // console.log(fullName);

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

    console.log(patient);

    let vals = [...e.target.elements];
    vals.forEach(x => {
        console.log(x);
        if (patient[x.name] !== undefined || patient[x.name] != null) {
            patient[x.name] = x.value;
        }
    })

    patient.Gender = patient.Gender.substring(0, 1);

    console.log(patient);

    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(patient)
    }
    console.log(options);
    let resp = await fetch('http://localhost:3300/admin/SavePatient', options)
    resp = await resp.json();

    console.log(resp);
    console.log(resp.data);

    // Authenticated
    if (resp.Code === "SUCCESS") {
        alert(resp.Message);
        // window.location.href = 'C:/Users/joahp/Desktop/DBD_TELEMED/admin/index.html'
    }
    // Error
    else {
        alert("ERROR: " + resp.Message);
    }

    // alert('Message is :' + resp);
    //window.location.href = 'C:/Users/sudob/Desktop/DBD_TELEMED/register.html'
}

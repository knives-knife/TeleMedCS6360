async function getDataById(id){
    let data = await fetch('http://localhost:3300/admins/'+id);
    data = await data.json();
    console.log('res', data.data[0].first_name);
    document.getElementById('username').innerText = "Hello, "+ data.data[0].first_name;
}

async function getFormData(e){
    e.preventDefault();

    let username = document.getElementById('username_ip').value;
    let pass = document.getElementById('password_ip').value;

    let basePath = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/')+1);

    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            pass: pass
        })
    }
    let resp = await fetch('http://localhost:3300/admins', options)
    resp = await resp.json();

    // Authenticated
    if (resp.data.admin_id > 0)
    {
        window.location.href = basePath + 'admin/index.html'
    }
    // Not Authenticated
    else if (resp.data.admin_id == -1)
    {
        alert("Incorrect username and/or password");
    }
    // Error
    else
    {
        alert("ERROR")
    }
}
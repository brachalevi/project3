
function checkUser() {
    console.log("in checkUser")
    const password = document.getElementById("loginPassword").value;
    const pwRegex = /^(?=.*[a-x])(?=.*\d).{8,}$/;
    const name = document.getElementById("loginName").value;
    // const nameRegex = 
    if (!pwRegex.test(password)) {
        document.getElementById("loginError").innerHTML = "not a valid password or name"
        return;
    }

    const myFAJAX = new FAJAX();
    myFAJAX.onload = function () {
        currentUser = this.data;
        // localStorage.setItem("currentUser", JSON.stringify(currentUser));
        loadPage('contactsPage');
    };

    // Simulate making a request
    // myFAJAX.open('POST', `users/user/register`, JSON.stringify({name: name, password: password}));
    myFAJAX.open('GET', `users/user/login/name=${name}+password=${password}`);
    myFAJAX.send()

    // const users = getUsers().users;
    // const user = users.filter(user => user.name === name)[0];
    // localStorage.setItem('currentUser', user);
    // currentUser = user;
    // if (user === undefined || user.password !== password) {
    //     document.getElementById("loginError").innerHTML = "not a valid password or name"
    //     return;
    // }
    
    // localStorage.setItem("currentUser", JSON.stringify(user));
    // loadPage('contactsPage');
}

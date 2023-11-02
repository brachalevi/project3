const register = () => {
    const password = document.getElementById("registerPassword").value;
    const pwRegex = /^(?=.*[a-x])(?=.*\d).{8,}$/;
    if (!pwRegex.test(password)) {
        document.getElementById("registerError").innerHTML = "not a valid password"
        return;
    }
    // const users = getUsers().users;
    const name = document.getElementById("registerName").value;
    // let user = users.filter(user => user.name === name)[0];
    // if (user) {
    //     document.getElementById("registerError").innerHTML = "the name user alredy exist"
    //     return;
    // }

    const myFAJAX = new FAJAX();
    myFAJAX.onload = function () {
        currentUser = this.data;
        // localStorage.setItem("currentUser", JSON.stringify(currentUser));
        loadPage('contactsPage');
    };

    // Simulate making a request
    // myFAJAX.open('POST', `users/user/register`, JSON.stringify({name: name, password: password}));
    myFAJAX.open('POST', `users/user/name=${name}+password=${password}`);
    myFAJAX.send();

    // user = addUser(name, password);
    // localStorage.setItem("currentUser", JSON.stringify(currentUser));
    // loadPage('contactsPage');
}
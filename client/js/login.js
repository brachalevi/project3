
function checkUser() {
    const password = document.getElementById("loginPassword").value;
    const pwRegex = /^(?=.*[a-x])(?=.*\d).{8,}$/;
    // const nameRegex = 
    if (!pwRegex.test(password)) {
        document.getElementById("loginError").innerHTML = "not a valid password or name"
        return;
    }
    const users = getUsers().users;
    const name = document.getElementById("loginName").value;
    const user = users.filter(user => user.name === name)[0];
    localStorage.setItem('currentUser', user);
    if (user === undefined || user.password !== password) {
        document.getElementById("loginError").innerHTML = "not a valid password or name"
        return;
    }
    localStorage.setItem("curentUser", JSON.stringify(user));
    loadPage('contactsPage');
}

function checkUser() {
    const password = document.getElementById("loginPassword").value;
    const pwRegex = /^(?=.*[a-x])(?=.*\d).{8,}$/;
    if (!pwRegex.test(password)) {
        document.getElementById("loginError").innerHTML = "not a valid password or name"
        return;
    }
    const users = getUsers().users;
    const name = document.getElementById("loginName").value;
    const user = users.filter(user => user.name === name)[0];
    if (user === undefined || user.password !== password) {
        document.getElementById("loginError").innerHTML = "not a valid password or name"
        return;
    }
    loadPage('contactsPage');
}

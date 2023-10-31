const register = () => {
    const password = document.getElementById("registerPassword").value;
    const pwRegex = /^(?=.*[a-x])(?=.*\d).{8,}$/;
    if (!pwRegex.test(password)) {
        document.getElementById("registerError").innerHTML = "not a valid password"
        return;
    }
    const users = getUsers().users;
    const name = document.getElementById("registerName").value;
    const user = users.filter(user => user.name === name)[0];
    if (user) {
        document.getElementById("registerError").innerHTML = "the name user alredy exist"
        return;
    }
    addUser(name, password);
    localStorage.setItem("curentUser", JSON.stringify(user));
    loadPage('contactsPage');
}
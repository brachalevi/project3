// document.getElementById("loginButton").addEventListener('click', checkUser);
function checkUser() {
    const password = document.getElementById("loginPassword").value;
    const pwRegex = /^(?=.*[a-x])(?=.*\d).{8,}$/;
    if (!pwRegex.test(password)) {
        document.getElementById("loginError").innerHTML = "not a valid password or name"
        return;
    }
    const users = getUsers();
    const name = document.getElementById("loginName").value;
    const user = users.filter(user => user.name === name)[0];
    if (user === undefined || user.password !== password) {
        document.getElementById("loginError").innerHTML = "not a valid password or name"
        return;
    }
    loadPage('contactsPage');
}

const getUsers = () => {
    return JSON.parse(localStorage.getItem('users'));
}
const creatUsers = () => {
    localStorage.setItem("users", '[]');
}
const creatUser = (name, password, id) => {
    const users = getUsers();
    users.push({ name: name, password: password, id: id })
    localStorage.setItem("users", JSON.stringify(users));
}
creatUsers();
creatUser("baba", "abcd1234", 1);
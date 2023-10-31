const getUsers = () => {
    return JSON.parse(localStorage.getItem('users'));
}
const creatUsers = () => {
    const users = {countId:0, users:[]};
    localStorage.setItem("users", JSON.stringify(users));
}
const addUser = (name, password) => {
    const users = getUsers();
    users.users.push({ name: name, password: password, id: users.countId +1 })
    users.countId +=1;
    localStorage.setItem("users", JSON.stringify(users));
}
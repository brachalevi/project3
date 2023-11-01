class User {
    constructor(name, password, id) {
        this.name = name,
            this.password = password,
            this.id = id,
            this.contacts = { countId: 0, usersContacts: [] }
    }
}

const getUsers = () => {
    return JSON.parse(localStorage.getItem('users'));
}
const creatUsers = () => {
    const users = { countId: 0, users: [] };
    localStorage.setItem("users", JSON.stringify(users));
}
const addUser = (name, password) => {
    const usersObj = getUsers();
    const user = new User(name, password, usersObj.countId + 1);
    usersObj.users.push(user)
    usersObj.countId += 1;
    setUsers(usersObj);
    return user;
}
const setUsers = (users) => {
    localStorage.setItem("users", JSON.stringify(users));
}

const setUser = (user) => {
    const usersObj = getUsers();
    const usersArr = usersObj.users;
    for (i = 0; i < usersArr.length; i++) {
        if (usersArr[i].id === user.id) {
            usersArr[i] = user;
            setUsers(usersObj);
            return user;
        }
    }
}
//  creatUsers();



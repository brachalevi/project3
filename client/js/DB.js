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

function getUser(userId) {
    if(!isValidUserId(userId)){
        error();
        return;
    }

    for (let item of getUsers().users) {
        if (item.id == userId) {
            return item;
        }
    }
}

function getContact (contactId) {
    if(!isValidContactId()) {
        error();
        return;
    }

    for(let item of getUser(currentUser.id).contacts) {
        if (item.id == contactId) {
            return item;
        }
    }
}

function pushNewContact(name, number, userId) {
    let user = getUser(userId);
    let countId = user.contacts.countId;
    user.contacts.usersContacts.push( {name: name, number: number, id: countId + 1} )
    user.contacts.countId++
    return setUser(user);
}

function isValidUserId (id) {
    let valid = false;
    if (isNaN(id) && id % 1 !== 0) {
        return valid;
    }
    for (let item of getUsers().users) {
        if (item.id == id) {
            valid = true;
        }
    }
    return valid;
}

function isValidContactId(id) {
    let valid = false;
    if (isNaN(id) && id % 1 !== 0) {
        return valid;
    }
    for (let item of getUsers().users.contacts.usersContacts) {
        if (item.id === id) {
            valid = true;
        }
    }
    return valid;

}



//  creatUsers();



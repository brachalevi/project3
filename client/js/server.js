/* url exemple :
    get a user => url: users/user/~id~ <= array length: 3
    Get a user by name => url: users/user/login/name=~username~+password=~password => array length: 4
    get a contact => url: users/user/~id~/contact/~id~ <= array length: 5
    post user => url: users/user/name=~username~+password=~password~ <= array length: 3
    put new contact => url: users/user/~id~/contact/name=~contactname~+number=~contactnumber~ => array length: 5
    put change contact => url: users/user/~id~/contact/name=~contactname~+number=~contactnumber~ => array length: 5 //if number exist than change
    delete contact => url: users/user/~id~/contact/number => array length: 5
*/


let method;
let url;

function whichMethod(command) {
    let commandArr = command.split(' ');
    method = commandArr[0];
    url = commandArr[1];
    let urlArr = url.split('/');
    if (urlArr[0] === 'users') {
        if (window[method]) {
            return window[method](urlArr);
        }
    }

    return 400;
}

function GET(arr) {
    const numberId = Number(arr[2])
    if (isValidUrl(arr) === false) {
        return 400;
    }

    if (arr.length === 3) {
        if (isValidUserId(numberId)) {
            return getUser(numberId);
        }
    } else if (arr.length === 5) { 
        if (isValidContactId(numberId)) {
            return getContact(numberId);
        }
    } else if (arr.length === 4) {
        let userInfoArr = arr[3].split('+');
        let userName = userInfoArr[0].split('=')[1];
        let userPassword = userInfoArr[1].split('=')[1];
        for (let item of getUsers().users) {
            if (item.name == userName && item.password == userPassword) {
                return item;
            }
        }
    }

    return 404;
}


function POST(arr) {
    if (isValidUrl(arr) === false) {
        return 400;
    }


    let userInfoArr = arr[2].split('+');
    if (!userInfoArr[0].includes('name') && !userInfoArr[1].includes('password')) {
        error();
        return 400;
    }

    let userName = userInfoArr[0].split('=')[1];
    let userPassword = userInfoArr[1].split('=')[1];

    return addUser(userName, userPassword);
}

function PUT(arr) {
    if (isValidUrl(arr) === false) {
        return 400;
    }

    if (!isValidUserId(arr[2])) {
        return 404;
    }

    if (arr[3] !== 'contact') {
        return 400;
    }

    let contactInfoArr = arr[4].split('+');

    if (!contactInfoArr[0].includes('name') && !contactInfoArr[1].includes('number')) {
        error();
        return 400;
    }

    let contactName = contactInfoArr[0].split('=')[1];
    let contactNumber = contactInfoArr[1].split('=')[1];

    for (let item of getUser(arr[2]).contacts.usersContacts) {
        if (contactNumber === item.number) {
            return 400;
        }
    }

    return pushNewContact(contactName, contactNumber, arr[2]);
}

function DELETE(arr) {
    if (isValidUrl(arr) === false) {
        return 400;
    }

    if (!isValidUserId(arr[2])) {
        return 404;
    }

    if (arr[3] !== 'contact') {
        return 400;
    }


    return deleteContactById(arr[4], arr[2])
}


function isValidUrl(arr) {
    if (arr[1] === 'user') {
        return true;
    }
    return false;
}



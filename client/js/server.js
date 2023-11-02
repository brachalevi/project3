/* url exemple :
    get a user => url: users/user/~id~ <= array length: 3
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
        return window[method](urlArr);
    }

    error();
}

function GET(arr) {
    const numberId = Number(arr[2])
    isValidUrl(arr);

    if (arr.length === 3) {
        if (isValidUserId(numberId)) {
            return getUser(numberId);
        }
    } else if (arr.length === 5) { // change
        // for ()
        if (isValidContactId(numberId)) {
            return getContact(numberId);
        }
    }
    error();
}


function POST(arr) {
    if (!isValidUrl(arr)) {
        return false;
    }


    let userInfoArr = arr[2].split('+');
    if (!userInfoArr[0].includes('name') && !userInfoArr[1].includes('password')) {
        error();
        return false;
    }

    let userName = userInfoArr[0].split('=')[1];
    let userPassword = userInfoArr[1].split('=')[1];

    return addUser(userName, userPassword);
}

function PUT(arr) {
    if (!isValidUrl(arr)) {
        return false;
    }

    if (!isValidUserId(arr[2])) {
        return false;
    }

    if (arr[3] !== 'contact') {
        error();
        return false;
    }

    let contactInfoArr = arr[4].split('+');

    if (!contactInfoArr[0].includes('name') && !contactInfoArr[1].includes('number')) {
        error();
        return false;
    }

    let contactName = contactInfoArr[0].split('=')[1];
    let contactNumber = contactInfoArr[1].split('=')[1];

    //return currentUser
    for (let item of getUser(arr[2]).contacts.usersContacts) {
        if (contactNumber === item.number) {
            //change
            return;
        }
    }

    return pushNewContact(contactName, contactNumber, arr[2]);
}

function DELETE(arr) {
    if (!isValidUrl(arr)) {
        return false;
    }

    if (!isValidUserId(arr[2])) {
        return false;
    }

    if (arr[3] !== 'contact') {
        error();
        return false;
    }

    let number = arr[4];
    return deleteContactById(arr[4], arr[2])

}

function error() {

}

function isValidUrl(arr) {
    if (arr[1] === 'user') {
        return true;
    }
    error();
}

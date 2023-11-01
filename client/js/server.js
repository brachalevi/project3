/* url exemple :
    get a user => url: users/user/~id~ <= array length: 3
    get a contact => url: users/user/~id~/contact/~id~ <= array length: 5
    post user => url: users/user/name=~username~+password=~password~ <= array length: 3
    put new contact => url: users/user/~id~/contact/name=~contactname~+number=~contactnumber~ => array length: 5
    put change contact => url: users/user/~id~/contact/name=~contactname~+number=~contactnumber~ => array length: 5 //if exist than means change
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
    } else if (arr.length === 5) {
        if (isValidContactId(numberId)) {
            return getContact(numberId);
        }
    } 
    error();
}


function POST(arr) {
    isValidUrl(arr);

    
    let userInfoArr = arr[2].split('+');
    if (!userInfoArr[0].includes('name') && !userInfoArr[1].includes('password')) {
        error();
        return false;
    }

    let userName = userInfoArr[0].split('=')[1];
    let userPassword = userInfoArr[1].split('=')[1];

    addUser(userName, userPassword);
}

function PUT(arr) {
    isValidUrl(arr);

    if(!arr.includes('contact')) {
        error();
        return false;
    }

    let contactInfoArr = arr[2].split('+');

    if (!contactInfoArr[0].includes('name') && !contactInfoArr[1].includes('number')) {
        error();
        return;
    }

    let contactName = contactInfoArr[0].split('=')[1];
    let contactNumber = contactInfoArr[1].split('=')[1];

    //return currentUser
    for(let item of getUser(currentUser.id).contacts.usersContacts) {
        if (contactNumber === item.number) {
            //change
            return;
        } 
    }

    

}

function DELETE(arr) {

}

function error() {

}

function isValidUrl (arr) {
    if (arr[1] === 'user') {
        error();
        return true;
    }
}
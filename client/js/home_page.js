

function displayaddContactForm(){
    console.log(1);
    const content = document.getElementById("throw-contact-form");
            const page = document.getElementById('new-contact-info');
            if (page) {
                content.innerHTML = page.innerHTML;
            }
    document.querySelector("#new-contact-submit").addEventListener("click", addContact);
    document.querySelector("#close-button").addEventListener("click", function () {
        content.textContent = "";
    })
}

function addContact (){
    let name = document.querySelector("#new-contact-name").value
    let number = document.querySelector("#new-contact-number").value
    let countId = getCurrentUsersContactList().countId;
    getCurrentUsersContactList().usersContacts.push({name: name, number: number, id: countId + 1})
    getCurrentUsersContactList().countId ++;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    number = '';
    name = '';
    addContactToDisplay()
}

function addContactToDisplay () {
    let contactsArr = getCurrentUsersContactList().usersContacts
    for (let item of contactsArr) {
        
    }
}

function getCurrentUsersContactList () {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return currentUser.contacts;
}

class ContactContainet {
    constructor(name, number) {
        this.name = name
        this.number = number
    }

    createContactInHtml () {
        let divContainer = document.createElement("div");
        let divInfo = document.createElement("div");
        let divName = document.createElement("div");
        let divNumber = document.createElement("div");
        let divBtn = document.createElement("div");
        let editBtn = document.createElement("button");
        let deleteBtn = document.createElement("button");
        editBtn.classList.add("editBtn");
        deleteBtn.classList.add("deleteBtn");
        divBtn.classList.add("button-container");
        divContainer.classList.add("contact-container");
        divInfo.classList.add("contact-info");
        divName.classList.add("contact-name");
        divNumber.classList.add("contact-number");
        document.querySelector("#contacts").appendChild(divContainer);
        divContainer.appendChild(divInfo);
        divInfo.appendChild(divName);
        divInfo.appendChild(divNumber);
        divContainer.appendChild(divBtn);
        divBtn.appendChild(editBtn);
        divBtn.appendChild(deleteBtn);
    }

    insertContact() {
        this.createContactInHtml();
        
    }
}
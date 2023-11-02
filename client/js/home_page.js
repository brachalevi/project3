let currentUser;

function displayContact() {
    document.querySelectorAll(".contact-container").forEach(el => el.remove());
    // let contactsDiv = document.createElement("div");
    // contactsDiv.setAttribute("id", "contacts");
    // document.querySelector('#page-container').appendChild(contactsDiv);
    currentUser = JSON.parse(localStorage.getItem("currentUser"));
    let usersContacts = currentUser.contacts.usersContacts;
    for (let item of usersContacts) {
        let contact = new ContactContainer(item.name, item.number);
        contact.createContactInHtml();
    }
}

function displayaddContactForm() {
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

function deleteContact () {
    const contactToDelete = this.parentElement.parentElement;
    const contactNumberToDelete = contactToDelete.querySelector(".contact-number").textContent.split(":")[1].trim();
    const myFAJAX = new FAJAX();
    myFAJAX.onload = function () {
        currentUser = this.data;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
    };

    // Simulate making a request
    myFAJAX.open('DELETE', `users/user/${currentUser.id}/contact/${contactNumberToDelete}`);
    myFAJAX.send();
    displayContact();
}



function addContact() {
    let name = document.querySelector("#new-contact-name")
    let number = document.querySelector("#new-contact-number")
    const myFAJAX = new FAJAX();
    myFAJAX.onload = function () {
        currentUser = this.data;
        console.log(this.data);
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        number.value = '';
        name.value = '';
        addContactToDisplay();
    };

    // Simulate making a request
    myFAJAX.open('PUT', `users/user/${currentUser.id}/contact/name=${name.value}+number=${number.value}`);
    myFAJAX.send();

}

function addContactToDisplay() {
    let usersContacts = currentUser.contacts.usersContacts;
    const newUser = usersContacts[usersContacts.length - 1];

    let contact = new ContactContainer(newUser.name, newUser.number);
    contact.createContactInHtml();

}

function search() {
    let searchValue = document.querySelector("#search-bar-input");
    const myFAJAX = new FAJAX();
    myFAJAX.onload = function () {
        currentUser = this.data;
        // console.log(this.data);
        // localStorage.setItem('currentUser', JSON.stringify(currentUser));
        searchValue.value = '';
        displayContact();
    };

    // Simulate making a request
    myFAJAX.open('GET', `users/user/${currentUser.id}/contact/${searchValue.value}`);
    myFAJAX.send();
    
}


class ContactContainer {
    constructor(name, number) {
        this.name = name
        this.number = number
    }

    createContactInHtml() {
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
        editBtn.textContent = 'edit';
        divName.textContent = `name: ${this.name}`;
        divNumber.textContent = `number: ${this.number}`;
        deleteBtn.addEventListener("click", deleteContact)
    }

}

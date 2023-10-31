const currentUser = localStorage.getItem('currentUser');
const addBtn = document.querySelector("#addBtn");
const apllicationForm = document.querySelector('#new-contact-info');
const contactArr = currentUser.contacts
addBtn.addEventListener("click", displayaddContactForm);

function displayaddContactForm(){
    apllicationForm.style.display = 'block';
    document.querySelector("#new-contact-submit").addEventListener("click", addContact);
}

function addContact (){
    
}


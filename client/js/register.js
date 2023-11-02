const register = () => {
    const password = document.getElementById("registerPassword").value;
    const pwRegex = /^(?=.*[a-x])(?=.*\d).{8,}$/;
    if (!pwRegex.test(password)) {
        document.getElementById("registerError").innerHTML = "not a valid password"
        return;
    }
    const name = document.getElementById("registerName").value;

    const myFAJAX = new FAJAX();
    myFAJAX.onload = function () {
        currentUser = this.data;
        loadPage('contactsPage', displayContact);
    };

    myFAJAX.open('POST', `users/user/name=${name}+password=${password}`);
    myFAJAX.send();

}
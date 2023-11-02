
function checkUser() {
    console.log("in checkUser")
    const password = document.getElementById("loginPassword").value;
    const pwRegex = /^(?=.*[a-x])(?=.*\d).{8,}$/;
    const name = document.getElementById("loginName").value;
    if (!pwRegex.test(password)) {
        document.getElementById("loginError").innerHTML = "not a valid password or name"
        return;
    }

    const myFAJAX = new FAJAX();
    myFAJAX.onload = function () {
        currentUser = this.data;
        loadPage('contactsPage', displayContact);
    };

    myFAJAX.open('GET', `users/user/login/name=${name}+password=${password}`);
    myFAJAX.send()

}

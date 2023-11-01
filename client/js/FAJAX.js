
class FAJAX {
    constructor() {
        this.URL = '';
        this.readyState = 0;
        this._onload = null;
    }

    set onload(func) {
        this._onload = func;
    }

    open(method, url) {
        this.URL = `${method} ${url}`;
        this.readyState = 1;
    }

    send() {
        this.readyState = 1;

        // Simulate sending the request to the network and handle the response asynchronously
        toNetwork(this.URL)
            .then(response => {
                if (response.status === 200) {
                    this.readyState = 2;
                    if (this._onload) {
                        this._onload(); // Call the onload callback to indicate a successful response
                    }
                } else {
                    this.readyState = 3; // Handle errors
                }
            })
            .catch(error => {
                this.readyState = 3; // Handle network errors
            });
    }
}
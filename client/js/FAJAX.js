
class FAJAX {
    constructor() {
        this.URL = '';
        this.readyState = 0;
        this.data = '';
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
        if (this.readyState !== 1) {
            throw new Error('Call open method before send');
        }
        this.readyState = 2;

        const response = toNetwork(this.URL);

        setTimeout(() => {
            this.status = response.status
            if (response.status === 200) {
                this.readyState = 3;
                this.data = response.data;
                if (this._onload) {
                    this._onload(); // Call the onload callback to indicate a successful response
                }
            } else {
                this.readyState = 4; // Handle errors
            }
        }, 1000);
    }

}
class ExpressError extends Error {
    constructor(statusCode, message) {
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
}
module.exports = ExpressError;



// this above class can also be written as

/*
class ExpressError extends Error {
    constructor(statusCode, message) {
        super(message); // Pass message to the parent Error class
        this.statusCode = statusCode; // Corrected property name
        this.name = "ExpressError"; // Optional: sets the error name for better logging
    }
}

module.exports = ExpressError;
*/
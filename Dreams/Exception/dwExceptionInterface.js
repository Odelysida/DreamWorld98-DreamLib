function dwGameException(message) {
    const error = new Error(message);
    return error;
  }
  

function dwServerException(message) {
    const error = new Error(message) + " On: " + Error.caller;
    return error;
}

function dwLibraryException(message) {
    const error = new Error(message) + " On: " + Error.caller;
    return error;
}


dwGameException.prototype = Object.create(Error.prototype);
dwServerException.prototype = Object.create(Error.prototype);

modules.export = {
    dwGameException: dwGameException.prototype,
    dwServerException: dwServerException.prototype
}
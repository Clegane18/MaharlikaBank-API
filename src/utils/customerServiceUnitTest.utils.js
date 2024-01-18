const createErrorObjectWithStatus = (errorMessage, status) => {
    const errorObject = new Error(errorMessage);
    errorObject.status = status;

    return errorObject;
};

const createErrorObjectForFailedUpdate = (wrongEmailMessage, wrongPasswordMessage, wrongProfilePictureMessage, status) => {
    const errorObject = new Error(wrongEmailMessage);
    errorObject.wrongPasswordMessage = wrongPasswordMessage;
    errorObject.wrongProfilePictureMessage = wrongProfilePictureMessage;
    errorObject.status = status;

    return errorObject;
};

const createErrorObjectForInvalidPassword = (invalidPasswordMessage) => {
    const errorObject = new Error(invalidPasswordMessage);

    return errorObject;
};
module.exports = { createErrorObjectWithStatus, createErrorObjectForFailedUpdate, createErrorObjectForInvalidPassword };
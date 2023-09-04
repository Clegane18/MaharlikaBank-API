function generateTransactionReference(customerId) {
    const timestamp = Date.now();
    const randomPart = generateRandomAlphanumericString(6); 

    const reference = `${customerId}-${timestamp}-${randomPart}`;

    return reference;
}

function generateRandomAlphanumericString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomString += characters.charAt(randomIndex);
    }

    return randomString;
}

module.exports = { generateTransactionReference, generateRandomAlphanumericString };
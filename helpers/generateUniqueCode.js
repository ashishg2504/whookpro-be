const { v4: uuidv4 } = require('uuid');

// Function to generate an 8-digit alphanumeric string
exports.generate8DigitUUID = () => {
    return uuidv4().replace(/-/g, '').slice(0, 8);
};

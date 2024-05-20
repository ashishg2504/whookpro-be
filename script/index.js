const { default: axios } = require("axios");
const sampleData = require("./sampleData");

// Iterate Sample Data
let responseCount = {
    success: 0,
    failed: 0
};

// Collect all the promises
let promises = sampleData.map(data => {
    return axios.post(data.callbackUrl, data.payload)
        .then(res => {
            responseCount.success++;
        })
        .catch(err => {
            responseCount.failed++;
        });
});

// Wait for all promises to resolve
Promise.all(promises).then(() => {
    // Return Response
    console.log(responseCount);
});

const axios = require('axios');

const url = 'http://admin.summitcoachesug.com/api/v1/trips?per_page=3';

async function checkEndpoint() {
    try {
        console.log(`Checking ${url}...`);
        const response = await axios.get(url);
        console.log(`SUCCESS: ${url} - Status: ${response.status}`);
        console.log('Response Data Structure:', JSON.stringify(response.data, null, 2));
    } catch (error) {
        console.log(`FAILED: ${url} - Status: ${error.response ? error.response.status : error.message}`);
        if (error.response) {
            console.log('Error Data:', JSON.stringify(error.response.data, null, 2));
        }
    }
}

checkEndpoint();

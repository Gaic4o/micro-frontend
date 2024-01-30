const axios = require('axios');

module.exports = async function () {
    const response = await axios.get("http://api.github.com/users");
    return response.data;
}

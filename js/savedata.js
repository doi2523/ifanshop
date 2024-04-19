// saveData.js

const fs = require('fs');

// Hàm này nhận các giá trị username, email và password và ghi chúng vào tệp data.js
function saveData(username, email, password) {
    const data = `var userData = {
        username: "${username}",
        email: "${email}",
        password: "${password}"
    };`;

    fs.writeFileSync('data.js', data);
}

module.exports = saveData;

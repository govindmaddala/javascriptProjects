const fs = require('fs');
const dataset = JSON.parse(JSON.stringify(require('../Trial/Data.json')));

for (const data of dataset) {

    cred = {
        "username": data.username,
        "password": data.password
    }

    cred = JSON.parse(JSON.stringify(cred));

    // fs.writeFile("./Datafile.json", JSON.stringify(cred, null, 2), err => {
    //     if (err) {
    //         console.log(err);
    //     }
    //     else {
    //         console.log("file is created");
    //     }
    // }
    // )

    fs.appendFile('./Datafile.json', JSON.stringify(cred, null, 2), (err) => {
        if (err) throw err;
        console.log('The "data to append" was appended to file!');
    });

}

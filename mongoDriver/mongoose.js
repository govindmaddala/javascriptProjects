const mongoose = require('mongoose');

/* To connect a database */
mongoose.connect('mongodb://127.0.0.1:27017/collegeDB');

/* To declare the schema of collection to be created */
const collectionSchema = new mongoose.Schema({
    name: { type: String, required: [true, "Name is mandatory"] },
    branch: { type: String, enum: ['metallurgy', 'chemical'] },
    // roll: Number
    roll: {
        type: Number,
        min: 14120000,
        max: 14120090
    }
});

/* To create a new collection */
const collection = mongoose.model("collectionName", collectionSchema);





/* To insert data i.e POST method */

// const person = new collection({
//     name: 'komal',
//     branch: 'metallurgy',
//     roll:14120036
// });
/* To save such inserted data */
// person.save();

// const dataSet = [{
//     name: 'Rajesh',
//     branch: 'metallurgy',
//     roll: 14120031
// },
// {
//     name: 'Akhil',
//     branch: 'metallurgy',
//     roll: 14120035
// }]

// collection.insertMany(dataSet, function (err) {
//     if (err) {
//         console.log(err);
//     }
// })


// collection.find(async function (err, person) {
//     if (err) {
//         console.log(err);
//     } else {

//         // To print all names
//         person.forEach(i => console.log(i.name))

//         // To print a particular data
//         for (let p of person) {
//             if (p.name === 'govind') {
//                 console.log(p);
//                 break;
//             }
//         }
//     }
//     await mongoose.connection.close();
// }
// )

/*  UPDATE */

// collection.updateOne({name:'govind'},{name:'govind maddala'},function(err){
//     if(err){
//         console.log(err);
//     }else{
//         console.log('Update is done');
//     }
// })

/*      DELETE    */

// collection.deleteOne({ name: 'komal' }, function (err) {
//     if (err) {
//         console.log(err);
//     }
//     else {
//         console.log('Query is deleted');
//     }
// })


collection.deleteMany({ name: 'Akhil' , roll: 14120035 }, function (err) {
    if (err) {
        console.log(err);
    }
    else {
        console.log('Queries are deleted');
    }
})


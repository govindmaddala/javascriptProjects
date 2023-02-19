const { MongoClient } = require("mongodb");

// Replace the uri string with your connection string.
const uri = "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.5.4";

const client = new MongoClient(uri);

async function run() {
    try {
        //Database name
        const databaseName = client.db('demoDB');

        //Collection Name
        const collectionName = await databaseName.collection('data1');

        /*                GET                 */
        //Query
        const filter = { branch: 'chemical' };
        //Retrieve data using query
        const data = await collectionName.findOne(filter);

        /*                INSERT                */
        //data to be inserted
        const insertData = {_id:33, name: 'Kavuru Rajesh', Address: 'Rajahmundry'}
        // Insert data query:
        await collectionName.insertOne(insertData);

        /*                UPDATE                 */
        const filterTxt= {_id:32}
        const updateTxt = {$set:{name:'Raju'}}
        const optionsTxt = {upsert:true}
        collectionName.updateOne(filterTxt,updateTxt,optionsTxt);

        /*                DELETE                 */
        
        const deleteFilter = {_id:32}
        await collectionName.deleteOne(filtdeleteFilterer)

    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
// run().catch(console.dir);

run();
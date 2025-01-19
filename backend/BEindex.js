const express = require('express');
const app = express();

const indexRoute = require('./routes/indexRoute');
const dbController = require('./controllers/dbController');

//MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(indexRoute)

app.listen(3001, async () => {
    try {
        dbController.connectTODB();
        console.log('Backend-server startet på port 3001');
    } catch(err) {
        console.log(err);
    }
});
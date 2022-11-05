const express = require('express');
const fs = require('fs');
const path = require('path');
//const cors = require('cors');
const Oberflache = require('./models/oberflache');
const mongoose = require('mongoose');
//const dotenv = require('dotenv');

mongoose
    .connect("mongodb+srv://niyaz_coskun:A12345y.@cluster0.yjj2kqj.mongodb.net/?retryWrites=true&w=majority")
    .then((con) => {
        console.log(`Mongo connected: ${con.connection.host}`);
    })
    .catch((err) => {
        console.log(err);
    });

//dotenv2.config();
/*const iframe = document.createElement('iframe');
document.body.appendChild(iframe);
xArray = window.frames[window.frames.length-1].Array;
const arr = new xArray(1,2,3); // [1,2,3]*/


//dotenv.config();

const app = express();

//app.use(cors());

app.use(express.json()); //express.json erstellt hätte

app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static('public'));
// const read = fs.readFileSync('./public/sometext.txt', 'utf8', (err) => {
//   if (err) {
//     console.log(err);
//   }
// });

//   app.post('/api/add-server', async (req, res, next) => {
//   const newOberflache = req.body;
//   const oberflache = fs.readFileSync(__dirname + '/oberflache.json').toJSON();
//   const oberflacheBuff = Buffer.from(oberflache.data).toString();
//   const oberflacheJson = JSON.parse(oberflacheBuff);
//   oberflacheJson.push({ id: oberflacheJson.length + 1, ...newOberflache });
//   const buffToNewOberflache = Buffer(JSON.stringify(oberflacheJson));
//   fs.writeFileSync(__dirname + '/oberflache.json', buffToNewOberflache);
//   res.json({ message: 'Neue Oberflache hat erstellt.' });
// });

// app.get('/api/get-server', async (req, res, next) => {
//   const oberflache = fs.readFileSync(__dirname + '/oberflache.json').toJSON();
//   const oberflacheBuff = Buffer.from(oberflache.data).toString();
//   const oberflacheJson = JSON.parse(oberflacheBuff);
//   res.json(oberflacheJson);
// });

app.post('/api/oberflache', async(req, res, next) => {
    try {
        const { lieferdatum, ...restOberflache } = req.body;
        const createNewOberflache = new Oberflache({
            ...restOberflache,
            lieferdatum: new Date(lieferdatum),
        });
        await createNewOberflache.save();
        res.json({ message: 'Oberfläche ist erstellt geworden.' });
    } catch (error) {
        next(error);
    }
});

app.get('/api/oberflache', async(req, res, next) => {
    try {
        //const oberflachen = await Oberflache.find();
        res.json(oberflachen);
    } catch (error) {
        next(error);
    }
});

app.put('/api/oberflache/:id', async(req, res, next) => {
    try {
        const {...updatedOberflache } = req.body;
        const { id } = req.params;
        const resp = await Oberflache.findByIdAndUpdate(id, updatedOberflache);
        // const findOberflache = await Oberflache.findById(id);
        // if (!findOberflache) {
        //   const error = new Error('Oberfläche nicht gefunden.');
        //   error.status = 404;
        //   throw error
        // }
        // findOberflache.set(restOberflache);
        res.json({ message: 'Oberfläche ist geändert geworden.', data: resp });
    } catch (error) {
        next(error);
    }
});

app.delete('/api/oberflache/:id', async(req, res, next) => {
    try {
        const { id } = req.params;
        await Oberflache.findByIdAndDelete(id);
        res.json({ message: 'Oberflache ist löschen geworden.' });
    } catch (error) {
        next(error);
    }
});

// error handling
app.use((error, req, res, next) => {
    console.log('--ERROR--', error);
    const status = error.statusCode || 500;
    res.status(status).json({ message: error.message, stack: error.stack });
});

app.listen(8080, () => {
    console.log('Server is running on port 8080');
});
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const oberflacheSchema = new Schema({
    hostname: String,
    bezeichnung: String,
    abteilung: String,
    betriebssystem: String,
    lieferdatum: Date,
}, { timestamps: true });

module.exports = mongoose.model('Oberflache', oberflacheSchema);
const mongoose = require('mongoose');

const Data = require('../models/dataModel');

const path = require('path');
const { options } = require('../routes/userRoutes');
const viewsPath = path.dirname(require.main.filename) + '/views/';

exports.sendData = async(req, res, next) => {
    let newData = {
        _id: new mongoose.Types.ObjectId(),
        gateEntryNumber: req.body.gateEntryNumber,
        vehicleNumber: req.body.vehicleNumber,
        party: req.body.party,
        transporter: req.body.transporter,
        driver: req.body.driver,
        driverContactNumber: req.body.driverContactNumber,
        vehicleCapacity: req.body.vehicleCapacity,
        pucDate: req.body.pucDate,
        destination: req.body.destination,
        driverLicense: req.body.driverLicense,
        driverLicenseState: req.body.driverLicenseState,
        driverAddress: req.body.driverAddress
    }

    try {
        let data = new Data(newData);
        await data.save();
        const options = {year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
        res.status(201).render('viewDataEntry', {record: data, date_options: options});
            
    } catch(err) {
        res.status(500).json({ error: err });
    }
};

exports.viewData = async (req, res, next) => {
    try {
        const data = await Data
            .find()
            .select('_id gateEntryNumber vehicleNumber party transporter driver driverContactNumber vehicleCapacity pucDate destination driverLicense driverLicenseState driverAddress datetime')
            .sort({ datetime: 'desc' });

        const no_records = data.length;
        const options = {year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };

        res.status(200).render('viewData', { 
            no_records: no_records,
            data_records: data,
            date_options: options 
        });

    } catch (err) {
        res.status(500).json({ error: err });
    }
};

exports.sendDataForm = async (req, res, next) => {
    res.status(200).render('sendData');
};
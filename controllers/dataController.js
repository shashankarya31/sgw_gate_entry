const mongoose = require('mongoose');

const Data = require('../models/dataModel');

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
        console.log(data);
        res.status(201).json({
            message: 'Gate entry stored!',
            GateEntry: {
                _id: data._id,
                gateEntryNumber: data.gateEntryNumber,
                vehicleNumber: data.vehicleNumber,
                party: data.party,
                transporter: data.transporter,
                driver: data.driver,
                driverContactNumber: data.driverContactNumber,
                vehicleCapacity: data.vehicleCapacity,
                pucDate: data.pucDate,
                destination: data.destination,
                driverLicense: data.driverLicense,
                driverLicenseState: data.driverLicenseState,
                driverAddress: data.driverAddress
            }
        });
            
    } catch(err) {
        res.status(500).json({ error: err });
    }
};

exports.viewData = async (req, res, next) => {
    try {
        const data = await Data
            .find()
            .select('gateEntryNumber vehicleNumber party transporter driver driverContactNumber vehicleCapacity pucDate destination driverLicense driverLicenseState driverAddress datetime')
            .sort({ datetime: 'desc' });

        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        res.status(200).json({
            records_length: data.length,
            entries: data
        });
    } catch (err) {
        res.status(500).json({ error: err });
    }
};
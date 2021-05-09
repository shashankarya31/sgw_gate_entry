const mongoose = require('mongoose');

const dataSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    gateEntryNumber: { type: String, require: true },
    vehicleNumber: { type: String, require: true },
    party: { type: String, require: true },
    transporter: { type: String, require: true },
    driver: { type: String, require: true },
    driverContactNumber: { type: String, require: true },
    vehicleCapacity: { type: String, require: true },
    pucDate: { type: String, require: true },
    destination: { type: String, require: true },
    driverLicense: { type: String, require: true },
    driverLicenseState: { type: String, require: true },
    driverAddress: { type: String, require: true },
    datetime: { type: Date, default: Date.now }
});

module.exports = mongoose.model('data', dataSchema);
const mongoose = require('mongoose');
const { generate8DigitUUID } = require('../helpers/generateUniqueCode');

const webHookSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true
    },
    sourceName: {
        type: String,
        require: true
    },
    sourceUrl: {
        type: String,
        require: true
    },
    callbackCode: {
        type: String,
        require: true,
        unique: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

webHookSchema.pre('save', function (next) {
    if (!this.callbackCode) {
        this.callbackCode = generate8DigitUUID();
    }
    next();
});

module.exports = mongoose.model('Webhook', webHookSchema);

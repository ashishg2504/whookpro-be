const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    webHookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Webhook",
        require: true
    },
    type: {
        type: String,
        require: true
    },
    eventDetail: {
        type: Object,
        require: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);

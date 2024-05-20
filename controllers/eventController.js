const { response } = require("../helpers/response")
const Webhook = require("../models/webhookModel")
const Event = require("../models/EventModel")

module.exports = {
    createEvent: async (req, res) => {
        // Fetching body payload and code 
        let callbackCode = req.params.code
        let payload = req.body
        try {

            // Fetch Webhook 
            let webhookDetail = await Webhook.findOne({ callbackCode })

            //If webhook not exist or not active
            if (!webhookDetail) return response(res, 400, false, "Bad Request")
            if (!webhookDetail.isActive) return response(res, 400, false, "Webhook is not active")

            //Create event
            let newEvent = new Event({
                webHookId: webhookDetail._id,
                type: payload.event,
                eventDetail: payload
            })
            newEvent = await newEvent.save()

            // Return Response 
            return response(res, 200, true, "Event Created")

        } catch (error) {
            return response(res, 500, false, "Internal Server Error")
        }
    },
    getAllEvent: async (req, res) => {
        // Fetching Webhook id 
        let webhookId = req.params.id
        try {

            // Fetch Webhook 
            let webhookDetail = await Webhook.findById(webhookId)

            //If webhook not exist or not active
            if (!webhookDetail) return response(res, 400, false, "Bad Request")

            //Fetch event
            let fetchEvent = await Event.find({ webHookId: webhookDetail._id }).lean()

            // Return Response 
            return response(res, 200, true, "Event Fetched", [...fetchEvent])

        } catch (error) {
            return response(res, 500, false, "Internal Server Error")
        }
    },
}
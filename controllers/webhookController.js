const { response } = require("../helpers/response")
const { urlRegex } = require("../helpers/regex");
const Webhook = require("../models/webhookModel");
const Event = require("../models/EventModel");

module.exports = {
    //Create new webhook for the user
    createWebhook: async (req, res) => {
        // Get payload 
        const { sourceName, sourceUrl } = req.body;
        let userId = req.user
        try {
            // Required field check 
            if (!sourceName) return response(res, 400, false, "Source Name is required")
            if (!sourceUrl) return response(res, 400, false, "Source URL is required")

            //Validate URL
            if (!urlRegex.test(sourceUrl)) return response(res, 400, false, "Invalid Source URL format");

            //Create Webhook
            let newWebhook = new Webhook({
                userId,
                sourceName,
                sourceUrl,
                isActive: true
            })
            newWebhook = await newWebhook.save()
            newWebhook = newWebhook.toObject()
            delete newWebhook['__v']

            //Return Response
            response(res, 201, true, "Webhook Created", { ...newWebhook })
        } catch (error) {
            console.log(error)
            return response(res, 500, false, "Internal Server Error")
        }
    },
    // Get all subscribed user webhook 
    getAllWebhook: async (req, res) => {
        try {

            //Fetch webhook of loggedin User
            let webhookList = await Webhook.find({ userId: req.user }).sort({ isActive: -1 }).lean();

            //Return response
            return response(res, 200, true, "Webhook List Fetched", [...webhookList])

        } catch (error) {
            console.log(error)
            return response(res, 500, false, "Internal Server Error")
        }
    },
    // Get detail of webhook
    getWebhookDetail: async (req, res) => {
        //Webhook id
        let webHookId = req.params.id;
        try {
            //Fetch Webhook
            let webhookDetail = await Webhook.findById(webHookId).lean();

            // Check If webhook user and requested user is same 
            if (String(webhookDetail.userId) !== req.user) return response(res, 403, false, "You are not allowed to do this action")

            //Webhook Event
            let events = await Event.find({ webHookId: webhookDetail._id })

            // Return Response 
            return response(res, 200, true, "Webhook Fetched", { ...webhookDetail, eventCount: events.length })

        } catch (error) {
            console.log(error)
            return response(res, 500, false, "Internal Server Error")
        }
    },
    // Cancel subscribed webhook 
    cancelWebhook: async (req, res) => {
        //Webhook id
        let webHookId = req.params.id;
        try {
            //Fetch Webhook
            let webhookDetail = await Webhook.findById(webHookId).lean();

            // Check If webhook user and requested user is same 
            if (String(webhookDetail.userId) !== req.user) return response(res, 403, false, "You are not allowed to do this action")

            //Cancel Webhook
            await Webhook.findByIdAndUpdate(webHookId, { isActive: false })

            // Return Response 
            return response(res, 200, true, "Webhook Cancelled")

        } catch (error) {
            console.log(error)
            return response(res, 500, false, "Internal Server Error")
        }
    }
}
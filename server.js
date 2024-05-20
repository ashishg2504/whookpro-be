const express = require("express")
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');
const moment = require('moment-timezone');
const cors = require("cors")
const { connectDb } = require('./db/connectDb');
const bodyParser = require("body-parser")
require('dotenv').config

//Import Route
const userRoute = require("./routes/userRoutes")
const webhookRoute = require("./routes/webhookRoutes")
const eventRoute = require("./routes/eventRoutes")

// Setup express 
let app = express();

// Set default timezone 
moment.tz.setDefault('Asia/Kolkata');

// Body parsor and request types
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

// Set CORS 
app.use(cors())

//Swagger Doc
const swaggerDocument = YAML.load(path.join(__dirname, '/swagger.yaml'));

//Connect DB
connectDb();

//Set Docs Route
const options = {
    customCss: '.swagger-ui .topbar { display: none }'
};
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

//Set Routes
app.use("/api/user", userRoute)
app.use("/api/webhook", webhookRoute)
app.use("/api/event", eventRoute)

//Listen Server
app.listen(process.env.PORT || 4000, () => {
    console.log(`listening to port ${process.env.PORT || 4000}`);
});

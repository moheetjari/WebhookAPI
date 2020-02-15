const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require("./database/connection");
const app = express();
const WebHookModel = require("./database/webhook.model");

MongoClient().then(() => {
    console.log("Connected")
}).catch(console.log)

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("Welcome to my world!!");
})

//Get all webhooks
app.get("/api/webhook", (req, res) => {
    WebHookModel.find().then((wh) => {
        res.json({
            flag: true,
            data: wh,
            message: "Successfully fatched"
        });
    }).catch(e => {
        res.json({
            flag: false,
            data: null,
            message: e.message
        });
    })
})

app.post("/api/webhook", (req, res) => {
    let body = req.body;

    WebHookModel.create(body).then((wh) => {
        res.json({
            flag: true,
            data: wh,
            message: "Successfully Created"
        }).catch(e => {
            res.json({
                flag: false,
                data: null,
                message: e.message
            });
        })
    })
})

//Update webhook
app.put("/api/webhook/:id", (req, res) => {
    let body = req.body;

    WebHookModel.findByIdAndUpdate(req.params.id, body).then((wh) => {
        res.json({
            flag: true,
            data: wh,
            message: "Successfully Updated"
        }).catch(e => {
            res.json({
                flag: false,
                data: null,
                message: e.message
            });
        })
    })
});

//Delete webhook
app.delete("/api/webhook/:id", (req, res) => {

    WebHookModel.findByIdAndRemove(req.params.id, function (err, wh) {
        if (err) {
            res.json({
                flag: false,
                data: wh,
                message: e.message
            });
        }
        else {
            res.json({
                flag: true,
                data: wh,
                message: "Successfully Deleted"
            });
        }
    })
});

app.listen(3000);
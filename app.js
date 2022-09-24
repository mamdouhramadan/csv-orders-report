// Import dependencies
const csv = require("csvtojson");
const upload = require("express-fileupload");
const express = require("express");
const app = express();
const port = 4000;
const  getAverage = require("./functions/getAverage");
const getMaxBrand  = require("./functions/getMaxBrand");

app.use(upload());

app.listen(port, () => {
    console.log("Application started and Listening on port " + port);
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/client/index.html");
});

app.post("/csvFiles", async (req, res) => {
    if (req.files) {

        // Get the uploaded file name
        const fileName = req.files.ordersFile.name;
        // buffer file data to read it
        const fileData = req.files.ordersFile.data.toString("utf8");
        // Set the headers
        let headers = 'id,country,product,quntity,brand\n'
        // Add the headers to the file data
        let data = headers + fileData
        // Convert the data to json
        const orders = await csv().fromString(data);

        console.log(orders);

        // get avarage of quntity and download it
        const average = getAverage(orders);

        // Get Max repeated brand and download it 
        const maxBrand = getMaxBrand(orders);

        res.json({
            fileName: fileName,
            content: [average, maxBrand]
        });
    } else {
        res.json("No file uploaded")
    }
    res.end()
});


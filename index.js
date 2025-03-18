import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://www.dnd5eapi.co/api/2014";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs");
})

app.get("/create", async (req, res) => {

    try {
        const getClasses = await axios.get(API_URL + "/classes");
        const getRaces = await axios.get(API_URL + "/races");
        res.render("charsheet.ejs", { classes: getClasses.data.results, races: getRaces.data.results });
    } catch (error) {
        console.log(error.response.data);
    }
})

app.post("/createdChar", (req, res) => {
    const charCreated = {
        ch: req.body.charName,
        rac: req.body.race,
        clas: req.body.class,
        align: req.body.align1 + req.body.align2,
        back: req.body.backstory,
    };

    console.log(charCreated);
    res.render("createdChar.ejs", charCreated);
})


app.listen(port, () => {
    console.log(`Server is listening on port: ${port}`);
})
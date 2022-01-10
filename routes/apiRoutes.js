
const express = require("express");
const apiRouter = express.Router();

const fs = require("fs");

// Get functions
apiRouter.get("/api/notes", (req, res) => {
    
    fs.readFile('./db/db.json', 'utf8', (error, file) => {
        if (error) throw error;

        const parsedFile = JSON.parse(file);
        return res.send(parsedFile);
    });
});

//Post functions
apiRouter.post("/api/notes", (req, res) => {
    let note = req.body;
    note["id"] = Date.now();
    note["title"] = req.body.title;
    note["text"] = req.body.text;

    // reads from the file
    fs.readFile('./db/db.json', 'utf8', (error, file) => {
        if (error) throw error;

        const parsedFile = JSON.parse(file);
        parsedFile.push(note);

        //makes new stringify of the combined file to write back to file
        const newStringifiedFile = JSON.stringify(parsedFile);

        fs.writeFile('./db/db.json', newStringifiedFile, 'utf8', (err) => {
            if (err) throw err;
            console.log("New note was appeneded to your file.");
        });

        return res.send(JSON.parse(newStringifiedFile));
    });
});

//Delete function

apiRouter.delete("/api/notes/:id", (req, res) => {
    
    fs.readFile('./db/db.json', 'utf8', (error, file) => {
        if (error) throw error;

        let deletedNoteId = req.params.id;

        const parsedFile = JSON.parse(file);

        const newParsedFile = parsedFile.filter(elem => elem.id != deletedNoteId);

        const newStringifiedFile = JSON.stringify(newParsedFile);

        fs.writeFile('./db/db.json', newStringifiedFile, 'utf8', (err) => {
            if (err) throw err;
            console.log("Your note was deleted.");
        });

        return res.send(JSON.parse(newStringifiedFile));
    });
});

module.exports = apiRouter;
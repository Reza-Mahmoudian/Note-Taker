const express = require ('express');
const htmlRoutes = require ("./routes/htmlRoutes");
const apiRoutes = require ("./routes/apiRoutes");

const app = express();
const port = process.env.PORT || 3001
app.use(express.json());
app.use(express.urlencoded({extended:true})) ;
app.use(express.static("public"));

app.use(apiRoutes);
app.use(htmlRoutes);

app.listen(port, ()=>{
    console.log(`Lestining on port ${port}`)
});

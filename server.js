const bodyParse = require('body-parser');
const express = require('express');
const app = express();
const port = 8080;

app.use(bodyParse.urlencoded({extended: true}));
app.use(express.static('client/dist'));

app.listen(port, () => {
	console.log(`Listening in port... ${port}`);
});

import "dotenv/config";

import express from "express";
import exphbs from "express-handlebars";
import routes from './routes/routes.js';
import db from './models/db.js';

const port = process.env.PORT;

const app = express();

app.engine("hbs", exphbs.engine({extname: 'hbs'}));
app.set("view engine", "hbs");
app.set("views", "./views");

app.use(express.static(`public`));

app.use(`/`, routes);

db.connect();

app.listen(port, function () {
    console.log(`Server is running at:`);
    console.log(`http://localhost:` + port);
});

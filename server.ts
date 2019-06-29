import express from 'express';
import bodyParser from 'body-parser';

const app: express.Application = express();
const port: number = +(3000);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.listen(port, () => {
    // Success callback
    console.log(`Listening at http://localhost:${port}/`);
});
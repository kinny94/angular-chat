import * as express from 'express'
import {Application} from 'express';

import {apiGetUserThreads} from "./api/apiGetUserThreads";
import * as bodyParser from 'body-parser';

const app: Application = express();

app.use(bodyParser.json());

apiGetUserThreads(app);


app.listen(8090, () => {
    console.log('Server is now running on port 8090 ...');
});

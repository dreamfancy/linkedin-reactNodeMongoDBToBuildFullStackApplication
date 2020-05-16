// Ch 2.1
// import {env} from  './config';
// import defaultvalue, {logStars} from './config';
// console.log(env);
// console.log(defaultvalue);
// logStars("Chaoyang will progress");

// Ch 2.2
// import https from "https";

// https.get("https://www.ancestry.com", res => {
//     console.log(res.statusCode);
//     res.on("data", chunk => {
//         console.log(chunk.toString());
//     });

// });

//Ch 2.2
// import http from "http";

// const server = http.createServer();
// server.listen(8080);
// server.on("request", (req, res) => {
//     res.write("hello http\n");
//     setTimeout(() => {
//         res.write("I can stream \n");
//         res.end();
//     }, 3000) 
// });

//Ch 2.3

import express from 'express';
import apiRouter from './api';

import sassMiddleware from 'node-sass-middleware';
import path from 'path';
import config from './config';
import serverRender from './serverRender';
import bodyParser from 'body-parser';

const server = express();
server.use(bodyParser.json());

server.use(sassMiddleware({

    src: path.join(__dirname, "sass"),
    dest: path.join(__dirname, "dist")
}
));

server.set('view engine', 'ejs');

server.get(['/', '/contest/:contestId'], (req, res) => {
    serverRender(req.params.contestId)
        .then(({initialMarkup, initialData}) => {
            res.render('index', {initialMarkup, initialData}); // the variables in the {} can be directed called in ejs file
            //console.log('This is content to be pre-rendered', content);
        
        })
        .catch(error => {
            console.error(error);
            res.send(error.toString());
            //res.status(404).send("Bad Request");
        }); 
});

server.use('/api', apiRouter);
server.use(express.static('dist'));

//server.use(express.static('public'));
//server.use('/api', apiRouter);

server.listen(config.port, config.host, () => {   
    console.info("Server is listening on port 3000");
})

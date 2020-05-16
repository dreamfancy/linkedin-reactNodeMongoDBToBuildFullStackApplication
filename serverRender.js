//fetch data from the api

import axios from 'axios';
import config from './config';

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from './src/components/App';


//Note this function returns a promise. Please note how to make a return as/in a promise
// const serverRender = () => 
//     axios.get(`${config.serverUrl}/api/contests`)
//     .then(resp => {
//         //console.log(resp.data);
//          return ReactDOMServer.renderToString(<App initialContests={resp.data.contests}/>);
//     })
//     .catch(e => {
//         console.log(e);
//     });

const getApiUrl = contestId => {

    if(contestId){
        console.log(`${config.serverUrl}/api/contests/${contestId}`);
        return `${config.serverUrl}/api/contests/${contestId}`;
    }
    return `${config.serverUrl}/api/contests`;
}

const getInitialData = (contestId, respData) => {
    if(contestId){
        return {
            currentContestId: respData._id,
            contests: {
                [respData._id]: respData
            }
        };
    }
    return {
        contests: respData.contests
    };
}

const serverRender = (contestId) => {
    return(
        axios.get(getApiUrl(contestId))
        .then(resp => {
            //console.log(resp.data.contests);
            const initialData = getInitialData(contestId, resp.data);
            return {
                initialMarkup: ReactDOMServer.renderToString(<App initialData={initialData}/>),
                initialData: initialData
            };
        })
        .catch(e => {
            console.log('serverRender error');//,e);
        })
    );
}

export default serverRender;

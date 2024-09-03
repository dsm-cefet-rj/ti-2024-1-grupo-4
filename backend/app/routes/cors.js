const express = require('express');
const cors = require('cors');
const app = express();

const whitelist = ['http://localhost:5173','https://localhost:27017','https://localhost:3443','https://localhost:3000']; 
var corsOptionsDelegate = (req, callback) => {
    var corsOptions;
    console.log(req.header('Origin'));
    if(whitelist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true };
    }
    else {
        corsOptions = { origin: false };
    }
    callback(null, corsOptions);
};

exports.cors = cors();
exports.corsWithOptions = cors(corsOptionsDelegate); 

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmJjMTViYzhiMTkyNThhMzM4MzNlNGIiLCJpYXQiOjE3MjM2MDY3MzksImV4cCI6MTcyMzYxMDMzOX0.fGLQq48uU9ogRp7CCNKIfQ9Ag0Wd-k4RDlccjpIQN8A
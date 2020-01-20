const express = require('express');
var action= require('./fex')
var fs = require('fs');
const app = express();
app.listen(3000);
app.get('/list',(req, res) => {action.actions.list(req,res)});
app.get('/test',(req,res) => {fs.createReadStream('html/test.html').pipe(res);});
app.get('/add',(req,res) => {action.actions.add(req,res)});
app.get('/cerca',(req,res) => {action.actions.cerca(req,res)});
app.get('/del',(req,res) => {action.actions.kill(req,res)}); 
app.get('/table',(req,res) =>{action.actions.createTable(req,res)}); 
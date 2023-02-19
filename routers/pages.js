const express = require('express');
const app = express.Router();
const {conn,Page,syncAndSeed} = require('../db');

app.post('/',async(req,res,next) => {
    try{
        const page = await Page.create(req.body);
        res.status(201).send(page);
    }
    catch(ex){
        next(ex);
    }
});
app.delete('/:id',async(req,res,next)=> {
    const page = await Page.findByPk(req.params.id);
    page.destroy();
    res.sendStatus(204);
})
app.put('/:id',async(req,res,next) => {
    try{
        const page = await Page.findByPk(req.params.id);
        await page.update(req.body);
        res.send(page);
    }
    catch(ex){
        next();
    }
});

app.get('/',async(req,res,next)=>{
    try{
        const pages = await Page.findAll({include:[
            {
                model:Page,
                as:'parent'
            },
            {
                model:Page,
                as:'children'
            }
        ]});
        res.send(pages);
    }
    catch(ex){
        next(ex);
    }
});

app.get('/:id', async(req,res,next) => {
    try{
        const page = await Page.findByPk(req.params.id,{include:[
            {
                model:Page,
                as:'parent'
            },
            {
                model:Page,
                as:'children'
            }
        ]})
        res.send(page);
    }
    catch(ex){
        next(ex);
    }
});

module.exports = app;
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const {conn,Page,syncAndSeed} = require('./db');

app.use(express.json());
app.use('/api/pages',require('./routers/pages'));

Page.belongsTo(Page,{as:'parent'});
Page.hasMany(Page,{foreignKey:'parentId',as:'children'});

app.get('/',(req,res,next) => {
    res.redirect('/api/pages/');
})

app.listen(port, async() => {
    syncAndSeed();
    console.log(`listening at port ${port}`);
});
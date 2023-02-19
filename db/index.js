const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_cms_db');

const Page = conn.define('page',{
    name:{
        type:Sequelize.STRING,
        unique:true,
        allowNull:false,
        validate:{
            notEmpty:true
        }
    }
})

const syncAndSeed = async( ) => {
    await conn.sync({force:true});
    const[home,about,founders,products] = await Promise.all([
        Page.create({name:'Home'}),
        Page.create({name:'About'}),
        Page.create({name:'Founders'}),
        Page.create({name:'Prodcuts'})
    ])
    about.parentId = home.id;
    products.parentId = home.id;
    founders.parentId = about.id;
    await Promise.all([
        about.save(),
        products.save(),
        founders.save(),
        Page.create({name:'Shirts',parentId:products.id}),
        Page.create({name:'Socks',parentId:products.id})
    ])
}

module.exports = {
    conn,
    Page,
    syncAndSeed
}
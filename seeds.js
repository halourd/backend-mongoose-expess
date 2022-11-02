const mongoose = require('mongoose')
const Product = require('./models/product')


mongoose.connect('mongodb://0.0.0.0:27017/farmStand')
    .then(() => {
        console.log("Connection open...")
    })
    .catch(err => {
        console.log("Error");
        console.log(err)
    })



const seedProducts = [
    {
        name: 'Melon',
        price: 90,
        category: 'fruit'
    },
    {
        name: 'Eggplant',
        price: 30,
        category: 'vegetable'
    },
    {
        name: 'Apple',
        price: 190,
        category: 'fruit'
    },
    {
        name: 'Orange',
        price: 40,
        category: 'fruit'
    },
    {
        name: 'Pechay',
        price: 60,
        category: 'vegetable'
    },
    {
        name: 'Mily',
        price: 150,
        category: 'dairy'
    }
]

Product.insertMany(seedProducts)
    .then(res => {
        console.log(res)
    })
    .catch(e => {
        console.log(e)
    })

















// const p = Product({
//     name: 'Mango',
//     price: 50,
//     category: 'fruit'
// });

// p.save()
//     .then(p => {
//         console.log(p)
//     })
//     .catch(e => {
//         console.log(e)
//     })
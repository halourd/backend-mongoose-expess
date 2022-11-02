const express = require('express')
const app = express();
const path = require('path')
const mongoose = require('mongoose')
const Product = require('./models/product')
const methodOverride = require('method-override')


mongoose.connect('mongodb://0.0.0.0:27017/farmStand')
    .then(() => {
        console.log("Connection open...");
    })
    .catch(err => {
        console.log("Error")
        console.log(err)
    })

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}))
app.use(methodOverride('__method'));

//View all products
app.get('/products', async (req, res) => {
    const products = await Product.find({})
    res.render('products/index', {products})
})

//Form to create a new product
app.get('/products/new', (req, res) => {
    res.render('products/new');
})


//View details of specific product
app.get('/products/:id', async (req, res) => {
    const {id} = req.params;
    const product = await Product.findById(id)
    console.log(product)
    res.render('products/show', {product})
})


//create new product product
app.post('/products', async (req, res) => {
    const newProduct = new Product(req.body);
    await newProduct.save()
    console.log(newProduct)
    res.redirect(`/products/${newProduct._id}`)
})

//Form to update a new product
app.get('/products/:id/updateProduct', async (req, res) => {
    const {id} = req.params;
    const product = await Product.findById(id)
    res.render('products/edit', {product});
})

//update a product
app.post('/products/:id', async (req, res) => {
    const {id} = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, {runValidators: true, new:true})
    res.redirect(`/products/${product._id}`);

})






app.get('/', (req, res) => {
    res.send('Homepage!')
    console.log('Homepage response trigerred')
})

app.listen(3000, () => {
    console.log('Listening on port 3000 ')
})

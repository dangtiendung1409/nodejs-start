const express = require('express')
const expressHandlebars = require('express-handlebars').engine;
const app = express()

app.engine('handlebars', expressHandlebars({
    defaultLayout: 'main_web.handlebars',
}))

app.set('view engine', 'handlebars')
app.use(express.static(__dirname + '/public'))

const port = process.env.PORT || 3000
app.get('/', (req, res) => res.render('home_web'))
app.get('/about', (req, res) => res.render('about_web'))

app.get('/product', (req, res) => {
    const products = [
        { name: 'Sản phẩm 1', image: '/img/logo1.jpg' },
        { name: 'Sản phẩm 2', image: '/img/logo1.jpg' },
        { name: 'Sản phẩm 3', image: '/img/logo1.jpg' },
        { name: 'Sản phẩm 4', image: '/img/logo1.jpg' },
        { name: 'Sản phẩm 5', image: '/img/logo1.jpg' },
        { name: 'Sản phẩm 6', image: '/img/logo1.jpg' },
        { name: 'Sản phẩm 7', image: '/img/logo1.jpg' },
        { name: 'Sản phẩm 8', image: '/img/logo1.jpg' },
        { name: 'Sản phẩm 9', image: '/img/logo1.jpg' },
        { name: 'Sản phẩm 10', image: '/img/logo1.jpg' },
        { name: 'Sản phẩm 11', image: '/img/logo1.jpg' },
        { name: 'Sản phẩm 12', image: '/img/logo1.jpg' }
    ];
    res.render('product_web', { products: products });
});



app.use((req, res) => {
    res.status(404)
    res.render('404')
})

app.use((err, req, res, next) => {
    console.error(err.message)
    res.status(500)
    res.render('500')
})

app.listen(port, () => console.log(`Express started on http://localhost:${port};` +
    `press Ctrl-C to terminate.`
))
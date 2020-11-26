const express = require('express');
const fs = require('fs');
const cartRouter = require('./cartRouter');
// const itemRouter = require('./itemRouter');
const app = express();

app.use(express.json());
app.use('/', express.static('./public'));
app.use('/api/cart', cartRouter);
// app.use('/api/item', itemRouter);

//отрисовка всех продуктов на главной странице
app.get('/api/products', (req, res) => {
    fs.readFile('./server/db/products.json', 'utf-8', (err, data) => {
        if (err) {
            res.send(JSON.stringify({result: 0, text: err}));
            // res.sendStatus(404, JSON.stringify({result: 0, text: err}));
        } else {
            res.send(data);
        }
    });
});

//запуск порта
const port = process.env.PORT || 5555;

app.listen(port, () => {
    console.log(`Server started at port ${port}`);
});

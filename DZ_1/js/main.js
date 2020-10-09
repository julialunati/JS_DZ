const products = [
  {id: 1, title: 'Notebook', price: 20000},
  {id: 2, title: 'Mouse', price: 1500},
  {id: 3, title: 'Keyboard', price: 5000},
  {id: 4, title: 'Gamepad', price: 4500},
];

const renderProduct = (title, price, img = 'https://placeimg.com/100/100/tech', desc = 'buy now and get 30% off') => {
  return `<div class="product-item">
            <img src="${img}" alt="">
            <h3>${title}</h3>
            <p>${price}</p>
            <p>${desc}</p>
            <button class="by-btn">Добавить в корзину</button>
          </div>`;
};

const renderProducts = (list) => {
  const productList = list.map(item => renderProduct(item.title, item.price));
  console.log(productList.join(" "));
  document.querySelector('.products').innerHTML = productList.join("");
};

renderProducts(products);

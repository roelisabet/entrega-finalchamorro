const btnCart = document.querySelector('.container-icon');
const containerCartProducts = document.querySelector('.container-cart-products');

btnCart.addEventListener('click', () => {
    containerCartProducts.classList.toggle('hidden-card');
});

const cartInfo = document.querySelector('.cart-product');
const rowProduct = document.querySelector('.row-product');
const productsList = document.getElementById('container');
let allProducts = [];
const valorTotal = document.querySelector('.total-pagar');
const countProducts = document.querySelector('#contador-productos');
const cartEmpty = document.querySelector('.cart-empty');
const cartTotal = document.querySelector('.cart-total');
const lista = document.querySelector('#lista-carrito');

agregarEvento();

function agregarEvento() {
    productsList.addEventListener('click', comprarMerch)
    btnCart.addEventListener('click', eliminarMerch)
    

}

function comprarMerch(e) {
    e.deFault();
    if (e.target.classList.contains('btn-add-cart')) {
        const product = e.target.parentElement;
        leerProduct(product);
    }
}

function leerProduct(product) {
    const infoProduct = {
        quantity: 1,
        title: product.querySelector('h2').textContent,
        price: product.querySelector('p').textContent,
    };
    agregarCarrito(infoProduct);
}

function eliminarMerch(e){
    e.deFault();
    let item,
        itemId;

        if (e.target.classList.contains("borrar")){
            e.target.parentElement.parentElement.remove();
            item = e.target.parentElement.parentElement;
            itemId = productItem.querySelector('cart-empty');


            eliminarItem.localStorage(itemId);
            eliminarItem.sessionStorage(itemId);
        }
};

    function agregarCarrito(product){
        const column = document.createElement('tr');
        column.innerHTML= ` 
        
        <td>
        <h2> ${product.nombre}</h2>
        </td>
        <td>
        <p> ${product.precio} </p>

        
        
        `
        lista.appendChild(column);

    }


rowProduct.addEventListener('click', (e) => {
    if (e.target.classList.contains('icon-close')) {
        const product = e.target.parentElement;
        const title = product.querySelector('p').textContent;

        allProducts = allProducts.filter((product) => product.title !== title);



        showHTML(allProducts);

    }

});

const showHTML = (products) => {
    if (!products.length) {
        cartEmpty.classList.remove('hidden');
        rowProduct.classList.add('hidden');
        cartTotal.classList.add('hidden');
    } else {
        cartEmpty.classList.add('hidden');
        rowProduct.classList.remove('hidden');
        cartTotal.classList.remove('hidden');
    }

    rowProduct.innerHTML = '';

    // let total = 0;
    // let totalOfProducts = 0;

}

    document.addEventListener('DOMContentLoaded', function () {
        const containerMerch = document.getElementById("container");
        fetch("data.json")
            .then(response => response.json())
            .then(data => {
                data.forEach((product) => {
                    const containerProduct = document.createElement('div');
                    containerProduct.id = `compra${product.id}`;
                    containerProduct.classList.add('cart-product');
    
                    containerProduct.innerHTML = `
                        <div class="info-cart-product">
                        <img src="./img/${product.id}.webp >
                            <span class="cantidad-producto-carrito">${product.quantity}</span>
                            <p class="titulo-producto-carrito">${product.title}</p>
                            <span class="precio-producto-carrito">${product.price}</span>
                        </div>`;
    
                    containerMerch.appendChild(containerProduct);
                });
            });
    });




document.addEventListener('DOMContentLoaded', () => {


    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    if (storedProducts.length > 0) {
        allProducts = storedProducts;
        showHTML(allProducts);
    }
});




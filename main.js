

const shopContent =document.getElementById("shopContent");
const verCarrito= document.getElementById("verCarrito");
const modalConteiner =document.getElementById("modalConteiner");



let carrito = [];

const carritoGuardado = localStorage.getItem("producto");
if (carritoGuardado) {
    carrito = JSON.parse(carritoGuardado);
}

const getProductos = async() =>{
    const response = await fetch("data.json");
    const data=  await response.json();
    

data.forEach((product) =>{
let content = document.createElement("div");
content.className ="card";


content.innerHTML = `
<img src ="${product.imagen}">
<h3> ${product.nombre}</h3>
<p class ="precio"> ${product.precio} $ </p>
`;
shopContent.append(content);

let comprar = document.createElement("button");
comprar.innerText = "agregar al carrito";
comprar.className = "comprar"

content.append(comprar);

comprar.addEventListener("click", () => {
    carrito.push({
        id: product.id,
        imagen:product.imagen,
        nombre:product.nombre,
        precio:product.precio
        
    });
    saveLocal();
})
});


    const pintarCarrito = () => {

    
    modalConteiner.innerHTML ="";
    modalConteiner.style.display= "flex"
    const modalHeader = document.createElement("div");
    modalHeader.className="modal-header"

    modalHeader.innerHTML= `
    <h1 class ="modal-header-tittle"> carrito </h1>`;

    modalConteiner.append(modalHeader);
    const modalButton = document.createElement("h1");
    modalButton.innerText = "X";
    modalButton.className= "modal-header-button";
    modalButton.addEventListener("click", ()=>{
        modalConteiner.style.display="none";
    });

    modalHeader.append(modalButton);


    carrito.forEach((product, index) =>{


    let carritoContent = document.createElement("div")
    carritoContent.className = "modal-content"

    carritoContent.innerHTML= `
    <img src ="${product.imagen}">
    <h3> ${product.nombre}</h3>
    <p> $ ${product.precio}  </p>
  `;
  modalConteiner.append(carritoContent);

  let eliminar = document.createElement("span");
  eliminar.innerText= " Eliminar ❌";
  eliminar.className = "delete-product";
  carritoContent.append(eliminar);

 eliminar.addEventListener("click",()=> eliminarProducto (index));
});



const total = carrito.reduce((acc,el) => acc + el.precio, 0);
const totalBuying = document.createElement("div");
totalBuying.className = "total-content"
totalBuying.innerHTML= `total a pagar: $ ${total} `;
modalConteiner.append(totalBuying);

};
verCarrito.addEventListener("click", pintarCarrito);


const eliminarProducto = (index) => {
    Swal.fire({
        title: '¿Estás seguro?',
        text: '¡No podrás revertir esto!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, elimínalo'
    }).then((result) => {
        if (result.isConfirmed) {
            carrito.splice(index, 1);
            pintarCarrito();
            saveLocal();
            Swal.fire('Eliminado', 'El producto ha sido eliminado', 'success');
        }
    });
};

}
const saveLocal = () => {
    console.log("Guardando en localStorage:", carrito);
    localStorage.setItem("producto", JSON.stringify(carrito));
};



getProductos();
/---------------------------- fetch---------------------------------/
//  hamburguesas de carne
fetch("../Json/ParteCarnivora.json")
  .then((response) => response.json())
  .then((data) => {
    // MUESTRA LOS PRODUCTOS
    mostrarProductos(data);
  })
  .catch((error) => console.log(error));

//  hamburguesas vegetarianas
fetch("../Json/ParteVegetariana.json")
  .then((response) => response.json())
  .then((data) => {
    mostrarProductos(data);
  })
  .catch((error) => console.log(error));
/---------------------------------CARRITO-----------------------------------/
let productosDelCarrito = [];
const rowSize = 3;

// MUESTRA EL NUMERO DE PRODUCTOS EN EL CARRO
function mostrarNumeroProductos() {
  let numeroProductos = document.getElementById("numeroProductos");
  numeroProductos.textContent = productosDelCarrito.length.toString();
}

// AGREGA UN PRODUCTO AL CARRO
function AgregarAlCarro(producto) {
  productosDelCarrito.push(producto);
  actualizarLocalStorage();
  mostrarCarrito();
  mostrarNumeroProductos();
}

// ELIMINA UN PRODUCTO DEL CARRO
function removeFromCart(index) {
  productosDelCarrito.splice(index, 1);
  actualizarLocalStorage();
  mostrarCarrito();
  mostrarNumeroProductos();
}

// ACTUALIZA EL CARRITO CADA VEZ QUE SE AGREGA ALGO
function mostrarCarrito() {
  let listaPedidos = document.getElementById("listaPedidos");
  listaPedidos.innerHTML = "";
  let total = 0;

  for (let i = 0; i < productosDelCarrito.length; i++) {
    let item = productosDelCarrito[i];

    // LISTA DONDE SE VE EL PRODUCTO COMPRADO
    let listaItem = document.createElement("li");
    listaItem.className = "list-group-item";
    listaItem.textContent = item.nombre + " - $" + item.precio;

    // CREA BOTON DE ELIMINAR
    let removerboton = document.createElement("button");
    removerboton.className = "boton-eliminar";
    removerboton.textContent = "Delete";
    removerboton.addEventListener(
      "click",
      function (index) {
        return function () {
          removeFromCart(index);
        };
      }(i)
    );

    // AGREGA LA LISTA CREADA Y EL BOTON DE ELIMINAR
    listaItem.appendChild(removerboton);
    listaPedidos.appendChild(listaItem);

    total += item.precio;
  }

  // TOTAL DE PRODUCTOS CARGADOS
  let totalPedidos = document.getElementById("totalPedidos");
  totalPedidos.textContent = "El total de productos es: $" + total;
}

/------------------------LOCALSTORAGE---------------------------------------/

// ACTUALIZAR EL LOCALSTORAGE
function actualizarLocalStorage() {
  localStorage.setItem("cartItems", JSON.stringify(productosDelCarrito));
}

// CARGA DE PRDUCTOS DEL LOCALSTORAGE
function cargarLocalStorage() {
  const datosDelCarrito = localStorage.getItem("cartItems");
  if (datosDelCarrito) {
    productosDelCarrito = JSON.parse(datosDelCarrito);
    mostrarCarrito();
  }
  mostrarNumeroProductos();
}

//LLAMA AL BOTON DE ELIMINAR
let eliminarContenido = document.getElementById("eliminar-contenido");

// EVENTO PARA VACIAR EL CARRITO
eliminarContenido.addEventListener("click", function() {
  productosDelCarrito = [];
  actualizarLocalStorage();
  mostrarCarrito();
  mostrarNumeroProductos();
  Swal.fire({
    icon: 'success',
    title: 'Carrito Vaciado con Exito',
  })
});

//BOTON DE COMPRAR
let RealizarCompra = document.getElementById("Comprar-contenido")
RealizarCompra.addEventListener("click", function(){

  productosDelCarrito = [];
  actualizarLocalStorage();
  mostrarCarrito();
  mostrarNumeroProductos();

  Swal.fire({
    icon: 'success',
    title: 'Compra Realizada con Exito!',
    text: 'Su Pedido Esta en Camino!'
  })
});


// MUESTRA LOS PRODUCTOS
function mostrarProductos(productos) {
  let container = document.getElementById("contenedor");
  let row;

  productos.forEach(function (producto, index) {
    if (index % rowSize === 0) {
      row = document.createElement("div");
      row.className = "Fila";
      container.appendChild(row);
    }
    //CREA LA CARD
    let card = document.createElement("div");
    card.className = "body";
    
    //TITULO
    let nombre = document.createElement("h3");
    nombre.className = "titulo";
    nombre.textContent = producto.nombre;
    card.appendChild(nombre);
    
    //IMAGEN
    let imagen = document.createElement("img");
    imagen.className = "imagen";
    imagen.src = producto.imagen;
    card.appendChild(imagen);
    
    //DESCRICION
    let ingredientes = document.createElement("div");
    ingredientes.className = "Descripcion";
    ingredientes.textContent = producto.ingredientes;
    card.appendChild(ingredientes);
    
    //PRECIO
    let precio = document.createElement("div");
    precio.className = "Precio";
    precio.textContent = "$" + producto.precio;
    card.appendChild(precio);
    
    //BOTON AGREGAR
    let botonCompra = document.createElement("button");
    botonCompra.className = "boton-agregar-carro";
    botonCompra.textContent = "Agregar al Carrito";
    card.appendChild(botonCompra);
    

    row.appendChild(card);

    botonCompra.addEventListener("click", function () {
      AgregarAlCarro(producto);
      console.log("Compraste el producto:", producto.nombre );
      Swal.fire({
        icon: 'success',
        title: 'Producto Agregado al Carrito',
      })
    });
  });
}

 
// Cargar los productos del localStorage al cargar la página
window.addEventListener("load", cargarLocalStorage);

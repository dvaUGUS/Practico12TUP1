const menu = document.getElementById("menu");
const enlaces = document.getElementById("enlaces");

menu.addEventListener("click", () => {

    if (enlaces.style.display === "flex") {
        enlaces.style.display = "none";
    } else {
        enlaces.style.display = "flex";
    }

});

actualizarContadorCarrito()

function agregarAlCarrito(producto) {

    let carrito = JSON.parse(sessionStorage.getItem("carrito")) || [];

    const productoExistente = carrito.find(item => item.id === producto.id);

    if (productoExistente) {

        productoExistente.cantidad++;

    } else {

        carrito.push({
            ...producto,
            cantidad: 1
        });

    }

    sessionStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarContadorCarrito()
}

function actualizarContadorCarrito() {

    let carrito = JSON.parse(sessionStorage.getItem("carrito")) || [];

    let cantidadTotal = 0;

    carrito.forEach(producto => {
        cantidadTotal += producto.cantidad;
    });

    const contador = document.getElementById("cart_counter");

    if (contador) {
        contador.textContent = cantidadTotal;
    }
}

function mostrarCarrito() {

    const cartItems = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");
    const finalizarCompra = document.getElementById("finalizarCompra");

    if (!cartItems) {
        return;
    }

    let carrito = JSON.parse(sessionStorage.getItem("carrito")) || [];

    // Limpiamos completamente el contenido del carrito
    cartItems.innerHTML = "";

    // Si el carrito está vacío
    if (carrito.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-cart-message">
                Tu carrito está vacío.
            </p>
        `;

        cartTotal.textContent = "$0";

        if (finalizarCompra) {
            finalizarCompra.disabled = true;
        }

        return;
    }

    // Hay productos
    if (finalizarCompra) {
        finalizarCompra.disabled = false;
    }

    let totalCarrito = 0;

    carrito.forEach(producto => {

        const subtotal = producto.precio * producto.cantidad;

        totalCarrito += subtotal;

        const div = document.createElement("div");
        div.classList.add("cart-item");

        div.innerHTML = `
            <img src="${producto.img}" alt="${producto.nombre}">

            <div>
                <h3>${producto.nombre}</h3>

                <p>Precio unitario: $${producto.precio}</p>

                <div class="cantidad">

                    <button 
                        class="btn-cantidad"
                        data-id="${producto.id}"
                        data-accion="restar">
                        −
                    </button>

                    <span>${producto.cantidad}</span>

                    <button 
                        class="btn-cantidad"
                        data-id="${producto.id}"
                        data-accion="sumar">
                        +
                    </button>

                </div>

                <p>Subtotal: $${subtotal}</p>

                <button 
                    class="btn-eliminar"
                    data-id="${producto.id}">
                    Eliminar
                </button>
            </div>
        `;

        cartItems.appendChild(div);
    });

    cartTotal.textContent = "$" + totalCarrito;


    // Botones + y -
    const botonesCantidad = document.querySelectorAll(".btn-cantidad");

    botonesCantidad.forEach(boton => {

        boton.addEventListener("click", () => {

            const id = Number(boton.dataset.id);
            const accion = boton.dataset.accion;

            cambiarCantidad(id, accion);
        });

    });


    // Botones eliminar
    const botonesEliminar = document.querySelectorAll(".btn-eliminar");

    botonesEliminar.forEach(boton => {

        boton.addEventListener("click", () => {

            const id = Number(boton.dataset.id);

            eliminarDelCarrito(id);
        });

    });
}

function cambiarCantidad(id, accion) {

    let carrito = JSON.parse(sessionStorage.getItem("carrito")) || [];

    const producto = carrito.find(producto => producto.id === id);

    if (!producto) {
        return;
    }

    if (accion === "sumar") {
        producto.cantidad++;
    }

    if (accion === "restar") {

        producto.cantidad--;

        if (producto.cantidad <= 0) {

            carrito = carrito.filter(producto => producto.id !== id);

        }
    }

    sessionStorage.setItem("carrito", JSON.stringify(carrito));

    // Actualizamos inmediatamente la pantalla
    mostrarCarrito();
    actualizarContadorCarrito();
}

function eliminarDelCarrito(id) {

    let carrito = JSON.parse(sessionStorage.getItem("carrito")) || [];

    carrito = carrito.filter(producto => producto.id !== id);

    sessionStorage.setItem("carrito", JSON.stringify(carrito));

    // Actualizamos inmediatamente la pantalla
    mostrarCarrito();
    actualizarContadorCarrito();
}


mostrarCarrito()

function vaciarCarrito() {

    sessionStorage.removeItem("carrito");

    mostrarCarrito();
    location.reload();
}

const btnVaciarCarrito = document.getElementById("btnVaciarCarrito");

if (btnVaciarCarrito) {
    btnVaciarCarrito.addEventListener("click", vaciarCarrito);
}

const finalizarCompra = document.getElementById("finalizarCompra");

if (finalizarCompra) {
    finalizarCompra.addEventListener("click", () => {
        window.location.href = "formulario.html";
    });
}




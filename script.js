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
    const emptyCartMessage = document.getElementById("emptyCartMessage");
    const finalizarCompra = document.getElementById("finalizarCompra");

    // Si no estamos en carrito.html, no hacemos nada
    if (!cartItems) {
        return;
    }

    let carrito = JSON.parse(sessionStorage.getItem("carrito")) || [];

    // Si el carrito está vacío
    if (carrito.length === 0) {

        emptyCartMessage.style.display = "block";
        cartTotal.textContent = "$0";
        finalizarCompra.disabled = true;
        return;
    }else{
        finalizarCompra.disabled = false;
    }

    // Ocultar mensaje de carrito vacío
    emptyCartMessage.style.display = "none";

    let totalCarrito = 0;

    carrito.forEach(producto => {

        // Calcular precio total de este producto
        let totalProducto = producto.precio * producto.cantidad;

        // Acumular para el total general
        totalCarrito += totalProducto;

        const div = document.createElement("div");

        div.classList.add("cart-item");

        div.innerHTML = `
            <img 
                src="${producto.img}" 
                alt="${producto.nombre}"
            >

            <div>
                <h3>${producto.nombre}</h3>

                <p>
                    Cantidad: ${producto.cantidad}
                </p>

                <p>
                    Precio total: 
                    $${totalProducto}
                </p>
            </div>
        `;

        cartItems.appendChild(div);
    });

    // Mostrar total del carrito
cartTotal.textContent = "$" + totalCarrito;
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




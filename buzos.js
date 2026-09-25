const ordenarPrecio = document.getElementById("sort-price");
let productos = [];
fetch("data/productos.json")
    .then(respuesta => respuesta.json())
    .then(data => {
        productos = data;
        mostrarProductos();
    });
function mostrarProductos() {
    const contenedor = document.getElementById("disponible");
    contenedor.innerHTML = "";
    let productosFiltrados = productos.filter(
        producto => producto.categoria === "buzo/campera"
    );
    if (ordenarPrecio.value === "low") {
        productosFiltrados.sort((a, b) => a.precio - b.precio);
    } else {
        productosFiltrados.sort((a, b) => b.precio - a.precio);
    }
    productosFiltrados.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("productos");
        div.innerHTML = `
            <img src="${producto.img}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p>$${producto.precio}</p>
            <button>Agregar al carrito</button>
        `;
        contenedor.appendChild(div);
    });
}
ordenarPrecio.addEventListener("change", mostrarProductos);

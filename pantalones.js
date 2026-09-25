const grillaPantalones = document.getElementById("pantalones");
const grillaCalzado = document.getElementById("calzado");

const filtroCategoria = document.getElementById("filter-category");
const ordenarPrecio = document.getElementById("sort-price");

let productos = [];


fetch("data/productos.json")
    .then(respuesta => respuesta.json())
    .then(data => {

        productos = data;

        mostrarProductos();

    });


function mostrarProductos() {

    // Limpiamos las dos grillas
    grillaPantalones.innerHTML = "";
    grillaCalzado.innerHTML = "";

    let productosFiltrados = productos;


    // Filtrar por categoría
    if (filtroCategoria.value !== "all") {

        productosFiltrados = productosFiltrados.filter(producto =>
            producto.categoria === filtroCategoria.value
        );

    }


    // Ordenar por precio
    if (ordenarPrecio.value === "low") {

        productosFiltrados.sort((a, b) => a.precio - b.precio);

    } else {

        productosFiltrados.sort((a, b) => b.precio - a.precio);

    }


    // Crear los productos
    productosFiltrados.forEach(producto => {

        const article = document.createElement("article");

        article.classList.add("tarjeta_producto");

        article.innerHTML = `
            <img 
                src="${producto.img}" 
                alt="${producto.nombre}" 
                class="imagen_producto"
            >

            <div class="info_producto">

                <h3>${producto.nombre}</h3>

                <p class="precio_producto">
                    $${producto.precio.toLocaleString("es-AR")}
                </p>

                <button class="boton_agregar_carrito">
                    Agregar al carrito
                </button>

            </div>
        `;
            const boton = article.querySelector(".boton_agregar_carrito");

            boton.addEventListener("click", () => {
                agregarAlCarrito(producto);
            });

        if (producto.categoria === "pantalones") {

            grillaPantalones.appendChild(article);

        } else if (producto.categoria === "calzado") {

            grillaCalzado.appendChild(article);

        }

    });


    // Mostrar u ocultar las secciones
    if (filtroCategoria.value === "pantalones") {

        grillaPantalones.parentElement.style.display = "block";
        grillaPantalones.style.display = "grid";
        grillaCalzado.parentElement.style.display = "none";

    } else if (filtroCategoria.value === "calzado") {

        grillaPantalones.parentElement.style.display = "none";
        grillaCalzado.style.display = "grid";
        grillaCalzado.parentElement.style.display = "block";

    } else {

        grillaPantalones.style.display = "grid";
        grillaCalzado.style.display = "grid";
        grillaCalzado.parentElement.style.display = "block";
        grillaPantalones.parentElement.style.display = "block";

    }

}


// Detectar cambios en los filtros
filtroCategoria.addEventListener("change", mostrarProductos);
ordenarPrecio.addEventListener("change", mostrarProductos);
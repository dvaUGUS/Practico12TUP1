fetch("data/productos.json")
    .then(respuesta => respuesta.json())
    .then(productos => {

        const contenedor = document.getElementById("disponible");

        productos
            .filter(producto => producto.categoria === "buzo/campera")
            .forEach(producto => {

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
    });
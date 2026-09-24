const formulario = document.getElementById("checkoutForm");

if (formulario) {

    formulario.addEventListener("submit", function(event) {

        event.preventDefault();

        let valido = true;

        // Obtener los campos
        const nombre = document.getElementById("nombre");
        const apellido = document.getElementById("apellido");
        const email = document.getElementById("email");
        const telefono = document.getElementById("telefono");
        const direccion = document.getElementById("direccion");
        const fechaEntrega = document.getElementById("fechaEntrega");
        const envio = document.getElementById("envio");
        const terminos = document.getElementById("terminos");

        // Limpiar errores anteriores
        document.querySelectorAll(".error-message").forEach(error => {
            error.textContent = "";
        });

        if (nombre.value.trim().length < 2) {

            document.getElementById("error-nombre").textContent =
                "El nombre debe tener al menos 2 caracteres.";

            valido = false;
        }


        if (apellido.value.trim().length < 2) {

            document.getElementById("error-apellido").textContent =
                "El apellido debe tener al menos 2 caracteres.";

            valido = false;
        }

        if (!email.validity.valid) {

            document.getElementById("error-email").textContent =
                "Ingresá un email válido.";

            valido = false;
        }

        const telefonoRegex = /^[0-9]{8,15}$/;

        if (!telefonoRegex.test(telefono.value.trim())) {

            document.getElementById("error-telefono").textContent =
                "El teléfono debe contener entre 8 y 15 números.";

            valido = false;
        }


        if (direccion.value.trim().length < 5) {

            document.getElementById("error-direccion").textContent =
                "La dirección debe tener al menos 5 caracteres.";

            valido = false;
        }


        if (fechaEntrega.value === "") {

            document.getElementById("error-fechaEntrega").textContent =
                "Seleccioná una fecha de entrega.";

            valido = false;
        }

        if (envio.value === "") {

            document.getElementById("error-envio").textContent =
                "Seleccioná una forma de envío.";

            valido = false;
        }

        const pago = document.querySelector(
            'input[name="pago"]:checked'
        );

        if (!pago) {

            document.getElementById("error-pago").textContent =
                "Seleccioná una forma de pago.";

            valido = false;
        }

        if (!terminos.checked) {

            document.getElementById("error-terminos").textContent =
                "Tenés que aceptar los términos y condiciones.";

            valido = false;
        }

        if (!valido) {
            return;
        }


        const carrito =
            JSON.parse(sessionStorage.getItem("carrito")) || [];


        if (carrito.length === 0) {

            alert("No hay productos en el carrito.");

            return;
        }

        let total = 0;

        carrito.forEach(producto => {

            total += producto.precio * producto.cantidad;

        });


        // -------------------------
        // CREAR TEXTO
        // -------------------------

        let texto = "";

        texto += "=====================================\n";
        texto += "          ESTILO UTN\n";
        texto += "          PEDIDO DE COMPRA\n";
        texto += "=====================================\n\n";


        texto += "DATOS DEL CLIENTE\n";
        texto += "-------------------------------------\n";

        texto += `Nombre: ${nombre.value.trim()}\n`;
        texto += `Apellido: ${apellido.value.trim()}\n`;
        texto += `Email: ${email.value.trim()}\n`;
        texto += `Teléfono: ${telefono.value.trim()}\n`;
        texto += `Dirección: ${direccion.value.trim()}\n`;
        texto += `Fecha de entrega: ${fechaEntrega.value}\n`;


        texto += "\nFORMA DE ENVÍO\n";
        texto += "-------------------------------------\n";
        texto += `${envio.options[envio.selectedIndex].text}\n`;


        texto += "\nFORMA DE PAGO\n";
        texto += "-------------------------------------\n";
        texto += `${pago.value}\n`;


        texto += "\nPRODUCTOS\n";
        texto += "-------------------------------------\n";


        carrito.forEach(producto => {

            const subtotal =
                producto.precio * producto.cantidad;

            texto += `Producto: ${producto.nombre}\n`;
            texto += `Cantidad: ${producto.cantidad}\n`;
            texto += `Precio unitario: $${producto.precio}\n`;
            texto += `Subtotal: $${subtotal}\n`;
            texto += "-------------------------------------\n";

        });


        texto += `\nTOTAL: $${total}\n`;

        texto += "\n=====================================\n";
        texto += "       GRACIAS POR TU COMPRA\n";
        texto += "=====================================\n";


        // -------------------------
        // CREAR ARCHIVO TXT
        // -------------------------

        const archivo = new Blob(
            [texto],
            { type: "text/plain;charset=utf-8" }
        );

        const enlace = document.createElement("a");

        enlace.href = URL.createObjectURL(archivo);

        enlace.download = "pedido-estilo-utn.txt";

        enlace.click();

        URL.revokeObjectURL(enlace.href);


        sessionStorage.removeItem("carrito");

        actualizarContadorCarrito();


        alert("¡Pedido confirmado correctamente!");

    });

}
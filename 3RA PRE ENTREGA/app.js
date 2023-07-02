let total = 0;
let carrito = [];

function mostrarZapatillas(zapatillas) {
    const contenedor = document.getElementById("contenedor-zapatillas");
    contenedor.innerHTML = "";

    if (zapatillas.length === 0) {
        const mensaje = document.createElement("p");
        mensaje.textContent =
            "No se encontraron productos con los filtros seleccionados.";
        contenedor.appendChild(mensaje);
    } else {
        let filaDiv;

        for (let i = 0; i < zapatillas.length; i++) {
            const zapatilla = zapatillas[i];

            if (i % 3 === 0) {
                filaDiv = document.createElement("div");
                filaDiv.classList.add("row", "justify-content-center");
                contenedor.appendChild(filaDiv);
            }

            const divZapatilla = document.createElement("div");
            divZapatilla.classList.add("col-lg-4", "zapatilla");
            divZapatilla.innerHTML = `
                <img class="zapatillas" src="${zapatilla.imagen}" alt="${zapatilla.modelo}">
                <p>Marca: ${zapatilla.marca}</p>
                <p>Modelo: ${zapatilla.modelo}</p>
                <p>Precio: $${zapatilla.precio}</p>
                <button class="btn-agregar" data-id="${zapatilla.id}">Agregar al carrito</button>
              `;
            filaDiv.appendChild(divZapatilla);
        }

        const botonesAgregar = document.getElementsByClassName("btn-agregar");
        for (let i = 0; i < botonesAgregar.length; i++) {
            botonesAgregar[i].addEventListener("click", agregarAlCarrito);
        }
    }
}

function agregarAlCarrito(event) {
    const zapatillaId = parseInt(event.target.dataset.id);
    const zapatilla = zapatillas.find((z) => z.id === zapatillaId);

    if (zapatilla) {
        const productoExistente = carrito.find((p) => p.id === zapatillaId);
        if (productoExistente) {
            productoExistente.cantidad++;
        } else {
            zapatilla.cantidad = 1;
            carrito.push(zapatilla);
        }

        total += zapatilla.precio;
        mostrarCarrito();
        mostrarTotal();

        Swal.fire({
            icon: "success",
            title: "Producto agregado al carrito",
            text: `${zapatilla.marca} ${zapatilla.modelo} se ha agregado al carrito de compras.`,
            confirmButtonText: "OK",
        });
    }
}

function eliminarDelCarrito(event) {
    const zapatillaId = parseInt(event.target.dataset.id);
    const index = carrito.findIndex((z) => z.id === zapatillaId);

    if (index !== -1) {
        const zapatilla = carrito[index];
        carrito.splice(index, 1);
        total -= zapatilla.precio * zapatilla.cantidad;
        mostrarCarrito();
        mostrarTotal();
    }
}

function disminuirCantidad(event) {
    const zapatillaId = parseInt(event.target.dataset.id);
    const zapatilla = carrito.find((item) => item.id === zapatillaId);

    if (zapatilla && zapatilla.cantidad > 1) {
        zapatilla.cantidad--;
        total -= zapatilla.precio;
        mostrarCarrito();
        mostrarTotal();
    }
}

function aumentarCantidad(event) {
    const zapatillaId = parseInt(event.target.dataset.id);
    const zapatilla = carrito.find((item) => item.id === zapatillaId);

    if (zapatilla) {
        zapatilla.cantidad++;
        total += zapatilla.precio;
        mostrarCarrito();
        mostrarTotal();
    }
}

function mostrarTotal() {
    const totalElemento = document.getElementById("total");
    totalElemento.textContent = "$" + total.toFixed(2);
}

document.getElementById("btn-filtrar").addEventListener("click", function () {
    const marcasSeleccionadas = obtenerMarcasSeleccionadas();
    const tallesSeleccionados = obtenerTallesSeleccionados();

    fetch("zapatillas.json")
        .then((response) => response.json())
        .then((data) => {
            const zapatillas = filtrarZapatillas(
                data,
                marcasSeleccionadas,
                tallesSeleccionados
            );
            mostrarZapatillas(zapatillas);
        })
        .catch((error) => {
            console.error("Error al cargar los datos:", error);
        });
});

function obtenerMarcasSeleccionadas() {
    const marcas = document.querySelectorAll(
        'input[type="checkbox"][value][id^="marca-"]:checked'
    );
    const marcasSeleccionadas = Array.from(marcas).map((marca) => marca.value);
    return marcasSeleccionadas;
}

function obtenerTallesSeleccionados() {
    const talles = document.querySelectorAll(
        'input[type="checkbox"][value][id^="talle-"]:checked'
    );
    const tallesSeleccionados = Array.from(talles).map((talle) =>
        parseInt(talle.value)
    );
    return tallesSeleccionados;
}

function filtrarZapatillas(
    zapatillas,
    marcasSeleccionadas,
    tallesSeleccionados
) {
    return zapatillas.filter((zapatilla) => {
        const marcaSeleccionada =
            marcasSeleccionadas.length === 0 ||
            marcasSeleccionadas.some((marca) => marca === zapatilla.marca);
        const talleSeleccionado =
            tallesSeleccionados.length === 0 ||
            tallesSeleccionados.includes(zapatilla.talle);

        return marcaSeleccionada && talleSeleccionado;
    });
}

document.querySelector("form").addEventListener("submit", function (event) {
    event.preventDefault();
    const searchTerm = document
        .querySelector("input[type='search']")
        .value.trim();
    fetch("zapatillas.json")
        .then((response) => response.json())
        .then((data) => {
            const resultados = buscarProductos(data, searchTerm);
            mostrarZapatillas(resultados);
        })
        .catch((error) => {
            console.error("Error al cargar los datos:", error);
        });
});

function buscarProductos(zapatillas, searchTerm) {
    const resultados = zapatillas.filter((zapatilla) => {
        const marcaCoincide = zapatilla.marca
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        const modeloCoincide = zapatilla.modelo
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        return marcaCoincide || modeloCoincide;
    });
    return resultados;
}

fetch("zapatillas.json")
    .then((response) => response.json())
    .then((data) => {
        zapatillas = data;
        mostrarZapatillas(zapatillas);
    })
    .catch((error) => {
        console.error("Error al cargar los datos:", error);
    });

function mostrarCarrito() {
    const carritoElemento = document.getElementById("contenedor-carrito");
    carritoElemento.innerHTML = "";

    carrito.forEach((zapatilla) => {
        const divZapatilla = document.createElement("div");
        divZapatilla.classList.add("zapatilla-carrito");
        divZapatilla.innerHTML = `
              <img class="zapatillas" src="${zapatilla.imagen}" alt="${zapatilla.modelo}">
              <p>Marca: ${zapatilla.marca}</p>
              <p>Modelo: ${zapatilla.modelo}</p>
              <p>Precio: $${zapatilla.precio}</p>
              <p>Cantidad: ${zapatilla.cantidad}</p>
              <button class="btn-eliminar" data-id="${zapatilla.id}">Eliminar</button>
              <button class="btn-disminuir" data-id="${zapatilla.id}">-</button>
              <button class="btn-aumentar" data-id="${zapatilla.id}">+</button>
            `;

        divZapatilla
            .querySelector(".btn-eliminar")
            .addEventListener("click", eliminarDelCarrito);
        divZapatilla
            .querySelector(".btn-disminuir")
            .addEventListener("click", disminuirCantidad);
        divZapatilla
            .querySelector(".btn-aumentar")
            .addEventListener("click", aumentarCantidad);

        carritoElemento.appendChild(divZapatilla);
    });

    if (carrito.length === 0) {
        const mensaje = document.createElement("p");
        mensaje.textContent = "El carrito está vacío.";
        carritoElemento.appendChild(mensaje);
    }
}

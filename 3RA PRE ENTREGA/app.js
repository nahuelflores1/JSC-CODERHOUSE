const zapatillas = [
    {
        id: 1,
        marca: "Nike",
        talle: 40,
        modelo: "Air Max 90",
        precio: 150,
        imagen: "./img/airmax.jpg",
    },
    {
        id: 2,
        marca: "Adidas",
        talle: 42,
        modelo: "Superstar",
        precio: 120,
        imagen: "./img/superstar.jpg",
    },
    {
        id: 3,
        marca: "Puma",
        talle: 41,
        modelo: "Suede Classic",
        precio: 100,
        imagen: "./img/pumasuede.jpg",
    },
    {
        id: 4,
        marca: "Jordan",
        talle: 39,
        modelo: "Retro 4 Georgetown",
        precio: 340,
        imagen: "./img/retro4.jpg",
    },
    {
        id: 5,
        marca: "Jordan",
        talle: 40,
        modelo: "Red 1 Mid",
        precio: 650,
        imagen: "./img/airjordan.jpg",
    },
    {
        id: 6,
        marca: "Adidas",
        talle: 42,
        modelo: "Forum",
        precio: 140,
        imagen: "./img/forum.jpg",
    },
    {
        id: 7,
        marca: "Nike",
        talle: 41,
        modelo: "Air Max 97",
        precio: 220,
        imagen: "./img/97airmaxx.jpg",
    },
    {
        id: 8,
        marca: "Adidas",
        talle: 42,
        modelo: "Yezzy",
        precio: 330,
        imagen: "./img/yisi.jpg",
    },
    {
        id: 9,
        marca: "Nike",
        talle: 43,
        modelo: "Air Force",
        precio: 140,
        imagen: "./img/airforce.jpg",
    },
    {
        id: 10,
        marca: "Puma ",
        talle: 40,
        modelo: "Future",
        precio: 140,
        imagen: "./img/futurepuma.jpg",
    },
];

let total = 0;
let carrito = [];
let contadorCarrito = 0;

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
        contadorCarrito++;
        mostrarCarrito();
        mostrarTotal();
        mostrarContadorCarrito();
        mostrarAnimacion("Zapatilla agregada al carrito.");
    }
}

function eliminarDelCarrito(event) {
    const zapatillaId = parseInt(event.target.dataset.id);
    const index = carrito.findIndex((z) => z.id === zapatillaId);

    if (index !== -1) {
        const zapatilla = carrito[index];
        carrito.splice(index, 1);
        total -= zapatilla.precio;
        contadorCarrito--;
        mostrarCarrito();
        mostrarTotal();
        mostrarContadorCarrito();
    }
}

function mostrarCarrito() {
    const contenedorCarrito = document.getElementById("contenedor-carrito");
    contenedorCarrito.innerHTML = "";

    for (let i = 0; i < carrito.length; i++) {
        const zapatilla = carrito[i];
        const divZapatilla = document.createElement("div");
        divZapatilla.classList.add("zapatilla-carrito");
        divZapatilla.innerHTML = `
        <img class="zapatilla-carrito-img" src="${zapatilla.imagen}" alt="${zapatilla.modelo}">
        <div class="zapatilla-carrito-info">
            <p class="zapatilla-carrito-marca">${zapatilla.marca}</p>
            <p class="zapatilla-carrito-modelo">${zapatilla.modelo}</p>
            <p class="zapatilla-carrito-precio">$${zapatilla.precio}</p>
            <div class="zapatilla-carrito-cantidad">
                <button class="btn-disminuir" data-id="${zapatilla.id}">-</button>
                <p style="padding:0px 10px"> ${zapatilla.cantidad}</p>
                <button class="btn-aumentar" data-id="${zapatilla.id}">+</button>
            </div>
        </div>
        <button class="btn-quitar" data-id="${zapatilla.id}">Eliminar</button>
      `;
        contenedorCarrito.appendChild(divZapatilla);
    }

    const botonesQuitar = document.getElementsByClassName("btn-quitar");
    for (let i = 0; i < botonesQuitar.length; i++) {
        botonesQuitar[i].addEventListener("click", eliminarDelCarrito);
    }

    const botonesDisminuir = document.getElementsByClassName("btn-disminuir");
    for (let i = 0; i < botonesDisminuir.length; i++) {
        botonesDisminuir[i].addEventListener("click", disminuirCantidad);
    }

    const botonesAumentar = document.getElementsByClassName("btn-aumentar");
    for (let i = 0; i < botonesAumentar.length; i++) {
        botonesAumentar[i].addEventListener("click", aumentarCantidad);
    }
}

function eliminarDelCarrito(event) {
    const zapatillaId = parseInt(event.target.dataset.id);
    const index = carrito.findIndex((z) => z.id === zapatillaId);

    if (index !== -1) {
        const zapatilla = carrito[index];
        carrito.splice(index, 1);
        total -= zapatilla.precio * zapatilla.cantidad;
        contadorCarrito -= zapatilla.cantidad;
        mostrarCarrito();
        mostrarTotal();
        mostrarContadorCarrito();
    }
}

function disminuirCantidad(event) {
    const zapatillaId = parseInt(event.target.dataset.id);
    const zapatilla = carrito.find((item) => item.id === zapatillaId);

    if (zapatilla && zapatilla.cantidad > 1) {
        zapatilla.cantidad--;
        total -= zapatilla.precio;
        contadorCarrito--;
        mostrarCarrito();
        mostrarTotal();
        mostrarContadorCarrito();
    }
}

function aumentarCantidad(event) {
    const zapatillaId = parseInt(event.target.dataset.id);
    const zapatilla = carrito.find((item) => item.id === zapatillaId);

    if (zapatilla) {
        zapatilla.cantidad++;
        total += zapatilla.precio;
        contadorCarrito++;
        mostrarCarrito();
        mostrarTotal();
        mostrarContadorCarrito();
    }
}

function mostrarTotal() {
    const totalElemento = document.getElementById("total");
    totalElemento.textContent = "$" + total.toFixed(2);
}

function mostrarContadorCarrito() {
    const contadorCarritoElemento = document.getElementById("contador-carrito");
    contadorCarritoElemento.textContent = contadorCarrito;
}

function mostrarAnimacion(mensaje) {
    const animacion = document.getElementById("animacion");
    animacion.textContent = mensaje;
    animacion.classList.add("mostrar");

    setTimeout(() => {
        animacion.classList.remove("mostrar");
    }, 3000);
}

document.getElementById("btn-filtrar").addEventListener("click", function () {
    const marcasSeleccionadas = obtenerMarcasSeleccionadas();
    const tallesSeleccionados = obtenerTallesSeleccionados();

    const zapatillasFiltradas = filtrarZapatillas(
        marcasSeleccionadas,
        tallesSeleccionados
    );

    mostrarZapatillas(zapatillasFiltradas);
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

function filtrarZapatillas(marcasSeleccionadas, tallesSeleccionados) {
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
    const resultados = buscarProductos(searchTerm);
    mostrarZapatillas(resultados);
});

function buscarProductos(searchTerm) {
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

mostrarZapatillas(zapatillas);
mostrarTotal();
mostrarContadorCarrito();

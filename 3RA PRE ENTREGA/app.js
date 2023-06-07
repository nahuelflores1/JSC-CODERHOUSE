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
];

let total = 0;
let carrito = [];

function mostrarZapatillas(zapatillas) {
    const contenedor = document.getElementById("contenedor-zapatillas");
    contenedor.innerHTML = "";

    for (let i = 0; i < zapatillas.length; i++) {
        const zapatilla = zapatillas[i];
        const divZapatilla = document.createElement("div");
        divZapatilla.classList.add("zapatilla");
        divZapatilla.innerHTML = `
        <img class="zapatillas" src="${zapatilla.imagen}" alt="${zapatilla.modelo}">
        <p>Marca: ${zapatilla.marca}</p>
        <p>Modelo: ${zapatilla.modelo}</p>
        <p>Precio: $${zapatilla.precio}</p>
        <button class="btn-agregar" data-id="${zapatilla.id}">Agregar al carrito</button>
      `;
        contenedor.appendChild(divZapatilla);
    }

    const botonesAgregar = document.getElementsByClassName("btn-agregar");
    for (let i = 0; i < botonesAgregar.length; i++) {
        botonesAgregar[i].addEventListener("click", agregarAlCarrito);
    }
}

function agregarAlCarrito(event) {
    const zapatillaId = parseInt(event.target.dataset.id);
    const zapatilla = zapatillas.find((z) => z.id === zapatillaId);

    if (zapatilla) {
        carrito.push(zapatilla);
        total += zapatilla.precio;
        mostrarCarrito();
        mostrarTotal();
        mostrarAnimacion("Zapatilla agregada al carrito.");
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
        <img class="zapatilla-imagen" src="${zapatilla.imagen}" alt="${zapatilla.modelo}">
        <div>
        <p>Marca: ${zapatilla.marca}</p>
        <p>Modelo: ${zapatilla.modelo}</p>
        <p>Precio: $${zapatilla.precio}</p>
        </div>
    `;
        contenedorCarrito.appendChild(divZapatilla);
    }
}

function mostrarTotal() {
    const totalElement = document.getElementById("total");
    totalElement.textContent = `Total: $${total.toFixed(2)}`;
}

function mostrarAnimacion(mensaje) {
    Swal.fire({
        position: "top-end",
        icon: "success",
        title: mensaje,
        showConfirmButton: false,
        timer: 1500,
    });
}

document.getElementById("btn-filtrar").addEventListener("click", function () {
    const marcasSeleccionadas = obtenerMarcasSeleccionadas();
    const tallesSeleccionados = obtenerTallesSeleccionados();

    const zapatillasFiltradas = filtrarZapatillas(
        marcasSeleccionadas,
        tallesSeleccionados
    );

    if (zapatillasFiltradas.length === 0) {
        mostrarZapatillas(zapatillas);
    } else {
        mostrarZapatillas(zapatillasFiltradas);
    }
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
            marcasSeleccionadas.includes(zapatilla.marca);
        const talleSeleccionado =
            tallesSeleccionados.length === 0 ||
            tallesSeleccionados.includes(zapatilla.talle);
        return marcaSeleccionada && talleSeleccionado;
    });
}

mostrarZapatillas(zapatillas);
mostrarTotal();

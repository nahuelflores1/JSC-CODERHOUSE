const zapatillas = [
    { id: 1, marca: "Nike", talle: 40, modelo: "Air Max 90", precio: 150 },
    { id: 2, marca: "Adidas", talle: 42, modelo: "Superstar", precio: 120 },
    { id: 3, marca: "Puma", talle: 41, modelo: "Suede Classic", precio: 100 },
    { id: 4, marca: "Nike", talle: 39, modelo: "Air Force 1", precio: 160 },
    { id: 5, marca: "Adidas", talle: 43, modelo: "Stan Smith", precio: 110 },
    { id: 6, marca: "Reebok", talle: 38, modelo: "Classic Leather", precio: 90 },
    { id: 7, marca: "New Balance", talle: 41, modelo: "574", precio: 130 },
    { id: 8, marca: "Converse", talle: 40, modelo: "Chuck Taylor All Star", precio: 80 },
    { id: 9, marca: "Vans", talle: 42, modelo: "Old Skool", precio: 95 },
    { id: 10, marca: "Under Armour", talle: 43, modelo: "HOVR Phantom", precio: 140 },
];

function mostrarZapatillas(zapatillas) {
    const contenedor = document.getElementById("contenedor-zapatillas");
    contenedor.innerHTML = "";

    for (let i = 0; i < zapatillas.length; i++) {
        const zapatilla = zapatillas[i];
        const divZapatilla = document.createElement("div");
        divZapatilla.classList.add("zapatilla");
        divZapatilla.innerHTML = `
        <p>Marca: ${zapatilla.marca}</p>
        <p>Talle: ${zapatilla.talle}</p>
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
        let carrito = obtenerCarrito();
        carrito.push(zapatilla);
        guardarCarrito(carrito);
        mostrarCarrito();
        mostrarAnimacion("Zapatilla agregada al carrito.");
    }
}

function obtenerCarrito() {
    const carritoJSON = localStorage.getItem("carrito");
    return carritoJSON ? JSON.parse(carritoJSON) : [];
}

function guardarCarrito(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function mostrarCarrito() {
    const carrito = obtenerCarrito();
    const contenedorCarrito = document.getElementById("contenedor-carrito");
    contenedorCarrito.innerHTML = "";

    if (carrito.length === 0) {
        const mensajeCarritoVacio = document.createElement("p");
        mensajeCarritoVacio.textContent = "El carrito está vacío.";
        contenedorCarrito.appendChild(mensajeCarritoVacio);
    } else {
        for (let i = 0; i < carrito.length; i++) {
            const zapatilla = carrito[i];
            const divZapatilla = document.createElement("div");
            divZapatilla.classList.add("zapatilla");
            divZapatilla.innerHTML = `
          <p>Marca: ${zapatilla.marca}</p>
          <p>Talle: ${zapatilla.talle}</p>
          <p>Modelo: ${zapatilla.modelo}</p>
          <p>Precio: $${zapatilla.precio}</p>
        `;
            contenedorCarrito.appendChild(divZapatilla);
        }
    }
}

function filtrarZapatillas() {
    const marcasSeleccionadas = obtenerMarcasSeleccionadas();
    const tallesSeleccionados = obtenerTallesSeleccionados();

    const zapatillasFiltradas = zapatillas.filter((zapatilla) => {
        return (
            (marcasSeleccionadas.length === 0 ||
                marcasSeleccionadas.includes(zapatilla.marca)) &&
            (tallesSeleccionados.length === 0 ||
                tallesSeleccionados.includes(zapatilla.talle))
        );
    });

    mostrarZapatillas(zapatillasFiltradas);
}

function obtenerMarcasSeleccionadas() {
    const marcasCheckbox = document.querySelectorAll(
        'input[type="checkbox"][id^="marca-"]:checked'
    );
    const marcasSeleccionadas = Array.from(marcasCheckbox).map(
        (checkbox) => checkbox.value
    );
    return marcasSeleccionadas;
}

function obtenerTallesSeleccionados() {
    const tallesCheckbox = document.querySelectorAll(
        'input[type="checkbox"][id^="talle-"]:checked'
    );
    const tallesSeleccionados = Array.from(tallesCheckbox).map((checkbox) =>
        parseInt(checkbox.value)
    );
    return tallesSeleccionados;
}

function mostrarAnimacion(mensaje) {
    Swal.fire({
        icon: "success",
        title: mensaje,
        showConfirmButton: false,
        timer: 1500,
    });
}

mostrarZapatillas(zapatillas);
guardarCarrito([]);
mostrarCarrito();

document
    .getElementById("btn-filtrar")
    .addEventListener("click", filtrarZapatillas);

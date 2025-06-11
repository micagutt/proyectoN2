function iniciarMagia() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Hechizo completo");
        }, 2000); // 2 segundos de animación
    });
}

iniciarMagia().then(() => {
    const loader = document.getElementById("polvoDeHadas");
    const content = document.getElementById("magical-content");
    if (loader && content) {
        loader.classList.remove("visible");
        loader.classList.add("hidden");
        content.classList.remove("hidden");
        content.classList.add("visible");
    }
});

// Cambia a la imagen de Disney
const imagenesLocales = {
    "Irwina Allen": "assets/img/disney-logo.png",
    "Abdullah": "assets/img/disney-logo.png",
    "Ashcan and Pete": "assets/img/disney-logo.png",
    "Baby Panda": "assets/img/disney-logo.png",
    "Anthony Biddle": "assets/img/disney-logo.png",
};

// Array de personajes humanos y animados
const personajesHumanos = [
    "Irwina Allen",
    "Abdullah",
    "Anthony Biddle",
    "Admiral Boom and Mr. Binnacle",
    "Candace Adams",
    "Aspen",
    "Athena",
    "Aunt Em",
    "Marta Balatico",
    "Michael Banks",
    "Alan Coleman",
    "Captain Anderson",
    "Apaches",
];
const personajesAnimados = [
    "Ashcan and Pete",
    "Baby Panda",
    "Achilles",
    "Abigail the Cow",
    ".GIFfany",
    "90's Adventure Bear",
    "Ahadi",
    "Al Muddy Sultan",
    "Ambrose",
    "Amos",
    "Arabella Smith",
    "Queen Ariel",
    "Arthur and Cecil",
    "Fiona Ashbury",
    "Astuto",
    "Aviarius",
    "Prince Axel",
    "Butter Otter",
    "Mr. Baldwin",
    "Baloo",
    "Banshee",
    "Baron Blitz",
    "Sir Bart",
    "Bernice Beachmont",
    "Beardini the Pirate Magician",
    "Beheaded Knight",
    "Alma",
    "Captain Amelia",
    "Erica Ange",
    "Angela",
    "Apothecary Gary",
    "Aqua",
    "Archibald Smelding",
    "Mr. Arrow",
    "Queen Athena",
];

let todosLosPersonajes = [];

function crearTarjetaPersonaje(character) {
    const imagenPersonalizada = imagenesLocales[character.name];
    const imageUrl = imagenPersonalizada || character.imageUrl?.trim();
    if (!imageUrl) return null;

    const img = document.createElement("img");
    img.src = imageUrl;
    img.alt = character.name;
    img.onerror = function () {
        img.onerror = null;
        img.src = "assets/img/disney-logo.png";
    };

    const card = document.createElement("div");
    card.className = "card";

    const name = document.createElement("h2");
    name.textContent = character.name;

    const p = document.createElement("p");
    const a = document.createElement("a");
    a.href = `personaje.html?id=${character._id}`;
    a.textContent = "Ver más";
    p.appendChild(a);

    card.appendChild(img);
    card.appendChild(name);
    card.appendChild(p);

    return card;
}

// Mustra la lista de los personajes
function mostrarPersonajes(lista) {
    const container = document.getElementById("character-container");
    container.innerHTML = "";
    lista.forEach(character => {
        const card = crearTarjetaPersonaje(character);
        if (card) container.appendChild(card);
    });
}

async function getCharacters() {
    const container = document.getElementById("character-container");
    try {
        const response = await fetch("https://api.disneyapi.dev/character");
        const data = await response.json();
        todosLosPersonajes = data.data;
        mostrarPersonajes(todosLosPersonajes); // Muestra todos por defecto
    } catch (error) {
        console.error("Error al obtener los personajes: ", error);
        container.textContent = "Error al cargar personajes.";
    }
}

// evento para los filtros
function activarFiltro(btn) {
    // unifica todo a una clase eliminando las clases de los botones
    document.querySelectorAll("#btn-todos, #btn-humanos, #btn-animados").forEach(b => {
        b.classList.remove("filtro-activo");
    });
    // agrega la clase al botón seleccionado
    btn.classList.add("filtro-activo");
}

// por defecto activa "todos"
const btnTodos = document.getElementById("btn-todos");
if (btnTodos) {
    activarFiltro(btnTodos); 
    btnTodos.addEventListener("click", function () {
        mostrarPersonajes(todosLosPersonajes);
        activarFiltro(this);
    });
}

const btnHumanos = document.getElementById("btn-humanos");
if (btnHumanos) {
    btnHumanos.addEventListener("click", function () {
        mostrarPersonajes(todosLosPersonajes.filter(p => personajesHumanos.includes(p.name)));
        activarFiltro(this);
    });
}

const btnAnimados = document.getElementById("btn-animados");
if (btnAnimados) {
    btnAnimados.addEventListener("click", function () {
        mostrarPersonajes(todosLosPersonajes.filter(p => personajesAnimados.includes(p.name)));
        activarFiltro(this);
    });
}


if (document.getElementById("character-container")) {
    getCharacters();
}

// animación
function lanzarDestelloMagico() {
    // lado aleatorio: 0 = izq, 1 = der
    const lado = Math.random() < 0.5 ? "left" : "right";
    const top = Math.random() * 90 + 5; // entre 5% y 95% de alto
    const destello = document.createElement("span");
    destello.className = "destello";
    destello.style[lado] = "10px";
    destello.style.top = `${top}vh`;

    document.body.appendChild(destello);

    // elimina el destello cuando termina la animación
    destello.addEventListener("animationend", () => {
        destello.remove();
    });
}

// lanza destellos mágicos cada 350ms
setInterval(lanzarDestelloMagico, 350);

// parte personaje.html
if (window.location.pathname.includes("personaje.html")) {
    const contenedor = document.getElementById("character-detail");
    const params = new URLSearchParams(window.location.search); // lee los signos que estan despues de ? en la URL
    const id = params.get("id");

    async function getCharacterById(id) {
        try {
            const response = await fetch(`https://api.disneyapi.dev/character/${id}`);
            const data = await response.json();
            const character = data.data;

            const imagenPersonalizada = imagenesLocales[character.name];
            const imageUrl = imagenPersonalizada || character.imageUrl?.trim();

            contenedor.innerHTML = `
            <div class="personaje-detalle">
                <h1>${character.name}</h1>
                <img src="${imageUrl}" alt="${character.name}">
                <p><strong>Películas:</strong> ${character.films.join(", ") || "No tiene película"}</p>
                <p><strong>Series:</strong> ${character.tvShows.join(", ") || "No tiene serie"}</p>
                <p><strong>Videojuego:</strong> ${character.videoGames.join(", ") || "No aparece en ningún videojuego"}</p>
                <p><strong>Atracción:</strong> ${character.parkAttractions.join(", ") || "No tiene ninguna atracción"}</p>
                <p><strong>Enemigos:</strong> ${character.enemies.join(", ") || "No tiene enemigos"}</p>
            </div>
            `;
        } catch (error) {
            alert("No puede cargar la info del personaje");// Por si llega a haber un error
            console.error("Error al obtener el personaje: ", error);
        }
    }

    if (id) {
        getCharacterById(id);
    } else {
        alert("No se encuentra el ID");
    }
}
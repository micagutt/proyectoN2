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

  loader.classList.remove("visible");
  loader.classList.add("hidden");

  content.classList.remove("hidden");
  content.classList.add("visible");
});

// Relaciona nombres o IDs con imágenes locales
const imagenesLocales = {
    "Irwina Allen": "assets/img/disney-logo.png",
    "Abdullah": "assets/img/disney-logo.png",
    "Ashcan and Pete": "assets/img/disney-logo.png",
    "Baby Panda": "assets/img/disney-logo.png",
    "Anthony Biddle": "assets/img/disney-logo.png",
};

if (document.getElementById("character-container")) {
    getCharacters();
}

async function getCharacters() { //función asincrónica usando async 
    const container = document.getElementById("character-container");

    try {
        const response = await fetch("https://api.disneyapi.dev/character"); // el await espera la respuesta de la API
        const data = await response.json(); // lo convierto a objeto de js
        const characters = data.data; // data: lo que contiene el array de los personajes en la API

        characters.forEach(character => { //recorre los personajes 1 por 1
            // Si tienes imágenes por nombre:
            const imagenPersonalizada = imagenesLocales[character.name];
            // Si prefieres por ID: const customImage = customImages[character._id];

            const imageUrl = imagenPersonalizada || character.imageUrl?.trim();
            if (!imageUrl) return;

            const img = document.createElement("img");
            img.src = imageUrl;
            img.alt = character.name;

            img.onerror = function () {
                img.onerror = null;
                img.src = "assets/img/disney-logo.png";
            };

            const card = document.createElement("div"); //creo la tarjeta
            card.className = "card"; //hago que tome el css

            const name = document.createElement("h2"); //titulo de las tarjetas
            name.textContent = character.name;

            // Creo el enlace para ver la página del personaje
            const p = document.createElement("p");
            const a = document.createElement("a");
            a.href = `personaje.html?id=${character._id}`; // Enlace con id dinámico
            a.textContent = "Ver más";
            p.appendChild(a);

            card.appendChild(img);
            card.appendChild(name);
            card.appendChild(p); // Agrega el <p> con el <a> a la tarjeta


            img.onload = () => {
                container.appendChild(card);
            }


        });
    } catch (error) {
        console.error("Error al obtener los personajes: ", error);
        container.innerHTML = "<p>Error al cargar personajes.</p>";
    }
}

// Ejecutar solo si estamos en personaje.html
if (window.location.pathname.endsWith("personaje.html")) {
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
                <h1>${character.name}</h1>
                <img src="${imageUrl}" alt="${character.name}">
                <p><strong>Películas:</strong> ${character.films.join(", ") || "Solo tiene serie"}</p>
                <p><strong>Series:</strong> ${character.tvShows.join(", ") || "Solo tiene película"}</p>
                <p><strong>Videojuego:</strong> ${character.videoGames.join(", ") || "No aparece en ningún videojuego"}</p>
                
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
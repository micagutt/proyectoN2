const container = document.getElementById("character-container");

async function getCharacters() { //función asincrónica usando async 
    try {
        const response = await fetch("https://api.disneyapi.dev/character"); // el await espera la respuesta de la API
        const data = await response.json(); // lo convierto a objeto de js
        const characters = data.data; // data: lo que contiene el array de los personajes en la API

        characters.forEach(character => { //recorre los personajes 1 por 1

            const imageUrl = character.imageUrl?.trim();
            if (!imageUrl) return;

            const img = document.createElement("img");
            img.src = imageUrl;
            img.alt = character.name;

            img.onerror = function () {
                img.src = "https://www.salvatorepumo.it/wp-content/uploads/2021/09/disney-logo.png";
            };

            const card = document.createElement("div"); //creo la tarjeta
            card.className = "card"; //hago que tome el css

            const name = document.createElement("h2"); //titulo de las tarjetas
            name.textContent = character.name;
            
            const button = document.createElement("button");//Creo boton 
            button.textContent = "Ver más"; //Texto dek boton
            button.className = "ver-mas"; //Estilar en css
            button.addEventListener("click", () => {
                 window.location.href = `personaje.html?id=${character._id}`; //Abre pagina con otra informacion
            })

            card.appendChild(img);
            card.appendChild(name);
            card.appendChild(button);


            img.onload = () => {
                container.appendChild(card);
            }


        });
    } catch (error) {
        console.error("Error al obtener los personajes: ", error);
        container.innerHTML = "<p>Error al cargar personajes.</p>";
    }
}

getCharacters();
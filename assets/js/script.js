const container = document.getElementById("character-container");

async function getCharacters() { //función asincrónica usando async 
  try {
    const response = await fetch("https://api.disneyapi.dev/character"); // el await espera la respuesta de la API
    const data = await response.json(); // lo convierto a objeto de js
    const characters = data.data; // data: lo que contiene el array de los personajes en la API

    characters.forEach(character => { //recorre los personajes 1 por 1
      const card = document.createElement("div"); //creo la tarjeta
      card.className = "card"; //hago que tome el css

      const img = document.createElement("img"); // tomo las imagenes sinó que use una del placeholder
      img.src = character.imageUrl || "https://via.placeholder.com/150";
      img.alt = character.name;

      const name = document.createElement("h2"); //titulo de las tarjetas
      name.textContent = character.name;

      card.appendChild(img);
      card.appendChild(name);
      container.appendChild(card);
    });
  } catch (error) {
    console.error("Error al obtener los personajes: ", error);
    container.innerHTML = "<p>Error al cargar personajes.</p>";
  }
}

getCharacters();
const resultDom = null || document.querySelector("#content");
const API = "https://dragon-ball-super-api.herokuapp.com/api/characters";

const searchInput = document.querySelector("#searchInput");
const selectedSpecieBtn = document.querySelector("#selectedSpecie");

//connection to API
const fetchData = async (urlAPi) => {
  const response = await fetch(urlAPi);
  const data = await response.json();
  return data;
};

async function filterCharactersBySpecie() {
  const characters = await fetchData(API);
  switch (selectedSpecieBtn.value) {
    case "Saiyan":
      let saiyans = [];
      characters.map((character) => {
        if (character.specie === "Saiyan") {
          saiyans.push(character);
        }
      });
      paintView(saiyans);
      break;
    case "Yardatiano":
      let yardatiano = [];
      characters.map((character) => {
        if (character.specie === "Yardatiano") {
          yardatiano.push(character);
        }
      });
      paintView(yardatiano);
      break;
    case "Angel":
      let angel = [];
      characters.map((character) => {
        if (character.specie === "Angel") {
          angel.push(character);
        }
      });
      paintView(angel);
      break;
    case "Unknow":
      let unknow = [];
      characters.map((character) => {
        if (character.specie === "Desconocido") {
          unknow.push(character);
        }
      });
      paintView(unknow);
      break;
    case "Ciborg":
      let ciborg = [];
      characters.map((character) => {
        if (character.specie === "Ciborg") {
          ciborg.push(character);
        }
      });
      paintView(ciborg);
      break;
    case "Fusion":
      let fusion = [];
      characters.map((character) => {
        if (character.specie === "Fusion") {
          fusion.push(character);
        }
      });
      paintView(fusion);
      break;
    default:
      //return all
      paintView(characters);
      break;
  }
}

function paintView(filter) {
  try {
    let view = `
    ${filter
      .map(
        (character) => `
        <div class=" max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
        <div class="h-80 bg-orange-400 p-2">
            <img class="h-full m-auto rounded-t-lg" src="${character.imageUrl}" alt="${character.name}" />
        </div>
        <div class="p-5">
            <a href="#">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${character.name}</h5>
            </a>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">${character.name} belongs to the ${character.specie}, he/she is currently  ${character.status} his/her main role is  ${character.role} </p>
        </div>
        </div>
    `
      )
     // .slice(0, 100) //if you dont want to saw all data
      .join("")}
    `;

    resultDom.innerHTML = view;
  } catch (error) {
    return console.log(new Error(error));
  }
}


async function searchCharacter () {
  const characters = await fetchData(API);
    let suggestions = [];
  console.log("hello")
    characters.map((character) => {
      let contain = character.name
      if (contain.includes(`${searchInput.value}`)) {
        suggestions.push(character);
      }
    paintView(suggestions);
  })
};

//listeners
filterCharactersBySpecie(); //for first time.
selectedSpecieBtn.addEventListener("change", filterCharactersBySpecie);
searchInput.addEventListener("keydown",searchCharacter);
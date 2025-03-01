const input = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");
const namePokemon = document.getElementById("pokemon-name");
const imageContainer = document.getElementById("img-container");
const id = document.getElementById("pokemon-id");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const types = document.getElementById("types");
const baseStats = Array.from(document.querySelectorAll(".base-stats"));

const getInput = () => input.value

const regex = /[!@#$%^&*()-+_`~=]+/g;

const cleanInput = () => {
    let userGiven = getInput();
    userGiven = userGiven.toLowerCase();
    userGiven = userGiven.replace(regex, "");
    userGiven = userGiven.trim();
    userGiven = userGiven.replaceAll(" ", "-");
    userGiven = userGiven.replace("♀", "-f");
    userGiven = userGiven.replace("♂", "-m");
    return userGiven;
}

const getDetails = async () => {
    namePokemon.textContent = "";
    id.textContent = "";
    weight.textContent = "";
    height.textContent = "";
    imageContainer.innerHTML = "";
    types.innerHTML = "";
    baseStats.forEach (p => {
        p.textContent = "";
    })
    const insert = cleanInput();
    try {
        const response = await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${insert}`);
        const data = await response.json();
        namePokemon.textContent = data.name.toUpperCase();
        id.textContent = `#${data.id}`;
        weight.textContent = `Weight: ${data.weight}`;
        height.textContent = `Height: ${data.height}`;
        imageContainer.innerHTML = `<img src="${data.sprites.front_default}" id="sprite" alt="${data.name}'s image">`;
        let typesArr = data.types;
        typesArr.forEach(obj => {
            types.innerHTML += `<span class="card ${obj.type.name}">${obj.type.name.toUpperCase()}</span>`;
        })
        let i = 0;
        baseStats.forEach(p => {
            p.textContent = `${data.stats[i].base_stat}`
            i++;
        })
    }
    catch (error) {
        alert("Pokémon not found");
    }
}

searchBtn.addEventListener("click", getDetails);


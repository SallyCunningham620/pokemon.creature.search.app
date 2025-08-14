/*JS*/

const pokemonID = document.getElementById('pokemon-id');
const pokemonName = document.getElementById('pokemon-name');
const spriteContainer = document.getElementById('sprite-container');
const types = document.getElementById('types');
const height = document.getElementById('height');
const weight = document.getElementById('weight');
const hp = document.getElementById('hp');
const attack = document.getElementById('attack');
const defense =document.getElementById('defense');
const specialAttack = document.getElementById('special-attack');
const specialDefense = document.getElementById('special-defense');
const speed = document.getElementById('speed');
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

//enter Pokemon info convert to lower case and create URI search
//call getPokemon()
function loadPokemon() {
    let pokemonNameOrId = searchInput.value.trim();
    console.log(pokemonNameOrId);
    if(isNaN(pokemonNameOrId)) pokemonNameOrId = pokemonNameOrId.toLowerCase();
    const URI = `https://pokeapi.co/api/v2/pokemon/${pokemonNameOrId}`;
    console.log(pokemonNameOrId);
    getPokemon(URI, pokemonNameOrId);
}

//asynch fetch of data
const getPokemon = async (URI, pokemonNameOrId) => {
    console.log(URI);
    try {
        const response = await fetch(URI);
        if(!response.ok || !pokemonNameOrId || pokemonNameOrId <= 0 || pokemonNameOrId >= 1026) {
            throw `Please only numbers between 1 and 1025 or type the name correctly`
        }
        const data = await response.json();
        console.log(data);
        console.log(`${data.name}`);
        console.log(pokemonName);
        //Pokemon info fill in
        pokemonName.textContent = `${data.name.toUpperCase()}`;
        console.log(pokemonName);
        pokemonID.textContent = `#${data.id}`;
        weight.textContent = `Weight: ${data.weight}`;
        height.textContent = `Height: ${data.height}`;
        spriteContainer.innerHTML = `<img id="sprite" src="${data.sprites.front_default}" alt="${data.name} front default sprite">`;

        //Stats fill in
        hp.textContent = data.stats[0].base_stat;
        attack.textContent = data.stats[1].base_stat;
        defense.textContent = data.stats[2].base_stat;
        specialAttack.textContent = data.stats[3].base_stat;
        specialDefense.textContent = data.stats[4].base_stat;
        speed.textContent = data.stats[5].base_stat;

        //Set types
        types.innerHTML = data.types.map(obj => `<span class="type ${obj.type.name}">${obj.type.name}</span>`)
        .join(''); 

        searchInput.value = '';
    } catch (error) {
        resetDisplay();
        alert('Pokémon not found')
        console.log(`Pokémon not found ${error}`);
    }
}

//reset stats
const resetDisplay = () => {
    const sprite = document.getElementById('sprite');
    if (sprite) sprite.remove();

    pokemonName.textContent = '';
    pokemonID.textContent = '';
    types.innerHTML = '';
    height.textContent = '';
    weight.textContent = '';
    hp.textContent = '';
    attack.textContent = '';
    defense.textContent = '';
    specialAttack.textContent = '';
    specialDefense.textContent = '';
    speed.textContent = '';
    searchInput.value = '';
}

//click Search Form Button
searchForm.addEventListener('submit', e => {
    e.preventDefault();
    loadPokemon();
})
/**
 * A function that generates the text for a given pokemon's card.
 * Will only use the first 1 or 2 types, a pokemon with more will have index 2 and over ignored.
 *
 * @param {pokemon} pokemon A pokemon object
 * @returns {string} The string to be put on that pokemon's card
 */
const generateCardText = (pokemon) => {
  let string;
  switch (pokemon.types.length) {
    case 1:
      string = `${pokemon.name} (#${pokemon.id}) is a ${pokemon.types[0]} type pokemon.`;
      break;

    default:
      string = `${pokemon.name} (#${pokemon.id}) is a ${pokemon.types[0]} and ${pokemon.types[1]} type pokemon.`;
      break;
  }
  return string;
};

/**
 * A function that creates the div element for a given pokemon's card.
 *
 * @param {pokemon} pokemon A pokemon object
 * @returns {element} The card div element
 */
const generateCardDiv = (pokemon) => {
  // Convert the first character of the name to upper case
  pokemon.name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);

  const div = document.createElement("div");
  div.classList.add("card");

  const img = document.createElement("img");
  img.classList.add("card__image");
  img.src = pokemon.sprite;
  img.alt = `Image of ${pokemon.name}`;

  div.appendChild(img);
  div.innerHTML += `
      <h2 class="card__heading">${pokemon.name}</h2>
      <p class="card__text">${generateCardText(pokemon)}</p>
      `;
  return div;
};

/**
 * A function that renders an array of pokemon onto the page.
 *
 * @param {array} pokemonArray An array of pokemon
 * @returns {} Nothing
 */
const renderPokemon = (pokemonArray) => {
  // Create a deep copy of the array, so that we can edit it without
  // ruining the global version. e.g. When we capitalize the first character
  // of every pokemons name.
  let pokemons = structuredClone(pokemonArray);
  // Clear any existing cards from the container
  cardContainer.innerHTML = "";
  // Populate the container with new cards for each pokemon
  pokemons.forEach((pokemon) => {
    cardContainer.appendChild(generateCardDiv(pokemon));
  });
};

/**
 * A function that performs a search and displays the results.
 *
 * @param {event} event The form submit event
 * @returns {} Nothing
 */
const handleFormSubmit = (event) => {
  event.preventDefault();
  // All the pokemon data is in lower case, so by making the search term
  // lower case, we make the search case insensitive.
  const searchTerm = event.target[0].value.toLowerCase();
  const searchTermArray = searchTerm.split(" ");
  searchTermArray.push(event.target[1].value.toLowerCase());
  let results = [];
  searchTermArray.forEach((term) => {
    results = results.concat(
      pokemonArray.filter(
        (p) => (p.name.includes(term) || p.types.includes(term)) && term
      )
    );
  });
  // Remove duplicates by using the Set class
  renderPokemon([...new Set(results)]);
};

const clearFilter = () => {
  renderPokemon(pokemonArray);
  searchForm.reset();
};

// Global variables
const cardContainer = document.querySelector(".card-container");
const searchForm = document.querySelector(".search-form");
const clearFilterButton = document.querySelector(".clear-filter-button");
import pokemonArray from "./data/pokemon.js";

// Setup event listeners
searchForm.addEventListener("submit", handleFormSubmit);
clearFilterButton.addEventListener("click", clearFilter);

// As soon as the page loads, render the full list
renderPokemon(pokemonArray);

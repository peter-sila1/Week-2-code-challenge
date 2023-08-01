// const animalsContainer = document.querySelector('.animals-container');
// const rankingContainer = document.createElement('div');
// rankingContainer.classList.add('ranking');

// const character =document.  getElementById("character bar")

// // Function to display animal cards
// function displayAnimalCards(animals) {
//   animals.forEach(animal => {
//     const animalCard = document.createElement('div');
//     animalCard.classList.add('animal-card');
//     animalCard.innerHTML = `
//       <img src="${animal.image}" alt="${animal.name}">
//       <h2>${animal.name}</h2>
//       <p>Votes: ${animal.votes}</p>
//       <button data-animal-id="${animal.id}" class="vote-btn">Vote</button>
//     `;
//     animalsContainer.appendChild(animalCard);
//   });
// }

// // Function to update vote count for an animal
// function updateVoteCount(animalId) {
//     fetch(`http://localhost:3000/animals/${animalId}`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ votes: 1 }), // Assuming one vote per click
//     })
//     .then(response => response.json())
//   .then(updatedAnimal => {
//     const voteElement = document.querySelector(`[data-animal-id="${animalId}"]`).previousElementSibling;
//     voteElement.textContent = `Votes: ${updatedAnimal.votes}`;
//   })
//   .catch(error => {
//     console.error('Error updating vote count:', error);
//   });
// }


// // Function to fetch animal data from the local server
// function fetchAnimalData() {
//     fetch('http://localhost:3000/animals')
//       .then(response => response.json())
//       .then(data => {
//         // Check if the data is an array
//         if (Array.isArray(data.animals)) {
//           // Display animal data on the web page
//           displayAnimalCards(data.animals);
//           // Add event listeners for vote buttons
//         const voteButtons = document.querySelectorAll('.vote-btn');
//         voteButtons.forEach(button => {
//           button.addEventListener('click', () => {
//             const animalId = button.getAttribute('data-animal-id');
//             updateVoteCount(animalId);
//           });
//         });
//         // Calculate and display the ranking of animals based on vote counts
//         data.animals.sort((a, b) => b.votes - a.votes);
//         let ranking = 'Ranking:<br>';
//         data.animals.forEach((animal, index) => {
//           ranking += `${index + 1}. ${animal.name} - Votes: ${animal.votes}<br>`;
//         });
//         rankingContainer.innerHTML = ranking;
//         animalsContainer.appendChild(rankingContainer);
//       } else {
//         console.error('Error: Invalid data format. Expected an array of an array of animals.');
//     }
//   })
//   .catch(error => {
//     console.error('Error fetching data:', error);
//   });
// }

// // Fetch and display animal data on page load
// fetchAnimalData();


const character = document.getElementById('character-bar');
const animalName = document.getElementById('name');
const image = document.getElementById('image');
const form = document.getElementById('votes-form');
const animalVotes = document.getElementById('vote-count');
const input = document.getElementById('votes');
const resetVotes = document.getElementById('reset-btn');
let currentAnimal;
resetVotes.style.cursor = 'pointer';

//endpoint added to the base URL
function getCharacters () {
  fetch('http://localhost:3000/characters/')
    .then(response => response.json())
    .then(renderAnimals);
}

// function that accesses all the elements
function renderAnimals (animals) {
  animals.forEach(renderCharacters);
}

// function that accesses individual elements and show their data
function renderCharacters (animal) {
  const spanEle = document.createElement('span');
  spanEle.innerHTML = animal.name;
  spanEle.style.cursor = 'pointer';
  character.appendChild(spanEle);
  spanEle.addEventListener('click', () => {
    currentAnimal = animal;
    showAnimal(animal);
  });
}

// This displays data about the animal selected
function showAnimal (animal) {
  animalName.innerHTML = animal.name;
  image.src = animal.image;
  animalVotes.innerHTML = animal.votes;
}
getCharacters();

form.addEventListener('submit', (e) => {
  e.preventDefault();
  currentAnimal.votes += parseInt(e.target.votes.value);
  showAnimal(currentAnimal);
  form.reset();
});

//reset votes button 
resetVotes.addEventListener('click', () => {
  currentAnimal.votes = 0;
  showAnimal(currentAnimal);
});
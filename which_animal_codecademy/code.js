const animal = ["Panda", "Manatee", "Wombat", "Koala bear", "Tapir"];
const country = [
  "South Africa",
  "Australia",
  "Canada",
  "New Zealand",
  "the United States",
];
const location = [
  "in the jungle",
  "at the beach",
  "on a tree",
  "in the mountains",
  "in the ocean",
];

const randomAnimal = animal[Math.floor(Math.random() * animal.length)];
const randomCountry = country[Math.floor(Math.random() * country.length)];
const randomLocation = location[Math.floor(Math.random() * location.length)];

console.log(
  `In your next life you will be a ${randomAnimal} living in ${randomCountry} ${randomLocation}!`
);


//testing ASCII

/*const animalArr = [];

function getCharCodes(s) = {
    let animalASC = [];
    
    for (let i = 0; i < s.length; i++) {
        let code = s.charCodeAt(i);
        animalASC.push(code);
    }

    return animalASC; // returns array with ASC code for one animal
} */



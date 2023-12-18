# People in Space Tracker
This repository contains a web application that tracks the number of astronauts currently in space, which spacecraft they are aboard, and displays their names. It utilizes data from the Open Notify API.

## Logic Overview
The core functionality of this application revolves around fetching and displaying data from the Open Notify API, dynamically creating interface elements, and handling user interactions.

1. Defining Spacecrafts
```js
const spaceCrafts = [
  { craft: 'ISS', name: 'ISS' },
  { craft: 'Tiangong', name: 'Tiangong' },
  { craft: 'All', name: 'All' },
];
```
spaceCrafts is an array of objects, where each object represents a spacecraft (ISS, Tiangong) and an 'All' option.

2. Creating Buttons for Each Spacecraft
```js
function craftButton(craft, name) {
  const button = document.createElement('button');
  button.textContent = name;
  button.type = 'button';
  button.addEventListener('click', () => {
    renderAstronauts(craft);
  });
  return button;
}

spaceCrafts.forEach(({ craft, name }) => {
  const button = craftButton(craft, name);
  document.body.append(button);
});
```
craftButton is a function that creates a button element for each spacecraft. It sets the button's text to the spacecraft's name and adds an event listener that calls renderAstronauts with the craft's name when clicked.
The forEach loop iterates over each spacecraft in spaceCrafts and appends the created buttons to the body of the document.

3. Selecting the Display Element
```ja
const peopleInSpace = document.querySelector('[data-js="people-in-space"]');
```
This selects the HTML element that will display the number of people in space (identified by the data-js="people-in-space" attribute).

4. Function: renderAstronauts
```js
async function renderAstronauts(craft) {
  const peoplePerSpaceCraft = await fetchPeopleInSpace(craft);
  const numberOfPeoplePerCraft = peoplePerSpaceCraft.length;
  // Conditional display logic and list generation
}
```

- Purpose: This function, triggered when a spacecraft button is clicked, displays the number of astronauts and their names for the selected craft.
- Process:
   - Fetching Data: Calls fetchPeopleInSpace asynchronously with the selected craft as the argument, which returns an array of astronauts on that craft.
   - Conditional Text Content Update: Based on the craft selected and the number of astronauts, the textContent of the peopleInSpace element is updated:
   - If no astronauts are on the selected craft, it displays a message indicating no one is currently on that craft.
   - Otherwise, it displays the number of people on the selected craft, with specific messages for 'All', 'ISS', and 'Tiangong'.
- List Management:
    - Removes any existing astronaut list (ul) from the DOM.
    - Creates a new ul element and appends li elements for each astronaut's name, updating the DOM to reflect the current astronaut data.

5. Function: fetchPeopleInSpace
```js
async function fetchPeopleInSpace(craft) {
  try {
    // API request and response handling
  } catch (error) {
    // Error handling
  }
}
```
- Purpose: Fetches and returns astronaut data from the Open Notify API, filtered by the selected spacecraft.
- Process: API Request: Makes an asynchronous fetch call to the Open Notify API (http://api.open-notify.org/astros.json).
- Response Handling:
    - On a successful response, parses the JSON data.
    - Filters the people array from the response based on the selected craft. If 'All' is selected, returns the entire list of astronauts; otherwise, returns astronauts specific to the chosen craft.
- Error Handling: Catches and alerts any errors encountered during the fetch operation.


And that's a wrap ✨

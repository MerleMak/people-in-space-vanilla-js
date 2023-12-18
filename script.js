const crafts = [
  { craft: 'ISS', name: 'ISS' },
  { craft: 'Tiangong', name: 'Tiangong' },
  { craft: 'All', name: 'All' },
];

const peopleInSpace = document.querySelector('[data-js="people-in-space"]');

function craftButton(craft, name) {
  const button = document.createElement('button');
  button.textContent = name;
  button.type = 'button';
  button.addEventListener('click', () => {
    renderAstronauts(craft);
  });
  return button;
}

crafts.forEach(({ craft, name }) => {
  const button = craftButton(craft, name);
  document.body.append(button);
});

async function renderAstronauts(craft) {
  const peoplePerCraft = await fetchPeopleInSpace(craft);
  const numberOfPeoplePerCraft = peoplePerCraft.length;
  if (numberOfPeoplePerCraft === 0) {
    peopleInSpace.textContent = `There are no people on ${craft} right now`;
  } else {
    if (craft === 'All') {
      peopleInSpace.textContent = `People in Space right now: ${numberOfPeoplePerCraft}`;
    }
    if (craft === 'ISS') {
      peopleInSpace.textContent = `People on ISS right now: ${numberOfPeoplePerCraft}`;
    }
    if (craft === 'Tiangong') {
      peopleInSpace.textContent = `People on Tiangong right now: ${numberOfPeoplePerCraft}`;
    }
  }

  const existingList = document.querySelector('ul');
  existingList?.remove();

  const listOfAstronauts = document.createElement('ul');
  peoplePerCraft.forEach((person) => {
    const nameofAstronaut = document.createElement('li');
    nameofAstronaut.textContent = person.name;
    listOfAstronauts.appendChild(nameofAstronaut);
  });
  document.body.appendChild(listOfAstronauts);
}

async function fetchPeopleInSpace(craft) {
  try {
    const response = await fetch('http://api.open-notify.org/astros.json');
    if (!response.ok) {
      throw new Error(response.status);
    }
    const peopleInSpace = await response.json();
    return craft === 'All'
      ? peopleInSpace.people
      : peopleInSpace.people.filter((astronaut) => astronaut.craft === craft);
  } catch (error) {
    alert(`Error: ${error.message}`);
  }
}

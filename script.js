const peopleInSpace = document.querySelector('[data-js="people-in-space"]');

async function fetchPeopleInSpace() {
  try {
    const response = await fetch('http://api.open-notify.org/astros.json');
    if (!response.ok) {
      throw new Error(response.status);
    }

    const peopleInSpace = await response.json();
    return peopleInSpace;
  } catch (error) {
    alert(`Es ist leider ein Fehler aufgetreten: ${error.message}`);
  }
}

async function renderAstronauts() {
  const data = await fetchPeopleInSpace();
  peopleInSpace.textContent = data.number;

  const listOfAstronauts = document.createElement('ul');
  data.people.map((person) => {
    const nameofAstronaut = document.createElement('li');
    nameofAstronaut.textContent = person.name;
    listOfAstronauts.append(nameofAstronaut);
  });
  document.body.append(listOfAstronauts);
}

renderAstronauts();

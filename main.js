const baseURL = 'https://swapi.dev/api/people/';
const characters = document.querySelectorAll('#characters li');
const buttons = document.querySelectorAll('input');
const detailLists = document.querySelectorAll('#details footer ul');

let page;
let characterInfo;

const pageViewer = () => {
  return parseInt(document.querySelector('footer').textContent);
};

const dataFetching = async (pageNumber) => {
  fetch(`${baseURL}?page=${page}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Error in fetching data', +response.statusText);
      } else {
        return response.json();
      }
    })
    .then((data) => {
      characterInfo = data.results;
      printOutNames(characters, characterInfo);
      return characterInfo;
    })
    .catch((error) => {
      console.log('Fetch error:', error);
    });
};

const printOutNames = (characters, names) => {
  names.forEach((name, index) => {
    characters[index].textContent = name.name;
  });
};

const printOutInfo = (character) => {
  const infoList = document.querySelectorAll('#details ul li span');
  document.querySelector('#details h2').textContent = character.name;
  infoList.forEach((listItem) => {
    listItem.textContent = character[listItem.id];
  });
};

const printOutAssets = (character) => {
  buttons.forEach((btn) => {
    const fieldOfChoice = btn.id;
    if (character[fieldOfChoice].length > 0) {
      if (Array.isArray(character[fieldOfChoice])) {
        character[fieldOfChoice].forEach((item) => {
          fetchAssets(item);
        });
      } else {
      }
    } else {
      console.log('Ingen data');
    }
  });
};

const fetchAssets = async (link) => {};

characters.forEach((character) => {
  character.addEventListener('click', function () {
    charName = this.textContent;
    thisChar = characterInfo.find((character) => character.name === charName);

    printOutInfo(thisChar);
    printOutAssets(thisChar);
  });
});

buttons.forEach((btn) => {
  btn.addEventListener('click', () => {
    if (btn.checked) {
      detailLists.forEach((list) => {
        if (list.classList.contains(btn.id)) {
          list.classList.remove('hidden');
        } else {
          list.classList.add('hidden');
        }
      });
    }
  });
});

page = pageViewer();
characterInfo = dataFetching(page);

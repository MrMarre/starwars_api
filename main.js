const baseURL = 'https://swapi.dev/api/people/';
const characters = document.querySelectorAll('#characters li');
const buttons = document.querySelectorAll('input');


let page;
let characterInfo; //holding data for first 10 characters(page1)

//for displaying current page in first footer
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
// Prints out names 
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
  const listItemsToClear = Array.from(document.querySelectorAll(".details footer ul li, .details footer ul h3, .details footer ul li span"));

  listItemsToClear.forEach(item => {
    item.textContent = '';
  });

  buttons.forEach((btn) => {
    const fieldOfChoice = btn.id;
    if (character[fieldOfChoice].length > 0) {
      if (Array.isArray(character[fieldOfChoice])) {
        character[fieldOfChoice].forEach((item) => {
          fetchAssets(item, fieldOfChoice);
        });
      } else {
        fetchAssets(character[fieldOfChoice], fieldOfChoice)
      }
    } else {
      console.log('Ingen data');
    }
  });
};

//homeworld(url), species[], vehicles[], starships[]
const fetchAssets = async (link, specifics) => {
  fetch(link)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Server error:', +response.statusText);
      } else {
        return response.json();
      }
    })

    .then((data) => {
      console.log(specifics, data.name);
      const ulFieldName = document.querySelector(
        `article footer .${specifics} .name`
      );
      const listItems = document.querySelectorAll(
        `article footer .${specifics} li span`
      );
      
      ulFieldName.textContent += (ulFieldName.textContent ? ', ' : '') + data.name;


      listItems.forEach(field => {
        field.textContent += (field.textContent ? ', ' : '') + data[field.id];
      })
    })
    .catch((error) => console.log(error));
};

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
      const detailLists = document.querySelectorAll('.details footer ul');
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

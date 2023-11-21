// Defining DOM-elements
const baseURL = 'https://swapi.dev/api/people/';
const characters = document.querySelectorAll('#characters li');
const buttons = document.querySelectorAll('input');
const detailLists = document.querySelectorAll('.details footer ul');
const pageSwappers = document.querySelectorAll('.page-swapper');

// Creation of global variables
let page;
let characterInfo; //holding data for first 10 characters(page1)

// Function to properly handle different pages
const pageViewer = () => {
  return parseInt(document.querySelector('#page-index').textContent);
};

// Function to fetch data based on pagenumber
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
      characterInfo = data.results; // Results is a key inside the object
      console.log(characterInfo)
      printOutNames(characters, characterInfo);
      console.log(characters)
      return characterInfo;
    })
    .catch((error) => {
      console.log('Fetch error:', error);
    });
};

// Function to render all character-names to list
const printOutNames = (characters, names) => {
  names.forEach((name, index) => {
    characters[index].textContent = name.name;
    console.log(name.name)
  });
};

// Function to print out all the basic information about chosen character
const printOutInfo = (character) => {
  const infoList = document.querySelectorAll('#details ul li span');
  document.querySelector('#details h2').textContent = character.name;
  infoList.forEach((listItem) => {
    listItem.textContent = character[listItem.id];
  });
};
// From the function above we call this to get the proper fetch-method and then printing it out in the correct field
const printOutAssets = (character) => {
  // Clear all the fields from old data
  const listItemsToClear = Array.from(
    document.querySelectorAll(
      '.details footer ul h3, .details footer ul li span'
    )
  );
  listItemsToClear.forEach((item) => {
    item.textContent = '';
  });
  // Alot of ifs to find where the correct data should be placed and which to see.
  buttons.forEach((btn) => {
    const fieldOfChoice = btn.id;

    if (character[fieldOfChoice].length > 0) {
      if (Array.isArray(character[fieldOfChoice])) {
        character[fieldOfChoice].forEach((item) => {
          fetchAssets(item, fieldOfChoice);
        });
      } else {
        fetchAssets(character[fieldOfChoice], fieldOfChoice);
      }
    } else {
      const ulFieldName = document.querySelector(
        `article footer .${fieldOfChoice} .name`
      );
      const listItems = document.querySelectorAll(
        `article footer .${fieldOfChoice} li span`
      );

      ulFieldName.textContent = 'N/A';
      listItems.forEach((field) => {
        field.textContent = 'N/A';
      });
    }
  });
};

// Sort and push detail-data from the chosen character
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
      const ulFieldName = document.querySelector(
        `article footer .${specifics} .name`
      );
      const listItems = document.querySelectorAll(
        `article footer .${specifics} li span`
      );

      // If the field has data then use ',' else just put the data
      ulFieldName.textContent +=
        (ulFieldName.textContent ? ', ' : '') + data.name;
      listItems.forEach((field) => {
        field.textContent += (field.textContent ? ', ' : '') + data[field.id];
      });
    })
    .catch((error) => console.log(error));
};

// EventListener to choose which character to see the details about
characters.forEach((character) => {
  character.addEventListener('click', function () {
    charName = this.textContent;
    thisChar = characterInfo.find((character) => character.name === charName);

// If character-text is clicked, run functions below this comment
    printOutInfo(thisChar);
    printOutAssets(thisChar);
  });
});

// EventListener to hide and show different type of details
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

// EventListener to handle pages
pageSwappers.forEach((swapper) => {
  swapper.addEventListener('click', () => {
    if (swapper.id === 'higher') {
      page++;
    } else {
      page--;
    }
    dataFetching(page);
    document.querySelector('#page-index').textContent = page;
  });
});

page = pageViewer();
characterInfo = dataFetching(page);

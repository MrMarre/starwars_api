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
  loaderFunction('characters', 'add');
  fetch(`${baseURL}?page=${page}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Error in fetching data', +response.statusText);
      } else {
        return response.json();
      }
    })
    .then((data) => {
      loaderFunction('characters', 'remove');
      characterInfo = data.results; // Results is a key inside the object
      printOutNames(characters, characterInfo);
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
  });
};

// Function to print out all the basic information about chosen character
const printOutInfo = (character) => {
  const infoList = document.querySelectorAll('#details ul li span');
  document.querySelector('#details h2').textContent = character.name;
  if (document.querySelector('.details ul').classList.contains('hidden')) {
    document.querySelector('.details ul').classList.remove('hidden');
  }
  infoList.forEach((listItem) => {
    listItem.textContent = character[listItem.id];
  });
};
// From the function above we call this to get the proper fetch-method and then printing it out in the correct field
const printOutAssets = async (character) => {
  // Clear all the fields from old data
  loaderFunction('details', 'add');
  const listItemsToClear = Array.from(
    document.querySelectorAll(
      '.details footer ul h3, .details footer ul li span'
    )
  );
  listItemsToClear.forEach((item) => {
    item.textContent = '';
  });
  // Alot of ifs to find where the correct data should be placed and which to see.
  buttons.forEach((btn, index) => {
    const fieldOfChoice = btn.id;
    let last;
    lastField = index === 3 ? true : false;
    if (character[fieldOfChoice].length > 0) {
      if (Array.isArray(character[fieldOfChoice])) {
        character[fieldOfChoice].forEach((item, index) => {
          lastItem =
            index === character[fieldOfChoice].length - 1 ? true : false;

          last = lastField && lastItem ? true : false;
          fetchAssets(item, fieldOfChoice, last);
        });
      } else {
        fetchAssets(character[fieldOfChoice], fieldOfChoice, last);
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

      btnToggle(false);
    }
  });
};

// Sort and push detail-data from the chosen character
const fetchAssets = async (link, specifics, last) => {
  await fetch(link)
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
  last ? await loaderFunction('details', 'remove') : '';
};

// Function to show or hide the loadingcirle
const loaderFunction = async (what, toDo) => {
  const loader = document.querySelector(`.loader.${what}`);
  if (toDo === 'add') {
    what === 'details' ? btnController(false) : '';
    loader.classList.remove('hidden');
  } else {
    loader.classList.add('hidden');
    what === 'details' ? btnController(true) : '';
  }
};

// Function to properly hide and show for the loadingicon to appear
const btnController = (bool) => {
  if (document.querySelector('input:checked')) {
    const checkedBtn = document.querySelector('input:checked');
    const classToHide = checkedBtn.id;

    console.log(classToHide);
    const listToHide = document.querySelector(
      `.details footer .${classToHide}`
    );
    setTimeout(
      !bool
        ? listToHide.classList.add('hidden')
        : listToHide.classList.remove('hidden'),
      1700
    );
  }
};

// Function to toggle radiobuttonfunctionality
const btnToggle = (bool) => {
  buttons.forEach((btn) => {
    btn.disabled = bool;
  });
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
    if (!document.querySelector('.details ul').classList.contains('hidden')) {
      if (btn.checked) {
        detailLists.forEach((list) => {
          if (list.classList.contains(btn.id)) {
            list.classList.remove('hidden');
          } else {
            list.classList.add('hidden');
          }
        });
      }
    }
  });
});

// EventListener to handle pages
pageSwappers.forEach((swapper) => {
  swapper.addEventListener('click', () => {
    if (swapper.id === 'higher' && page < 8) {
      page++;
    } else {
      page--;
    }

    page = Math.min(page, 8);
    page = Math.max(page, 1);
    dataFetching(page);
    document.querySelector('#page-index').textContent = page;
  });
});

btnToggle(true);
page = pageViewer();
characterInfo = dataFetching(page);

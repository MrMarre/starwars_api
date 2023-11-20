const baseURL = `https://swapi.dev/api/people/`
const characters = document.querySelectorAll("#characters li");
const buttons = document.querySelectorAll('input');
const detailLists = document.querySelectorAll("#details footer ul")
let page;

let characterInfo; //holding data for first 10 characters(page1)

//for displaying current page in first footer
const pageViewer = () => {
    return parseInt(document.querySelector('footer').textContent);
  };
    
 

const dataFetching = async(pageNumber) => {

//created fetch with failsafe response
fetch(`${baseURL}?page=${page}`)
    .then(response => {
        if (!response.ok){
            throw new Error("Error in fetching data", + response.statusText)
        } else {
            return response.json()
        }
    }) 
    .then ((data) => {
        characterInfo = data.results;
        printOutNames(characters, characterInfo);
        //console.log(characterInfo)
        return characterInfo;
        
    })
    .catch(error => {
        console.log("Fetch error:", error)
    });
};

// const for looping names via keys on API, printing to page (textContent)
const printOutNames = (characters, names) => {
    names.forEach((name, index) => {
        characters[index].textContent = name.name; 
    });
};

const printOutInfo = (character) => {
    const infoList = document.querySelectorAll("#details ul li span");
    document.querySelector("#details h2").textContent = character.name; 
    infoList.forEach((listItem) => {
        listItem.textContent = character[listItem.id];
        
    });
};
//function to reach specific keys and print via radio button clicks

const printOutAssets = (character) => {
    buttons.forEach(btn => {
        const fieldOfChoice = btn.id;
        if (character[fieldOfChoice].length > 0) {
            /* character.fieldOfChoice.forEach(target => {
                console.log(target)
            }); */ 
        } else {
            console.log(character[fieldOfChoice])
        }
    });
};

characters.forEach((character) => {
    character.addEventListener("click", function() {
        charName = this.textContent; 
        thisChar = characterInfo.find((character) => character.name = charName)
        console.log(thisChar);

        printOutInfo(thisChar);
        printOutAssets(thisChar);
    });
});

buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
        if (btn.checked) {
            detailLists.forEach(list => {
                if (list.classList.contains(btn.id)) {
                    list.classList.remove("hidden")
                } else {
                    list.classList.add("hidden")
                }
            });
        };
    });
  });

//species[0], starships[2], vehicles[2], starships[2]
    
page = pageViewer()
characterInfo = dataFetching(page)

//
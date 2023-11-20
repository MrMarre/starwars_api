const baseURL = `https://swapi.dev/api/people/?page=`
const page = `1`;

const characters = document.querySelector(`#characters`);



 fetch(`${baseURL}${page}`)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        } return response.json();
    })
    .then(data => {


        data.results.forEach(person => {
            console.log(person.name)
            const character = document.createElement("div")
            character.textContent = person.name;
            characters.appendChild(character);
            
        
            characterSelection = document.querySelectorAll(`#characters div`)
            

            characterSelection.forEach(char => {

                char.addEventListener("click", function() {
                    const siblings = Array.from(this.parentNode.childNodes)
                    console.log(siblings.length)
                })

            })



         })})
        // console.log(data)})
     //console.log(data.results)})
     

    .catch(error => console.log(`An error was found: `, error)) 






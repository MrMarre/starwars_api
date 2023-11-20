const baseURL = 'https://swapi.dev/api/people/';
let page;
const characters = document.querySelectorAll('#characters li');
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
      console.log(data);
      return data;
    })
    .catch((error) => {
      console.log('Fetch error:', error);
    });
};

page = pageViewer();
characterInfo = dataFetching(page);

const baseURL = `https://swapi.dev/api/people/?page=`;
let page;

const pageViewer = () => {
  return parseInt(document.querySelector('footer').textContent);
};

const characters = document.querySelectorAll('#characters li');

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
    });
};

const characters = document.querySelectorAll('#characters li');

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
    });
};

page = pageViewer();

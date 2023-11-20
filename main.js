const baseURL = `https://swapi.dev/api/people/?page=`;
const page = `1`;

const pageViewer = () => {
  return parseInt(document.querySelector('footer').textContent);
};

const characters = document.querySelectorAll('#characters li');

const dataFetching = async (pageNumber) => {
  fetch(`${baseURL}?page=${page}`);
};

page = pageViewer();

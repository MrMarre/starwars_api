const baseURL = `https://swapi.dev/api/people/`;

const pageViewer = () => {
  return parseInt(document.querySelector('footer').textContent);
};

let page = pageViewer();

console.log(page);

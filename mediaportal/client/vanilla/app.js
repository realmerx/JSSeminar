import {declarativeApp} from './framework.js'

const apiPrefix = "http://localhost:3000";
const rootAppEl = document.getElementById("app");

const rootApp = {};
rootApp.config = {
  apiPrefix: apiPrefix
}
rootApp.appEl = rootAppEl;
rootApp.showMovie = async (item) => {
  await bindMovie(rootApp, item.id);
};

declarativeApp(rootApp, () => bindMoviesData(rootApp));

async function bindMoviesData(app) {
  const response = await fetch(`${app.config.apiPrefix}/movies`);
  const data = await response.json();
  app.movies = data;
}

async function bindMovie(app, id) {
  const response = await fetch(`${apiPrefix}/movies/${id}`);
  const data = await response.json();
  app.movie = data;
}
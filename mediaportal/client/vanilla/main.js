const apiPrefix = "http://localhost:3000";
const appEl = document.getElementById("app");

const app = {};
app.showMovie = async (item) => {
  await bindMovie(item.id);
};

//domBindApp();
declarativeApp();

async function domBindApp() {
  await bindMoviesData();

  const moviesListNode = document.querySelector("#movies-list");
  const movieItemTemplateNode = moviesListNode.querySelector(".movie");
  for (const item of app.movies) {
    const movieItemNode = movieItemTemplateNode.cloneNode(true);

    movieItemNode.querySelectorAll("[prop]").forEach((node) => {
      const propName = node.getAttribute("prop");
      node.innerHTML = item[propName];
    });

    movieItemNode.addEventListener("click", () => {
      app.showMovie(item.id);
    });
    moviesListNode.appendChild(movieItemNode);
  }
  movieItemTemplateNode.remove();
}

async function declarativeApp() {
  await bindMoviesData();
  bindAppLogic(appEl, app);
}

async function bindMoviesData() {
  const response = await fetch(`${apiPrefix}/movies`);
  const data = await response.json();
  app.movies = data;
}

async function bindMovie(id) {
  const response = await fetch(`${apiPrefix}/movies/${id}`);
  const data = await response.json();
  app.movie = data;
}

function bindAppLogic(domNode, item) {
  bindObjects(domNode, item);
  bindRepeaters();
}

function bindRepeaters() {
  const repeaters = document.querySelectorAll("[repeat]");
  for (const repeater of repeaters) {
    const dataName = repeater.getAttribute("repeat");
    const itemsToBind = app[dataName];
    const repeaterItemTemplate = repeater;

    for (const item of itemsToBind) {
      const repeaterItem = repeaterItemTemplate.cloneNode(true);
      bindObjectLogic(repeaterItem, item);

      repeater.parentNode.appendChild(repeaterItem);
    }
    repeaterItemTemplate.remove();
  }
}

function bindObjects(domNode, item, insideRepeater = false) {
  const objBindItems = domNode.querySelectorAll("[bind-object]");
  for (const objBindItem of objBindItems) {
    if (!insideRepeater && objBindItem.hasAttribute("repeat"))
      continue;

    let itemToBind = null;
    const objName = objBindItem.getAttribute("bind-object");
    itemToBind = item[objName];

    if (itemToBind) {
      bindObjectLogic(objBindItem, itemToBind);
    }
  }
}

function bindObjectLogic(objNode, item) {
  bindBinds(objNode, item);
  bindEvents(objNode, item);
}

function bindBinds(domNode, item) {
  const bindItems = domNode.querySelectorAll("[bind]");
  for (const bindItem of bindItems) {
    const bindName = bindItem.getAttribute("bind");
    bindItem.innerHTML = item[bindName];
  }
}

function bindEvents(domNode, item) {
  const eventItems = domNode.querySelectorAll("[click]");
  for (const eventItem of eventItems) {
    eventItem.addEventListener("click", async () => {
      const eventCallback = eventItem.getAttribute("click");
      await app[eventCallback](item);
      bindObjects(appEl, app)
    });
  }
}

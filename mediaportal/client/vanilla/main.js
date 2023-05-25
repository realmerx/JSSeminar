const apiPrefix = "http://localhost:3000";
const rootAppEl = document.getElementById("app");

const rootApp = {};
rootApp.appEl = rootAppEl;
rootApp.showMovie = async (item) => {
  await bindMovie(rootApp, item.id);
};

declarativeApp(rootApp);

async function declarativeApp(app) {
  await bindMoviesData(app);
  //await bindMovie(app, 1);
  console.log('app', app)

  bindAppLogic(app, app.appEl);
  registerCustomElements();
}

async function bindMoviesData(app) {
  const response = await fetch(`${apiPrefix}/movies`);
  const data = await response.json();
  app.movies = data;
}

async function bindMovie(app, id) {
  const response = await fetch(`${apiPrefix}/movies/${id}`);
  const data = await response.json();
  app.movie = data;
}

function bindAppLogic(app, domNode) {
  bindObjects(app, domNode, app);
  bindRepeaters(app);
}

function bindRepeaters(app) {
  const repeaters = app.appEl.querySelectorAll("[repeat]");
  for (const repeater of repeaters) {
    const dataName = repeater.getAttribute("repeat");
    const itemsToBind = app[dataName];
    const repeaterItemTemplate = repeater;
    
    const repeaterItems = []
    for (const item of itemsToBind) {
      const repeaterItem = repeaterItemTemplate.cloneNode(true);
      repeaterItem.removeAttribute('repeat')
      bindObjectLogic(app, repeaterItem, item);
      repeaterItems.push(repeaterItem)
    }
    repeater.parentNode.replaceChildren(...repeaterItems)
  }
}

function bindObjects(app, domNode, item, insideRepeater = false) {
  const objBindItems = domNode.querySelectorAll("[bind-object]");
  for (const objBindItem of objBindItems) {
    if (!insideRepeater && objBindItem.hasAttribute("repeat")) continue;

    let itemToBind = null;
    const objName = objBindItem.getAttribute("bind-object");
    itemToBind = item[objName];

    if (itemToBind) {
      bindObjectLogic(app, objBindItem, itemToBind);
    }
  }
}

function bindObjectLogic(app, objNode, item) {
  bindBinds(app, objNode, item);
  bindEvents(app, objNode, item);
}

function bindBinds(app, domNode, item) {
  const bindItems = domNode.querySelectorAll("[bind]");
  for (const bindItem of bindItems) {
    const bindName = bindItem.getAttribute("bind");
    bindItem.innerHTML = item[bindName];
  }
}

function bindEvents(app, domNode, item) {
  const eventItems = domNode.querySelectorAll("[click]");
  for (const eventItem of eventItems) {
    eventItem.addEventListener("click", async () => {
      const eventCallback = eventItem.getAttribute("click");
      await app[eventCallback](item);
      
    });
  }
}

function registerCustomElements() {
  for(const [name, component] of Object.entries(customElementsMap)) {
    customElements.define(name, component)
  }
}

function updateComponents() {
  Object.entries(customElementsMap).forEach(([selector, _]) => {
    document.querySelectorAll(selector).forEach(comp => {
      comp.bindSubAppFromProps(comp.subApp)
    })
  })
}


class BindableComponent extends HTMLElement {
  
  bindSubAppFromProps(subApp) {
    subApp.appEl = this;
    for(const attributeName of this.getAttributeNames()) {
      if(attributeName.startsWith('bind-')) {
        const propToBind = attributeName.replace('bind-', '')
        subApp[propToBind] = rootApp[propToBind]
      }
    }
    console.log('subApp', subApp);

    bindAppLogic(subApp, subApp.appEl);
    return subApp;    
  }
}
class MoviesListComponent extends BindableComponent {
  constructor() {
    super();

    const template = document.getElementById("movies-list-template");
    this.appendChild(template.content.cloneNode(true));
    
    
    this.subApp = this.bindSubAppFromProps({
      triggerItemSelected: async (item) => {
        this.dispatchEvent(new CustomEvent('item-selected', { detail: item }));
      }
    });
    this.addEventListener('item-selected', async (e) => {
      await rootApp[this.getAttribute('on-item-selected')](e.detail);
      updateComponents();
    });
  }
}
class MovieDetailsComponent extends BindableComponent {
  constructor() {
    super();

    const template = document.getElementById("movie-details-template");

    this.appendChild(template.content.cloneNode(true));
    this.subApp = this.bindSubAppFromProps({});
  }
}

const customElementsMap = {
  "movies-list": MoviesListComponent,
  "movie-details": MovieDetailsComponent
}



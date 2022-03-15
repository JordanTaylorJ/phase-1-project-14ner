/* Global Variables */

let peaks = [];
let goalList = [];

/* Node Getters */

const mainDiv = () => document.getElementById('main');
const homeLink = () => document.getElementById('home-link');
const goalLink = () => document.getElementById('goal-link');
const listLink = () => document.getElementById('list-link');


/* Event Listeners */
const homeLinkEvent = () => {
    homeLink().addEventListener('click', renderHome)
}

const goalListEvent = () => {
    goalLink().addEventListener('click', renderGoal)
}

const fourteenerListEvent = () => {
    listLink().addEventListener('click', renderList)
}

/* Event Handlers */

const renderHome = event => {
    if (event) {
        event.preventDefault();
    }
    resetMainDiv();
    const h1 = document.createElement('h1');
    const p = document.createElement('p');
    h1.className = "center-align"
    p.className = 'center-align'
    h1.innerText='Colorado Fourteeners'
    p.innerText= 'Set goals and hike some shit.'

    mainDiv().appendChild(h1);
    mainDiv().appendChild(p);

    console.log('h1', h1);
    console.log('p', p);
    //<h1 class='center-align'>Colorado Fourteeners</h1>
    //<p class="center-align">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Adipisci optio inventore enim dolore magnam assumenda dolores sint corporis qui, odio quidem voluptatibus eligendi maiores eius obcaecati necessitatibus aliquid eos explicabo!</p>
}

const renderGoal = event => {
    if (event) {
        event.preventDefault();
    }
    resetMainDiv();
    const h1 = document.createElement('h1');
    h1.innerText = 'Create Goals';
   // <h1>Create Goals</h1>
   mainDiv().appendChild(h1);
   //addToGoals();
   const ul = document.createElement('ul');
   mainDiv().appendChild(ul);
   goalList.forEach(mtn => {
       const li = document.createElement('li');
       li.innerText = mtn;
       ul.appendChild(li);
   })
   
   console.log(goalList);
}

const renderList = event => {
    if (event) {event.preventDefault()}
    resetMainDiv();
    const h1 = document.createElement('h1');
    const ul = document.createElement('ul');
    h1.innerText = 'Colorado 14ner Peaks & Elevation';
    ul.className = 'collection';
    mainDiv().appendChild(h1);
    mainDiv().appendChild(ul);
    const li = document.createElement('li')
    peaks.forEach( peaks => {
        const li = document.createElement('li');
        li.className = "collection-item";
        li.innerText = peaks.name + ' ' + peaks.elevation + 'ft ';
        const btn = document.createElement('button');
        btn.addEventListener('click', addToGoals, peaks.name);
        btn.className = 'btn-floating btn-small waves-effect waves-light blue material-icons';
        btn.textContent = '+';
        ul.appendChild(li);
        li.appendChild(btn);
    })
    
}

//addToGoals will add the selected item to the to-do list
const addToGoals = (mtn) => {
    console.log('itworked');
    goalList.push(mtn);
    //const ul = document.createElement('ul');
    //ul.innerText = peaks.name;
}


/* Requests to External API */
const fourteenerAPIFetch = () => {
    fetch("https://fourteeners-api.herokuapp.com/api/v1/peaks")
    .then(function(response) {
        console.log(response);
        return response.json();
    })
    .then(function(data){
        console.log('data', data);
        peaks = data;
    })
}


/* Misc */

const resetMainDiv = () => {
    mainDiv().innerHTML = '';
}

/* Startup - render homepage */
document.addEventListener('DOMContentLoaded', function(){
    fourteenerAPIFetch();
    renderHome();    
    homeLinkEvent();
    goalListEvent();
    fourteenerListEvent();
})


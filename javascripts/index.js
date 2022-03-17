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
    const img = new Image(600, 360);
    
    h1.className = "center-align";
    p.className = 'center-align';
    //img.className = "center-align"
    h1.innerText='Colorado Fourteeners';
    p.innerText= `A minimal guide to Colorado's peaks above 14,000ft.`;
    img.src = "/Users/jordantaylorjoseph/Development/code/phase-1/project-1/brad-barmore-bP-L4h69_50-unsplash.jpg";
    img.style = "margin: 0, auto";
    mainDiv().appendChild(h1);
    mainDiv().appendChild(p);
    mainDiv().appendChild(img);
}

const renderGoal = event => {
    if (event) {
        event.preventDefault();
    }
    resetMainDiv();
    const h1 = document.createElement('h1');
    const p = document.createElement('p');
    h1.innerText = 'Colorado Fourteeners Completed';
    const thisMany = 'this many'; 
    p.innerText = `You've completed ${thisMany} 14ners!!!`
    mainDiv().appendChild(h1);
    mainDiv().appendChild(p);
    const ul = document.createElement('ul');
    ul.className = 'collection'
    mainDiv().appendChild(ul);
    goalList.forEach(mtnPeak => {
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.innerText = mtnPeak;
        const btn = document.createElement('button');
        btn.className = 'btn-floating btn-small waves-effect waves-light-blue material-icons';
        btn.textContent = '-';
        const handleDelete = (mtnPeak) => {
            goalList.splice(mtnPeak, 1);
            li.remove();
        }
        btn.addEventListener('click', handleDelete);
        ul.appendChild(li);
        li.appendChild(btn);
   })
   
   console.log(goalList);
}

const renderList = event => {
    if (event) {event.preventDefault()}
    resetMainDiv();
    //taken from materialize as jQuery to initialize collaplible items
    $(document).ready(function(){
        $('.collapsible').collapsible();
    });
    const h1 = document.createElement('h1');
    const p = document.createElement('p');
    const ul = document.createElement('ul');
    h1.innerText = 'Colorado 14ner Peaks & Elevation';
    p.innerText = 'Click the Fourteener for more information. Use the + to add it to your completed list!'
    ul.className = 'collapsible';
    mainDiv().appendChild(h1);
    mainDiv().appendChild(p);
    mainDiv().appendChild(ul);
    peaks.forEach( peaks => {
        const li = document.createElement('li');
        const div = document.createElement('div');
        div.className = 'collapsible-header';
        const div2 = document.createElement('div');
        div2.className = 'collapsible-body';
        div.innerText = peaks.name + '   ';
        div2.innerText = 'Elevation:' + ' ' + peaks.elevation + 'ft ' + '\n' + 'Rank:' + ' ' + peaks.rank + '\n' + 'Mountain Range:' + ' ' + peaks.range + '\n' + "Jerry Level:" + ' ' + peaks.jerryLevel + '\n' + "Number of Routes:" + ' ' + peaks.numberOfRoutes;
        const btn = document.createElement('button');
        btn.className = 'btn-floating btn-small waves-effect waves-light-blue material-icons';
        btn.textContent = '+';
        const addToGoals = () => {
            goalList.push(div.innerText);
        }
        btn.addEventListener('click', addToGoals);
        ul.appendChild(li);
        li.appendChild(btn);
        li.appendChild(div);
        li.appendChild(div2);
        
    })
    
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


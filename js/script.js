const links = document.querySelectorAll('nav a:not(.sidebar)');
const latestPosts = document.querySelector('.latest-posts');
const url = 'https://noroff.tnjensen.com/blogsite_exam1/wp-json/wp/v2/posts?_embed';
const corsEnabledUrl ="https://noroffcors.herokuapp.com/";
const loader = document.querySelector('.loader');
const leftAngle = document.querySelector('.fa-angle-left');
const rightAngle = document.querySelector('.fa-angle-right');
const circleLeft = document.querySelector('.left');
const circleRight = document.querySelector('.right');
let counter = 0;
let maxPages = 0;
let postsPerPage = 0;
let postResult = [];
let pageResult = [];
let postPage = 0;
let mobile = 1023;
let height = 575.98;
let desktop = 1024;
let i;

const menuButton = document.querySelector('.menu-btn');

for(let i = 0; i < links.length;i++){
    if(links[i] == document.URL){
        links[i].classList.add('active');
    }
}
document.onload = detectViewport();

/* visualViewport.onresize = function(){
    document.location.reload(true);
    
}; */

async function getLatestPosts(){
    try{
        let response = await fetch(url);
        let results = await response.json();
        latestPosts.innerHTML = "";
        loader.innerHTML = "";
        postResult = results;
        loader.classList.remove('loading-indicator');
        leftAngle.style.display = "none";
        circleLeft.style.display = "none";
        getMaxPages(results);
        createHTML(results);
        
        circleRight.addEventListener('click', function(){
            latestPosts.innerHTML = "";
            counter++;
            postPage = counter + 1;
            buildPage(postResult);
        })
        circleLeft.addEventListener('click', function(){
            latestPosts.innerHTML = "";
            counter--;
            postPage = counter + 1;
            buildPage(postResult);
        })
    }
    catch(error){
        if(latestPosts){
            latestPosts.innerHTML = `Error: ` + error;
        }     
    }
}
getLatestPosts();

function buildPage(results){
    let indexStart = counter * postsPerPage;
    let indexEnd = indexStart + postsPerPage;
    pageResult = results.slice(indexStart, indexEnd);
    createHTML(pageResult);
}

function createHTML(results){ 
    if(maxPages == postPage){
        rightAngle.style.display = "none";
        circleRight.style.display = "none";
        leftAngle.style.display = "block";
        circleLeft.style.display = "block";
    }else if( counter == 0){
        rightAngle.style.display = "block";
        circleRight.style.display = "block";
        leftAngle.style.display = "none";
        circleLeft.style.display = "none";
    }   
    for(i = 0; i < postsPerPage; i++){ 
        if(!results[i]){
            break;
        }else{
            latestPosts.innerHTML += `<div class="latest-post">
            <a href="blog-detail.html?id=${results[i].id}"><img src="${results[i]._embedded['wp:featuredmedia'][0].source_url}" alt="${results[i]._embedded['wp:featuredmedia'][0].alt_text}" /></a>
            <h3>${results[i].title.rendered}</h3>
            <p>${results[i].excerpt.rendered}</p>
            </div>`; 
        }
    }
    
}
menuButton.addEventListener('click', function(){
    menuButton.classList.toggle('visible');
});

window.addEventListener('mouseup', function(event){
    if(!event.target.closest('.menu-btn')){
        menuButton.classList.remove('visible');
    }
})

/* visualViewport.addEventListener('resize', detectViewport);
 */
function detectViewport(){
    if(window.innerWidth <= mobile){
        postsPerPage = 2; 
    }
    if(window.innerWidth >= desktop){
        postsPerPage = 4;
    }
    if(window.innerHeight <= height){
        postsPerPage = 2; 
    }
    return postsPerPage;
}

function getMaxPages(results){
    maxPages = results.length/postsPerPage;
    if(results.length % postsPerPage != 0){
        maxPages += 1;
    }
    maxPages = Math.trunc(maxPages);
    return maxPages;
}

  
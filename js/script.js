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
let maxPosts = 0;
let maxPages = 0;
let postsPerPage = 0;
let postResult = [];
let pageResult = [];
let postPage = 0;
let mobile = 499;
let desktop = 500;
let i;
let index = 0;

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
        console.log("Total posts: ", results);
        getMaxPages(results);
        
        console.log("Posts per page: ", postsPerPage); 
    
        for(i = 0; i < postsPerPage; i++){
            createHTML(results); 
        }   
        circleRight.addEventListener('click', function(){
            latestPosts.innerHTML = "";
            if(maxPages == postPage){
                counter = 0;
                for(i = 0; i < postsPerPage; i++){
                    createHTML(results);
                    postPage = 1; 
                }   
            } 
            else
            {
                counter++;
                postPage = counter + 1;
                if(postResult.length == postsPerPage){
                    postResult = results.reverse();
                    console.log("Post result: ", postResult.length);
                }
                leftAngle.style.display = "none";
                circleLeft.style.display = "none";
                console.log("Counter: ", counter);
                console.log("Page: ", postPage);
                pageResult = postResult.slice(postsPerPage);
                console.log("Page result: ", pageResult);
                let index = postResult.indexOf(pageResult[0]);
                console.log("Index:", index);
                console.log("Elements left: ", pageResult.length);
                for(i = index; i < postsPerPage + index; i++){
                    if(!postResult[i]){
                        rightAngle.style.display = "none";
                        circleRight.style.display = "none";
                        leftAngle.style.display = "block";
                        circleLeft.style.display = "block";
                        console.log("Posts reversed: ", postResult);
                        console.log("Post page: ", postPage);
                        console.log("Maxpages: ", maxPages);
                        pageResult = results;
                        index = postResult.indexOf(postResult[0]);
                        console.log("Index: ", index);
                        console.log("Page result: ", pageResult);
                        console.log("I: ", postResult);
                        break;
                    }
                    
                    createHTML(postResult);
                             
                }   
                if(maxPages === postPage){
                    postResult = results.reverse();
                    index = postResult.indexOf(postResult[postResult.length -1]);
                    /* pageResult = postResult.slice(postsPerPage); */
                    rightAngle.style.display = "none";
                    circleRight.style.display = "none";
                    leftAngle.style.display = "block";
                    circleLeft.style.display = "block";
                    console.log("Max post result: ", postResult);   
                }  
                else{
                    postResult = pageResult;
                    console.log("Page: ", postPage);
                    console.log("Normal post result: ", postResult);
                } 
            }
               
        });
        circleLeft.addEventListener('click', function(){
            latestPosts.innerHTML = "";
            counter--;
            postPage = counter + 1;
            console.log("Total reversed posts: ", postResult);
            console.log("Counter: ", counter);
            console.log("Total posts: ", postResult);
            pageResult = postResult.reverse().slice(postsPerPage);
            let index = postResult.indexOf(pageResult[0]);
            console.log("Index:", index);
            console.log("Elements left: ", pageResult);
            if(counter == 0){
                postResult = results;
                index = postResult.indexOf(postResult[0]);
                console.log("First page result: ", postResult);
            }
            for(i = index; i < postsPerPage+index; i++){
                if(!postResult[i]){
                    rightAngle.style.display = "none";
                    circleRight.style.display = "none";
                    leftAngle.style.display = "block";
                    circleLeft.style.display = "block";
                    postResult = results.reverse();
                    console.log("Stopped posts: ", postResult);
                    counter = 0;
                    break;     
                }   
                createHTML(postResult);
                console.log("I: ", pageResult.length);  
            
            }
            if(counter == 0){
                leftAngle.style.display = "none";
                circleLeft.style.display = "none";
                rightAngle.style.display = "block";
                circleRight.style.display = "block";
                /* postResult = results.reverse();
                index = postResult.indexOf(postResult[0]); */
                console.log("Counter: ", counter);
                console.log("Posts reversed: ", postResult);
                

            }
            else
            {
                postResult = pageResult.reverse();
                console.log("Page: ", postPage);
                
            }
        })            
    }
    catch(error){
        if(latestPosts){
            latestPosts.innerHTML = `Error: ` + error;
        }
            
    }
}
getLatestPosts();

function createHTML(results){
    latestPosts.innerHTML += `<div class="latest-post">
    <a href="blog-detail.html?id=${results[i].id}"><img src="${results[i]._embedded['wp:featuredmedia'][0].source_url}" alt="${results[i]._embedded['wp:featuredmedia'][0].alt_text}" /></a>
    <h3>${results[i].title.rendered}</h3>
    <p>${results[i].excerpt.rendered}</p>
    </div>`; 
}
menuButton.addEventListener('click', function(){
    menuButton.classList.toggle('visible');
});

window.addEventListener('mouseup', function(event){
    if(!event.target.closest('.menu-btn')){
        menuButton.classList.remove('visible');
    }
})
visualViewport.addEventListener('resize', detectViewport);

function detectViewport(){
    if(window.innerWidth <= mobile){
        postsPerPage = 2; 
    }
    if(window.innerWidth >= desktop){
        postsPerPage = 4;
    }
    return postsPerPage;
}

function getMaxPages(results){
    maxPages = results.length/postsPerPage;
    if(results.length % postsPerPage != 0){
        maxPages += 1;
    }
    console.log("Maxpages: ", Math.trunc(maxPages));
    maxPages = Math.trunc(maxPages);
    return maxPages;
}

  
const blogPosts = document.querySelector('.blog-posts');
const links = document.querySelectorAll('nav a:not(.sidebar)');
const url = 'https://noroff.tnjensen.com/blogsite_exam1/wp-json/wp/v2/posts?_embed';
const loader = document.querySelector('.loader');
const moreButton = document.querySelector('.more-posts');
const moreUrl = 'https://noroff.tnjensen.com/blogsite_exam1/wp-json/wp/v2/posts?_embed&page=2';
const menuButton = document.querySelector('.menu-btn');

for(let i = 0; i < document.links.length;i++){
    console.log(document.links[i])
    if(links[i] == document.URL){
        links[i].classList.add('active');
    }
}

async function getPosts(){
    try{
        let response = await fetch(url);
        let results = await response.json();
        loader.innerHTML = "";
        loader.classList.remove('loading-indicator');
        console.log(results);
        
        for(i = 0; i < results.length; i++){ 
            let blogLink =`<a href="blog-detail.html?id=${results[i].id}" class="cta cta-small">Read more</a>`; 
            blogPosts.innerHTML += `<div class="blog-post">
                            <h3>${results[i].title.rendered}</h3>
                            <img src="${results[i]._embedded['wp:featuredmedia'][0].source_url}" alt="${results[i]._embedded['wp:featuredmedia'][0].alt_text}" />
                            <p>${results[i].excerpt.rendered}</p>
                            <p>${blogLink}</p>
                            </div>`;

            
        }    
    }
    catch(error){
        blogPosts.innerHTML = `Error: ` + error;
    }
}
getPosts();

async function getMorePosts(){
    try{
        let response = await fetch(moreUrl);
        let results = await response.json();
        loader.innerHTML = "";
        loader.classList.remove('loading-indicator');
        console.log(results);
        
        for(i = 0; i < results.length; i++){ 
            let blogLink =`<a href="blog-detail.html?id=${results[i].id}" class="cta-small">Read more</a>`; 
            blogPosts.innerHTML += `<div class="blog-post">
                            <h3>${results[i].title.rendered}</h3>
                            <img src="${results[i]._embedded['wp:featuredmedia'][0].source_url}" alt="${results[i]._embedded['wp:featuredmedia'][0].alt_text}" />
                            <p>${results[i].excerpt.rendered}</p>
                            <p>${blogLink}</p>
                            </div>`;
            if(i < results.length){
                moreButton.style.display = "none";
            } 
        }    
    }
    catch(error){
        blogPosts.innerHTML = `Error: ` + error;
    }
}
moreButton.onclick = function(){
    getMorePosts();
}

menuButton.addEventListener('click', function(){
    menuButton.classList.toggle('visible');
});

window.addEventListener('mouseup', function(event){
    if(!event.target.closest('menu-btn')){
        menuButton.classList.remove('visible');
    }
})
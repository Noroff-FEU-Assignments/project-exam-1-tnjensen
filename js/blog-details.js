const blogPost = document.querySelector('.blog-post-detail');
const url = 'https://noroffcors.herokuapp.com/https://noroff.tnjensen.com/blogsite_exam1/wp-json/wp/v2/posts/';
const loader = document.querySelector('.loader');
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const postId = params.get("id");
const modal = document.querySelector('.modal');
const modalContent = document.querySelector('.modal-content');
const menuButton = document.querySelector('.menu-btn');

async function getPost(){
    try{
        let response = await fetch(url + postId + '?_embed');
        let result = await response.json();
        loader.innerHTML = "";
        loader.classList.remove('loading-indicator');
        console.log(result);
        
        blogPost.innerHTML = `<h3>${result.title.rendered}</h3>
                        <img id="imgLarge" src="${result._embedded['wp:featuredmedia'][0].source_url}" 
                            alt="${result._embedded['wp:featuredmedia'][0].alt_text}" /></a>
                        <p>${result.content.rendered}</p>`;
    
    }
    catch(error){
        blogPost.innerHTML = `Error: ` + error;
    }
    let imgLarge = document.getElementById('imgLarge');
    imgLarge.onclick = getFeaturedImageLarge;
}
getPost();

function getFeaturedImageLarge(){
    modal.style.display = "block";
    modalContent.innerHTML = `<img src="${imgLarge.src}" alt=${imgLarge.alt};>`;
}

window.addEventListener('mouseup', function(event){
    if(!event.target.closest('footer')){
        modal.style.display = "none";
    }
})

menuButton.addEventListener('click', function(){
    menuButton.classList.toggle('visible');
});

window.addEventListener('mouseup', function(event){
    if(!event.target.closest('menu-btn')){
        menuButton.classList.remove('visible');
    }
})
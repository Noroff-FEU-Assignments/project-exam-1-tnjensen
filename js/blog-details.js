const blogPost = document.querySelector('.blog-post-detail');
const url = 'https://noroffcors.herokuapp.com/https://noroff.tnjensen.com/blogsite_exam1/wp-json/wp/v2/posts/';
const loader = document.querySelector('.loader');
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const postId = params.get("id");
const modal = document.getElementById('myModal');

async function getPost(){
    try{
        let response = await fetch(url + postId + '?_embed');
        let result = await response.json();
        loader.innerHTML = "";
        loader.classList.remove('loading-indicator');
        console.log(result);
        
        blogPost.innerHTML = `<h3>${result.title.rendered}</h3>
                        <img id="imgFull" onclick="getFeaturedImageLarge();" src="${result._embedded['wp:featuredmedia'][0].source_url}" 
                            alt="${result._embedded['wp:featuredmedia'][0].alt_text}" /></a>
                        <p>${result.content.rendered}</p>`;
    
    }
    catch(error){
        blogPost.innerHTML = `Error: ` + error;
    }
}
getPost();

function getFeaturedImageLarge(){
    let imgFull = document.getElementById('imgFull');
    console.log(imgFull);
    let imgModal = document.getElementById('imgModal');
    let captiontext = document.getElementById('caption');
    imgFull.addEventListener('click', function(){
        modal.style.display = "block";
        imgModal.src = this.src;
        captiontext.innerHTML = this.alt;
    })
}

const span = document.getElementsByClassName('close')[0];

span.onclick = function(){
    modal.style.display = "none";
}

window.addEventListener('mouseup', function(event){
    if(!event.target.closest('footer')){
        modal.style.display = "none";
    }
})
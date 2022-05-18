const blogPost = document.querySelector('.blog-post-detail');
const url = 'https://noroff.tnjensen.com/blogsite_exam1/wp-json/wp/v2/posts/';
const corsEnable = 'https://noroffcors.herokuapp.com/';
const loader = document.querySelector('.loader');
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const postId = params.get("id");
const modal = document.querySelector('.modal');
const modalContent = document.querySelector('.modal-content');
const menuButton = document.querySelector('.menu-btn');
const authorName = document.querySelector('input[type="name"].value');
const authorEmail = document.querySelector('input[type="email"].value');
const authorComment = document.querySelector('input[type="comment"].value');
const postComment = document.querySelector('#submit');
const blogComment = document.querySelector('.blog-comments');

async function getPost(){
    try{
        let response = await fetch(url + postId + '?_embed');
        let result = await response.json();
        loader.innerHTML = "";
        loader.classList.remove('loading-indicator');
        /* console.log(result); */
        
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

postComment.onclick = function(event){
    event.preventDefault();
    let postUrl = `https://noroff.tnjensen.com/blogsite_exam1/wp-json/wp/v2/comments/?id=${postId}`;
    let response = fetch(postUrl, {
        method: 'POST',
        body: JSON.stringify({
            'id': postId,
            'name': authorName,
            'email': authorEmail,
            'comment': authorComment 
        }),
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response =>{
        if(response){
            //Success
        }
        console.log(response.body);
        return response.json();
        

    })
    .catch(error => console.error('Error', error));
}

async function getComment(){
    try{
        let commentUrl = 'https://noroff.tnjensen.com/blogsite_exam1/wp-json/wp/v2/comments/';
        let response = await fetch(commentUrl + '?id=' + postId);
        let result = await response.json();
        loader.innerHTML = "";
        loader.classList.remove('loading-indicator');
        console.log(result);
        
        for(let i = 0; i < result.length; i++){
            blogComment.innerHTML += `<div class="blog-comment">
            <p>Posted by: <b>${result[i].author_name}</b></p>
            <p>Date: <b>${result[i].date}</b></p>
            <p>Comment: <b>${result[i].content.rendered}</b></p>
            <hr>
            </div>`;
        }
        

    }
    catch(error){
        blogComment.innerHTML = `Error: ` + error;
    }
    
}
getComment();
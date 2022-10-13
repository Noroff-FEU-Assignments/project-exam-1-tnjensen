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
const fullName = document.querySelector('#fullName');
const email = document.querySelector('#email');
const comment = document.querySelector('#comment');
const postComment = document.querySelector('#submit');
const blogHeader = document.querySelector('.blog-comments h3');
const blogComment = document.querySelector('.blog-comments');
const form = document.querySelector('#commentForm');
const fullNameError = document.querySelector('#fullName-error');
const emailError = document.querySelector('#email-error');
const commentError = document.querySelector('#comment-error');
const year = document.getElementById('year');

let date = new Date().getFullYear();
if( date > 2022){
  year.innerHTML = `2022 - `+ date;
}else{
  year.innerHTML = date;
}

async function getPost(){
    try{
        let response = await fetch(url + postId + '?_embed');
        let result = await response.json();
        loader.innerHTML = "";
        loader.classList.remove('loading-indicator');
        document.title = `${result.title.rendered}`;
        blogPost.innerHTML = `<h1>${result.title.rendered}</h1>
                        <img id="imgLarge" src="${result._embedded['wp:featuredmedia'][0].source_url}" 
                            alt="${result._embedded['wp:featuredmedia'][0].alt_text}" /></a>
                        <p>${result.content.rendered}</p>
                        <a href="/blog.html" class="cta-small">Go back</a>
                        `;
                        
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

form.addEventListener( 'submit', handleSubmit);

async function handleSubmit(evt) {
    evt.preventDefault();

    const data = JSON.stringify({
        post: postId,
        author_name: fullName.value,
        author_email: email.value,
        content: comment.value,
    });
    if(fullName.value && email.value && comment.value){
        let postUrl = `https://noroffcors.herokuapp.com/https://noroff.tnjensen.com/blogsite_exam1/wp-json/wp/v2/comments`;    
        try{
        let response = await fetch(postUrl, {
            method: 'post',
            headers: {
            'Content-Type': 'application/json'
            },
            body: data,
        });
        }
        catch(error){
            console.error('Error:', error)
        };
    }
    
}

async function getComment(){
    try{
        let commentUrl = 'https://noroff.tnjensen.com/blogsite_exam1/wp-json/wp/v2/comments?_embed';
        let response = await fetch(commentUrl + '?post=' + postId);
        let results = await response.json();
        console.log(results);
        loader.innerHTML = "";
        loader.classList.remove('loading-indicator');
        
        for(i= 0; i < results.length; i++){
            if(results[i].post == postId){
                blogHeader.style.display = "block";
                blogComment.innerHTML += `<div class="posted-comment">
                <p>Posted by: <b>${results[i].author_name}</b></p>
                <p>Date: <b>${results[i].date}</b></p>
                <p>Comment: <b>${results[i].content.rendered}</b></p>
                <hr>
                </div>`;
            }
        }
    } 
    catch(error){
        blogComment.innerHTML = `Error: ` + error;
    }
}
getComment();

function validateForm(event){
    event.preventDefault();

    if(checkLength(fullName.value, 0)){
        fullNameError.style.display = 'none';
    }
    else{
        fullNameError.style.display = 'block';
    }
    if(validateEmail(email.value)){
        emailError.style.display = 'none';
    }
    else{
        emailError.style.display = 'block';
    }
    if(checkLength(comment.value, 5)){
        commentError.style.display = 'none';
    }
    else{
        commentError.style.display = 'block';
    }
}
form.addEventListener("submit", validateForm);

function checkLength(value, len){
    if(value.trim().length > len){
        return true;
    }
    else{
        return false;
    }
}
function validateEmail(email){
    const regEx = /^.+@.+$/;
    const patternMatches = regEx.test(email);
    return patternMatches; 
}
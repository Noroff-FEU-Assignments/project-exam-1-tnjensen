const blogPosts = document.querySelector('.blog-posts');
const links = document.querySelectorAll('nav a:not(.sidebar)');
const url = 'https://noroff.tnjensen.com/blogsite_exam1/wp-json/wp/v2/posts?_embed';
const corsEnabledUrl = "https://noroffcors.herokuapp.com/";
const loader = document.querySelector('.loader');
const moreUrl = 'https://noroff.tnjensen.com/blogsite_exam1/wp-json/wp/v2/posts?_embed&page=2';
const menuButton = document.querySelector('.menu-btn');
const morePosts = document.querySelector('.more-posts');
const form = document.getElementById('signUpForm');
const fullName = document.getElementById('fullName');
const fullNameError = document.getElementById('fullName-error');
const email = document.getElementById('email');
const emailError = document.getElementById('email-error');
const selectFilter = document.querySelector('.select-filter');
const year = document.getElementById('year');

let date = new Date().getFullYear();
if( date > 2022){
  year.innerHTML = `2022 - `+ date;
}else{
  year.innerHTML = date;
}

for(let i = 0; i < document.links.length;i++){
    if(links[i] == document.URL){
        links[i].classList.add('active');
    }
}

async function getPosts(){
    loader.innerHTML = "";
    blogPosts.innerHTML = "";
    loader.classList.remove('loading-indicator');
    try{
        let response = await fetch(url);
        let results = await response.json();
        document.querySelector('.select-filter').addEventListener('change', function(){
            let filteredPosts = results.filter(function(e){
                return e.postmeta.Type[0] === selectFilter.value;
            });
            
            blogPosts.innerHTML = "";
            if(selectFilter.value === ""){
                createHTML(results);
            }
            createHTML(filteredPosts); 
        })
        createHTML(results);
    }
    catch(error){
        blogPosts.innerHTML = `Error: ` + error;
    }
}
getPosts();

function createHTML(results){
    for(i = 0; i < results.length; i++){ 
        let blogLink =`<a href="blog-detail.html?id=${results[i].id}" class="cta-small">Read more..</a>`; 
        blogPosts.innerHTML += `<div class="blog-post">
                        <h2>${results[i].title.rendered}</h2>
                        <a href="blog-detail.html?id=${results[i].id}"><img src="${results[i]._embedded['wp:featuredmedia'][0].source_url}" alt="${results[i]._embedded['wp:featuredmedia'][0].alt_text}" /></a>
                        <p>${results[i].excerpt.rendered}</p>
                        <p><b>${results[i].postmeta.Type}</b></p>
                        <p>${blogLink}</p>
                        </div>`;
        if(i === results.length - 1){
            blogPosts.innerHTML += `<div class="more-posts"><a href="javascript:void(0)" onclick="getMorePosts()">Older posts <i class="fa fa-angle-down"></i></a></div>`;
        }
    }        
}

async function getMorePosts(){
    const moreButton = document.querySelector('.more-posts a'); 
    try{
        let response = await fetch(moreUrl);
        let results = await response.json();
        loader.innerHTML = "";
        moreButton.style.display = "none";
        loader.classList.remove('loading-indicator');
        
        for(i = 0; i < results.length; i++){ 
            let blogLink =`<a href="blog-detail.html?id=${results[i].id}" class="cta-small">Read more..</a>`; 
            blogPosts.innerHTML += `<div class="blog-post">
                            <h2>${results[i].title.rendered}</h2>
                            <a href="blog-detail.html?id=${results[i].id}"><img src="${results[i]._embedded['wp:featuredmedia'][0].source_url}" alt="${results[i]._embedded['wp:featuredmedia'][0].alt_text}" /></a>
                            <p>${results[i].excerpt.rendered}</p>
                            <p><b>${results[i].postmeta.Type}</b></p>
                            <p>${blogLink}</p>
                            </div>`;
        }    
    }
    catch(error){
        blogPosts.innerHTML = `Error: ` + error;
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
    
    handleSubmit();
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
async function handleSubmit(evt) {
    let data = JSON.stringify({
        "username": fullName.value,
        "email": email.value,
        "password": "0000"
    });
    if(fullName.value && email.value){
        let postUrl = `https://noroff.tnjensen.com/blogsite_exam1/wp-json/wp/v2/users/register`;    
        let result = await fetch(postUrl, {
            method: 'post',
            headers: {
            'Content-Type': 'application/json'
            },
            body: data,
        })
        .then(result => result.json()) 
        .then(result  => {
            fetch('https://noroff.tnjensen.com/blogsite_exam1/wp-json/wp/v2/users?per_page=1')
            .then(result => result.json())
            if(result.id){
                alert('Subscriber registered successfully.');
                fullName.value = "";
                email.value = "";
            }
        })
        .catch(error => console.error('Error:', error));
    }
    
}

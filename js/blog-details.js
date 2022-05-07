const blogPost = document.querySelector('.blog-post');
const url = 'https://noroffcors.herokuapp.com/https://noroff.tnjensen.com/blogsite_exam1/wp-json/wp/v2/posts/';
const loader = document.querySelector('.loader');
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const postId = params.get("id");

async function getPost(){
    try{
        let response = await fetch(url + postId + '?_embed');
        let result = await response.json();
        loader.innerHTML = "";
        loader.classList.remove('loading-indicator');
        console.log(result);
        
        blogPost.innerHTML = `<h4>${result.title.rendered}</h4>
                        <img src="${result._embedded['wp:featuredmedia'][0].source_url}" alt="${result._embedded['wp:featuredmedia'][0].alt_text}" />
                        <p>${result.content.rendered}</p>`;
    
    }
    catch(error){
        blogPost.innerHTML = `Error: ` + error;
    }
}
getPost();
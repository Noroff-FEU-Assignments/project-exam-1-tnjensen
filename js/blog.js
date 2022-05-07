const blogPosts = document.querySelector('.blog-posts');

const url = 'https://noroff.tnjensen.com/blogsite_exam1/wp-json/wp/v2/posts?_embed';
const loader = document.querySelector('.loader');

async function getPosts(){
    try{
        let response = await fetch(url);
        let results = await response.json();
        loader.innerHTML = "";
        loader.classList.remove('loading-indicator');
        console.log(results);
        
        for(i = 0; i < results.length; i++){ 
            let blogLink =`<a href="blog-detail.html?id=${results[i].id}" class="cta cta-small">Read more</a>`; 
            blogPosts.innerHTML += `<div class="latest-post">
                            <h4>${results[i].title.rendered}</h4>
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
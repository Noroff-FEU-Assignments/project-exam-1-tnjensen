const latestPosts = document.querySelector('.latest-posts');
const url = 'http://noroff.tnjensen.com/blogsite_exam1/wp-json/wp/v2/posts?_embed';
const loader = document.querySelector('.loader');
const leftAngle = document.querySelector('.fa-angle-left');
const rightAngle = document.querySelector('.fa-angle-right');
let counter = 0;
let i;

/* async function getLatestPosts(){
    try{
        let response = await fetch(url);
        let results = await response.json();
        latestPosts.innerHTML = "";
        loader.innerHTML = "";
        loader.classList.remove('loading-indicator');
        console.log(results);
        
        results.forEach(post => {
            latestPosts.innerHTML += `<div class="latest-post">
                            <h4>${post.title.rendered}</h4>
                            <img src="${post._embedded['wp:featuredmedia'][0].source_url}" alt="${post._embedded.author[0].name}" />
                            <p>${post.excerpt.rendered}</p>
                            </div>`;
        }); 
    }
    catch(error){
        latestPosts.innerHTML = `Error: ` + error;
    }
} */
async function getLatestPosts(){
    try{
        let response = await fetch(url);
        let results = await response.json();
        latestPosts.innerHTML = "";
        loader.innerHTML = "";
        loader.classList.remove('loading-indicator');
        console.log(results);
        
        for(i = 0; i <= 3; i++){ 
            leftAngle.style.display = "none";
            latestPosts.innerHTML += `<div class="latest-post">
                            <h4>${results[i].title.rendered}</h4>
                            <img src="${results[i]._embedded['wp:featuredmedia'][0].source_url}" alt="${results[i]._embedded['wp:featuredmedia'][0].alt_text}" />
                            <p>${results[i].excerpt.rendered}</p>
                            </div>`;

            rightAngle.onclick = function(){
                latestPosts.innerHTML = "";
                counter++;
                console.log(counter);
                
                leftAngle.style.display = "block";
                for(i = 4; i <= 7 ; i++){
                        latestPosts.innerHTML += `<div class="latest-post">
                        <h4>${results[i].title.rendered}</h4>
                        <img src="${results[i]._embedded['wp:featuredmedia'][0].source_url}" alt="${results[i]._embedded['wp:featuredmedia'][0].alt_text}" />
                        <p>${results[i].excerpt.rendered}</p>
                        </div>`;
                    
                }
                if(counter > 1 ){      
                    rightAngle.style.display = "none"; 
                    latestPosts.innerHTML = "";
                    for(i = 8; i <= 11 ; i++){
                        latestPosts.innerHTML += `<div class="latest-post">
                        <h4>${results[i].title.rendered}</h4>
                        <img src="${results[i]._embedded['wp:featuredmedia'][0].source_url}" alt="${results[i]._embedded['wp:featuredmedia'][0].alt_text}" />
                        <p>${results[i].excerpt.rendered}</p>
                        </div>`;
                    
                }
 
                }
            }
            
            leftAngle.onclick = function(){
                latestPosts.innerHTML = "";
                counter--;
                console.log(counter);
                
                if(counter === 1){
                    for(i = 4; i <= 7; i++){
                        leftAngle.style.display = "block";
                        rightAngle.style.display = "block";
                        latestPosts.innerHTML += `<div class="latest-post">
                        <h4>${results[i].title.rendered}</h4>
                        <img src="${results[i]._embedded['wp:featuredmedia'][0].source_url}" alt="${results[i]._embedded['wp:featuredmedia'][0].alt_text}" />
                        <p>${results[i].excerpt.rendered}</p>
                        </div>`;
                    }   
                }
                if(counter === 0){
                    leftAngle.style.display = "none";
                    rightAngle.style.display = "block";
                    for(i = 0; i <= 3; i++){
                        latestPosts.innerHTML += `<div class="latest-post">
                        <h4>${results[i].title.rendered}</h4>
                        <img src="${results[i]._embedded['wp:featuredmedia'][0].source_url}" alt="${results[i]._embedded['wp:featuredmedia'][0].alt_text}" />
                        <p>${results[i].excerpt.rendered}</p>
                        </div>`;
                    }  
                }   
            }  
        }    
    }
    catch(error){
        latestPosts.innerHTML = `Error: ` + error;
    }
}
getLatestPosts();
// Grab DOM elements

const postContainer = document.getElementById('post-container')
const loading = document.querySelector('.loader')
const filter = document.getElementById('filter')

let limit = 5;
let page = 1;

// Fetch posts from API

async function getPosts() {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);

    const data = await res.json();

    return data

}

// Show post in DOM

async function showPosts() {
   const posts = await getPosts();
   
   posts.forEach(post => {
       const postEl = document.createElement('div')
       postEl.classList.add('post')
       postEl.innerHTML = `
       <div class="number">${post.id}</div>
       <div class="post-info">
       <h2 class="post-title">${post.title}</h2>
       <p class="post-body">${post.body}</p>
       </div>
       `

       postContainer.appendChild(postEl)
   })


}

// Show loader & fetch more posts

function showLoading() {
    loading.classList.add('show')

    setTimeout(() => {
    loading.classList.remove('show')

    page++
    showPosts()
    }, 1000)
}

// Change color

function changeColor(word, post, title, body) {
    const res2 = body.replace(word, `<span style='color:red'>${word}</span>`);
    const res = title.replace(word, `<span style='color:red'>${word}</span>`);
    post.querySelector('.post-title').innerHTML = res.toLowerCase();
    post.querySelector('.post-body').innerHTML = res2.toLowerCase();
   
    
}

// Filter posts by input

function filterPosts(e) {
   const term = e.target.value.toUpperCase()

   const posts = document.querySelectorAll('.post');

   posts.forEach(post => {
    const title = post.querySelector('.post-title').innerText.toUpperCase();
    const body = post.querySelector('.post-body').innerText.toUpperCase();
    
    
    if(title.indexOf(term) > -1 || body.indexOf(term) > -1) {
        post.style.display = 'flex'
        changeColor(term, post, title, body)
        } else {
        post.style.display = 'none'
    }


   })
   
}

// Show initial posts

showPosts()

// Event listener

window.addEventListener('scroll', () => {
    const {scrollTop, scrollHeight, clientHeight} = document.documentElement;


if(scrollTop + clientHeight >= scrollHeight - 5) {
    showLoading()
}
})

filter.addEventListener('input', filterPosts)
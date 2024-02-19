const API_LINK = 'https://api.github.com/users';
let search_btn = document.querySelector('.search');
let search_term = document.querySelector('#search-term');
let searching = document.querySelector('.searching');
let repoUl = document.querySelector('#repo');

var repo = new Array(0);
search_term.focus();
search_btn.addEventListener("click", (e)=>{
    e.preventDefault();
    if(search_term.value){
        searching.innerHTML= "Searching...";
        setTimeout(() => {
            getUserDetails(`${API_LINK}/${search_term.value}`)

        }, 2000);
        setTimeout(() => {
            getRepoDetails(`${API_LINK}/${search_term.value}/repos`)

        }, 1000);
    }else{
        alert("Please enter any github username")
        search_term.focus();
    }
})


//Function to show data on browser screen
function showUserDetails(data) {

    let box = document.querySelector('.box-body');
    searching.innerHTML= "";

    var j = ``;

    repo.forEach((r)=> {
        r.forEach((res)=> {
            j+= `<a href="${res.html_url}" target="_blank"><li>${res.name}</li></a>`;
        })
    })

    box.innerHTML=(`
    <div class="profile-box">
    <div class="row">

        <div class="image">
            <img src="${data.avatar_url}" alt="">
        </div>

        <div class="about">
            <div class="details">
                <h1 class="name">${data.name}</h1>
                <h3 class="username">@${data.login}</h3>
                <p class="country"><span><ion-icon name="pin"></ion-icon></span>${data.location===null ? 'Unknown': data.location}</p>
            </div>
            <div class="btn-profile">
                <a href="${data.html_url}" target="_blank">Visit Profile</a>
            </div>
        </div>
    </div>

    <div class="bio">
        <h3>About</h3>
        <p>${data.bio===null ? 'Bio description is not available' : data.bio}</p>
    </div>

    <div class="row-followers">
        <div class="col">
            <h3 class="heading">Followers</h3>
            <p>${data.followers}</p>
        </div>
        <div class="col">
            <h3 class="heading">Following</h3>
            <p>${data.following}</p>
        </div>
        <div class="col">
            <h3 class="heading">Repos</h3>
            <p>${data.public_repos}</p>
        </div>
    </div>

    <h3 class="repo-heading">Repositories</h3>
    <div class="repos-row">
        <ul id="repo">
            ${j}
        </ul>
    </div>

</div>
    `);
}


//Fetching user details with this function
async function getUserDetails(api){
    let query = await fetch(api)
    .then(async (query)=> {
        return await query.json();
    })
    .then((result)=> {
        if(result.name==null){
            alert("User not found")
            location.reload();
        }else{
            // console.log(result);
            showUserDetails(result);
        }
    }).catch((error)=> {
        console.log(error)
    })
}

//Fetching user Repositiory with this function
async function getRepoDetails(repo_api){
    let repo_query = await fetch(repo_api)
    .then(async (repo_query)=> {
        return await repo_query.json();
    })
    .then((repo_result)=> {
       repo.push(repo_result);
    }).catch((error)=> {
        console.log(error);
    })
}
import reddit from './reddit_api';

const searchForm=document.getElementById("search-form");
const searchInput=document.getElementById("search-input");


//form event listner
searchForm.addEventListener("submit",function(e){
    //get search term
    const searchTerm=searchInput.value;
    //get sort
    const sortBy=document.querySelector("input[name='sortby']:checked").value;
    console.log(sortBy);
    //get limit
    const searchLimit=document.getElementById("limit").value;
    console.log(searchLimit);

    //check input
    if(searchTerm===''){
        //show message
        showMessage("Please add a search term....",'alert-danger');
    }

    //clear input
    searchInput.value="";
    //search reddit
    reddit.search(searchTerm, searchLimit, sortBy)
    .then(data=>{
        let output=`<div class='card-columns'>`;

        //loop through posts
        data.forEach(post=>{
            //check for image
            const image=post.preview ? post.preview.images[0].source.url : 'data:image/jpeg;base64,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';
            output+=`
            <div class="card">
                <img src=${image} class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${post.title}</h5>
                    <p class="card-text">${truncateText(post.selftext, 100)}</p>
                    <a href=${post.url} target="_blank" class="btn btn-primary">Read More</a>
                    <hr>
                    <span class='badge badge-secondary'>Subreddit: ${post.subreddit}</span>
                    <span class='badge badge-dark'>Score: ${post.score}</span>
                </div>
            </div>
            `;
        })
        output+='</div>'
        document.getElementById("results").innerHTML=output;
    })
    e.preventDefault();
})


//show message
function showMessage(message, classname){
    
    //create div
    const div=document.createElement("div");
    div.className=`alert ${classname}`;

    //add the text
    div.appendChild(document.createTextNode(message));

    //get parent
    const searchContainer=document.getElementById("search-container");
    //get search
    const search=document.getElementById("search");
    //insert message
    searchContainer.insertBefore(div, search);

    //timeout alert
    setTimeout(()=>{
        document.querySelector(".alert").remove()
    },2000);
}



//truncate text
function truncateText(text, limit){
    const shortened=text.indexOf(' ', limit);
    if(shortened===-1){
        return text;
    }
    return text.substring(0, shortened);
}
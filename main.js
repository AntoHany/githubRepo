let myInput = document.querySelector('.container form [type="text"]');
let btn = document.querySelector('.container form [type="submit"]');

let myRepoList = document.querySelector('div .repos') 


btn.onclick = function(event){
    event.preventDefault()
    getRepos();
}

function getRepos(){
    if (myInput.value == "") {
        let h3 = document.querySelector('.container .repos h3');
        h3.textContent = "no repos to show type user name";
    } else {
        fetch(`https://api.github.com/users/${myInput.value}/repos`)
        .then((response) => {
            return response.json();
        })
        .then((result) => {

            myRepoList.innerHTML = "";
            
            result.forEach(ele => {
                
                let mainDiv = document.createElement('div');
                mainDiv.classList.add("repos-list");
                
                let spanName = document.createElement('span');
                spanName.classList.add("repo-name");
                spanName.appendChild(document.createTextNode(ele.name));
                
                let spanStar = document.createElement('span');
                spanStar.classList.add("star");
                spanStar.appendChild(document.createTextNode("star " + ele.stargazers_count));
                
                let link = document.createElement('a');
                link.classList.add("button");
                link.setAttribute("href",`https://github.com/${myInput.value}/${ele.name}/`);
                link.setAttribute("target","_blank");
                link.appendChild(document.createTextNode("viwe"));
                
                mainDiv.append(spanName);
                mainDiv.append(spanStar);
                mainDiv.append(link);
                
                myRepoList.append(mainDiv);
                
            })
        })
        .catch((error)=>{
            console.log(`ERROR ${error}`)
        })
    }
}
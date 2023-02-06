
const searchInp = document.querySelector('.searchRepo');
const repoContainer = document.querySelector('.searchRepo-container')
const chosensRepo = document.querySelector('.chosensRepo')



chosensRepo.addEventListener('click', function(ev){
  if(ev.target.classList.contains('close')){
  ev.target.parentElement.remove()
  }
})


repoContainer.addEventListener('click', function(event){
createChosenRepo(event.target)
searchInp.value = ''
removeRepositories()
})


function createChosenRepo(info){
  let name = info.textContent;
  let owner = info.dataset.owner;
  let stars = info.dataset.stars;

  let chosenItem = document.createElement('div')
  chosenItem.classList.add('chosenItem')
 let chosenItemName = document.createElement('p')
 chosenItemName.innerText = `Name: ${name}`
 chosenItem.appendChild(chosenItemName)
 let chosenItemOwner = document.createElement('p')
 chosenItemOwner.innerText =  `Owner: ${owner}`
 chosenItem.appendChild(chosenItemOwner)
 let chosenItemStars = document.createElement('p')
 chosenItemStars.innerText =  `Stars: ${stars}`
 chosenItem.appendChild(chosenItemStars )
 let close = document.createElement('div')
 close.classList.add('close')
 chosenItem.appendChild(close)
 chosensRepo.appendChild(chosenItem)
}

async function getRepositories(){
  let val = searchInp.value;
  if (val == "") return removeRepositories()
 
  

  try {
    let response = await fetch(`https://api.github.com/search/repositories?q=${val}`)
    if (response.ok){
      let array = await response.json()
      showRepositories(array)
    } else {console.log('Error: ' + response.status)}

  } catch(err) {
return err
  }

}

function removeRepositories(){
repoContainer.innerHTML = ''
}

function createNewRepoItem(name, owner, stars){
  let item = document.createElement('div')
  item.classList.add('item')
  item.setAttribute("data-owner", `${owner}`);
  item.setAttribute("data-stars", `${stars}`);
  item.innerHTML = `${name}`
  repoContainer.appendChild(item)
}

function showRepositories(repositories){
  removeRepositories()
  for (let i=0;i<5;i++){
    let name = repositories.items[i].name;
    let owner = repositories.items[i].owner.login;
    let stars = repositories.items[i].stargazers_count;
createNewRepoItem(name, owner, stars)
  }
}




function debounce (fn, debounceTime) {
  let timer;
  return function(...args){
    clearTimeout(timer);
    timer = setTimeout(()=>{
  fn.apply(this, args)
    }, debounceTime)
  }
  };

const getRepositoriesWithDebounce = debounce(getRepositories, 500);
searchInp.addEventListener("input", getRepositoriesWithDebounce);








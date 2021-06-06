// Fetch to get all pup objects and send requests

fetch('http://localhost:3000/pups')
.then(resp => resp.json())
.then(dogs => {
  renderDogs(dogs)
  updateDogStatus(dogs)
})

function renderDogs(dogs) {
  //Create empty spans and append the images, names and buttons to the dog info container (not displayed)
  const dogBar = document.getElementById('dog-bar')
  const dogInfo = document.getElementById('dog-info')
  for (let i=0; i<=dogs.length -1; i++) {
    
    dogBar.appendChild(document.createElement('span'))
      
    dogInfo.appendChild(document.createElement('img')).style.display ='none'
    document.getElementsByTagName('img')[i].setAttribute('src', dogs[i].image)
    document.getElementsByTagName('img')[i].setAttribute('alt', dogs[i].name)
    
    dogInfo.appendChild(document.createElement('h2')).style.display = 'none'
    document.querySelectorAll('#dog-info h2')[i].textContent = dogs[i].name
    
    dogInfo.appendChild(document.createElement('button')).style.display = 'none'
    document.querySelectorAll('#dog-info button')[i].textContent = dogs[i].isGoodDog ? 'Good Dog!' : 'Bad Dog!'

    
  }
    
  
  //Assign the name of the dogs to the spans
  const dogSpans = document.querySelectorAll('div#dog-bar span')
  for (let i=0; i<=dogSpans.length -1; i++) {
    dogSpans[i].textContent = dogs[i].name
    dogSpans[i].className = dogs[i].isGoodDog
  }
  //Add a click event listener to each span
  const dogImgs = document.getElementsByTagName('img')
  const dogNames = document.querySelectorAll('#dog-info h2')
  const dogButtons = document.querySelectorAll('#dog-info button')
  for (let i=0; i<=dogSpans.length -1; i++) {
    dogSpans[i].addEventListener('click', (e) => {
      for (let j=0; j<=dogSpans.length -1; j++) {
        dogImgs[j].style.display = 'none'
        dogNames[j].style.display = 'none'
        dogButtons[j].style.display = 'none'
      }
      if (dogSpans[i].textContent === dogImgs[i].alt) {
        dogImgs[i].style.display = 'block'
        dogNames[i].style.display = 'block'
        dogButtons[i].style.display = 'block'

      }
    })
  }
  //Add event listener to the dogs filter
  const dogFilter = document.getElementById('good-dog-filter')
  dogFilter.addEventListener('click', ()=> {
    if (dogFilter.textContent === 'Filter good dogs: OFF') {
      dogFilter.textContent = 'Filter good dogs: ON'
      //Filter dog spans whose class is false and disable them
      dogSpans.forEach(span=> {
        if (span.className === 'false'){
          span.style.display = 'none'
        }
      })
    } 
    else {
      dogFilter.textContent = 'Filter good dogs: OFF'
      dogSpans.forEach(span=> {
        span.style.display = 'flex'
      })
    }
  })

}

function updateDogStatus(dogs) {
  const dogButtons = document.querySelectorAll('#dog-info button')
  const dogTitles = document.querySelectorAll('div#dog-bar span')
  for (let i=0; i<=dogs.length -1; i++) {
    dogButtons[i].addEventListener('click', ()=> {
      if (dogButtons[i].textContent === 'Good Dog!') {
        dogButtons[i].textContent = 'Bad Dog!'
         
        fetch(`http://localhost:3000/pups/${i+1}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({isGoodDog: false})
        })
        dogTitles[i].className = 'false'
      } else {
        dogButtons[i].textContent = 'Good Dog!'
        fetch(`http://localhost:3000/pups/${i+1}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({isGoodDog: true})
        })
        dogTitles[i].className = 'true'
      }
    })
  }
}
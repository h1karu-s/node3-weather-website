
const messageOne = document.getElementById('message-1');
const messageTwo = document.getElementById('message-2')

// messageOne.textContent = 'Form Javascript'

const searchWeather = ({value}) =>{
fetch(`/weather?address=${value}`).then((response) =>{
  response.json().then((data) => {
    if(data.error){
      messageOne.textContent = data.error;
    }else{
      messageOne.textContent = data.location;
      messageTwo.textContent = data.forecast;
    }
  })
})
}

const weatherForm = document.querySelector('form');
const Search = document.getElementById('text');
weatherForm.addEventListener('submit',(e) => {

  messageOne.textContent = 'Loading...'
  messageTwo.textContent = '';
  e.preventDefault();
  searchWeather(Search);
  
})
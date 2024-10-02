const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const APIkey = "d92b9ffb7a98c363949291d6da3f1bca";
weatherForm.addEventListener("submit",async event =>{
   event.preventDefault();
   const city = cityInput.value;
   if(city)
   {
     try{
           const weatherData = await getweatherData(city);
           displayWeaterhInfo(weatherData);
     }
     catch(error)
     {
        console.error(error);
        displayError(error);
     }
   }
   else
   {
    displayError('Please enter a city');
   }
});

async function getweatherData(city)
{
 const APIurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}`;
 const response = await fetch(APIurl);
 if(!response.ok)
 {
   throw new Error('Could not fetch weather data');
 }
 else
 {
  return await response.json();
 }
}

function displayWeaterhInfo(data)
{
  const {name: city , main: {temp,humidity}, weather: [{description,id}]} = data;
  card.textContent = '';
  card.style.display="flex";
  const cityDisplay = document.createElement('h1');
  const tempDisplay = document.createElement('p');
  const humidityDisplay = document.createElement('p');
  const descDisplay = document.createElement('p');
  const weatherEmoji = document.createElement('p');

  cityDisplay.textContent = city;
  cityDisplay.classList.add('cityDisplay');
  card.appendChild(cityDisplay);

  tempDisplay.textContent = `${String((Number(temp)-273.15).toFixed(1))}° C`;
  tempDisplay.classList.add('tempDisplay');
  card.appendChild(tempDisplay);

  humidityDisplay.textContent = `humidity: ${humidity}%`;
  humidityDisplay.classList.add('humidityDisplay');
  card.appendChild(humidityDisplay);

  descDisplay.textContent = description;
  descDisplay.classList.add('descDisplay');
  card.appendChild(descDisplay);

  weatherEmoji.textContent = getWaetherEmoji(id);
  weatherEmoji.classList.add('weatherEmoji');
  card.appendChild(weatherEmoji);
  
}

function getWaetherEmoji(weatherId){
  switch(true)
   {
     case(weatherId >= 200 && weatherId < 300):
      return '⛈️';
     case (weatherId >= 300 && weatherId < 400):
        return '🌦️';
     case (weatherId >= 500 && weatherId < 600):
        return '🌧️';
     case (weatherId >= 600 && weatherId < 700):
        return '🌨️';
     case (weatherId >= 700 && weatherId < 800):
        return '⛅';
     case (weatherId === 800):
        return '☀️';
     case (weatherId > 800 ):
        return '☁️';
        default:
            return '⁉️';
   }
}
function displayError(msg){
 const errrorDisplay = document.createElement('p');
 errrorDisplay.textContent = msg;
 errrorDisplay.classList.add('errorDisplay');
 card.textContent = '';
 card.style.display='flex';
 card.appendChild(errrorDisplay);
}
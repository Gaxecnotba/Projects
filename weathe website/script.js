const apiKey = "4e1b3262c544fc117cec8ed6ade28c24";
const apiUrl= "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search-box input");
/* I created this variable in order to get the value from my input and the "searchBTN" that checks weather function */
const searchBTN= document.querySelector(".search-box button");
const weatherImg= document.querySelector(".weather-icon");


/*I use fecth function in order to make a network request to my appiUrl with an query that contains my apiKey */
async function checkWeather(city){
    const response = await fetch(apiUrl + city +`&appid=${apiKey}`);

    if(response.status==404){
        /*I used this condition in order to display the error message if the city or country is incorrect */
        document.querySelector(".not-found").style.display = "block"; 
        document.querySelector(".weather-box").style.display = "none";
    } else { 

        var data = await response.json();
         /* I used var to declare my varible data, and also i used async keyword because i defined an  asynchronous function, and that allows me to use await keyword too, that is used to pause the function until the promise is settled, So "check Weather is my  asynchronous function" and "await" inside the function would return the request or show an error */

        document.querySelector(".city").innerHTML = data.name;
        /*This line selects an element with the class "city" using the querySelector method and updates its innerHTML property with the value of data.name. So, it displays the name of the city. */
        document.querySelector(".temperature").innerHTML = data.main.temp + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";
        /*I used .innerHTML becauseyou i can retrieve the HTML content inside the specified element, Therefore, any previous content will be removed or replaced by the new content. */

        
        if(data.weather[0].main =="Clouds"){  /*If the weather condition is "Clouds", it sets the src attribute of an image element (referred to as weatherImg) to "imag/cloudy.png". */
        weatherImg.src= "imag/cloudy.png";
        } else if(data.weather[0].main =="Clear"){
        weatherImg.src= "imag/sun.png";
        } else if(data.weather[0].main =="Rain"){
        weatherImg.src= "imag/rain.png";
        } else if(data.weather[0].main =="Mist"){
        weatherImg.src= "imag/mist.png";
        } else if(data.weather[0].main =="Drizzle"){
        weatherImg.src= "imag/snow.gif";
        }

        document.querySelector(".weather-box").style.display = "block";
        document.querySelector(".not-found").style.display = "none";
    }
}

searchBTN.addEventListener("click", () => {
    checkWeather(searchBox.value);
})

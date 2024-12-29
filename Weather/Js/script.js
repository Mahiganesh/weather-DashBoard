document.getElementById("search-btn").addEventListener("click", function() {
    const city = document.getElementById("city-input").value;
    if (city) {
      getWeatherData(city);
    }
  });
  
  async function getWeatherData(city) {
    const apiKey = 'e9a95f4581846a56b7dcde336ce5eee0'; 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      if (data.cod === 200) {
        const cityName = data.name;
        const temp = data.main.temp;
        const condition = data.weather[0].description;
        const weatherIcon = data.weather[0].icon;
        const currentTime = new Date().toLocaleTimeString();
  
        // Display data
        document.getElementById("city-name").innerText = cityName;
        document.getElementById("temperature").innerText = `Temperature: ${temp}°C`;
        document.getElementById("condition").innerText = `Condition: ${condition}`;
        document.getElementById("current-time").innerText = `Current Time: ${currentTime}`;
  
        // Optional: Add weather icon
        const iconUrl = `https://openweathermap.org/img/wn/${weatherIcon}.png`;
        const iconElement = document.createElement('img');
        iconElement.src = iconUrl;
        document.getElementById("condition").appendChild(iconElement);
  
        // Change background color based on weather condition
        changeBackgroundColor(condition);
      } else {
        alert('City not found, please try again.');
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  }
  
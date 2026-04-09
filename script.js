const apiKey = "b7bf10cc49d449768b454425260904";

// Enter key support
document.getElementById("city").addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        getWeather();
    }
});

// Get weather by city
async function getWeather() {
    const city = document.getElementById("city").value;

    if (!city) {
        alert("Please enter a city");
        return;
    }

    document.getElementById("result").innerHTML = "Loading...";

    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.error) {
        document.getElementById("result").innerHTML = data.error.message + " ❌";
        return;
    }

    updateUI(data);
}

// Get weather by location
function getLocationWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {

            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            document.getElementById("result").innerHTML = "Loading...";

            const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}`;

            const response = await fetch(url);
            const data = await response.json();

            updateUI(data);
        });
    } else {
        alert("Geolocation not supported");
    }
}

// Update UI + background
function updateUI(data) {
    const condition = data.current.condition.text.toLowerCase();

    // Dynamic background
    if (condition.includes("sunny") || condition.includes("clear")) {
        document.body.style.background = "linear-gradient(135deg, #f7971e, #ffd200)";
    } else if (condition.includes("cloud")) {
        document.body.style.background = "linear-gradient(135deg, #757f9a, #d7dde8)";
    } else if (condition.includes("rain")) {
        document.body.style.background = "linear-gradient(135deg, #4b79a1, #283e51)";
    } else {
        document.body.style.background = "linear-gradient(135deg, #007bff, #00c6ff)";
    }

    // Display data
    document.getElementById("result").innerHTML = `
        <h2>${data.location.name}</h2>
        <img src="https:${data.current.condition.icon}">
        <h3>${data.current.temp_c}°C</h3>
        <p>${data.current.condition.text}</p>
        <p>💧 Humidity: ${data.current.humidity}%</p>
        <p>🌬️ Wind: ${data.current.wind_kph} km/h</p>
    `;
}
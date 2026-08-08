// API Configuration (usando OpenWeatherMap API - requer API key)
const API_KEY = '3c07958209e1ddbebd10775059c0ded9'; // Sua chave da OpenWeatherMap
const API_BASE = 'https://api.openweathermap.org/data/2.5';
const USE_DEMO_MODE = (API_KEY === 'YOUR_API_KEY_HERE'); // Ativa modo demo automaticamente

// State
let currentUnit = 'C';
let currentWeatherData = null;
let cityTimezoneOffset = 0; // Timezone offset in seconds
let clockInterval = null;

// Weather Canvas Animation
let canvas, ctx;
let weatherParticles = [];
let currentWeatherType = 'clear';

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initCanvas();
    initParticles();
    initEventListeners();
    updateDateTime();
    updateClock();
    // Clock will be updated with intervals when city data is loaded
    
    // Check if we're in demo mode
    if (USE_DEMO_MODE) {
        showDemoNotification();
        useDemoData();
    } else {
        // Load default city or user location
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    fetchWeatherByCoords(position.coords.latitude, position.coords.longitude);
                },
                () => {
                    // Fallback to default city
                    fetchWeatherByCity('Lisboa');
                }
            );
        } else {
            fetchWeatherByCity('Lisboa');
        }
    }
});

// Initialize Canvas
function initCanvas() {
    canvas = document.getElementById('weatherCanvas');
    if (!canvas) return;
    
    ctx = canvas.getContext('2d');
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    animateWeatherCanvas();
}

function resizeCanvas() {
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// Create Particles
function initParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
        container.appendChild(particle);
    }
}

// ===== WEATHER BACKGROUND ANIMATION FUNCTIONS =====

function updateWeatherBackground(condition) {
    currentWeatherType = condition;
    weatherParticles = [];
    
    // Create weather-specific particles
    const particleCount = condition === 'rain' || condition === 'drizzle' ? 150 : 
                          condition === 'snow' ? 100 : 0;
    
    for (let i = 0; i < particleCount; i++) {
        weatherParticles.push(createWeatherParticle(condition));
    }
}

function createWeatherParticle(type) {
    const particle = {
        x: Math.random() * (canvas ? canvas.width : window.innerWidth),
        y: Math.random() * (canvas ? canvas.height : window.innerHeight),
        speed: 0,
        size: 0,
        opacity: Math.random() * 0.5 + 0.3
    };
    
    if (type === 'rain' || type === 'drizzle') {
        particle.speed = Math.random() * 15 + 10;
        particle.size = Math.random() * 2 + 1;
        particle.length = Math.random() * 15 + 10;
    } else if (type === 'snow') {
        particle.speed = Math.random() * 2 + 0.5;
        particle.size = Math.random() * 4 + 2;
        particle.drift = Math.random() * 2 - 1;
    }
    
    return particle;
}

function animateWeatherCanvas() {
    if (!canvas || !ctx) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw sun rays for clear weather
    if (currentWeatherType === 'clear') {
        drawSunRays();
    }
    
    // Draw clouds
    if (currentWeatherType === 'clouds') {
        drawClouds();
    }
    
    // Draw weather particles
    weatherParticles.forEach((particle) => {
        if (currentWeatherType === 'rain' || currentWeatherType === 'drizzle') {
            drawRainDrop(particle);
        } else if (currentWeatherType === 'snow') {
            drawSnowflake(particle);
        }
        
        // Update particle position
        particle.y += particle.speed;
        
        if (currentWeatherType === 'snow') {
            particle.x += particle.drift;
        }
        
        // Reset particle when it goes off screen
        if (particle.y > canvas.height) {
            particle.y = -20;
            particle.x = Math.random() * canvas.width;
        }
        
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.x < 0) particle.x = canvas.width;
    });
    
    requestAnimationFrame(animateWeatherCanvas);
}

function drawSunRays() {
    if (!ctx || !canvas) return;
    
    const centerX = canvas.width * 0.8;
    const centerY = canvas.height * 0.2;
    const rayCount = 12;
    const time = Date.now() * 0.0005;
    
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.1)';
    ctx.lineWidth = 2;
    
    for (let i = 0; i < rayCount; i++) {
        const angle = (Math.PI * 2 * i / rayCount) + time;
        const length = 150 + Math.sin(time + i) * 20;
        
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(
            centerX + Math.cos(angle) * length,
            centerY + Math.sin(angle) * length
        );
        ctx.stroke();
    }
}

function drawClouds() {
    if (!ctx || !canvas) return;
    
    const time = Date.now() * 0.0001;
    
    for (let i = 0; i < 3; i++) {
        const x = (canvas.width * 0.2 * i + time * 20) % canvas.width;
        const y = 100 + i * 80;
        
        ctx.fillStyle = 'rgba(0, 240, 255, 0.05)';
        ctx.beginPath();
        ctx.arc(x, y, 40, 0, Math.PI * 2);
        ctx.arc(x + 30, y - 10, 50, 0, Math.PI * 2);
        ctx.arc(x + 60, y, 40, 0, Math.PI * 2);
        ctx.fill();
    }
}

function drawRainDrop(particle) {
    if (!ctx) return;
    
    ctx.strokeStyle = `rgba(0, 240, 255, ${particle.opacity})`;
    ctx.lineWidth = particle.size;
    ctx.beginPath();
    ctx.moveTo(particle.x, particle.y);
    ctx.lineTo(particle.x, particle.y + particle.length);
    ctx.stroke();
}

function drawSnowflake(particle) {
    if (!ctx) return;
    
    ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw snowflake arms
    ctx.strokeStyle = `rgba(255, 255, 255, ${particle.opacity * 0.5})`;
    ctx.lineWidth = 1;
    
    for (let i = 0; i < 6; i++) {
        const angle = (Math.PI * 2 * i / 6);
        ctx.beginPath();
        ctx.moveTo(particle.x, particle.y);
        ctx.lineTo(
            particle.x + Math.cos(angle) * particle.size * 1.5,
            particle.y + Math.sin(angle) * particle.size * 1.5
        );
        ctx.stroke();
    }
}

// ===== END WEATHER BACKGROUND ANIMATION =====

// Event Listeners
function initEventListeners() {
    // Search
    document.getElementById('searchBtn').addEventListener('click', handleSearch);
    document.getElementById('citySearch').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSearch();
    });
    
    // Location
    document.getElementById('locationBtn').addEventListener('click', () => {
        if (USE_DEMO_MODE) {
            alert('🔧 MODO DEMO ATIVO\n\nPara usar localização real, adicione sua API key da OpenWeatherMap no arquivo script.js\n\nObtenha gratuitamente em: https://openweathermap.org/api');
            return;
        }
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    fetchWeatherByCoords(position.coords.latitude, position.coords.longitude);
                },
                () => {
                    alert('Não foi possível obter a sua localização');
                }
            );
        }
    });
    
    // Theme Toggle
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
    
    // Unit Toggle
    document.querySelectorAll('.unit-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.unit-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentUnit = btn.dataset.unit;
            if (currentWeatherData) {
                updateTemperatureDisplay();
            }
        });
    });
}

// Handle Search
function handleSearch() {
    const city = document.getElementById('citySearch').value.trim();
    if (city) {
        if (USE_DEMO_MODE) {
            alert('🔧 MODO DEMO ATIVO\n\nPara buscar cidades reais, adicione sua API key da OpenWeatherMap no arquivo script.js\n\nObtenha gratuitamente em: https://openweathermap.org/api');
            return;
        }
        fetchWeatherByCity(city);
    }
}

// Toggle Theme
function toggleTheme() {
    document.body.classList.toggle('night-mode');
}

// Update theme based on city's time
function updateThemeByTime(weatherData) {
    // Get current time in city
    const now = new Date();
    const utcTime = now.getTime() + (now.getTimezoneOffset() * 60000);
    const cityTime = new Date(utcTime + (cityTimezoneOffset * 1000));
    const cityHour = cityTime.getHours();
    
    // Get sunrise and sunset times
    const sunrise = new Date(weatherData.sys.sunrise * 1000);
    const sunset = new Date(weatherData.sys.sunset * 1000);
    const sunriseHour = sunrise.getHours();
    const sunsetHour = sunset.getHours();
    
    // Apply night mode if it's night time in the city
    if (cityHour < sunriseHour || cityHour >= sunsetHour) {
        document.body.classList.add('night-mode');
    } else {
        document.body.classList.remove('night-mode');
    }
}

// Update Date/Time with timezone
function updateDateTime() {
    // Get current time in UTC
    const now = new Date();
    const utcTime = now.getTime() + (now.getTimezoneOffset() * 60000);
    
    // Apply city timezone offset
    const cityTime = new Date(utcTime + (cityTimezoneOffset * 1000));
    
    const days = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'];
    const months = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];
    
    const dayName = days[cityTime.getDay()];
    const day = cityTime.getDate().toString().padStart(2, '0');
    const month = months[cityTime.getMonth()];
    const year = cityTime.getFullYear();
    const hours = cityTime.getHours().toString().padStart(2, '0');
    const minutes = cityTime.getMinutes().toString().padStart(2, '0');
    
    document.getElementById('dateTime').textContent = 
        `${dayName}, ${day} ${month} ${year} | ${hours}:${minutes}`;
    
    // Update timezone info
    const timezoneInfo = document.getElementById('timezoneInfo');
    if (timezoneInfo) {
        const offsetHours = Math.floor(cityTimezoneOffset / 3600);
        const offsetMinutes = Math.abs(Math.floor((cityTimezoneOffset % 3600) / 60));
        const sign = offsetHours >= 0 ? '+' : '-';
        const absHours = Math.abs(offsetHours);
        
        if (offsetHours === 0 && offsetMinutes === 0) {
            timezoneInfo.textContent = 'UTC+0 (Horário Local)';
        } else {
            const minutesStr = offsetMinutes > 0 ? `:${offsetMinutes.toString().padStart(2, '0')}` : '';
            timezoneInfo.textContent = `UTC${sign}${absHours}${minutesStr}`;
        }
    }
}

// Update Analog Clock with timezone
function updateClock() {
    // Get current time in UTC
    const now = new Date();
    const utcTime = now.getTime() + (now.getTimezoneOffset() * 60000);
    
    // Apply city timezone offset
    const cityTime = new Date(utcTime + (cityTimezoneOffset * 1000));
    
    const hours = cityTime.getHours() % 12;
    const minutes = cityTime.getMinutes();
    const seconds = cityTime.getSeconds();
    
    // Calculate angles (0 degrees is at 12 o'clock in SVG)
    const secondAngle = seconds * 6; // 6 degrees per second
    const minuteAngle = minutes * 6 + seconds * 0.1; // 6 degrees per minute
    const hourAngle = hours * 30 + minutes * 0.5; // 30 degrees per hour
    
    // Update hands with SVG transform attribute
    const hourHand = document.getElementById('hourHand');
    const minuteHand = document.getElementById('minuteHand');
    const secondHand = document.getElementById('secondHand');
    
    if (hourHand) hourHand.setAttribute('transform', `rotate(${hourAngle} 100 100)`);
    if (minuteHand) minuteHand.setAttribute('transform', `rotate(${minuteAngle} 100 100)`);
    if (secondHand) secondHand.setAttribute('transform', `rotate(${secondAngle} 100 100)`);
    
    // Update digital time
    const digitalTime = document.getElementById('digitalTime');
    if (digitalTime) {
        const displayHours = cityTime.getHours().toString().padStart(2, '0');
        const displayMinutes = cityTime.getMinutes().toString().padStart(2, '0');
        digitalTime.textContent = `${displayHours}:${displayMinutes}`;
    }
}

// Start clock intervals
function startClockUpdates() {
    // Clear existing intervals
    if (clockInterval) {
        clearInterval(clockInterval.dateTime);
        clearInterval(clockInterval.clock);
    }
    
    // Update immediately
    updateDateTime();
    updateClock();
    
    // Set new intervals
    clockInterval = {
        dateTime: setInterval(updateDateTime, 60000), // Every minute
        clock: setInterval(updateClock, 1000) // Every second
    };
}

// Fetch Weather by City
async function fetchWeatherByCity(city) {
    try {
        showLoading();
        
        // Current Weather
        const currentResponse = await fetch(
            `${API_BASE}/weather?q=${city}&appid=${API_KEY}&units=metric&lang=pt`
        );
        
        if (!currentResponse.ok) {
            const errorData = await currentResponse.json();
            throw new Error(errorData.message || 'Cidade não encontrada');
        }
        
        const currentData = await currentResponse.json();
        
        // Forecast (hourly + 7 days)
        const forecastResponse = await fetch(
            `${API_BASE}/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=pt`
        );
        
        const forecastData = await forecastResponse.json();
        
        currentWeatherData = {
            current: currentData,
            forecast: forecastData
        };
        
        updateUI(currentWeatherData);
        hideLoading();
        
    } catch (error) {
        console.error('Error fetching weather:', error);
        hideLoading();
        
        let errorMessage = 'Erro ao obter dados meteorológicos.\n\n';
        
        if (error.message.includes('API key')) {
            errorMessage += '❌ API Key inválida!\n\nVerifique sua chave da OpenWeatherMap no arquivo script.js';
        } else if (error.message.includes('city not found')) {
            errorMessage += '❌ Cidade não encontrada!\n\nVerifique o nome da cidade e tente novamente.';
        } else if (error.message === 'Failed to fetch') {
            errorMessage += '❌ Erro de conexão!\n\nVerifique sua internet ou se a API key está ativa.';
        } else {
            errorMessage += '❌ ' + error.message;
        }
        
        alert(errorMessage);
    }
}

// Fetch Weather by Coordinates
async function fetchWeatherByCoords(lat, lon) {
    try {
        showLoading();
        
        const currentResponse = await fetch(
            `${API_BASE}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=pt`
        );
        
        const currentData = await currentResponse.json();
        
        const forecastResponse = await fetch(
            `${API_BASE}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=pt`
        );
        
        const forecastData = await forecastResponse.json();
        
        currentWeatherData = {
            current: currentData,
            forecast: forecastData
        };
        
        updateUI(currentWeatherData);
        hideLoading();
        
    } catch (error) {
        console.error('Error fetching weather:', error);
        hideLoading();
        alert('Erro ao obter dados da localização. Verifique sua API key.');
    }
}

// Update UI with Weather Data
function updateUI(data) {
    const { current, forecast } = data;
    
    // Update timezone offset from API
    cityTimezoneOffset = current.timezone || 0;
    
    // Update Current Weather
    document.getElementById('cityName').textContent = current.name.toUpperCase();
    updateTemperatureDisplay();
    document.getElementById('condition').textContent = current.weather[0].description;
    document.getElementById('feelsLike').textContent = 
        `Sensação: ${Math.round(convertTemp(current.main.feels_like))}°${currentUnit}`;
    
    // Update Weather Icon
    updateWeatherIcon(current.weather[0].main);
    
    // Update Metrics
    updateMetrics(current);
    
    // Update Hourly Forecast
    updateHourlyForecast(forecast.list.slice(0, 8));
    
    // Update Weekly Forecast
    updateWeeklyForecast(forecast.list);
    
    // Start clock updates with new timezone
    startClockUpdates();
    
    // Update theme based on time of day
    updateThemeByTime(current);
}

// Update Temperature Display
function updateTemperatureDisplay() {
    if (!currentWeatherData) return;
    
    const temp = currentWeatherData.current.main.temp;
    document.getElementById('temperature').textContent = Math.round(convertTemp(temp));
    document.getElementById('unit').textContent = `°${currentUnit}`;
}

// Convert Temperature
function convertTemp(celsius) {
    return currentUnit === 'F' ? (celsius * 9/5) + 32 : celsius;
}

// Update Weather Icon
function updateWeatherIcon(condition) {
    const iconContainer = document.getElementById('weatherIcon');
    let iconSVG = '';
    
    switch(condition.toLowerCase()) {
        case 'clear':
            iconSVG = `
                <svg width="120" height="120" viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="60" cy="60" r="25" class="sun-icon"/>
                    <line x1="60" y1="10" x2="60" y2="25" class="sun-ray"/>
                    <line x1="60" y1="95" x2="60" y2="110" class="sun-ray"/>
                    <line x1="10" y1="60" x2="25" y2="60" class="sun-ray"/>
                    <line x1="95" y1="60" x2="110" y2="60" class="sun-ray"/>
                    <line x1="25" y1="25" x2="35" y2="35" class="sun-ray"/>
                    <line x1="85" y1="85" x2="95" y2="95" class="sun-ray"/>
                    <line x1="85" y1="25" x2="95" y2="35" class="sun-ray"/>
                    <line x1="25" y1="85" x2="35" y2="95" class="sun-ray"/>
                </svg>
            `;
            break;
        case 'clouds':
            iconSVG = `
                <svg width="120" height="120" viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M30 70 Q25 50, 40 45 Q45 30, 60 35 Q75 30, 80 45 Q95 50, 90 70 Z" fill="rgba(0,240,255,0.2)"/>
                </svg>
            `;
            break;
        case 'rain':
            iconSVG = `
                <svg width="120" height="120" viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M30 50 Q25 30, 40 25 Q45 10, 60 15 Q75 10, 80 25 Q95 30, 90 50 Z" fill="rgba(0,240,255,0.2)"/>
                    <line x1="40" y1="60" x2="35" y2="80" stroke-linecap="round"/>
                    <line x1="55" y1="65" x2="50" y2="85" stroke-linecap="round"/>
                    <line x1="70" y1="60" x2="65" y2="80" stroke-linecap="round"/>
                </svg>
            `;
            break;
        case 'snow':
            iconSVG = `
                <svg width="120" height="120" viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M30 50 Q25 30, 40 25 Q45 10, 60 15 Q75 10, 80 25 Q95 30, 90 50 Z" fill="rgba(0,240,255,0.2)"/>
                    <circle cx="40" cy="70" r="3" fill="currentColor"/>
                    <circle cx="55" cy="75" r="3" fill="currentColor"/>
                    <circle cx="70" cy="70" r="3" fill="currentColor"/>
                </svg>
            `;
            break;
        default:
            iconSVG = `
                <svg width="120" height="120" viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="60" cy="60" r="25"/>
                </svg>
            `;
    }
    
    iconContainer.innerHTML = iconSVG;
}

// Update Metrics
function updateMetrics(data) {
    // UV Index (simulated - requires additional API)
    const uvIndex = Math.floor(Math.random() * 11);
    document.getElementById('uvIndex').textContent = uvIndex;
    updateRadialProgress('uvCircle', uvIndex, 11);
    
    const uvLabels = ['Baixo', 'Baixo', 'Baixo', 'Moderado', 'Moderado', 'Moderado', 
                      'Alto', 'Alto', 'Muito Alto', 'Muito Alto', 'Extremo'];
    document.getElementById('uvLabel').textContent = uvLabels[uvIndex];
    
    // Wind Speed
    const windSpeed = Math.round(data.wind.speed * 3.6); // m/s to km/h
    document.getElementById('windSpeed').textContent = windSpeed;
    updateRadialProgress('windCircle', windSpeed, 100);
    
    // Humidity
    document.getElementById('humidity').textContent = data.main.humidity + '%';
    updateRadialProgress('humidityCircle', data.main.humidity, 100);
    
    // Pressure
    document.getElementById('pressure').textContent = data.main.pressure;
    updateRadialProgress('pressureCircle', data.main.pressure - 950, 100);
    
    // Sunrise & Sunset
    const sunrise = new Date(data.sys.sunrise * 1000);
    const sunset = new Date(data.sys.sunset * 1000);
    
    document.getElementById('sunrise').textContent = 
        `${sunrise.getHours().toString().padStart(2, '0')}:${sunrise.getMinutes().toString().padStart(2, '0')}`;
    document.getElementById('sunset').textContent = 
        `${sunset.getHours().toString().padStart(2, '0')}:${sunset.getMinutes().toString().padStart(2, '0')}`;
}

// Update Radial Progress
function updateRadialProgress(circleId, value, max) {
    const circle = document.getElementById(circleId);
    const radius = 52;
    const circumference = 2 * Math.PI * radius;
    const progress = (value / max) * 100;
    const offset = circumference - (progress / 100) * circumference;
    
    circle.style.strokeDashoffset = offset;
}

// Update Hourly Forecast
function updateHourlyForecast(hourlyData) {
    const container = document.getElementById('hourlyScroll');
    container.innerHTML = '';
    
    hourlyData.forEach(hour => {
        const time = new Date(hour.dt * 1000);
        const temp = Math.round(convertTemp(hour.main.temp));
        const icon = getWeatherEmoji(hour.weather[0].main);
        
        const hourElement = document.createElement('div');
        hourElement.className = 'hourly-item';
        hourElement.innerHTML = `
            <div class="hour-time">${time.getHours().toString().padStart(2, '0')}:00</div>
            <div class="hour-icon">${icon}</div>
            <div class="hour-temp">${temp}°</div>
        `;
        
        container.appendChild(hourElement);
    });
}

// Update Weekly Forecast
function updateWeeklyForecast(forecastData) {
    const container = document.getElementById('weeklyGrid');
    container.innerHTML = '';
    
    // Group by day
    const dailyData = {};
    
    forecastData.forEach(item => {
        const date = new Date(item.dt * 1000);
        const dateKey = date.toDateString();
        
        if (!dailyData[dateKey]) {
            dailyData[dateKey] = {
                temps: [],
                weather: item.weather[0].main,
                date: date
            };
        }
        
        dailyData[dateKey].temps.push(item.main.temp);
    });
    
    // Take first 7 days
    const days = Object.values(dailyData).slice(0, 7);
    const dayNames = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'];
    
    days.forEach(day => {
        const maxTemp = Math.round(convertTemp(Math.max(...day.temps)));
        const minTemp = Math.round(convertTemp(Math.min(...day.temps)));
        const icon = getWeatherEmoji(day.weather);
        const dayName = dayNames[day.date.getDay()];
        
        const dayElement = document.createElement('div');
        dayElement.className = 'day-card';
        dayElement.innerHTML = `
            <div class="day-name">${dayName}</div>
            <div class="day-icon">${icon}</div>
            <div class="day-temps">
                <span class="temp-max">${maxTemp}°</span>
                <span class="temp-min">${minTemp}°</span>
            </div>
        `;
        
        container.appendChild(dayElement);
    });
}

// Get Weather Emoji
function getWeatherEmoji(condition) {
    const emojis = {
        'Clear': '☀️',
        'Clouds': '☁️',
        'Rain': '🌧️',
        'Drizzle': '🌦️',
        'Thunderstorm': '⛈️',
        'Snow': '❄️',
        'Mist': '🌫️',
        'Fog': '🌫️',
        'Haze': '🌫️'
    };
    
    return emojis[condition] || '🌡️';
}

// Loading State
function showLoading() {
    document.getElementById('temperature').innerHTML = '<div class="loading"></div>';
}

function hideLoading() {
    // Temperature is updated by updateUI
}

// Show Demo Notification
function showDemoNotification() {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(139, 92, 246, 0.95);
        backdrop-filter: blur(10px);
        color: white;
        padding: 20px 25px;
        border-radius: 15px;
        border: 2px solid rgba(0, 240, 255, 0.5);
        box-shadow: 0 8px 32px rgba(139, 92, 246, 0.4);
        z-index: 10000;
        max-width: 350px;
        font-family: 'Space Grotesk', sans-serif;
        animation: slideIn 0.5s ease-out;
    `;
    
    notification.innerHTML = `
        <div style="display: flex; align-items: start; gap: 15px;">
            <div style="font-size: 2rem;">🔧</div>
            <div>
                <div style="font-weight: 700; font-size: 1.1rem; margin-bottom: 8px;">MODO DEMO ATIVO</div>
                <div style="font-size: 0.9rem; line-height: 1.5; opacity: 0.95;">
                    Mostrando dados simulados.<br>
                    Para dados reais, adicione sua <strong>API key</strong> no arquivo <code style="background: rgba(0,0,0,0.3); padding: 2px 6px; border-radius: 4px;">script.js</code>
                </div>
                <a href="https://openweathermap.org/api" target="_blank" 
                   style="display: inline-block; margin-top: 10px; color: #00f0ff; text-decoration: none; font-weight: 600; font-size: 0.85rem;">
                    📝 Obter API Key Grátis →
                </a>
            </div>
            <button onclick="this.parentElement.parentElement.remove()" 
                    style="background: none; border: none; color: white; font-size: 1.5rem; cursor: pointer; padding: 0; margin-left: auto; opacity: 0.7; line-height: 1;">
                ×
            </button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto-remove after 10 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOut 0.5s ease-out';
            setTimeout(() => notification.remove(), 500);
        }
    }, 10000);
}

// Demo Mode - Use this if you don't have an API key yet
function useDemoData() {
    const demoWeatherTypes = ['Clear', 'Clouds', 'Rain', 'Snow'];
    const randomWeather = demoWeatherTypes[Math.floor(Math.random() * demoWeatherTypes.length)];
    
    // Set demo timezone (Lisboa UTC+0)
    cityTimezoneOffset = 0;
    
    const demoData = {
        current: {
            name: 'Lisboa',
            timezone: 0,
            main: {
                temp: 18 + Math.random() * 12,
                feels_like: 16 + Math.random() * 12,
                humidity: 50 + Math.random() * 40,
                pressure: 1000 + Math.random() * 30
            },
            weather: [{
                main: randomWeather,
                description: getWeatherDescription(randomWeather)
            }],
            wind: {
                speed: Math.random() * 8
            },
            sys: {
                sunrise: Date.now() / 1000 - 6 * 3600,
                sunset: Date.now() / 1000 + 6 * 3600
            }
        },
        forecast: {
            list: generateDemoForecast()
        }
    };
    
    currentWeatherData = demoData;
    updateUI(demoData);
}

function getWeatherDescription(type) {
    const descriptions = {
        'Clear': 'céu limpo',
        'Clouds': 'nublado',
        'Rain': 'chuva',
        'Snow': 'neve'
    };
    return descriptions[type] || 'tempo variável';
}

function generateDemoForecast() {
    const forecast = [];
    const conditions = ['Clear', 'Clouds', 'Rain', 'Snow'];
    let baseTemp = 15 + Math.random() * 10;
    
    for (let i = 0; i < 40; i++) {
        // Simulate temperature variation throughout the day
        const hourVariation = Math.sin(i / 4) * 5;
        const randomVariation = (Math.random() - 0.5) * 3;
        const temp = baseTemp + hourVariation + randomVariation;
        
        forecast.push({
            dt: (Date.now() / 1000) + (i * 3 * 3600),
            main: {
                temp: temp,
                feels_like: temp - 2
            },
            weather: [{
                main: conditions[Math.floor(Math.random() * conditions.length)],
                description: 'tempo variável'
            }]
        });
    }
    
    return forecast;
}

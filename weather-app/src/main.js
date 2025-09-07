import "./style.css";
//Лоадер
function showLodaer() {
  const loader = document.getElementById("loader");
  loader.classList.remove("hidden");
  loader.classList.add("block");
}

function hideLodaer() {
  const loader = document.getElementById("loader");
  loader.classList.remove("block");
  loader.classList.add("hidden");
}

//Вычесление Дат
function getForecastDay(forecastList, offsetDays = 0) {
  const date = new Date();
  date.setDate(date.getDate() + offsetDays);

  const dateStr = date.toISOString().split("T")[0];

  return forecastList.filter((i) => i.dt_txt.startsWith(dateStr));
}
// Форматирование дат
function formatDate(offset = 0) {
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  const targetDate = new Date(now);
  targetDate.setDate(now.getDate() + offset);

  const options = { day: "numeric", month: "long" };
  return targetDate.toLocaleDateString("ru-RU", options);
}

// Погода -- Начало
const iconMap = {
  "01d": "wi-day-sunny",
  "01n": "wi-night-clear",
  "02d": "wi-day-cloudy",
  "02n": "wi-night-alt-cloudy",
  "03d": "wi-cloud",
  "03n": "wi-cloud",
  "04d": "wi-cloudy",
  "04n": "wi-cloudy",
  "09d": "wi-showers",
  "09n": "wi-showers",
  "10d": "wi-day-rain",
  "10n": "wi-night-alt-rain",
  "11d": "wi-thunderstorm",
  "11n": "wi-thunderstorm",
  "13d": "wi-snow",
  "13n": "wi-snow",
  "50d": "wi-fog",
  "50n": "wi-fog",
};

const API_KEY = "0f1b9e0e1967683db7900e99663ff046";

async function getWeather(city) {
  showLodaer();
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=ru`;
  // Работа с датами
  const date = new Date();
  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };

  document.getElementById("dayDate").textContent = date.toLocaleDateString(
    "ru-RU",
    options,
  );
  //Конец работы с датами

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Город не найден");

    const data = await response.json();

    const { name } = data;
    const weatherStreet = data.weather[0].description;
    const temp = Math.round(data.main.temp);
    const feelsLike = Math.round(data.main.feels_like);
    const windSpeed = Math.round(data.wind.speed);
    const { humidity } = data.main;
    const visibility = data.visibility / 1000;

    document.getElementById("cityName").textContent = name;
    document.getElementById("windSpeed").textContent = windSpeed + "\nкм/ч";
    document.getElementById("humidityPer").textContent = humidity + "%";
    document.getElementById("visibility").textContent = visibility + "\nкм";
    document.getElementById("weatherInStreet").textContent = weatherStreet;
    document.getElementById("weatherTemp").innerHTML = `${temp}&deg;`;
    document.getElementById("summary").innerHTML =
      `<h1 class="font-bold text-xl mb-1">Сводка на сегодня</h1>
      <p class="text-base text-sm">
        Чувствуется ${feelsLike}&deg;, на самом деле ${temp}&deg;
        
      </p>`;
  } catch (e) {
    console.error("Ошибка: " + e.message);
  } finally {
    hideLodaer();
  }
}
async function getWeatherForWeek(city) {
  showLodaer();
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=ru`;

  const nextOneDay = formatDate(1);
  const nextTwoDay = formatDate(2);
  const nextThreeDay = formatDate(3);
  const nextFourDay = formatDate(4);

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Город не найден");
    const data = await response.json();

    const lastOneDay = getForecastDay(data.list, 2);
    const lastTwoDay = getForecastDay(data.list, 3);
    const lastThreeDay = getForecastDay(data.list, 4);
    const lastFourDay = getForecastDay(data.list, 5);

    const iconIndex1 = lastOneDay[4].weather[0].icon;
    const iconIndex2 = lastTwoDay[4].weather[0].icon;
    const iconIndex3 = lastThreeDay[4].weather[0].icon;
    const iconIndex4 = lastFourDay[4].weather[0].icon;

    document.getElementById("weekWeather").innerHTML = `<div
          class="border-2 rounded-lg p-3 flex flex-col justify-between items-center gap-2"
        >
          <p class="font-semibold">${Math.round(lastOneDay[4].main.temp)}&deg;</p>
          <i class="wi ${iconMap[iconIndex1]}"></i>
          <p class="text-sm">${nextOneDay}</p>
        </div>
        <div
          class="border-2 rounded-lg p-3 flex flex-col justify-between items-center gap-2"
        >
          <p class="font-semibold">${Math.round(lastTwoDay[4].main.temp)}&deg;</p>
          <i class="wi ${iconMap[iconIndex2]}"></i>
          <p class="text-sm">${nextTwoDay}</p>
        </div>
        <div
          class="border-2 rounded-lg p-3 flex flex-col justify-between items-center gap-2"
        >
          <p class="font-semibold">${Math.round(lastThreeDay[4].main.temp)}&deg;</p>
          <i class="wi ${iconMap[iconIndex3]}"></i>
          <p class="text-sm">${nextThreeDay}</p>
        </div>
        <div
          class="border-2 rounded-lg p-3 flex flex-col justify-between items-center gap-2"
        >
          <p class="font-semibold">${Math.round(lastFourDay[4].main.temp)}&deg;</p>
          <i class="wi ${iconMap[iconIndex4]}"></i>
          <p class="text-sm">${nextFourDay}</p>
        </div>`;
  } catch (e) {
    console.error("Ошибка: " + e.message);
  } finally {
    hideLodaer();
  }
}

//Погода -- Конец

function generateStyleColor() {
  const hue = Math.floor(Math.random() * 360);
  const saturation = 90 + Math.random() * 10;
  const lightness = 55 + Math.random() * 15;

  return hslToHex(hue, saturation, lightness);
}
// Конвертация HSL в HEX
function hslToHex(h, s, l) {
  s /= 100;
  l /= 100;

  const k = (n) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n) => {
    const color = l - a * Math.max(Math.min(k(n) - 3, 9 - k(n), 1), -1);
    return Math.round(color * 255)
      .toString(16)
      .padStart(2, "0");
  };

  return `#${f(0)}${f(8)}${f(4)}`;
}
// Цвет фона
const color = generateStyleColor();
document.querySelector("body").style.backgroundColor = color;

document.getElementById("dayDate").style.color = color;
document.getElementById("windParam").style.color = color;
document.getElementById("waterParam").style.color = color;
document.getElementById("eyeParam").style.color = color;

const burger = document.getElementById("burger");
const changeCity = document.getElementById("change");
const btnSubmit = document.getElementById("btn");
const search = document.getElementById("search");
burger.addEventListener("click", () => {
  changeCity.classList.toggle("h-40");

  if (burger.classList.contains("fa-bars")) {
    burger.classList.remove("fa-bars");
    burger.classList.add("fa-xmark");
  } else {
    burger.classList.remove("fa-xmark");
    burger.classList.add("fa-bars");
  }
});

btnSubmit.addEventListener("click", () => {
  const searchVal = search.value;

  const dayDate = document.getElementById("dayDate");
  const params = document.getElementById("params");
  const weekText = document.getElementById("weekText");
  const arrowHint = document.getElementById("arrowHint");

  arrowHint.classList.add("hidden");

  if (
    dayDate.classList.contains("hidden") &&
    weekText.classList.contains("hidden") &&
    params.classList.contains("hidden")
  ) {
    dayDate.classList.remove("hidden");
    params.classList.remove("hidden");
    weekText.classList.remove("hidden");
  }

  getWeather(searchVal);
  getWeatherForWeek(searchVal);

  changeCity.classList.toggle("h-40");
  if (burger.classList.contains("fa-bars")) {
    burger.classList.remove("fa-bars");
    burger.classList.add("fa-xmark");
  } else {
    burger.classList.remove("fa-xmark");
    burger.classList.add("fa-bars");
  }

  search.value = "";
});

// Initializing all elements constants
const temperateField = document.querySelector(".weather1");
const cityField = document.querySelector(".weather2 p");
const dateField = document.querySelector(".weather2 span");
const emojiField = document.querySelector(".weather3 img");
const weatherField = document.querySelector(".weather3 span");
const searchField = document.querySelector(".searchField");
const form = document.querySelector("form");

let target = "kathmandu";

//Function to fetch Data from Weather API
const fetchData = async (target) => {
  try {
    const url = `https://api.weatherapi.com/v1/current.json?key=e83f9adc007e4969b91133344232207&q=${target}`;
    const response = await fetch(url);
    const data = await response.json();

    //Destructuring
    const {
      current: {
        temp_c,
        condition: { icon, text },
      },
      location: { name, localtime },
    } = data;

    // Calling update DOM function
    //   updateData(data.current.temp_c, data.location.name);
    updateData(temp_c, name, localtime, icon, text);
  } catch (error) {
    alert("Location not found");
  }
};

fetchData(target);

// Function to update DOM
const updateData = (temperature, cityName, time, emoji, type) => {
  temperateField.innerText = temperature + "°C";
  cityField.innerText = cityName;

  const exactTime = time.split(" ")[1];
  const exactDate = time.split(" ")[0];

  const exactDay = new Date(exactDate).getDay();
  dateField.innerHTML = `${exactTime} - ${getFullDay(exactDay)} ${exactDate}`;

  emojiField.src = emoji;
  weatherField.innerText = type;
};

// Function to get name of the day
function getFullDay(num) {
  switch (num) {
    case 0:
      return "Sunday";
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Saturday";
    default:
      return "no-data";
  }
}

// Function to search the location
function search(e) {
  e.preventDefault();
  let target = searchField.value;

  fetchData(target);
}

form.addEventListener("submit", search);

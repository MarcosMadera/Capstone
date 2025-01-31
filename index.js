import { header, nav, main, footer } from "./components";
import * as store from "./store";
import Navigo from "navigo";
import { camelCase } from "lodash";
import axios from "axios";

const router = new Navigo("/");

function render(state = store.home) {
  document.querySelector("#root").innerHTML = `
    ${header(state)}
    ${nav(store.links)}
    ${main(state)}
    ${footer()}
  `;
  router.updatePageLinks();

  // const selectElement = document.getElementById("countrySelect");
  // if (selectElement) {
  //   selectElement.addEventListener("change", () => {
  //     console.log("abc", selectElement.value);
  //     store.home.selectedCountry = selectElement.value;
  //     console.log("countries", store.home.selectCountry);
  //   });
  // }
}



router.on("/", () => render(store.home)).resolve();

router.hooks({
  // We pass in the `done` function to the before hook handler to allow the function to tell Navigo we are finished with the before hook.
  // The `match` parameter is the data that is passed from Navigo to the before hook handler with details about the route being accessed.
  // https://github.com/krasimir/navigo/blob/master/DOCUMENTATION.md#match
  before: (done, match) => {
    // We need to know what view we are on to know what data to fetch
    const view = match?.data?.view ? camelCase(match.data.view) : "home";
    // Add a switch case statement to handle multiple routes
    switch (view) {
        case "home":
          console.log(process.env.OPEN_WEATHER_MAP_API_KEY)
          axios
            // Get request to retrieve the current weather data using the API key and providing a city name
            .get(
              `https://api.openweathermap.org/data/2.5/weather?appid=${process.env.OPEN_WEATHER_MAP_API_KEY}&units=imperial&q=st%20louis`
            )
            .then(response => {
              // Create an object to be stored in the Home state from the response
              store.home.weather = {
                city: response.data.name,
                temp: response.data.main.temp,
                feelsLike: response.data.main.feels_like,
                description: response.data.weather[0].main
              };
              done();
          })
          .catch((err) => {
            console.log(err);
            done();
          });
          break;
      default:
        // We must call done for all views so we include default for the views that don't have cases above.
        done();
        // break is not needed since it is the last condition, if you move default higher in the stack then you should add the break statement.
    }
  },
  already: (match) => {
    const view = match?.data?.view ? camelCase(match.data.view) : "home";

    render(store[view]);
  },
  after: (match) => {

    const view = match?.data?.view ? camelCase(match.data.view) : "home";

    router.updatePageLinks();

    if (view === "createPoi") {
      const countryCities = store.createPoi.countryCities

      console.log("hello poi", countryCities)

      const countrySelect = document.getElementById("countrySelect");
      const citySelect = document.getElementById("citySelect");

      countrySelect.addEventListener("change", (e) => {
      const selectedCountry = e.target.value

      store.createPoi.selection.country = selectedCountry

      citySelect.innerHTML = '<option value="">Please choose a city</option>';

      if (selectedCountry && countryCities[selectedCountry]) {
      console.log("selected cities", selectedCountry)
      citySelect.disabled = false

      countryCities[selectedCountry].forEach(city => {
      const option = document.createElement('option');
      option.value = city.toLowerCase();
      option.textContent = city;
      console.log("option", option)
      citySelect.appendChild(option)
})
      }
      else{

    citySelect.disabled=true
    citySelect.innerHTML = '<option value="">Please choose a city</option>';


      }


    })

    citySelect.addEventListener("change", (e) => {
      console.log("city selected", e.target.value)
    const selectedCity = e.target.value

      store.createPoi.selection.city = selectedCity;
      console.log("value is ", store.createPoi.selection)
    })


    }

    // add menu toggle to bars icon in nav bar
    document.querySelector(".fa-bars").addEventListener("click", () => {
        document.querySelector("nav > ul").classList.toggle("hidden--mobile");
    });
  }
});

router
    .on({
      "/": () => render(store.home),
      ":view": (match) => {
        const view = match?.data?.view ? camelCase(match.data.view) : "home";
        if (view in store) {
          render(store[view]);
        } else {
          render(store.viewNotFound);
          console.log(`View ${view} not defined`);
        }
      },
    })
    .resolve();


import FoodCardsView from "./foodCardsView";

export default class AppView {
  constructor(modal) {
    this.modal = modal;

    // Initialize the stays view
    // this.FoodCardsView = new FoodCardsView(this.modal);

    /* DOM Elements */
    this.modalContainer = document.querySelector("#myModal");
    this.searchBtns = document.querySelectorAll(".btn__search");

    // Elements of Header Search
    this.headerSearch = document.querySelector(".header__search");
    this.showSearchCity = document.querySelector(".search__city");
    this.showSearchGuests = document.querySelector(".search__guests");

    // Main Elements of Location Search (Overlay)
    this.overlayContainer = document.querySelector(".overlay");
    this.overlayResultsContainer = document.querySelector(".overlay__results");
    this.overlayCloseIcon = document.getElementById("overlay-close");
    this.searchLocation = document.querySelector(".osearch__location");
    this.searchLocationInput = document.getElementById("searchCity");
    this.searchLocationCloseIcon = document.querySelector(
      ".searchLocationCloseIcon"
    );
    this.renderedLocations = this.renderLocationResults();

    // Method calls
    this.events();
    // this.processSearch();
  }

  // Methods
  events() {
    // Initial form reset
    this.searchLocationInput.value = "";

    /* Search location related events */

    // Show the overlay
    this.headerSearch.addEventListener("click", (e) => {
      this.modalContainer.style.display = "block";
    });

    // Hide the overlay
    this.overlayCloseIcon.addEventListener("click", () => {
      this.modalContainer.style.display = "none";
    });

    // Anywhere on the modal if clicked, hide the overlay
    this.modalContainer.addEventListener("click", (e) => {
      if (e.target === this.modalContainer) {
        this.modalContainer.style.display = "none";
      }
    });

    // Show the location results
    this.searchLocation.addEventListener("focusin", (e) => {
      this.searchLocationInput.focus();
      // First hide the guest results with icon and remove the border
      this.guestResultsContainer.style.display = "none";
      this.searchGuestsCloseIcon.style.visibility = "hidden";
      this.searchGuests.classList.remove("apply-border-on-focus");

      // Show the search close icon
      this.searchLocationCloseIcon.style.visibility = "visible";
      if (this.overlayResultsContainer.children.length === 1) {
        this.overlayResultsContainer.prepend(this.renderedLocations);
      } else {
        if (this.overlayLocationResults) {
          this.overlayLocationResults.style.display = "flex";
        }
      }
    });

    // Re-render the location results on resetting the form
    this.searchLocationCloseIcon.addEventListener("click", () => {
      // Reset the input value
      this.searchLocationInput.value = "";

      // Re-render the location results
      this.overlayResultsContainer.removeChild(
        this.overlayResultsContainer.childNodes[0]
      );
      this.overlayResultsContainer.prepend(this.renderedLocations);
    });

    // Hide the location results and guest results
    this.overlayContainer.addEventListener("click", (e) => {
      if (
        e.target.closest(".overlay") &&
        !e.target.closest(".osearch__location")
      ) {
        this.overlayLocationResults = document.querySelector(
          ".location__results"
        );
        if (
          this.searchLocationInput != document.activeElement &&
          this.overlayLocationResults
        ) {
          this.overlayLocationResults.style.display = "none";
          this.searchLocationCloseIcon.style.visibility = "hidden";
        }
      }

      if (
        e.target.closest(".overlay") &&
        !e.target.closest(".osearch__guests") &&
        !e.target.closest(".guest__results")
      ) {
        this.guestResultsContainer.style.display = "none";
        this.searchGuestsCloseIcon.style.visibility = "hidden";
        this.searchGuests.classList.remove("apply-border-on-focus");
      }
    });

    // Input filterting
    this.searchLocationInput.addEventListener("keyup", (e) => {
      // let cities = this.cities.filter((city) => {
      //   let cityLower = city.toLowerCase();
      //   return cityLower.includes(e.target.value.toLowerCase());
      // });
      // Re-render the location results
      this.overlayResultsContainer.removeChild(
        this.overlayResultsContainer.childNodes[0]
      );
      // if (cities.length === 0 && e.target.value === "") {
      //   this.overlayResultsContainer.prepend(
      //     this.renderLocationResults(this.cities)
      //   );
      // } else {
      //   this.overlayResultsContainer.prepend(
      //     this.renderLocationResults(cities)
      //   );
      // }
    });
  }

  initSearch() {
    if (
      this.searchLocationInput.value != "" &&
      this.adultCount + this.childrenCount + this.babiesCount === 0
    ) {
      // First close the overlay
      this.modalContainer.style.display = "none";
      // Display the search values on the header
      this.showSearchCity.textContent = `${this.searchLocationInput.value}, Finland`;
      this.showSearchGuests.textContent = "Add guests";

      return [this.searchLocationInput.value, null];
    } else if (
      this.searchLocationInput.value == "" &&
      this.adultCount + this.childrenCount + this.babiesCount > 0
    ) {
      // First close the overlay
      this.modalContainer.style.display = "none";
      // Display the search values on the header
      this.showSearchGuests.textContent = this.totalNoOfGuestsDOM.textContent;
      this.showSearchCity.textContent = "Where do you travel";

      return [null, this.adultCount + this.childrenCount + this.babiesCount];
    } else if (
      this.searchLocationInput.value != "" &&
      this.adultCount + this.childrenCount + this.babiesCount > 0
    ) {
      // First close the overlay
      this.modalContainer.style.display = "none";
      // Display the search values on the header
      this.showSearchCity.textContent = `${this.searchLocationInput.value}, Finland`;
      this.showSearchGuests.textContent = this.totalNoOfGuestsDOM.textContent;

      return [
        this.searchLocationInput.value,
        this.adultCount + this.childrenCount + this.babiesCount,
      ];
    }
    // Reset the form
    this.searchLocationInput.value = "";
    // Hide the overlay and returns nulls to reset the search
    this.modalContainer.style.display = "none";
    // Reset the search values if values were entered and deleted
    this.showSearchCity.textContent = "Where do you travel";
    this.showSearchGuests.textContent = "Add guests";
    return [null, null];
  }

  processSearch(stays) {
    this.FoodCardsView.init(stays);
  }

  renderLocationResults() {
    let mobileScreen = window.matchMedia("(max-width: 608px)");
    if (!null) {
      // Create div for location results
      this.locationResults = document.createElement("div");
      this.locationResults.setAttribute("class", "location__results");

      // if (mobileScreen.matches && cities.length == 1) {
      //   this.locationResults.style.top = "-57%";
      // }

      // Append individual results to the locationResults
      // cities.forEach((city) => {
      //   this.locationResults.insertAdjacentHTML(
      //     "beforeend",
      //     this.getLocationsHTML(city)
      //   );
      // });

      this.locationResults.addEventListener("click", (e) => {
        this.searchLocationInput.focus();
        // Filter and render only current city
        // let city = e.target.closest(".location__result").dataset.city;
        // let cities = this.cities.filter((item) => city == item);
        // Re-render the location results
        this.overlayResultsContainer.removeChild(
          this.overlayResultsContainer.childNodes[0]
        );
        this.overlayResultsContainer
          .prepend
          // this.renderLocationResults(cities)
          ();
        // Add to the input
        this.searchLocationInput.value = city;
      });

      // Return all the location results container to main overlay results
      return this.locationResults;
    }

    /* If cities are empty */

    // Create div for location results
    this.locationResults = document.createElement("div");
    this.locationResults.setAttribute("class", "location__results");

    if (mobileScreen.matches) {
      this.locationResults.style.top = "-60%";
    }

    this.locationResults.insertAdjacentHTML(
      "beforeend",
      `
      <h3 class="no-search-found">No travel locations found</h3>
    `
    );

    return this.locationResults;
  }

  getLocationsHTML(city) {
    return `
      <div class="location__result" data-city="${city}">
        <span class="location__pin">
          <svg class="location__pin--icon">
            <use xlink:href="assets/sprites.svg#icon-location"></use>
          </svg>
        </span>
        <h2>${city}, Finland</h2>
      </div>
    `;
  }

  getTitlesHTML(title) {
    return `
      <div class="title">
        <h2>${title}</h2>
      </div>
    `;
  }

  renderTotalCounts(adultCount, childCount, babiesCount) {
    let total = adultCount + childCount + babiesCount;
    if (total > 1) {
      return `${total} guests`;
    } else if (total == 1) {
      return `${total} guest`;
    } else {
      return `Add guests`;
    }
  }
}

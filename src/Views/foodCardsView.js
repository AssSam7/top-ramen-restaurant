import AppModel from "../appModel";

export default class StaysView {
  constructor(model) {
    console.log(model);
    /* DOM Elements */
    // Loader
    this.loaderContainer = document.querySelector(".loader");
    this.notFoundContainer = document.querySelector(".not__found");

    // Stays
    this.stays = model.data;
    this.mainStaysContainer = document.querySelector(".stays__container");

    /* Method calls */
    this.init(this.stays);
  }

  // Methods
  init(stays) {
    this.showLoader();
    setTimeout(() => {
      this.hideLoader();
      this.renderStays(stays);
    }, 1000);
  }

  events() {
    // Sort by stars change event
    this.selectStars.addEventListener("change", (e) => {
      let starValue = e.target.value.split(" ")[1];
      new AppModel(this.stays).filterByStars(starValue);
    });
  }

  showLoader() {
    /* Check if they already exist */
    if (this.staysInfo && this.staysContainer) {
      this.mainStaysContainer.innerHTML = "";
      this.notFoundContainer.style.display = "none";
    }
    this.loaderContainer.style.display = "flex";
  }

  hideLoader() {
    this.loaderContainer.style.display = "none";
  }

  renderStays(stays) {
    // console.log(stays);
    if (stays.length > 1) {
      // Hide the not found container
      this.notFoundContainer.style.display = "none";

      /* Check if they already exist */
      if (this.staysInfo && this.staysContainer) {
        this.mainStaysContainer.innerHTML = "";
      }

      // Create the staysInfo element
      this.staysInfo = document.createElement("div");
      this.staysInfo.setAttribute("class", "stays__info");
      this.staysInfo.insertAdjacentHTML(
        "beforeend",
        this.getStaysInfoHTML(stays.length)
      );

      // Append the staysInfo to the mainStays container
      this.mainStaysContainer.prepend(this.staysInfo);

      // Create and the stays container
      this.staysContainer = document.createElement("div");
      this.staysContainer.setAttribute("class", "stays");

      // Add the individual stays
      stays.forEach((stay) => {
        // Create the individual stay element
        let individualStay = document.createElement("div");
        individualStay.setAttribute("class", "stay");
        // individualStay.insertAdjacentHTML(
        //   "beforeend",
        //   this.getStayImage(stay.photo)
        // );
        individualStay.insertAdjacentHTML(
          "beforeend",
          this.getStayDetails(stay)
        );
        individualStay.insertAdjacentHTML(
          "beforeend",
          this.getStayTitle(stay["Variety"])
        );

        // Append each stay to container
        this.staysContainer.appendChild(individualStay);
      });

      // Append the stays container
      this.mainStaysContainer.appendChild(this.staysContainer);
      this.mainStaysContainer.style.marginBottom = "5rem";
    } else {
      this.notFoundContainer.style.display = "flex";
    }

    // Main Elements for the sort by stars
    // this.selectStars = document.getElementById("standard-select");
    // this.events();
  }

  getStayImage(stayImage) {
    return `
      <div class="stay__img" >
        <img src="${stayImage}" loading="lazy"/>
      </div>
    `;
  }

  getStayDetails(stay) {
    // console.log(
    //   `${stay["Brand"]} , ${stay["Style"]} , ${stay["Country"]} , ${stay["Stars"]}`
    // );
    if (
      typeof stay["Brand"] === "string" &&
      typeof stay["Style"] === "string" &&
      typeof stay["Country"] === "string" &&
      stay["Stars"] > 1
    ) {
      // console.log("Hello");
      return `
        <div class="stay__details">
          <div class="stay__category">
            <div class="super-host">${stay["Brand"]}</div>
            <h2 class="type">${stay["Style"]}</h2>
            <p class="separator">.</p>
            <h2 class="type">${stay["Country"]}</h2>
          </div>
          <div class="stay__rating">
            <svg class="star">
              <use xlink:href="assets/sprites.svg#icon-star"></use>
            </svg>
            <h3 class="rating">${stay["Stars"]}</h3>
          </div>
        </div>
      `;
    } else if (stay["Stars"]) {
      return `
        <div class="stay__details">
          <div class="stay__category">
            <div class="super-host">${stay["Brand"]}</div>
            <h2 class="type">${stay["Style"]}</h2>
            <p class="separator">.</p>
            <h2 class="type">${stay["Country"]}</h2>
          </div>
        </div>
      `;
    } else if (typeof stay["Style"] !== "string") {
      return `
      <div class="stay__details">
      <div class="stay__category">
        <div class="super-host">${stay["Brand"]}</div>
        <p class="separator">.</p>
        <h2 class="type">${stay["Country"]}</h2>
      </div>
      <div class="stay__rating">
        <svg class="star">
          <use xlink:href="assets/sprites.svg#icon-star"></use>
        </svg>
        <h3 class="rating">${stay["Stars"]}</h3>
      </div>
    </div>
      `;
    }
  }

  getStayTitle(stayTitle) {
    return `
      <div class="stay__title">
        ${stayTitle}
      </div>
    `;
  }

  getStaysInfoHTML(staysLength) {
    if (staysLength > 1) {
      return `
      <h2>Noodles available (${staysLength})</h2>
      <div class="select" style="flex-basis: 20%">
        <select id="standard-select">
          <option value="Option 1">Sort by 1 ⭐</option>
          <option value="Option 2">Sort by 2 ⭐</option>
          <option value="Option 3">Sort by 3 ⭐</option>
          <option value="Option 4">Sort by 4 ⭐</option>
          <option value="Option 5">Sort by 5 ⭐</option>
        </select>
      </div>
</div>
    `;
    }
    return `
      <h2>Noodles available (${staysLength})</h2>
      
      <div class="select" style="flex-basis: 20%; font-size: 2rem;">
        <select id="standard-select">
          <option value="Option 3">Greater than 3⭐</option>
          <option value="Option 3.5">Greater than 3.5⭐</option>
          <option value="Option 4">Greater than 4⭐</option>
          <option value="Option 4.5">Greater than 5⭐</option>
        </select>
      </div>
    `;
  }
}

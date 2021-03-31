// Data JSON
import { data } from "./data";
import axios from "axios";
// Views
import AppView from "./Views/appView";
import FoodCardsView from "./Views/foodCardsView";
// Model
import AppModel from "./appModel";

class AppController {
  constructor() {
    // External URI's
    this.topRamenDetailsURI =
      "https://s3-ap-southeast-1.amazonaws.com/he-public-data/TopRamen8d30951.json";
    this.getTopRamenDetails()
      .then((res) => {
        this.stays = res;
        // console.log(this.stays.data);
        this.model = new AppModel(this.stays.data);

        this.appView = new AppView(this.model);
        this.cardsView = new FoodCardsView(this.stays);

        // Search functionality
        this.searchStays();
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  // Methods
  getTopRamenDetails() {
    return axios.get(this.topRamenDetailsURI);
  }

  searchStays() {}

  sortByStars() {}
}

// Call the App Contoller
document.addEventListener("DOMContentLoaded", function (event) {
  new AppController();
});

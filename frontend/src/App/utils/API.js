import axios from "axios";
import mongoose from 'mongoose';
const ObjId = mongoose.Types.ObjectId;

export default {
  // Get User(Vendor)
  getVendor: function (id) {
    return axios.get("/api/vendor/" + id);
  },
  getVendorLocation: function (id) {
    axios.get("/api/vendor/" + id)
      .then(data => { let { location } = data.data[0]; return location })
      .catch(err => { return err });
  },
  // Accepts Object with two keys (id and location) with id refering to vendor and location being Long+Lat in string csv notation(?)
  setVendorLocation: function (obj) {
    const { id, location } = obj;
    console.log(location);
    return axios.put("/api/vendor/" + id, location);
  },
  // Gets every vendor
  getVendors: function () {
    return axios.get("/api/vendor");
  },
  // Gets specific Menu (Requires Menu ID)
  getMenu: function (id) {
    return axios.get("/api/menu/" + id);
  },
  // Removes Reference of Food from Menu (Object containts id which refers to menu and _id for food id)
  removeFood: function (object) {
    return axios.put("/api/menu/" + object.id, { _id: object.foodId });
  },
  // Deletes Food from Food document (Requires unique food id)
  deleteFood: function (foodId) {
    return axios.delete("/api/food/" + foodId);
  },
  // Saves a food to the food table database
  createFood: function (foodObj, menuRef) {
    const createdFood = { obj: foodObj, menu: menuRef };
    return axios.post("/api/food/", createdFood);
  },
  // Create Menu
  createMenu: function (obj) {
    return axios.post("/api/menu/", obj);
  },
  createTweetTable: function (obj) {
    return axios.post("/api/tweetTable/", obj)
  },
  createVendor: function (obj) {
    console.log(`Menu is ${obj['menu']} and type of ${typeof (obj['menu'])}`);
    obj['menu'] = ObjId(obj['menu']);
    console.log(`Menu is ${obj['menu']} and type of ${typeof (obj['menu'])}`);
    console.log("ObjectId'd the menu ref: ", obj);
    return axios.post("/api/vendor/", obj);
  },
  // Update vendor info
  updateVendor: function (object) {
    let body = {
      owner: object.owner,
      storeName: object.storeName,
      city: object.city,
      state: object.state,
      categories: object.categories
    }
    console.log(object);
    return axios.put("/api/vendor/" + object.id, body);
  },
  // Update vendor custom tweet
  updateCustomTweet: function (object) {
    let tweet = {
      customTweet: object.message
    }
    return axios.put("/api/vendor/" + object.id, tweet)
  },
  updateStatus: function (object) {
    const status = {
      status: object.status
    }
    return axios.put("/api/vendor/" + object.id, status);
  },
  // send tweet
  sendTweet: function (obj) {
    return axios.post("/api/twitter", { body: obj });
  },
  saveTweet: function (tweetObj) {
    return axios.post("/api/tweetTable/" + tweetObj.id, { string: tweetObj.tweetMongoId });
  },
  getTweet: function (id) {
    return axios.get("/api/twitter/" + id);
  }
};

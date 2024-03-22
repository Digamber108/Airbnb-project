const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validatelisting } = require("./middleware.js");
const multer  = require('multer')
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage })
 

const listingController = require("../controllers/listings.js");

router
  .route("/")
  //index route
  .get(wrapAsync(listingController.index))
  // post route
  .post(
    isLoggedIn,
    upload.single('listing[image]'), // pass before validating;
    validatelisting,
    wrapAsync(listingController.createListing)
  );

//New Route  postion need before id route b/c new treated as id;
router.get("/new", isLoggedIn, listingController.renderNewForm);

router
  .route("/:id")
  //show route
  .get(wrapAsync(listingController.showListing))
  //update route
  .put(
    isLoggedIn,
    isOwner,
    upload.single('listing[image]'), //pass before validating
    validatelisting,
    wrapAsync(listingController.updateListing)
  )
  //delete route
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

// Edit Route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);


module.exports = router;

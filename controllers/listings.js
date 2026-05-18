const Listing=require("../models/listing");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken=process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });
module.exports.index=async (req,res)=>{
  const listings= await Listing.find({});
  res.render("listing/index.ejs",{listings});
};
module.exports.renderNewForm=(req,res)=>{
  res.render("listing/new.ejs");
};
module.exports.createNewListing=async(req,res)=>{
  let response=await geocodingClient.forwardGeocode({
    query: req.body.listing.location,
    limit: 2
  })
  .send()
  const allowedCategories = ['Rooms', 'Iconic cities', 'Mountains', 'Arctic', 'Amazing pools', 'Farms', 'Beach','Apartments'];
  if (!allowedCategories.includes(req.body.listing.category)) {
    req.flash('error', 'Invalid category.');
    return res.redirect('/listings/new');
  }
  const newListing= new Listing(req.body.listing);
  newListing.owner=req.user._id;
  if (req.file) {
    newListing.image = {
      url: req.file.path,
      filename: req.file.filename,
    };
  }
  newListing.geometry=response.body.features[0].geometry;
  let savedListing=await newListing.save();
  req.flash("success","Listing created!");
  res.redirect("/listings");
};
module.exports.showListing=async (req,res)=>{
  let {id}=req.params;
  const listing=await Listing.findById(id)
  .populate({path:"reviews",populate:{path:"author"}})
  .populate("owner");
  if(!listing){
    req.flash("error","Requested listing does not exist.");
    return res.redirect("/listings");
  }
  res.render("listing/show.ejs",{listing});
};
module.exports.renderEditForm=async (req,res)=>{
  let {id}=req.params;
  let listing= await Listing.findById(id);
  if(!listing){
    req.flash("error","Requested listing does not exist.");
    return res.redirect("/listings");
  }
  let originalImageUrl=listing.image.url;
  let newImageUrl=originalImageUrl.replace("/upload","/upload/h_300,w_250");
  res.render("listing/edit.ejs",{listing,newImageUrl});
};
module.exports.editListing=async (req,res)=>{
  const {id}=req.params;
  let listing=await Listing.findByIdAndUpdate(id,{...req.body.listing});
  if(typeof req.file!=="undefined"){
      let url=req.file.path;
      let filename=req.file.filename;
      listing.image={url,filename};
    await listing.save();
  }
  req.flash("success","Listing updated!");
  res.redirect(`/listings/${id}`);
};
module.exports.destroyListing=async (req,res)=>{
  const {id}=req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success","Listing deleted!");
  res.redirect("/listings");
};
module.exports.showCategory=async(req,res)=>{
  const category=req.params.category;
  const listings=await Listing.find({category:category});
  res.render("listing/display.ejs",{listings});
};
module.exports.searchListing=async(req,res)=>{
  const search=req.query.query;
  let listings=await Listing.find({location: { $regex: search, $options: "i" }});
  res.render("listing/display.ejs",{listings});
};

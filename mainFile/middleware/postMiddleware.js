// const {Listing} = require("../models/listing"); // model
// const {Review} = require("../models/review"); // model


// Listing.schema.post("findOneAndDelete", async (list) => {
//     if(list) {
//         await Review.deleteMany({_id:{$in:list.reviews}});

//         // debug
//         console.log("List deleted and it's reviews are also deleted. Filename : middleware/postMiddleware.js");
//     }
// });


// const {Listing} = require("../models/listing");
// const {Review} = require("../models/review");

// Listing.schema.post("findOneAndDelete", async function (doc) {
//   if (doc) {
//     await Review.deleteMany({ _id: { $in: doc.reviews } });
//     console.log("Deleted reviews for listing. Filename: postMiddleware.js");
//   }
// });



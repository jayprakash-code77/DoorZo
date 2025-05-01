let stars = document.querySelectorAll('.rating i');
let ratingInput = document.getElementById('ratingValue'); // hidden input

function rate(index) {
  stars.forEach((star, i) => {
    if (i < index) {
      star.classList.add('fas'); // solid star
      star.classList.remove('far'); // empty star
    } else {
      star.classList.add('far');
      star.classList.remove('fas');
    }
  });
  ratingInput.value = index; // Set the selected rating in hidden input
}




// // display the rating stars : Used in the file :- show.ejs line: <div class="displayRating d-flex gap-4 mb-4 mt-2" data-rating="<%= review.rating %>">. For: displaying the star based on number of rating.

// display solid stars for each review
function displayRating(container, rating) {
  const stars = container.querySelectorAll('i');
  stars.forEach((star, i) => {
    if (i < rating) {
      star.classList.add('fas');
      star.classList.remove('far');
    } else {
      star.classList.add('far');
      star.classList.remove('fas');
    }
  });
}
// loop through all displayRating divs and set stars
document.querySelectorAll('.displayRating').forEach(div => {
  const rating = parseInt(div.dataset.rating);
  displayRating(div, rating);
});







// let starToDisplay = document.querySelectorAll(".displayRating i");
// function displayRating(rating) {
//   starToDisplay.forEach((start, i) => {
//     if (i < rating) {
//       start.classList.add('fas'); // solid star
//       start.classList.remove('far'); // empty star
//     } else {
//       start.classList.add('far');
//       start.classList.remove('fas');
//     }
//   });
// };
const cardImages = document.querySelectorAll(".card-image");
const cardTitles = document.querySelectorAll(".card-title");
const cardDescriptions = document.querySelectorAll(".card-description");
const cardMediaIcons = document.querySelectorAll(".card-mediaIcons a");
const cardImgs = document.querySelectorAll(".card-image img");
const cardTitleSpans = document.querySelectorAll(".card-title span");
const cardDescSpans = document.querySelectorAll(".card-description span");
const mediaIcons = document.querySelectorAll(".card-mediaIcons a i");

const renderCard = () => {
  //Remove the skeleton loading effect
  cardImages.forEach((cardImage) => {
    cardImage.classList.remove("loading");
  });
  cardTitles.forEach((cardTitle) => {
    cardTitle.classList.remove("loading");
  });
  cardDescriptions.forEach((cardDescription) => {
    cardDescription.classList.remove("loading");
  });
  cardMediaIcons.forEach((cardMediaIcon) => {
    cardMediaIcon.classList.remove("loading");
  });

  //Show the hidden html elements
  cardImgs.forEach((cardImg) => {
    cardImg.style.visibility = "visible";
  });
  cardTitleSpans.forEach((cardTitleSpan) => {
    cardTitleSpan.style.visibility = "visible";
  });
  cardDescSpans.forEach((cardDescSpan) => {
    cardDescSpan.style.visibility = "visible";
  });
  mediaIcons.forEach((mediaIcon) => {
    mediaIcon.style.visibility = "visible";
  });
};

//Execute renderCard on setTimeout
setTimeout(() => {
  renderCard();
}, 1000);

//Execute renderCard after the page loaded
//window.addEventListener("load", () => {
//renderCard();
//});

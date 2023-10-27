let jsGalleryStatus = {
  imageList: [],
  position: -1,
  open: false,
};

const jsGalleryInitialise = () => {
  const images = Array.from(document.querySelectorAll(".js-gallery img"));
  images.forEach((image, i) => {
    image.addEventListener("click", (event) => {
      jsGalleryOpenClick(i, event);
    });
  });
  let imageList = images.map((i) => i.getAttribute("src")).filter((i) => !!i);
  if (!imageList.length) {
    imageList = ["../images/magnify_icon_white.png"];
  }
  let position = 0;
  jsGalleryStatus = {
    ...jsGalleryStatus,
    imageList,
    position,
    open: false,
  };
};

addEventListener("DOMContentLoaded", jsGalleryInitialise);

const jsGalleryCloseClick = (event) => {
  event?.stopPropagation();
  event?.preventDefault();
  document.getElementById("js-gallery-zoomed").classList.add("off");
};

const jsGalleryOpenClick = (imageId, event) => {
  event?.stopPropagation();
  event?.preventDefault();
  jsGalleryOpen(imageId);
};

const jsGalleryOpen = (imageId) => {
  jsGallerySetImage(imageId);
  document.getElementById("js-gallery-zoomed").classList.remove("off");
};

const jsGalleryGetImageUrl = (imageId = jsGalleryStatus.position) =>
  jsGalleryStatus.imageList[imageId];

const jsGallerySetImage = (imageId) => {
  jsGalleryStatus.position = imageId;
  document
    .getElementById("js-gallery-zoomed-image")
    .setAttribute("src", jsGalleryGetImageUrl());
};

const jsGalleryNextClick = (event) => {
  event?.stopPropagation();
  event?.preventDefault();
  let next = jsGalleryStatus.position + 1;
  if (next >= jsGalleryStatus.imageList.length) {
    next = 0;
  }
  jsGallerySetImage(next);
};

const jsGalleryPreviousClick = (event) => {
  event?.stopPropagation();
  event?.preventDefault();
  let previous = jsGalleryStatus.position - 1;
  if (previous < 0) {
    previous = jsGalleryStatus.imageList.length - 1;
  }
  jsGallerySetImage(previous);
};

const jsGalleryFullClick = (event) => {
  // Compute position
  const rect = event.target.getBoundingClientRect();
  const relativeClickX = event.clientX - rect.x;
  const proportionalPosition = relativeClickX / rect.width;

  // Is this aprevious, next, or close?
  if (proportionalPosition <= 0.3) {
    jsGalleryPreviousClick(event);
  } else if (proportionalPosition >= 0.7) {
    jsGalleryNextClick(event);
  } else {
    jsGalleryCloseClick(event);
  }
};

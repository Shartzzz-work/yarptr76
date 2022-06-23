import './style.scss'

// import "./js/getOrder";


// const getOrderButton = document.querySelector('[name="getOrder"]');
const popupHTML = document.querySelector(".popup");
const getOrderForm = document.querySelector("#getOrder");
const orderConfirm = document.querySelector("#orderConfirm");
const menuHTML = document.querySelector("#menu")

// getOrderButton.addEventListener("click", () => {
//   popupHTML.style.display = "flex"
// })

document.addEventListener("click", (e) => {
  // e.preventDefault();

  switch (true) {
    case e.target.name === "menu":
      e.target.classList.toggle("active")
      menuHTML.classList.toggle("active")
    break;

    case e.target.name === "closePopup":
    case e.target.className === "popup":
      popupHTML.style.display = "none";
      break;

    case e.target.name === "getOrder":
      orderConfirm.style.display = "none";
      popupHTML.style.display = "flex";
      getOrderForm.style.display = "grid";
      break;

    case e.target.name === "sendOrder":
      e.preventDefault();
      getOrderForm.style.display = "none";
      orderConfirm.style.display = "grid";

      setTimeout(() => (popupHTML.style.display = "none"), 2000);
      break;

    default:
      break;
  }
});

const root = document.querySelector(".works_articles");
const target = document.querySelectorAll(".work");
const timeline = document.querySelectorAll("[data-timeline]");

const io_options = {
  root: root,
  rootMargin: "0px",
  threshold: 0.5,
};

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const timeline = document.querySelector(
          `[data-timeline='${entry.target.id}']`
        );
        timeline.classList.add("active");
      } else {
        const timeline = document.querySelector(
          `[data-timeline='${entry.target.id}']`
        );
        timeline.classList.remove("active");
      }
    });
  },
  {
    root: root,
    rootMargin: "0px",
    threshold: 0.5,
  }
);

target.forEach((i) => {
  observer.observe(i);
});

// function io_callback(entries) {
//   // if (entries[0].isIntersecting) {
//   //   root.addEventListener("scroll", () => {
//   //     const timeline = document.querySelector(
//   //       `[data-timeline='${entries[0].target.id}']`
//   //     );
//   //     timeline.classList.add("active");
//   //   });
//   // } else {
//   //   root.removeEventListener("scroll", scrollingEvents);
//   //   const timeline = document.querySelector(
//   //     `[data-timeline='${entries[0].target.id}']`
//   //   );
//   //   timeline.classList.remove("active");
//   //   // output.innerText = 0;
//   // }
//   const ratio = entries[0].intersectionRatio;
//   const boundingRect = entries[0].boundingClientRect;
//   const intersectionRect = entries[0].intersectionRect;

//   if (ratio === 1) {
//     console.log(ratio);
//     const timeline = document.querySelector(
//       `[data-timeline='${entries[0].target.id}']`
//     );
//     timeline.classList.add("active");
//   } else if (ratio > 0) {
//     if ((boundingRect.top > 200)) {
//       console.log("on the top");
//       console.log(boundingRect.top, intersectionRect.top, ratio);
//       const timeline = document.querySelector(
//         `[data-timeline='${entries[0].target.id}']`
//       );
//       timeline.classList.remove("active");
//     }
//   }

//   if (ratio === 0) {
//     console.log("outside");
//     console.log(boundingRect.top, intersectionRect.top, ratio);
//     const timeline = document.querySelector(
//       `[data-timeline='${entries[0].target.id}']`
//     );
//     timeline.classList.remove("active");
//   } else if (ratio < 1) {
// if (boundingRect.top < intersectionRect.top) {
//   console.log("on the top");
//   console.log(boundingRect.top, intersectionRect.top, ratio);
//   const timeline = document.querySelector(
//     `[data-timeline='${entries[0].target.id}']`
//   );
//   timeline.classList.add("active");
// } else if (boundingRect.top > intersectionRect.top) {
//       console.log("on the bottom");
//       console.log(boundingRect.top, intersectionRect.top / 2, ratio);
//       const timeline = document.querySelector(
//         `[data-timeline='${entries[0].target.id}']`
//       );
//       timeline.classList.add("active");
//     }
//   } else {
//     console.log("inside");
//     // console.log(entries[0].target);
//   }
// }

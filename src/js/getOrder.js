
// const getOrderButton = document.querySelector('[name="getOrder"]');
const popupHTML = document.querySelector(".popup");
const getOrderForm = document.querySelector("#getOrder");
const orderConfirm = document.querySelector("#orderConfirm");

// getOrderButton.addEventListener("click", () => {
//   popupHTML.style.display = "flex"
// })

document.addEventListener("click", (e) => {
  // e.preventDefault();

  switch (true) {
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

//This javascript gets called in index.html. One needs to run index.html in live server for this to be called and to work

//creating searchbar
let form = document.createElement("form");
let input1 = document.createElement("input");
let input2 = document.createElement("input");

input1.setAttribute("type", "search");
input1.setAttribute("id", "search-input");
input1.setAttribute("class", "search-input");
input1.setAttribute("placeholder", "Search...");

input2.setAttribute("type", "submit");
input2.setAttribute("value", "🔍"); //added magnifying glass for search bar. May not work on old browsers. Change to a literal string if needed.
input2.setAttribute("id", "search-submit");
input2.setAttribute("class", "search-submit");

form.appendChild(input1);
form.appendChild(input2);

document.getElementsByClassName("search-container")[0].appendChild(form);

//create gallery div

function createGallery(objectArray) {
  objectArray.forEach((person, index) => {
    //Foreach loop that will loop through an array of data provided as a parameter

    //create all elements and set their attributes
    let card = document.createElement("div");
    card.setAttribute("class", "card");
    card.setAttribute("onclick", `showModal(${index})`);

    let cardImgContainer = document.createElement("div");
    cardImgContainer.setAttribute("class", "card-img-container");

    let cardImg = document.createElement("img");
    cardImg.setAttribute("class", "card-img");
    cardImg.setAttribute("src", person.picture.large);
    cardImg.setAttribute("alt", "profile picture");

    cardImgContainer.appendChild(cardImg);
    card.appendChild(cardImgContainer);

    let cardInfoContainer = document.createElement("div");
    cardInfoContainer.setAttribute("class", "card-info-container");

    let name = document.createElement("h3");
    name.setAttribute("id", "name");
    name.setAttribute("class", "class-name cap");
    name.innerText = person.name.first + " " + person.name.last;

    let email = document.createElement("p");
    email.setAttribute("class", "card-text");
    email.innerText = person.email;

    let address = document.createElement("p");
    address.setAttribute("class", "card-text cap");
    address.innerText = person.location.city + ", " + person.location.state;

    //append all respective child elements to their parent elements.

    cardInfoContainer.appendChild(name);
    cardInfoContainer.appendChild(email);
    cardInfoContainer.appendChild(address);

    card.appendChild(cardInfoContainer);

    let gallery = document.getElementById("gallery");
    gallery.appendChild(card);
  });
}

// create modal

//This function will make the respective modal appear
function showModal(index) {
  console.log(index);

  //creating all the elements and adding their respective attributes
  let modalContainer = document.createElement("div");
  modalContainer.setAttribute("class", "modal-container");

  let modal = document.createElement("modal");
  modal.setAttribute("class", "modal");

  const button = document.createElement("button");
  button.setAttribute("type", "button");
  button.setAttribute("id", "modal-close-btn");
  button.setAttribute("class", "modal-close-btn");
  button.setAttribute("onclick", "removeModal()");

  const btnText = document.createElement("strong");
  btnText.innerText = "X";

  button.appendChild(btnText);

  const modalInfoContainer = document.createElement("div");
  modalInfoContainer.setAttribute("class", "modal info-container");

  const img = document.createElement("img");
  img.setAttribute("class", "modal-img");
  img.setAttribute("src", myData[index].picture.large);
  img.setAttribute("alt", "profile picture");

  const h3 = document.createElement("h3");
  h3.setAttribute("id", "name");
  h3.setAttribute("class", "modal-name cap");
  h3.innerText = myData[index].name.first + " " + myData[index].name.last;

  const email = document.createElement("p");
  email.setAttribute("class", "modal-text");
  email.innerText = myData[index].email;

  const city = document.createElement("p");
  city.setAttribute("class", "modal-text-cap");
  city.innerText = myData[index].location.city;

  const hr = document.createElement("hr");

  const phone = document.createElement("p");
  phone.setAttribute("class", "modal-text");
  phone.innerText = myData[index].cell;

  const street = document.createElement("p");
  street.setAttribute("class", "modal-text");
  street.innerText =
    `${myData[index].location.street.number} ${myData[index].location.street.name},` +
    `${myData[index].location.city}, ${myData[index].location.state}, ${myData[index].location.postcode}`;

  const birthday = document.createElement("p");
  birthday.setAttribute("class", "modal-text");
  birthday.innerText = "Birthday: " + myData[index].dob.date.substring(0, 10);

  //appending all child elements to the respective parent elements

  modalInfoContainer.appendChild(button);
  modalInfoContainer.appendChild(img);
  modalInfoContainer.appendChild(h3);
  modalInfoContainer.appendChild(email);
  modalInfoContainer.appendChild(city);
  modalInfoContainer.appendChild(hr);
  modalInfoContainer.appendChild(phone);
  modalInfoContainer.appendChild(street);
  modalInfoContainer.appendChild(birthday);

  modalContainer.appendChild(modalInfoContainer);

  const body = document.getElementsByTagName("body")[0];
  body.appendChild(modalContainer);
}

//This function will run when a user wants to remove the modal by clicking the X button
function removeModal() {
  const body = document.getElementsByTagName("body")[0];
  const modal = document.getElementsByClassName("modal-container")[0];
  body.removeChild(modal);
}

let myData = [];

fetch("https://randomuser.me/api/?results=12") //fetch from the api with a specified 12 results
  .then((response) => {
    if (response.ok) {
      console.log("retrieving data");
    } else {
      updateAlert("Failure to retrieve data", "alert-warning");
    }

    return response.json();
  })
  .then((data) => {
    console.log(data.results);
    myData = data.results;
    createGallery(data.results);
  });

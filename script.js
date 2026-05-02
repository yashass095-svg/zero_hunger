import { initializeApp } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/12.12.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "YOUR KEY",
  authDomain: "YOUR DOMAIN",
  projectId: "hungerverseai",
  storageBucket: "YOUR BUCKET",
  messagingSenderId: "YOUR ID",
  appId: "YOUR APP ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

console.log("Firebase Connected Successfully");
import {
  getDocs
} from "https://www.gstatic.com/firebasejs/12.12.1/firebase-firestore.js";

async function loadDonations() {

 const querySnapshot = await getDocs(collection(db, "donations"));

 const list = document.getElementById("donationList");

 list.innerHTML = "";

 querySnapshot.forEach((doc) => {

   const data = doc.data();

   list.innerHTML += `
   <div class="card">
      <h3>${data.food || data.foodName}</h3>
      <p>📍 ${data.city || data.location}</p>
      <p>🍱 Qty: ${data.quantity}</p>
   </div>
   `;
 });

}

loadDonations();

window.saveFood = async function () {
  try {
    await addDoc(collection(db, "donations"), {
      food: "Rice Meal",
      quantity: 50,
      city: "Mysore",
      time: new Date().toISOString()
    });

    alert("Donation Saved!");
    console.log("Saved");

  } catch (error) {
    console.log(error);
  }
};
async function runAI() {

 const querySnapshot = await getDocs(collection(db, "donations"));

 let mysore = 0;
 let bangalore = 0;
 let mandya = 0;

 querySnapshot.forEach((doc) => {

   const data = doc.data();

   const city = (data.city || data.location || "").toLowerCase();

   if(city.includes("mysore")) mysore++;
   if(city.includes("bangalore")) bangalore++;
   if(city.includes("mandya")) mandya++;

 });

 setRisk("mysoreRisk", mysore);
 setRisk("bangaloreRisk", bangalore);
 setRisk("mandyaRisk", mandya);
}

function setRisk(id, count){

 const el = document.getElementById(id);

 if(count >= 3){
   el.innerText = "Low Risk";
   el.className = "low";
 }
 else if(count >= 1){
   el.innerText = "Medium Risk";
   el.className = "medium";
 }
 else{
   el.innerText = "High Risk";
   el.className = "high";
 }

}

runAI();
function randomRisk() {
  let risks = ["Low Risk", "Medium Risk", "High Risk"];
  return risks[Math.floor(Math.random() * risks.length)];
}

function updateRisk(id) {
  let risk = randomRisk();
  let element = document.getElementById(id);

  element.innerText = risk;

  if (risk === "Low Risk") {
    element.style.color = "#00ff99";
  } 
  else if (risk === "Medium Risk") {
    element.style.color = "orange";
  } 
  else {
    element.style.color = "red";
  }
}

setInterval(() => {
  updateRisk("mysoreRisk");
  updateRisk("bangaloreRisk");
  updateRisk("mandyaRisk");
}, 3000);
const ctx = document.getElementById('myChart');
const myChart = new Chart(ctx, {
type: 'bar',
data: {
labels: ['Mysore', 'Bangalore', 'Mandya'],
datasets: [{
label: 'Hunger Risk %',
data: [45, 80, 30],
borderWidth: 1
}]
},
options: {
responsive: true,
scales: {
y: {
beginAtZero: true,
max: 100
}
}
}
});

setInterval(() => {
myChart.data.datasets[0].data = [
Math.floor(Math.random() * 100),
Math.floor(Math.random() * 100),
Math.floor(Math.random() * 100)
];

myChart.update();
}, 3000);window.sendAlert = function () {
alert("🚨 Emergency Alert Sent to NGOs & Volunteers!");
console.log("NGO Alert Sent");
}
window.openLogin = function(){
document.getElementById("loginBox").style.display="block";
}

window.closeLogin = function(){
document.getElementById("loginBox").style.display="none";
alert("Login Successful!");
}
window.initMap = function () {

const map = new google.maps.Map(document.getElementById("map"), {
center: { lat: 12.9716, lng: 77.5946 },
zoom: 7
});

new google.maps.Marker({
position: { lat: 12.9716, lng: 77.5946 },
map: map,
title: "Bangalore"
});

};
window.initMap = function () {
    const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 12.9716, lng: 77.5946 }, // Bangalore
        zoom: 7
    });

    new google.maps.Marker({
        position: { lat: 12.9716, lng: 77.5946 },
        map: map,
        title: "Bangalore"
    });

    new google.maps.Marker({
        position: { lat: 12.2958, lng: 76.6394 },
        map: map,
        title: "Mysore"
    });

    new google.maps.Marker({
        position: { lat: 12.5218, lng: 76.8951 },
        map: map,
        title: "Mandya"
    });
};
window.userLogin = function(){
    alert("User Login Successful");
}

window.ngoLogin = function(){
    alert("NGO Login Successful");
}
window.saveFoodForm = async function () {

    const food = document.getElementById("foodName").value;
    const qty = document.getElementById("foodQty").value;
    const city = document.getElementById("foodCity").value;
    const expiry = document.getElementById("foodExpiry").value;

    await addDoc(collection(db, "donations"), {
        foodName: food,
        quantity: qty,
        location: city,
        expiry: expiry,
        time: new Date()
    });

    alert("Donation Submitted Successfully!");
}
/*
 * The initial fetch returns a JSON response from the number.api.jason
 * user may select from trivia, math, and year
 * if no response were captured return "no fact found"

* and then the application display a second selector that allows the user to choose an input format
* 1.random: generate a number
* fetch from  http://numbersapi.com/ranmdom/math?JSON


* 2.number: user input a number
* http://numbersapi.com/givennumber/math?json

* 3.number range: Enter lower number of range: enter higher number of range;
* random select one number in the range clock for repsonse
* return all the infors in the range
* http://numbersapi.com/number..number2/math?JSON

* 4. if user input date:
* fetch from http://numbersapi.com/MONTH/DATE/date?JSON

* json contains the following:
* if found: return true, else return false
* type: return the type of fact
* text = the text of the fact
* number = the number that fact concerns
* if not found: return "no fact found"

 */

 var activities = document.querySelector("#dataType");
 var option;


//user pick options
activities.addEventListener("change",(event)=>{
     var options = document.querySelector("#follow_up");
     option = event.target.value;
     if (option != "date"){
        displayOtherThanDate();}
        //console.log("displayNotDate");}
     else{
        getDate();}
 });


//if user pick date option
//send a form to user to input month and day
 function getDate(){
   //Enter lower number of range: xxx Enter higher number of range:
   //let user input two number
   var dateEntry = `
   <form>
      <label for:"month">Enter month:<input id="month" name="month" type="text"></label>
      <label for:"day">Enter day:<input id="day" name="day" type="text"></label>
      <input id="clicker" name="clicker" type = "button" value="Click for response">
   </form>
   <p id="date_follow_up">
   <div id="displayDateContents">
   </div>
   `;
   document.getElementById("display").innerHTML = dateEntry;

   //add addEventListener to receive click response to get data
   var button = document.querySelector("#clicker");
   button.addEventListener("click", returnDateDate);
 }


//return the data from the date input
 function returnDateDate(){
   let month = document.querySelector("#month").value;
   let day = document.querySelector("#day").value;
   var url = "http://numbersapi.com/"+month+"/"+day+"/date?json";
   fetch(url)
     .then((response => response.json()))
     .then((result => {
       console.log("fact requested success");
       returnUserResponse = result.text;
       userResponse = option + " fact: " + returnUserResponse;
       document.getElementById("displayDateContents").innerHTML = userResponse;

       }))
      // document.querySelector("pre").textContent =
      //   console.log(json[0]);
     .catch(ex => {
       document.getElementById("displayDateContents").innerHTML = "No fact found";
       console.log("no fact found",ex);
     });


 }

//if user choose other options
function displayOtherThanDate(){
    var contents = `
    <form id="optionForm">
    <select id="inputOption">
    <option selected disabled>Select a type of data to retrieve:</option>
    <option value="random">random</option>
    <option value="number">number</option>
    <option value="number range">number Range</option>
    </select>
    </form>
    <div id="option_follow_up">
    </div>
    <div id="moreContentsDisplay">
    </div>`;
   document.getElementById("display").innerHTML = contents;
   //alert("PLZ WORK");
   moreOptions();
}


//receive user choice and make the next move
function moreOptions(){
  var secondActivity = document.querySelector("#inputOption");
  secondActivity.addEventListener("change",(event)=>{
       var secondOptions = document.querySelector("#option_follow_up");
      secondOption = event.target.value;
       if (secondOption == "random"){
         displayRandom();
       }
       if (secondOption == "number"){
         displayNumber();
       }
       if (secondOption == "number range"){
         displayNumberRange();
       }

          //console.log("displayNotDate");}

   });

//display a random fact
 function displayRandom(){

   //create local variable for url
   var url = "http://numbersapi.com/random/"+option+"?json";
   console.log("requested from "+ url);

   console.log("fact requested");
   //fetch url
   fetch(url)
     .then((response => response.json()))
     .then((result => {
       console.log("fact requested success");
       returnUserResponse = result.text;
       userResponse = option + " fact: " + returnUserResponse;
       document.getElementById("moreContentsDisplay").innerHTML = userResponse;

       }))
      // document.querySelector("pre").textContent =
      //   console.log(json[0]);
     .catch(ex => {
       document.getElementById("moreContentsDisplay").innerHTML = "No fact found";
       console.log("no fact found",ex);
     });
 }


//let user input a number by a form
 function displayNumber(){
   //input a number
   //display the form to let user input number
   var numberEntry = `
   <form>
      <label for:"number">Enter your number:<input id="number" name="number" type="text"></label>
      <input id="clicker" name="clicker" type = "button" value="Click for response">
   </form>
   <p id="number_follow_up">
   </div>
   <div id="displayNumberContents">
   </div>
   `;
   document.getElementById("moreContentsDisplay").innerHTML = numberEntry;

   //add addEventListener to receive click response to get data
   var button = document.querySelector("#clicker");
   button.addEventListener("click", returnNumberData);
}


//fetch the number data and return
 function returnNumberData(){
   let numberActivity = document.querySelector("#number").value;

   //create local variable for number url
   var url = "http://numbersapi.com/"+numberActivity+"/"+option+"?json";
  // console.log("requested from "+ url);

   console.log("fact requested");
   //fetch url
   fetch(url)
     .then((response => response.json()))
     .then((result => {
       console.log("fact requested success");
       returnUserResponse = result.text;
       userResponse = option + " fact: " + returnUserResponse;
       document.getElementById("displayNumberContents").innerHTML = userResponse;

       }))
      // document.querySelector("pre").textContent =
      //   console.log(json[0]);
     .catch(ex => {
       document.getElementById("displayNumberContents").innerHTML = "No fact found";
       console.log("no fact found",ex);
     });
 }


//send a form to user to input data range, takes 2 values min and max
function displayNumberRange(){
  //Enter lower number of range: xxx Enter higher number of range:
  //let user input two number
  var numberEntry = `
  <form>
     <label for:"lower">Enter lower number of range:<input id="lower" name="lower" type="text"></label>
     <label for:"higher">Enter higher number of range:<input id="higher" name="higher" type="text"></label>
     <input id="clicker" name="clicker" type = "button" value="Click for response">
  </form>
  <p id="numberRange_follow_up">
  <div id="displayNumberRangeContents">
  </div>
  `;
  document.getElementById("moreContentsDisplay").innerHTML = numberEntry;

  //add addEventListener to receive click response to get data
  var button = document.querySelector("#clicker");
  button.addEventListener("click", returnNumberRangeData);
}


//return the data from the range
function returnNumberRangeData(){
  let low = document.querySelector("#lower").value;
  let high = document.querySelector("#higher").value;
  var userResponse = [];
  console.log(low+high);
  var url = "http://numbersapi.com/"+low+".."+high+"/"+option+"?json"
  console.log(url);
  fetch(url)
    .then((response => response.json()))
    .then((result => {
      console.log("fact requested success");
      for(var temp = low; temp <= high; temp++){
        returnUserResponse = result[temp].text;
        userResponse.push(option + " fact: " + returnUserResponse);}
      //var tempHolder = document.querySelector("displayNumberRangeContents");
      for(var i = 0;i < userResponse.length; i++){
      document.getElementById("displayNumberRangeContents").innerHTML +=  userResponse[i]+ "<br>";}
      }))
     // document.querySelector("pre").textContent =
     //   console.log(json[0]);
    .catch(ex => {
      document.getElementById("displayNumberRangeContents").innerHTML += "No fact found for:"+ option;
    });
}


}

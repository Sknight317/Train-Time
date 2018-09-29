//Intialize Firebase
var config = {
    apiKey: "AIzaSyD33k9KEws4Pg1bFVSbeIMB_qfnltRNV6M",
    authDomain: "train-time-f40c7.firebaseapp.com",
    databaseURL: "https://train-time-f40c7.firebaseio.com",
    projectId: "train-time-f40c7",
    storageBucket: "train-time-f40c7.appspot.com",
    messagingSenderId: "448624270667"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  //Onclick function for when the user presses submit
  $("#add-train").on("click", function(event){
    //Prevents the automatic default; prevents the page from refreshing everytime
    event.preventDefault();

  // Grabs what the user inputs into each user field
  var TrainName = $("#train-name-input").val().trim();
  var Destination = $("#destination-input").val().trim();
  var TrainTime = moment($("#time-input").val().trim(), "MM/DD/YYYY").format("X");
  var Frequency = $("#frequency-input").val().trim();

  

  //local "temporary" object for holding train data
  var newTrain = {
    name: TrainName,
    place: Destination,
    time: TrainTime,
    frequency: Frequency
  };

  //Uploads the train data to the database
  database.ref().push(newTrain);

  // Logs everything to the console
  console.log(newTrain.name);
  console.log(newTrain.place);
  console.log(newTrain.time);
  console.log(newTrain.frequency);

  alert("Train successfully added");

    // Clears all of the text boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#time-input").val("");S
    $("#frequency-input").val("");
});

// 
database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Creates a variable for each 
    var TrainName = childSnapshot.val().name;
    var Destination = childSnapshot.val().role;
    var TrainTime = childSnapshot.val().start;
    var Frequency = childSnapshot.val().rate;
  
    // console logs
    console.log(TrainName);
    console.log(Destination);
    console.log(TrainTime);
    console.log(Frequency);

    var NextTrain =
    var MinutesAway =

    // Creates the new row with the newly added train
  var newRow = $("<tr>").append(
    $("<td>").text(TrainName),
    $("<td>").text(Destination),
    $("<td>").text(Frequency),
    $("<td>").text(),
    $("<td>").text(),
   
  );

  // Append the new row to the table
  $("#trains > tbody").append(newRow);
});
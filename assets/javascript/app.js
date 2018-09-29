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
  var TrainTime = $("#time-input").val().trim();
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
    $("#time-input").val("");
    $("#frequency-input").val("");
});

// 
database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Creates a variable for each 
    var TrainName = childSnapshot.val().name;
    var Destination = childSnapshot.val().place;
    var TrainTime = childSnapshot.val().time;
    var Frequency = childSnapshot.val().frequency;
  
    // console logs
    console.log(TrainName);
    console.log(Destination);
    console.log(TrainTime);
    console.log(Frequency);

    var Format = "hh:mm";
    var convertTime = moment(TrainTime, Format);

    // Difference between the current time and first train time
    var Timedifference =  convertTime.diff(moment(), "minutes");
    console.log("Difference in time: " + Timedifference);

     // remainder 
     var Remainder = Timedifference % Frequency;
     console.log(Remainder);

     // Time the next train is set to arrive
    var NextTrainTime = moment().add(MinutesAway, "minutes");
    console.log("Arival Time: " + moment(NextTrainTime).format("hh:mm"));
    // Setting a variable equal to how many minutes away the next train is; determined by subtracting how often the train comes (frequency) 
    // from the remainder
    var MinutesAway = Frequency - Remainder;
    console.log("Minutes until the next train: " + MinutesAway);

    // Creates the new row with the newly added train
  var newRow = $("<tr>").append(
    $("<td>").text(TrainName),
    $("<td>").text(Destination),
    $("<td>").text("every "+ Frequency + " minutes"),
    $("<td>").text(NextTrainTime),
    $("<td>").text(MinutesAway + " minutes away"),
   
  );

  // Append the new row to the table
  $("#trains > tbody").append(newRow);
});
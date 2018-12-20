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
  if(TrainName=== "") {
    alert("Please enter a valid Train Name");
    return
  }
  var Destination = $("#destination-input").val().trim();
  if(Destination=== "") {
    alert("Please enter a valid Destination");
    return
  }
  var TrainTime = $("#time-input").val().trim();
  if(TrainTime=== "") {
    alert("Please enter a valid Train Time");
    return
  }
  var Frequency = $("#frequency-input").val().trim();
  if(Frequency=== "") {
    alert("Please enter a valid Frequency");
    return
  }
  //If frequency is not a number
  if(isNaN(Frequency)){
    alert("Please enter a number for Frequency");
    //Stop the function
    return
  }
  

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

// Firebase event for adding a train to the database
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

    // Converting the user input first train time to the proper format
    var Format = "HH:mm";

    // Subtracting one year from the train time to make sure it comes before the current time
    var convertTime = moment(TrainTime, Format).subtract(1, "years");
    console.log(convertTime);
    // Creating a new variable and setting it equal to the proper time format found in the object
    var NewTime = convertTime._d; 
    console.log(NewTime);

    // Setting a variable equal to the current time and changing it to the proper format
    var currentTime = moment();
    console.log("Current Time: " + moment(currentTime).format("hh:mm A")); 
    
    // Difference between the current time and first train time
    var Timedifference =  moment().diff(moment(NewTime), "minutes");
    console.log("Difference in Time: " + Timedifference);

     // remainder 
     var Remainder = Timedifference % Frequency;
     console.log(Remainder);

    // Setting a variable equal to how many minutes away the next train is; determined by subtracting how often the train comes (frequency) 
    // from the remainder
    var MinutesAway = Frequency - Remainder;
    console.log("Minutes until the next train: " + MinutesAway);  
    
    // Time the next train is set to arrive
    var NextTrainTime = moment().add(MinutesAway, "minutes");
    console.log("Arival Time: " + moment(NextTrainTime).format("hh:mm A"));
    
    

    // Creates the new row with the newly added train
  var newRow = $("<tr>").append(
    $("<td>").text(TrainName),
    $("<td>").text(Destination),
    $("<td>").text("every "+ Frequency + " minutes"),
    $("<td>").text(NextTrainTime.format("hh:mm A")),
    $("<td>").text(MinutesAway + " minutes away"),
   
  );

  // Append the new row to the table
  $("#trains > tbody").append(newRow);
});


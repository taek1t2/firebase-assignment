var config = {
    apiKey: "AIzaSyA37ksSdHOb4k47HZFRDiNaoZTHsdiPjIg",
    authDomain: "trainfirebase-7f62a.firebaseapp.com",
    databaseURL: "https://trainfirebase-7f62a.firebaseio.com",
    projectId: "trainfirebase-7f62a",
    storageBucket: "",
    messagingSenderId: "56940760053"
  };
  firebase.initializeApp(config);

var database = firebase.database();

//train search button intiate
$("#search").on("click", function(event) {
    event.preventDefault();

    var trainInput = $("#train-input").val().trim();
    var destinationInput = $("#destination-input").val().trim();
    var elongationInput = $("#elongation-input").val().trim();
    var firstArrivalInput = $("#firstArrival-input").val().trim();

    var newArrival = {
        name: trainInput,
        destination: destinationInput,
        elongation: elongationInput,
        arrival: firstArrivalInput,
    }

    database.ref().push(newArrival);

    console.log(newArrival.name);
    console.log(newArrival.destination);
    console.log(newArrival.elongation);
    console.log(newArrival.arrival);

})

database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());

    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var trainElongation = childSnapshot.val().elongation;
    var trainArrival = childSnapshot.val().arrival;

    var tElongation = moment(trainArrival, "HH:mm").subtract(1, "years");
    console.log(tElongation);

    var currentTime = moment();
    console.log("current time: " + moment(currentTime).format("hh:mm"));

    var diffTime = moment().diff(moment(tElongation), "minutes");
    console.log("difference in time: " + diffTime);

    var tRemainder = diffTime % trainElongation;
    console.log(tRemainder);

    var tMinutesTilTrain = trainElongation - tRemainder;
    console.log("minutes til train: " + tMinutesTilTrain);

    var nextTrain = moment().add(tMinutesTilTrain, "minutes");
    console.log("arrival time: " + moment(nextTrain).format("hh:mm"));

    $("tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + trainElongation + "</td><td>" + tMinutesTilTrain + "</td><td>" + moment(nextTrain).format("hh:mm") + "</td></tr>");
})
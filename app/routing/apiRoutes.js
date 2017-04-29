// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on friend-data, etc.

var friendData = require("../data/friends");
console.log("the friend array" + friendData);

// ROUTING
module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)

  app.get("/api/friends", function(req, res) {
    res.json(friendData);
  });

  // API POST Requests : handles when a user submits a survey(a JSON object) and thus submits data to the server.
  // the JSON is pushed to the appropriate JavaScript array n the server saves the data to the friendData array.

  app.post("/api/friends", function(req, res) {
      //  Our "server" will respond to requests
      var newFriend = req.body;
      console.log(newFriend);

      //function for claculating the sum of an array's element 
      function sum(input){    
         if (toString.call(input) !== "[object Array]")
            return false;
            var total =  0;
            for(var i=0;i<input.length;i++)
              {                  
                if(isNaN(input[i])){
                continue;
                 }
                  total += Number(input[i]);
               }
             return total;
      }


     // Calculate user's total score
    var userScores = newFriend.score;
    var userTotalScore = sum(userScores);
    console.log("user scores " + userScores);
    console.log("total of the user score " + userTotalScore);

    //check the best match 
    var differenceArray = [];
    for (i=0; i<friendData.length; i++) {
      var totalDifference = Math.abs(userTotalScore - sum(friendData[i].scores));
      differenceArray.push(totalDifference);
    }
    console.log("the difference array "+differenceArray);
    var match = Math.min.apply(Math, differenceArray);
    var matchIndex = differenceArray.indexOf(match);
    
    res.send(friendData[matchIndex]);
  });

};


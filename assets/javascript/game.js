$(document).ready(function () {

    // Global variables
    var arrCrystalImages = ["assets/images/crystal-1.png", "assets/images/crystal-2.png", "assets/images/crystal-3.png", "assets/images/crystal-4.png"];
    var numRandomNumber;
    var numCurrentTotal = 0;
    var numWins = 0;
    var numLosses = 0;

    // Add crystals to the page
    for (var i = 0; i < arrCrystalImages.length; i++) {
        var imgCrystal = $("<img>");
        imgCrystal.addClass("crystal-image px-2");
        imgCrystal.attr({
            // Get the crystal source file from the global array variable
            "src": arrCrystalImages[i],
            // Set the id attribute so we can select the crystal later
            "id": "crystal-" + i
        });
        // Add the crystal to the page
        $("#crystals-section").append(imgCrystal);
    };

    // Function to get the game started
    function InitializeGame() {
        // Set the game's random number between 19 and 120
        numRandomNumber = Math.floor(Math.random() * 101) + 19;
        $("#random-number").text(numRandomNumber);
        console.log("This game's random number: ", numRandomNumber);

        // Set the crystals' random numbers between 1 and 17
        $(".crystal-image").each(function (index) {
            $(this).attr("value", Math.floor(Math.random() * 17) + 1);
            // Not the driest code, but I didn't want to declare a new variable just
            // to hold the random number.
            // console.log("Crystal " + (index + 1) + " value:", $(this).attr("value"));
        });

        // Set the current total to 0
        numCurrentTotal = 0;
        $("#number-total").text(numCurrentTotal);
    };

    // Function to check for a win on each crystal click.
    // The game automatically re-initializes on a win or a loss.
    function CheckForWin() {
        if (numCurrentTotal > numRandomNumber) {
            alert("You lose! Try again.");
            numLosses++;
            $("#losses").text(numLosses);
            InitializeGame();
        }
        else if (numCurrentTotal === numRandomNumber) {
            alert("You win! Well done!");
            numWins++;
            $("#wins").text(numWins);
            InitializeGame();
        }
    }

    // Start the game.
    InitializeGame();

    // On crystal click, add the crystal's value to running total
    $(".crystal-image").on("click", function () {
        // console.log($(this).attr("value"));
        numCurrentTotal += parseInt($(this).attr("value"));
        $("#number-total").text(numCurrentTotal);
        CheckForWin();
    });

});
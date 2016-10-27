//Game Values
var gameArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
//Is cell turned up (True) or down (False)
var gameState = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];

//Global variables
//Total number of clics
var nbClic = 0;
//State of the Game
var winState = false;

//Value of cell
var clic1 = "";
var clic2 = "";

//Coordinates of the cell
//Type b00
var clic1cell = "";
var clic2cell = "";

//Draws the Board when button is clicked
function drawboard(){
  //Reset Global Variables
  clic1 = "";
  clic2 = "";
  clic1cell = "";
  clic2cell = "";
  nbClic = 0;
  winState = false;
  //Shuffle
  gameArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  for(var i = 1; i < 9; i++){ //Number to affect
    for(var j = 0; j < 2; j++){ //2 times
      affect = 0;
      do{
        affect = Math.floor(Math.random() * 16);
      }while(gameArray[affect] != 0);
      gameArray[affect] = i;
    }
  }
  gameState = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];

  document.getElementById("nbclics").innerHTML = "Number of clics: " + nbClic;
  document.getElementById("activeClics").innerHTML = "Active clics: 0";

  res = ("<table border = \"1\">");
  for(var i = 0; i < 4; i++){
    res += ("<tr>");
    for(var j = 0; j < 4; j++){
      res += ("<td style=\"margin: 0px; padding: 0px; height: 100px; width: 100px; text-align: center;\">");


      //res += ("<a style=\"font-size: 3em;\" id=\"" + i + j + "\" title=\"\" href=\"#\" onclick=\"clicon(" + i.toString() + j.toString() + ");\">");
      //res += ("<img style=\"width: 100px; height: 100px;\" src=\"" + formatVal(toArrayVal(i.toString() + j.toString())) + ".jpeg\" />");
      //res += ("</a>");

      res += ("<button id=\"b" + i + j + "\" onclick=\"clicon(this.id);\"></button>");

      res += ("</td>");
    }
    res += ("</tr>");
  }
  res += ("</table>");

  document.getElementById("board").innerHTML = res;
}

//When a cell is clicked
function clicon(cell){
  if(clic1cell != "" && clic2cell != ""){ //Both cells are clicked
    return;
  }else{ //If at least one cell is not clicked
    //Calculate the array position
    val = parseInt(cell.charAt(1))*4 + parseInt(cell.charAt(2));

    //If cell is not turned on
    if(!gameState[val]){
      //If cell 1 is available, assign to cell 1
      if (clic1cell == "") {
        //Try count is incremented at clic 1
        nbClic++;
        document.getElementById("nbclics").innerHTML = "Number of clics: " + nbClic;

        //One clic activated
        document.getElementById("activeClics").innerHTML = "Active clics: 1";
        clic1 = gameArray[val];
        clic1cell = cell;

        //After 3 seconds, deactivate cells
        window.setTimeout(activeClicDecrease, 3000);

      //If cell 2 is available and cell 1 is already taken
      }else if(clic2cell == ""){
        //Before registering clic2, we want to make sure that it is not the same as clic1
        if(cell != clic1cell){
          //Second clic actived
          document.getElementById("activeClics").innerHTML = "Active clics: 2";
          clic2 = gameArray[val];
          clic2cell = cell;
        }else{
          return;
        }
      }

      //Turn up cell
      document.getElementById(cell).innerHTML = "<span id=\"b" + cell + "\">" + gameArray[val] + "</span>";
    }
  }
}

//After 3s
function activeClicDecrease(){
  //If at least one cell is up
  if(clic1cell != ""){
    if(clic2cell == ""){ //Clic 1 and no Clic 2
      $("#b" + clic1cell).fadeTo(1000, 0);
    }else{  //Clic 1 and 2
      if(clic1 != clic2){ //Not the same numbers
        $("#b" + clic1cell).fadeTo(1000, 0);
        $("#b" + clic2cell).fadeTo(1000, 0);
      }else{ //Same numbers
        val = parseInt(clic1cell.charAt(1))*4 + parseInt(clic1cell.charAt(2));
        gameState[val] = true;
        val = parseInt(clic2cell.charAt(1))*4 + parseInt(clic2cell.charAt(2));
        gameState[val] = true;

        winState = true;
        for(i = 0; i < gameState.length; i++){
          if(gameState[i] == false){
            winState = false;
          }
        }
        if(winState){
          alert("You won in " + nbClic + " tries!");
        }
      }
    }

    clic1 = "";
    clic1cell = "";
    clic2 = "";
    clic2cell = "";
    document.getElementById("activeClics").innerHTML = "Active clics: 0";

  //Cell1 is empty and cell2 is not empty -- SHOULD NOT HAPPEN IN THEORY
  }else if(clic2cell != ""){
    //Hard reset of active cells
    $("#b" + clic1cell).fadeTo(0, 0);
    $("#b" + clic2cell).fadeTo(0, 0);
    clic1 = "";
    clic1cell = "";
    clic2 = "";
    clic2cell = "";
    document.getElementById("activeClics").innerHTML = "Active clics: 0";
  }
}

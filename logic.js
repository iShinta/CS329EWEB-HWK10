var gameArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var gameState = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];
var nbClic = 0;
var winState = false;
var clic1 = "";
var clic2 = "";
var clic1cell = "";
var clic2cell = "";

function drawboard(){
  clic1 = "";
  clic2 = "";
  clic1cell = "";
  clic2cell = "";
  nbClic = 0;
  winState = false;
  gameArray = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
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

      res += ("<div id=\"b" + i + j + "\" onclick=\"clicon(this.id);\"></div>");

      res += ("</td>");
    }
    res += ("</tr>");
  }
  res += ("</table>");

  document.getElementById("board").innerHTML = res;
}

function clicon(cell){
  if(clic1cell != "" && clic2cell != ""){
    return;
  }else{
    val = parseInt(cell.charAt(1))*4 + parseInt(cell.charAt(2));
    if(!gameState[val]){
      if (clic1cell == "") {
        nbClic++;
        document.getElementById("nbclics").innerHTML = "Number of clics: " + nbClic;

        document.getElementById("activeClics").innerHTML = "Active clics: 1";
        clic1 = gameArray[val];
        clic1cell = cell;
      }else if(clic2cell == ""){
        document.getElementById("activeClics").innerHTML = "Active clics: 2";
        clic2 = gameArray[val];
        clic2cell = cell;
      }
      document.getElementById(cell).innerHTML = "<span id=\"b" + cell + "\">" + gameArray[val] + "</span>";

      window.setTimeout(activeClicDecrease, 3000);
    }
  }
}

function activeClicDecrease(){
  if(clic1cell != ""){
    if(clic2cell == ""){ //Clic 1 and no Clic 2
      $("#b" + clic1cell).fadeOut(1000);
    }else{  //Clic 1 and 2
      if(clic1 != clic2){ //Not the same numbers
        $("#b" + clic1cell).fadeOut(1000);
        $("#b" + clic2cell).fadeOut(1000);
      }else{
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
  }
}

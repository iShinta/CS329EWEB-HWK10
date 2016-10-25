var gameArray = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];

function drawboard(){
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
  val = parseInt(cell.charAt(1))*4 + parseInt(cell.charAt(2));
  document.getElementById(cell).innerHTML = "<span id=\"b" + cell + "\">" + gameArray[val] + "</span>";
  $("#b" + cell).fadeOut(3000);
}

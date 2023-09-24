document.addEventListener("DOMContentLoaded", function () {
    file = loadFile("./svg/svg_preload.html")
    newDiv = document.createElement("div")
    newDiv.innerHTML = file
    document.body.appendChild(newDiv)

})

function loadFile(filePath) {
    var result = null;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", filePath, false);
    xmlhttp.send();
    if (xmlhttp.status==200) {
      result = xmlhttp.responseText;
    }
    return result;
  }
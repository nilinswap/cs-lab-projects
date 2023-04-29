updateOutput();
document.getElementById("input").addEventListener("input", function () {
  updateOutput();
});
function updateOutput() {
  // Rather than calling EmojiTranslate.translate, we want all the
  // possible options.
  document.getElementById("output").innerHTML = "";
  var text = document.getElementById("input").value;
  var container = document.getElementById("output");
  var allLines = text.split("\n");
  for (var line = 0; line < allLines.length; line++) {
    if (allLines[line] == "") continue;
    var words = allLines[line].split(" ");
    // Re-add the translated words.
    for (var i = 0; i < words.length; i++) {
      var node = EmojiTranslate.translateForDisplay(words[i]);
      if (node) container.appendChild(node);
    }
    var newLine = document.createElement("br");
    container.appendChild(newLine);
  }
  return container;
}

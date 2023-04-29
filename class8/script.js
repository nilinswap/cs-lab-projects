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
function copy() {
  var value = getActualOutput();
  clipboardContents.textContent = value;
  // From https://github.com/google/material-design-lite/blob/master/docs/_assets/snippets.js
  var snipRange = document.createRange();
  snipRange.selectNodeContents(clipboardContents);
  var selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(snipRange);
  var result = false;
  try {
    result = document.execCommand("copy");
    copyButton.innerHTML = "Done!";
  } catch (err) {
    // Copy command is not available
    console.error(err);
    copyButton.innerHTML = "Oops, error copying :(";
  }
  // Return to the copy button after a second.
  setTimeout(
    function () {
      copyButton.innerHTML = "Copy to clipboard";
    }.bind(this),
    1000
  );
  selection.removeAllRanges();
  return result;
}
function getActualOutput() {
  var value = "";
  var nodes = output.children;
  for (var i = 0; i < nodes.length; i++) {
    if (nodes[i].tagName === "SELECT") {
      // Do this instead of .value because we want to maintain whitespace.
      value += nodes[i].options[nodes[i].selectedIndex].textContent;
    } else if (nodes[i].tagName === "BR") {
      value += "\n";
    } else if (nodes[i].tagName != "OPTION") {
      value += nodes[i].textContent;
    }
  }
  return value;
}

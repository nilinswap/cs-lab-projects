"use strict";
import * as commandsModule from "./utils.js";

if (annyang) {
  var commands = {
    "hello (there)": commandsModule.hello,
    "hello I am :name": commandsModule.helloFunction,
    "show me *search": commandsModule.showFlickr,
  };

  annyang.debug();

  annyang.addCommands(commands);

  annyang.setLanguage("en");

  annyang.start();
} else {
  alert("annyang unsupported?");
}

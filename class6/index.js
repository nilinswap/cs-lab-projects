"use strict";
import * as commandsModule from './commands.js'

if (annyang) {
  var commands = {
    "hello (there)": commandsModule.hello,
    "hello I am :name": commandsModule.helloFunction,
    "where am I": commandsModule.findLocation,
    "what is the weather of city :city": commandsModule.weather
  };

  // OPTIONAL: activate debug mode for detailed logging in the console
  annyang.debug();

  // Add voice commands to respond to
  annyang.addCommands(commands);

  // OPTIONAL: Set a language for speech recognition (defaults to English)
  // For a full list of language codes, see the documentation:
  // https://github.com/TalAter/annyang/blob/master/docs/FAQ.md#what-languages-are-supported
  annyang.setLanguage("en");

  // Start listening. You can call this here, or attach this call to an event, button, etc.
  annyang.start();
} else {
  $(document).ready(function () {
    $("#unsupported").fadeIn("fast");
  });
}

"use strict";

(function($) {
  var events = {};
  var dates = {};

  var processEvent = function processEvent() {
      var $event = $(this);
      $event.find(".dates li").each(function() {
        
      });

  }

  $(document).ready(function() {
    $(".main").find("article.event-description").each(processEvent);
  });
})(jQuery)

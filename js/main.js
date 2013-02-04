// Simple JavaScript Templating
// John Resig - http://ejohn.org/ - MIT Licensed
(function() {
    var cache = {};

    this.tmpl = function tmpl(str, data) {
      // Figure out if we're getting a template, or if we need to
      // load the template - and be sure to cache the result.
      var fn = !/\W/.test(str) ?
        cache[str] = cache[str] ||
        tmpl(document.getElementById(str).innerHTML) :

        // Generate a reusable function that will serve as a template
        // generator (and which will be cached).
        new Function("obj",
          "var p=[],print=function(){p.push.apply(p,arguments);};" +

          // Introduce the data as local variables using with(){}
          "with(obj){p.push('" +

          // Convert the template into pure JavaScript
          str.replace(/[\r\t\n]/g, " ")
            .replace(/'(?=[^%]*%>)/g,"\t")
            .split("'").join("\\'")
            .split("\t").join("'")
            .replace(/<%=(.+?)%>/g, "',$1,'")
            .split("<%").join("');")
            .split("%>").join("p.push('")
            + "');}return p.join('');");

      // Provide some basic currying to the user
      return data ? fn(data) : fn;
    };
})();

(function($) {
  "use strict";

  var events = [];
  var dates = [];

  var processEvent = function processEvent() {
    var event = { dates: [] },
        $event = $(this);

    event.el = this;
    event.name = $event.find(".event-name").text();
    event.time = $event.find("footer p time").attr("datetime");

    $event.find(".dates li").each(function() {
      var date = {},
          $date = $(this),
          $time_elements = $date.find("time");

      date.date = $time_elements.first().attr("datetime");
      if ($time_elements.length > 1) {
        date.time = $time_elements.last().attr("datetime");
      }
      else {
        date.time = event.time;
      }
      date.event = event;

      event.dates.push(date);
      dates.push(date);
    });

    events.push(event);

  }

  $(document).ready(function() {
    $(".main").find("article.event-description").each(processEvent);

    $(".main").append(tmpl("timeline_tmpl", { dates: dates }));
  });
})(jQuery)

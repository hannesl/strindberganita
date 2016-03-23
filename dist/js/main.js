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

/*! A fix for the iOS orientationchange zoom bug. Script by @scottjehl, rebound by @wilto.MIT / GPLv2 License.*/(function(a){function m(){d.setAttribute("content",g),h=!0}function n(){d.setAttribute("content",f),h=!1}function o(b){l=b.accelerationIncludingGravity,i=Math.abs(l.x),j=Math.abs(l.y),k=Math.abs(l.z),(!a.orientation||a.orientation===180)&&(i>7||(k>6&&j<8||k<8&&j>6)&&i>5)?h&&n():h||m()}var b=navigator.userAgent;if(!(/iPhone|iPad|iPod/.test(navigator.platform)&&/OS [1-5]_[0-9_]* like Mac OS X/i.test(b)&&b.indexOf("AppleWebKit")>-1))return;var c=a.document;if(!c.querySelector)return;var d=c.querySelector("meta[name=viewport]"),e=d&&d.getAttribute("content"),f=e+",maximum-scale=1",g=e+",maximum-scale=10",h=!0,i,j,k,l;if(!d)return;a.addEventListener("orientationchange",m,!1),a.addEventListener("devicemotion",o,!1)})(this); 

// Event timeline generation.
(function($) {
  "use strict";

  // Parse a date in yyyy-mm-dd hh:mm format.
  var parseDate = function parseDate(input) {
    var parts = input.match(/(\d+)/g);
    // new Date(year, month [, date [, hours[, minutes[, seconds[, ms]]]]])
    return new Date(parts[0], parts[1]-1, parts[2], parts[3], parts[4]); // months are 0-based
  }

  var events = [],
      dates = [],
      now = new Date(),
      nextEvent;

  var processEvent = function processEvent() {
    var event = { dates: [] },
        $event = $(this),
        eventType = $event.data("event-type");

    event.el = this;
    event.name = $event.find(".event-name").text();
    event.name = event.name.charAt(0).toUpperCase() + event.name.slice(1);
    event.quote = $event.find("h1").first().text();
    event.time = $event.find("footer p time").attr("datetime");
    event.id = $event.attr("id");

    $event.find(".dates li").each(function() {
      var date = { elClass: "date" },
          $date = $(this),
          $time_elements = $date.find("time");

      date.date = $time_elements.first().attr("datetime");
      if ($time_elements.length > 1) {
        date.time = $time_elements.last().attr("datetime");
      }
      else {
        date.time = event.time || "00:00";
      }
      date.dateObject = parseDate(date.date + " " + date.time);
      date.dateName = $time_elements.first().text();
      date.event = event;
      date.elClass += " event-type-" + eventType;

      if (date.dateObject > now) {
        date.elClass += " upcoming";
        if (!nextEvent || nextEvent.dateObject > date.dateObject) {
          nextEvent = date;
        }
      }
      else {
        date.elClass += " passed";
      }

      event.dates.push(date);
      dates.push(date);
    });

    events.push(event);

    // Sort the dates.
    dates.sort(function(a, b) {
      a = a.dateObject;
      b = b.dateObject;
      return a < b ? -1 : a > b ? 1 : 0;
    });

  }

  // Process the event content on page load.
  $(document).ready(function() {
    var $timeline,
        $navLinks = $('#navigation a');

    $(".main").find("#walks article.event-description")
      .data("event-type", "walk")
      .each(processEvent);
    $(".main").find("#excursions article.event-description")
      .data("event-type", "excursion")
      .each(processEvent);

    if (nextEvent) {
      nextEvent.elClass += " next-event";
    }

    // Render and insert the timeline template.
    $("#timeline_tmpl").after(tmpl("timeline_tmpl", { dates: dates }));
    $timeline = $("#timeline")

    // Insert the 'today' marker.
    var todayVars = {
      year: now.getFullYear(),
      month: ("0" + (now.getMonth() + 1)).slice(-2),
      day: ("0" + now.getDate()).slice(-2)
    }
    $timeline.find(".next-event").before(tmpl("today_tmpl", todayVars ));

    // Handle navigation.
    $navLinks.first().addClass('active');

    var navigate = function navigate() {
      $navLinks.removeClass('active');
      $('section').hide();
      switch (window.location.hash) {
        case '#vandringar':
          $('#walks-intro, #walks, #excursions').show();
          $navLinks.filter('[href="#vandringar"]').addClass('active');
          break;
        case '#anita':
          $('#about').show();
          $navLinks.filter('[href="#anita"]').addClass('active');
          break;
        default:
          $timeline.show();
          $navLinks.first().addClass('active');
      }
    }

    // Trigge navigation on load and hashchange.
    navigate();
    if ("onhashchange" in window) {
      window.onhashchange = navigate;
    }

    // Handle date descriptions.
    var showDate = function showDate(link) {
      var $date = $(link).parents("li.date"),
          $event = $($(link).attr("href")),
          $closeLink;

      $closeLink = $('<a class="close-button" href="#">Stäng</a>')
        .click(function(e) {
          $timeline.find(".date").removeClass("active");
          hideDates();
          e.preventDefault();
        });

      $timeline.find(".date").removeClass("active");
      $date
        .addClass("active")
        .find(".description")
          .html($event[0].outerHTML)
          .append($closeLink)
          .addClass('visible');
    }

    var hideDates = function hideDates() {
      var $description = $timeline.find(".date:not(.active) .description");
      $description.removeClass('visible');
      setTimeout(function() {
        $description.text("");
      }, 400);
    }

    $timeline.find("li.date a").on("click", function(e) {
      showDate(this);
      hideDates();
      e.preventDefault();
    });

  });
})(jQuery)

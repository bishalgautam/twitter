!function(t,n){"use strict";// GAZ is defined in gazebo.js is loaded very early on so
// it will not break the original code.
// gazebo.js is only included in the customer facing pages
// while this file is included everywhere.
// You can expect the following function to be accessible
// anytime unless your JS file is included before this file.
var e=t.GAZ||{};/**
   * Html escaping from hogan.js
   */
e.hoganEscape=function(t){var n=/&/g,e=/</g,r=/>/g,i=/\'/g,a=/\"/g,l=/[&<>\"\']/;return t=String(null===t||void 0===t?"":t),l.test(t)?t.replace(n,"&amp;").replace(e,"&lt;").replace(r,"&gt;").replace(i,"&#39;").replace(a,"&quot;"):t},e.loadDrupalSettings=function(){var t=n("#drupal-settings");if(t.length>0){var e=n.parseJSON(t.html());jQuery.extend(Drupal.settings,e)}},e.initializePrintButton=function(){n(".btn-print").click(function(n){n.preventDefault(),t.print()})},//Get a parameter value from the URL
e.getUrlQueryParamValue=function(n){var e,r,i=t.location.search.substring(1),a=i.split("&");for(e=0;e<a.length;e++)if(r=a[e].split("="),r[0]==n)return r[1];return!1},// moved here from init so Drupal.settings are available during page load
e.loadDrupalSettings(),n(document).ready(function(){e.initializePrintButton()}),t.GAZ=e}(window,jQuery);;

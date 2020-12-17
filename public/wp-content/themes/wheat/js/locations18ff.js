(function ($, window, document, undefined) {

'use strict';

$(function () {

  HTMLElement.prototype.removeClass = function(remove) {
    var newClassName = "";
    var i;
    var classes = this.className.split(" ");
    for(i = 0; i < classes.length; i++) {
      if(classes[i] !== remove) {
        newClassName += classes[i] + " ";
      }
    }
    this.className = newClassName;
  }

  // ---------------------------------------------------------------------------
  // Custom Dropdown
  // -------------------------------------------------------------------------
  function DropDown(el) {
    this.dd = el;
    this.placeholder = this.dd.children('span');
    this.opts = this.dd.find('ul.dropdown > li');
    this.val = '';
    this.index = -1;

    // methods
    this.initEvents = function() {
      var obj = this;

      obj.dd.on('click', function(event){
        $(this).toggleClass('active');
        return false;
      });

      obj.opts.on('click',function(){
        var opt = $(this);
        obj.val = opt.text();
        obj.index = opt.index();
        obj.placeholder.text(obj.val);

        $(el).trigger('drop-click', [this])
      });
    };
    this.getValue = function() {
      return this.val;
    };
    this.getIndex = function() {
      return this.index;
    };

    this.initEvents();
  }

  // initialize new dropdown object
  $(function() {
    var dd = new DropDown( $('#dd') );
    $(document).click(function() {
      // all dropdowns
      $('.da-wrapper-dropdown').removeClass('active');
    });
  });

  // ---------------------------------------------------------------------------
  // Lists functions
  // ---------------------------------------------------------------------------
  function hideAllLists() {
    $('.da-list').addClass('hidden');
  }

  function showList(list) {
    $(list).removeClass('hidden');
  }

  function unselectAllFeatures() {
    $('.da-toggle-input').attr('checked', false);
    $('.da-list').addClass('hidden');
  }

  function setToggleFeature(feature) {
    var feature_slug = '';
    var list_class = '';

    if (feature == '#toggle-branch') {
      feature_slug = 'branch';
      list_class = '.branch-list';
    } else if (feature == '#toggle-trust') {
      feature_slug = 'trust';
      list_class = '.trust-list';
    } else if (feature == '#toggle-atm') {
      feature_slug = 'atm';
      list_class = '.atm-list';
    }

    // turn of other lists (THERE CAN ONLY BE ONE!!!)
    unselectAllFeatures();
    hideAllLists();

    // set the button for the feature being shown
    $(feature).attr('checked', true);

    // show the right list
    showList(list_class);

    // update the map to match
    updateMap(feature_slug);
  }

  function centerMapOnLocation(elm, map, zoomLevel){
    var elmLat = parseFloat(elm.attr('data-lat'));
    var elmLng = parseFloat(elm.attr('data-lng'));
    var zoom = zoomLevel;

    map.setZoom(zoom);
    map.panTo({ lat: elmLat, lng: elmLng + 0.01 });

    for (var i = mapMarkers.length - 1; i >= 0; i--) {
      var markerLat = mapMarkers[i].position.lat();
      var markerLng = mapMarkers[i].position.lng();

      if (markerLat == elmLat) {
        if(markerLng == elmLng) {
          infowindow.setContent(mapMarkers[i].html.cloneNode(true));
          infowindow.open(indMap, mapMarkers[i]);
        }
      }
    }
  }

  function hideAllErrors() {
    $('.location-empty').addClass('hidden');
  }

  function showAllListItems() {
    $('.da-list .location-item').removeClass('hidden');
  }

  function clearZipFilter() {
    $('#da-zip').val('');
  }

  function clearCityFilter() {
      var dropdownLabel = $('.da-dropdown-label')
      var defaultValue = dropdownLabel.attr('data-default');
      // set label to default
      dropdownLabel.text(defaultValue);
  }


  function geoCodeZip(submittedZip, callback) {
    indGeocoder.geocode({'address': submittedZip}, function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        callback(results);
      } else {
        console.log('geocode unsuccessful: ' + status);
      }
    });
  }

  function checkForEmptyLists(items) {
    items.each(function() {
      var activeCount = $(this).find('.location-item').not('.hidden').length;
      if (activeCount < 1) {
        // if 0 show error message to list
        $(this).find('.location-empty').removeClass('hidden');
      }
    });
  }

  function filterByCity(data) {
    // reset zip filter
    clearZipFilter();

    var allLists = $('.da-list');
    var listItems = allLists.find('.location-item');

    // see which list is active
    var showingLists = allLists.not('.hidden');
    var activeList = '';
    
    $.each( showingLists, function ( index, element ) {
	    
	    activeList = $( element ).attr('data-list-type');
	    
    });
    
    // check for reset
    var isDefault = $(data).find('a').hasClass('da-dropdwon-default');
    if (isDefault) {
      // clear city filter
      clearCityFilter();

      // clear all errors
      hideAllErrors();

      // show all list items
      showAllListItems();
    } else {
      // get selected city
      var selectedCity = $(data).find('a').text();

      // show all items in lists
      showAllListItems();

      // hide items in list that do not match city
      listItems.each(function () {
        var listItemCity = $(this).attr('data-city');

        if (listItemCity !== selectedCity) {
          $(this).addClass('hidden');
        } else {
          // do nothing
        }
      });

      // hide all error messages
      hideAllErrors();

      // toggle errors message if necessary
      checkForEmptyLists(allLists);
    }
    // rebuild marker array & map (function may need updating to only show visible row items)
    if (data.classList.value === "atm-only") {
      setToggleFeature('#toggle-atm');
    }
    
    updateMap(activeList);
  }

  function filterByZip(self) {
    // reset city filter
    clearCityFilter();

    var allLists = $('.da-list');
    var listItems = allLists.find('.location-item');

    // see which list is active
    var showingLists = allLists.not('.hidden');
    var activeList = '';
    
    $.each( showingLists, function ( index, element ) {
	    
	    activeList = $( element ).attr('data-list-type');
	    
    });

    // turn off all errors
    hideAllErrors();

    // show all list items
    showAllListItems();

    // validate zip code to 5 digits
    var submittedZip = $(self).find('#da-zip').val().trim();
    var regexp = /^(?:\d{5})$/m // exactly 5 digits
    var isZipValid = (submittedZip.match(regexp) ? true : false);

    if(isZipValid == false){
      // empty zip filter
      clearZipFilter();

      // run the map update function
      updateMap(activeList);
    } else {
      var radius = 25 * 1600; //converts miles to meters, thanks Obama!!!

      // geocode zip
      geoCodeZip(submittedZip, function(results){
        var locationLat = results[0].geometry.location.lat();
        var locationLng = results[0].geometry.location.lng();
        var zipLocation = new google.maps.LatLng(locationLat, locationLng);

        listItems.each(function(){
          // get lat and lng for item
          var itemLat = $(this).attr('data-lat');
          var itemLng = $(this).attr('data-lng');
          var itemLocation = new google.maps.LatLng(parseFloat(itemLat),parseFloat(itemLng) );

          // see if it is in the radius
          var distance = distanceBetween(zipLocation, itemLocation);
          if(distance >= radius) {
            $(this).addClass('hidden');
          }
        });

        // toggle errors message if necessary
        checkForEmptyLists(allLists);

        // run the map update function
        updateMap(activeList);
      }); // end of ajax call
    }
  }

  // -------------------------------------------------------------------------
  // event listeners
  // -------------------------------------------------------------------------

  // filter by city
  $(window).on('drop-click', function(e, data){
    filterByCity(data);
  });

  // filter by zip
  $('#da-filter-zip').on('submit', function(e){
    // stop form submit
    e.preventDefault();
    filterByZip(this);
  });

  // toggle lists
  $('#toggle-branch').on('click', function(){
    setToggleFeature('#toggle-branch');
  });
  $('#toggle-atm').on('click', function(){
    setToggleFeature('#toggle-atm');
  });
  $('#toggle-trust').on('click', function(){
    setToggleFeature('#toggle-trust');
  });

  // center map on list item
  $('.location-item').on('click',function(){
    centerMapOnLocation($(this), indMap, 15);
  });

  // -----------------------------------------------------------------------------
  // start the page off with banking locations visible
  // -----------------------------------------------------------------------------
  $('#toggle-branch').click();

  /*
	
	BEGIN - RPS Added get geolocation
	  
  */
  
	if (navigator.geolocation) {
		var container = $( '.da-filter-group.filter-zip' );
		
		$( '<a />', {
			
			class: 'dashicons dashicons-location',
			style: 'float:right; color: #FFF; margin-top: -25px; cursor: pointer;',
			click: function() {
				
				navigator.geolocation.getCurrentPosition( showPosition );
				
			}
			
		}).appendTo( container );
		
	}
	
	function showPosition( position ) {
				
		$.getJSON(
			'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + position.coords.latitude + ',' + position.coords.longitude + '&key=AIzaSyBgy2Jm5Deb9JpqUqhp4yn5X20nL24Pz44&result_type=postal_code',
			function( data ) {
				
				if ( data.results.length > 0 ) {
					
					var found = false;
										
					$.each( data.results[0].address_components,  function ( index, result ) {
												
						if ( result.types[0] == 'postal_code' ) {
							
							$( '#da-zip' ).val( result.long_name );				
							$( '#da-filter-zip' ).submit();
							
							found = true;
							
						}
						
					});
					
					if ( !found ) {
						
						alert( 'Cannot get location' );
						
					}
					
				}
				
			}
		);
		
	}
  /*
	
	END - RPS Added get geolocation
	  
  */

});
})(jQuery, window, document);


// -----------------------------------------------------------------------------
// Google Maps Stuffs
// -----------------------------------------------------------------------------
function distanceBetween(loc1, loc2) {
  var distance = google.maps.geometry.spherical.computeDistanceBetween(loc1, loc2);
  return distance;
}

function prepareMapMarkers(feature) {
  // eat the info windows from active list items
  var selector = "." + feature + "-list .location-item:not(.hidden) .map-info-content";
  
  if ( feature == 'atm' ) {
	  
	  selector += ", .branch-list .location-item:not(.hidden) .map-info-content";
	  selector += ", .trust-list .location-item:not(.hidden) .map-info-content";
	  
  }
    
  var windows = document.querySelectorAll( selector );

  // make bankLocations array
  var bankLocations = []
  for (var i = windows.length - 1; i >= 0; i--) {
    var name = windows[i].getAttribute('data-title');
    var winLat = parseFloat(windows[i].getAttribute('data-lat'));
    var winLng = parseFloat(windows[i].getAttribute('data-lng'));
    var typeAtm = windows[i].getAttribute('data-atm');
    var typeBranch = windows[i].getAttribute('data-branch');
    var typeTrust = windows[i].getAttribute('data-trust-department');
    var typeAllpoint =  windows[i].getAttribute('data-allpoint');
    var type = '';

    // order matters here don't $@^& with it
    if (typeAtm) {
	    
	    if ( typeAllpoint ) {
		    type = 'allpoint';
	    } else {
			type = 'atm';
	    }
	    
    }
    if (typeBranch) {
      type = 'branch';
    }
    if (typeTrust) {
      type = 'trust';
    }

    // make a copy of the html for google map infowindow
    var clone = windows[i].cloneNode(true);
    clone.removeClass('hidden')

    // add this the array for output
    bankLocations.push([name, winLat, winLng, clone, type]);
  };

  return bankLocations;
}

// RPS - Implement startsWith for IE - from: https://stackoverflow.com/questions/30867172/code-not-running-in-ie-11-works-fine-in-chrome/30867255

if (!String.prototype.startsWith) {
	String.prototype.startsWith = function(searchString, position) {
		position = position || 0;
		return this.indexOf(searchString, position) === position;
	};
}

function addMarker(map, place, mapMarkers, timeout) {
  window.setTimeout(function(){

    // add markers to map
    var pinATM = "/wp-content/themes/wheat/img/map-pin-atm.png";
    var pinATMAllpoint = "/wp-content/themes/wheat/img/map-pin-atm-allpoint-2.png";
    var pinBranch = "/wp-content/themes/wheat/img/map-pin-branch.png";
    var pinTrust = "/wp-content/themes/wheat/img/map-pin-trust.png";

    var sites = place;
    var siteLatLng = new google.maps.LatLng(sites[1], sites[2]);
    var pinType = sites[4];
    var pinImage = '';

	var siteTitle = sites[0];

    // prep icon
    if (pinType == "trust") {
      pinImage = pinTrust;
    } else if (pinType == "atm") {
		pinImage = pinATM;
    } else if (pinType == "allpoint") {
		pinImage = pinATMAllpoint;
    } else if (pinType == "branch") {
      pinImage = pinBranch;
    }

    // pin icon on map
    var icon = {
      url: pinImage,
      size: new google.maps.Size(60, 60),       // 60x60 pixels
      scaledSize: new google.maps.Size(60, 60),
      origin: new google.maps.Point(0, 0),      // set origin
      anchor: new google.maps.Point(30, 60)     // offset by x == 30px y == 60px
    };

    // prepare marker
    var marker = new google.maps.Marker({
      position: siteLatLng,
      map: map,
      title: sites[0],
      html: sites[3],
      animation: google.maps.Animation.DROP,
      icon: icon
    });

    // add marker to map
    mapMarkers.push(marker);

    // add infowindow click events
    var contentString = "Some content";
    google.maps.event.addListener(marker, "click", function () {
      infowindow.setContent(this.html);
      infowindow.open(map, this);
    });

  }, timeout);
}

function autoCenter() {
  // check for markers
  if(mapMarkers.length < 1) {
    indMap.panTo({ lat: 37.8393332, lng: -84.2700179 }); // kentucky
    indMap.setZoom(8);
    return;
  }

  // Create a new viewpoint bound & extend for each marker
  var bounds = new google.maps.LatLngBounds();

  for (var i = mapMarkers.length - 1; i >= 0; i--) {
    bounds.extend(mapMarkers[i].position);
  };

  // Fit these bounds to the map
  indMap.fitBounds(bounds);

  // zoom out
  indMap.setZoom(indMap.zoom - 1);

  // prepare offset pan to allows for ui on page
  var panOffset;
  var currentZoom = indMap.zoom;
  switch (true) {
    case (currentZoom == 7):
      panOffset = 2;
      break;
    case (currentZoom == 8):
      panOffset = 1;
      break;
    case (currentZoom == 9):
      panOffset = 0.5;
      break;
    case (currentZoom == 10):
      panOffset = 0.25;
      break;
    case (currentZoom == 11):
      panOffset = 0.125;
      break;
    case (currentZoom == 12):
      panOffset = 0.09;
      break;
    case (currentZoom == 13):
      panOffset = 0.0625;
      break;
    case (currentZoom == 14):
      panOffset = 0.03;
      break;
    case (currentZoom == 15):
      panOffset = 0.025;
      break;
    case (currentZoom > 15):
      panOffset = 0.001;
      break;
    default:
      panOffset = 0;
  }

  // pan map with proper offset depending on zoom level
  indMap.panTo({lat:indMap.center.lat(), lng: indMap.center.lng() + panOffset});
}

function clearAllMarkers() {
  for (var i = mapMarkers.length - 1; i >= 0; i--) {
    mapMarkers.pop().setMap(null);
  }
}

function addMarkersToMap(markers) {
  var delay = 10;
  var callbackDelay = delay * (markers.length + 1);

  // add markers to map with cascade
  for (var i = markers.length - 1; i >= 0; i--) {
    addMarker(indMap, markers[i], mapMarkers, delay * (i+1));
  };

  // center map based on markers
  // gotsta by a timeout to let the cascade finish
  window.setTimeout(function(){
    autoCenter();
  }, callbackDelay);
}

function updateMap(feature) {
  clearAllMarkers();
  addMarkersToMap(prepareMapMarkers(feature));
}

// google map theme
var mapStyles = [{
  "featureType": "water",
    "elementType": "geometry.fill",
    "stylers": [
      {"color": "#466290"}
    ]
}, {
  "featureType": "landscape",
  "elementType": "geometry.fill",
  "stylers": [{
    "visibility": "on"
  }, {
    "color": "#ffffff"
  }]
}, {
  "featureType": "poi",
  "stylers": [{
    "visibility": "off"
  }]
}, {
  "featureType": "road.highway",
  "stylers": [{
    "visibility": "on"
  }, {
    "color": "#e3daca"
  }]
}, {
  "featureType": "road",
  "elementType": "labels.icon",
  "stylers": [{
    "visibility": "on"
  }, {
    "color": "#ca634d"
  }]
}, {
  "featureType": "road",
  "elementType": "labels.text.fill",
  "stylers": [{
    "visibility": "on"
  }, {
    "color": "#000000"
  }]
}, {
  "featureType": "water",
  "elementType": "labels.icon",
  "stylers": [{
    "visibility": "on"
  }]
}, {
  "featureType": "administrative",
  "elementType": "labels.text.fill",
  "stylers": [{
    "visibility": "on"
  }, {
    "color": "#466290"
  }]
}, {
  "featureType": "road",
  "elementType": "labels.icon",
  "stylers": [{
    "visibility": "on"
  }, {
    "color": "#808080"
  }]
}, {
  "featureType": "road",
  "elementType": "geometry.fill",
  "stylers": [{
    "visibility": "on"
  }, {
    "color": "#e3daca"
  }]
}, {
  "featureType": "transit",
  "stylers": [
    { "visibility": "off" }
  ]
}, {
  "featureType": "road",
  "elementType": "labels.icon",
  "stylers": [{
    "visibility": "off"
  }]
}];

// allow map to be draggable on touch devices
if (!Modernizr.touchevents) {
  var isDraggable = true;
} else {
  var isDraggable = false;
}

function initMap() {
  // Create a map object and specify the DOM element for display.
  indMap = new google.maps.Map(document.getElementById('da-map-canvas'), {
    scrollwheel: false,
    disableDefaultUI: true,
    draggable: isDraggable,
    zoomControl: true,
    zoomControlOptions: {
        position: google.maps.ControlPosition.TOP_LEFT
    },
    panControl: true,
    center: { lat: 37.8393332, lng: -84.2700179 }, // kentucky
    styles: mapStyles,
    minZoom: 6,
    maxZoom: 18,
    zoom: 8
  });

  // array to store markers
  mapMarkers = [];

  // adds place holder for infowindow
  infowindow = new google.maps.InfoWindow({
    content: "loading..."
  });

  // make geocoder
  indGeocoder = new google.maps.Geocoder();

  // make circle for radius
  indCircle = null;
}

// -----------------------------------------------------------------------------
// get this show on the road
// -----------------------------------------------------------------------------
initMap();

'use strict';

var canClick = [false, false, false];
var cluesFound = [false, false, false];
var clueIndex = 0;
var tempHotspots = [];
var activeSceneList = ['0-scene-1', '0-scene-2', '0-scene-3'];
var frameQty = [9, 8, 7, 8, 6, 8, 6, 8, 8];
var frameInterval;


// Get the viewer's underlying DragControlMethod instance for mouse drag.
// var mouseViewDrag = viewer.controls().method('mouseViewDrag').instance;
// var touchView = viewer.controls().method('touchView').instance;
var dragControlMethod = viewer.controls().method('mouseViewDrag').instance;

// clue 1
tempHotspots[0] = scenes[0].marzipanoObject.hotspotContainer().createHotspot(document.querySelector("#clue-1"), {
    yaw: -0.2,
    pitch: 0.06
});

// clue 2
tempHotspots[1] = scenes[1].marzipanoObject.hotspotContainer().createHotspot(document.querySelector("#clue-2"), {
    yaw: 3.1,
    pitch: 0.00
});

// clue 3
tempHotspots[2] = scenes[2].marzipanoObject.hotspotContainer().createHotspot(document.querySelector("#clue-3"), {
    yaw: -2.8,
    pitch: -0.1
});

function abs_360(value, min, max) {
  if (value < min) { return max + (value - min); }
  if (value > max) { return min + (value - max); }

  return value;
}

function is_in_range(current_x, hotspot, region_range) {
  var min_360 = -3.14;
  var max_360 = 3.14;
  var region_min = abs_360(hotspot - region_range, min_360, max_360);
  var region_max = abs_360(hotspot + region_range, min_360, max_360);

  if (region_min < region_max) { // inside range
    if (current_x < region_max && current_x > region_min) {
      return true;
    }
  } else { // outside range
    if ((current_x > region_min && current_x <= max_360) || (current_x < region_max && current_x >= min_360)) {
      return true;
    }
    // if ((current_x > region_min && current_x < max_360) || (current_x < region_max && current_x > min_360)) { return true; }
  }

  return false;
}

function generate_random_number(region) {
  var max = 0;
  var min = 0;

  switch ( region ) {
    case 6:
      min = 0.1;
      max = 1.5;
      break;
    case 5:
      min = 1.6;
      max = 2.5;
      break;
    case 4:
      min = 2.6;
      max = 3.5;
      break;
    case 3:
      min = 3.6;
      max = 4.5;
      break;
    case 2:
      min = 4.6;
      max = 4.9;
      break;
  }

  return (Math.random() * (max-min)+min).toFixed(1);
}

var region_1_range = 0.4;
var region_2_range = 1;
var region_3_range = 1.6;
var region_4_range = 2.2;
var region_5_range = 2.8;

var throttle = function(callback, limit) {
    var wait = false;                  // Initially, we're not waiting
    return function () {               // We return a throttled function
        if (!wait) {                   // If we're not waiting
            callback.call();           // Execute users function
            wait = true;               // Prevent future invocations
            setTimeout(function () {   // After a period of time
                wait = false;          // And allow future invocations
            }, limit);
        }
    }
}

var viewChangeThrottled = throttle(function() {
  // Get the current viewport dimensions
  var size = activeScene.marzipanoObject.view().size();

  var activeSceneIdx = activeSceneList.indexOf(activeScene.data.id);

  var panning_x = (activeScene.marzipanoObject.view().yaw()).toFixed(2);
  var hotspot_x = tempHotspots[activeSceneIdx].position().yaw;

  if ( is_in_range( panning_x, hotspot_x, region_1_range ) ) {
    //  region 1, at the max region, 5 lights
    $('.emf__visual').attr('class', 'emf__visual is-region-1');
    canClick[activeSceneIdx] = true;

    if(!cluesFound[activeSceneIdx]) {
      showPanoCenter();
    }

    $('.emf__reader > span.num').html('Max');

    if ( !$('.emf__reader > span.static').hasClass('hidden') ) {
      $('.emf__reader > span.static').addClass('hidden');
    }

  } else if ( is_in_range( panning_x, hotspot_x, region_2_range ) ) {
    //  region 2, 4 lights blink 1
    $('.emf__visual').attr('class', 'emf__visual is-region-2');
    canClick[activeSceneIdx] = false;
    hidePanoCenter();
    $('.emf__reader > span.num').html(generate_random_number(2));

    if ( $('.emf__reader > span.static').hasClass('hidden') ) {
      $('.emf__reader > span.static').removeClass('hidden');
    }

  } else if ( is_in_range( panning_x, hotspot_x, region_3_range ) ) {
    //  region 3, 3 lights blink 1
    $('.emf__visual').attr('class', 'emf__visual is-region-3');
    canClick[activeSceneIdx] = false;
    hidePanoCenter();
    $('.emf__reader > span.num').html(generate_random_number(3));

    if ( $('.emf__reader > span.static').hasClass('hidden') ) {
      $('.emf__reader > span.static').removeClass('hidden');
    }

  } else if ( is_in_range( panning_x, hotspot_x, region_4_range )) {
    //  region 4, 2 lights blink 1
    $('.emf__visual').attr('class', 'emf__visual is-region-4');
    canClick[activeSceneIdx] = false;
    hidePanoCenter();
    $('.emf__reader > span.num').html(generate_random_number(4));

    if ( $('.emf__reader > span.static').hasClass('hidden') ) {
      $('.emf__reader > span.static').removeClass('hidden');
    }

  } else if ( is_in_range( panning_x, hotspot_x, region_5_range )) {
    //  region 5, 1 light blink 1
    $('.emf__visual').attr('class', 'emf__visual is-region-5');
    canClick[activeSceneIdx] = false;
    hidePanoCenter();
    $('.emf__reader > span.num').html(generate_random_number(5));

    if ( $('.emf__reader > span.static').hasClass('hidden') ) {
      $('.emf__reader > span.static').removeClass('hidden');
    }

  } else {
    //  region 6, 1 light stagnant
    $('.emf__visual').attr('class', 'emf__visual is-region-6');
    canClick[activeSceneIdx] = false;
    hidePanoCenter();

    $('.emf__reader > span.num').html(generate_random_number(6));

    if ( $('.emf__reader > span.static').hasClass('hidden') ) {
      $('.emf__reader > span.static').removeClass('hidden');
    }

  }
}, 250);

scenes.map(function(scene){
  var view = scene.marzipanoObject.view();
  view.addEventListener('change', viewChangeThrottled);
});


var showPanoCenter = function() {
  $( ".panoCenter" ).fadeIn( "slow", "swing", function() {
    // Animation complete
  });
}

var hidePanoCenter = function() {
  $( ".panoCenter" ).fadeOut( "slow", "swing", function() {
    // Animation complete
  });
}

$('.panoCenter').click(function(e) {
    var activeSceneIdx = activeSceneList.indexOf(activeScene.data.id);
    if (canClick[activeSceneIdx] && !cluesFound[activeSceneIdx]) {
        $('#cluePlaceholder').show();
        $('#cluePlaceholder > .closeButtonRed').show();
        $('#cluePlaceholder > img').attr('src', 'img/photo_clue_' + (activeSceneIdx + 1) + '.png');
        // $('.panoCenter').hide();
        $('.empMeter').attr('src', 'img/emf_1.png');
        canClick[activeSceneIdx] = false;
        cluesFound[activeSceneIdx] = true;

        hidePanoCenter();
    }
});

$('#cluePlaceholder > .closeButtonRed').click(function(e) {
    $('#cluePlaceholder').animate({
        height: '20px',
        width: '20px',
        top: '85%',
        left: '90%',
    }, 400, function() {
        $('.cluesCtr').show();
        $(this).hide();
        $('#cluePlaceholder > img').attr('src', '');
        $('#cluePlaceholder').attr('style', '');
        $('#cluePlaceholder').addClass('cluePlaceholder');
    });
});

var showPage = function(newPage) {
    $(newPage).fadeIn();
}

var hidePage = function(page) {
    $(page).fadeOut();
}

var showClues = function() {
    var allCluesFound = 0;
    $('#pageClues > .closeButtonRed').show();
    showPage('#pageClues');
    for (var i = 0; i < 3; i++) {
        if (cluesFound[i]) {
            var tempDom = $('#pageClues > div > img');
            $(tempDom[i]).attr('src', 'img/photo_clue_' + (i + 1) + '.png');
            allCluesFound++;
        }
    }
    $('#pageClues > .closeButtonRed').click(function(e) {
        $('.fadePage').fadeOut();
        $('#pageClues').hide();
    });

    if (allCluesFound == 3) {
        $('#pageClues > div > .btnBlood').addClass('active');
        $('#pageClues > div > .btnBlood.active').click(function(e) {
            hidePage('#pageClues');
            showPage('#pageGuessName');
        });
    }

    // hidePage( '.fadePage' );
    // hidePage( '#pageClues' );
    // showPage( '#pageGuessName' );
    // $( '#pageGuessName' ).show();
}


function animatePontianakError(triesLeft, haveWaiting) {

    clearInterval(frameInterval);

    $('.pontianakBox div').fadeOut(800);
    var pontianakIdx = ((5 - triesLeft) * 2) + 1;
    $('.pontianak' + pontianakIdx).show();
    var element = document.querySelector('.pontianak' + pontianakIdx);
    var sprite = new Motio(element, {
        fps: 8,
        frames: frameQty[pontianakIdx - 1]
    });
    // sprite.play(); // start animation
    sprite.to((frameQty[pontianakIdx - 1] - 1));
    if (typeof haveWaiting != 'undefined' && haveWaiting == true) {
      setTimeout(function() {
        $('.pontianak' + pontianakIdx).hide();
        $('.pontianak' + (pontianakIdx + 1)).show();
        frameInterval = setInterval(function() {
            var element = document.querySelector('.pontianak' + (pontianakIdx + 1));
            var sprite = new Motio(element, {
                fps: 8,
                frames: frameQty[pontianakIdx]
            });
            sprite.to((frameQty[pontianakIdx] - 1));
        }, 8000);
      }, 1200);
    }

    // $( '.pontianak' + pontianakIdx ).sprite({
    /*
        no_of_frames: frameQty[ pontianakIdx - 1 ],
        fps: 8,
        play_frames: frameQty[ pontianakIdx - 1 ]
    });
    */
}

function animatePontianakSpecial() {
    $('.pontianakSpecial').show();
    var element = document.querySelector('.pontianakSpecial');
    var sprite = new Motio(element, {
        fps: 8,
        frames: 8
    });
    sprite.to(7);
}

function animatePontianakWaiting(triesLeft) {
    /*
    console.log( 'animating pontianak WAITING: ' + triesLeft );
    var pontianakIdx = ( ( 5 - triesLeft ) * 2 ) + 2;
    console.log( 'pontianak index:'  + pontianakIdx );
    // $( '.pontianak' + ( pontianakIdx - 1 )).fadeOut( 500 );
    $( '.pontianakBox div' ).hide();
    $( '.pontianak' + pontianakIdx ).show();
    $( '.pontianak' + pontianakIdx ).sprite({
        no_of_frames: frameQty[ pontianakIdx - 1 ],
        fps: 4
    });
    */
}

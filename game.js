'use strict';

var canClick = [false, false, false, true, true];
var cluesFound = [false, false, false, true, true];
var clueIndex = 0;
var tempHotspots = [];
var activeSceneList = ['0-scene-1', '0-scene-2', '0-scene-3'];
var frameQty = [12, 6, 6, 6, 6, 6, 6, 6, 6];

var frameInterval;

// Get the viewer's underlying DragControlMethod instance for mouse drag.
// var mouseViewDrag = viewer.controls().method('mouseViewDrag').instance;
// var touchView = viewer.controls().method('touchView').instance;
// var dragControlMethod = viewer.controls().method('mouseViewDrag').instance;

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

//  fake clues
//  @ scene 1
tempHotspots[3] = scenes[0].marzipanoObject.hotspotContainer().createHotspot(document.querySelector("#clue-4"), {
    yaw: 2.2,
    pitch: 0.0
});

tempHotspots[4] = scenes[2].marzipanoObject.hotspotContainer().createHotspot(document.querySelector("#clue-5"), {
    yaw: 2.1,
    pitch: 0.0
});

function abs_360(value, min, max) {
    if (value < min) {
        return max + (value - min);
    }
    if (value > max) {
        return min + (value - max);
    }

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

    switch (region) {
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

    return (Math.random() * (max - min) + min).toFixed(1);
}

var region_1_range = 0.4;
var region_2_range = 1;
var region_3_range = 1.6;
var region_4_range = 2.2;
var region_5_range = 2.8;

var throttle = function(callback, limit) {
    var wait = false; // Initially, we're not waiting
    return function() { // We return a throttled function
        if (!wait) { // If we're not waiting
            callback.call(); // Execute users function
            wait = true; // Prevent future invocations
            setTimeout(function() { // After a period of time
                wait = false; // And allow future invocations
            }, limit);
        }
    }
}

var fake_hotspot = 0;

var viewChangeThrottled = throttle(function() {
    // Get the current viewport dimensions
    // var size = activeScene.marzipanoObject.view().size();

    var activeSceneIdx = activeSceneList.indexOf(activeScene.data.id);

    var panning_x = (activeScene.marzipanoObject.view().yaw()).toFixed(2);
    var hotspot_x = tempHotspots[activeSceneIdx].position().yaw;

    //  EMF AND REAL CLUES
    if (!cluesFound[activeSceneIdx]) {
        if ( is_in_range(panning_x, hotspot_x, region_1_range) ) {
            //  region 1, at the max region, 5 lights
            $('.emf__visual').attr('class', 'emf__visual is-region-1');

            if (!cluesFound[activeSceneIdx]) {
                canClick[activeSceneIdx] = true;
                showPanoCenter();
            }

            $('.emf__reader > span.num').html('Max');

            if (!$('.emf__reader > span.static').hasClass('hidden')) {
                $('.emf__reader > span.static').addClass('hidden');
            }

        } else if ( is_in_range(panning_x, hotspot_x, region_2_range) ) {
            //  region 2, 4 lights blink 1
            $('.emf__visual').attr('class', 'emf__visual is-region-2');
            canClick[activeSceneIdx] = false;
            hidePanoCenter();
            $('.emf__reader > span.num').html(generate_random_number(2));

            if ($('.emf__reader > span.static').hasClass('hidden')) {
                $('.emf__reader > span.static').removeClass('hidden');
            }

        } else if ( is_in_range(panning_x, hotspot_x, region_3_range) ) {
            //  region 3, 3 lights blink 1
            $('.emf__visual').attr('class', 'emf__visual is-region-3');
            canClick[activeSceneIdx] = false;
            hidePanoCenter();
            $('.emf__reader > span.num').html(generate_random_number(3));

            if ($('.emf__reader > span.static').hasClass('hidden')) {
                $('.emf__reader > span.static').removeClass('hidden');
            }

        } else if (is_in_range(panning_x, hotspot_x, region_4_range)) {
            //  region 4, 2 lights blink 1
            $('.emf__visual').attr('class', 'emf__visual is-region-4');
            canClick[activeSceneIdx] = false;
            hidePanoCenter();
            $('.emf__reader > span.num').html(generate_random_number(4));

            if ($('.emf__reader > span.static').hasClass('hidden')) {
                $('.emf__reader > span.static').removeClass('hidden');
            }

        } else if (is_in_range(panning_x, hotspot_x, region_5_range)) {
            //  region 5, 1 light blink 1
            $('.emf__visual').attr('class', 'emf__visual is-region-5');
            canClick[activeSceneIdx] = false;
            hidePanoCenter();
            $('.emf__reader > span.num').html(generate_random_number(5));

            if ($('.emf__reader > span.static').hasClass('hidden')) {
                $('.emf__reader > span.static').removeClass('hidden');
            }

        } else {
            //  region 6, 1 light stagnant
            $('.emf__visual').attr('class', 'emf__visual is-region-6');
            canClick[activeSceneIdx] = false;
            hidePanoCenter();

            $('.emf__reader > span.num').html(generate_random_number(6));

            if ($('.emf__reader > span.static').hasClass('hidden')) {
                $('.emf__reader > span.static').removeClass('hidden');
            }

        }
    } else {

        //  CLUE HAS BEEN FOUND FOR THIS SCENE
        $('.emf__visual').attr('class', 'emf__visual is-region-5');

        $('.emf__reader > span.num').html(generate_random_number(5));

        if ($('.emf__reader > span.static').hasClass('hidden')) {
            $('.emf__reader > span.static').removeClass('hidden');
        }

    }



    //  FAKE CLUES
    if (activeSceneIdx == 0) {
        //  scene 1 fake clue
        fake_hotspot = tempHotspots[3].position().yaw;

        if (panning_x > 1.7 && panning_x < 2.6) {
            if (canClick[3]) {
                showFakeClue();
            }

        }
    }

    if (activeSceneIdx == 2) {
        //  scene 3 fake clue
        fake_hotspot = tempHotspots[4].position().yaw;

        if (panning_x > 1.7 && panning_x < 2.6) {
            if (canClick[4]) {
                showFakeClue();
            }
        }
    }

}, 250);

scenes.map(function(scene) {
    var view = scene.marzipanoObject.view();
    view.addEventListener('change', viewChangeThrottled);
});

var showPanoCenter = function() {
    $(".realclue .panoCenter").fadeIn("slow", "swing", function() {
        // Animation complete
    });
}

var hidePanoCenter = function() {
    $(".realclue .panoCenter").fadeOut("slow", "swing", function() {
        // Animation complete
    });
}

var showFakeClue = function() {
    $(".fakeclue .panoCenter").fadeIn("slow", "swing", function() {
        // Animation complete
    });
}

var hideFakeClue = function() {
    $(".fakeclue .panoCenter").fadeOut("slow", "swing", function() {
        // Animation complete
    });
}

$('.clue').on('click touchstart', '.panoCenter', function(e) {

    // var activeSceneIdx = activeSceneList.indexOf(activeScene.data.id);

    playSfx( 'take-photo' );

    var clueId = $(this).data('clue-id');

    if ( canClick[clueId - 1] ) {
      if ( !cluesFound[clueId - 1]) {
          //  FOUND REAL CLUES AND STILL AVAILABLE
          $('.emf__visual').attr('class', 'emf__visual is-region-5');
          $('.emf__reader > span.num').html(generate_random_number(5));
          $('.emf__reader > span.static').removeClass('hidden');

          $('#cluePlaceholder').fadeIn(function() {
              $(this).addClass('active-clue-placeholder');
          });
          $('#cluePlaceholder > .closeButtonRed').show();
          $('#cluePlaceholder > img').attr('src', 'img/photo_clue_' + clueId + '.jpg');

          canClick[clueId - 1] = false;
          cluesFound[clueId - 1] = true;

          hidePanoCenter();

          if ( cluesFound[0] && cluesFound[1] && cluesFound[2] ) {
            $('#cluePlaceholder').find('.finale-copy').addClass('active');
          }

      } else {
        //  FOUND FAKE CLUES
          canClick[clueId - 1] = false;
          $('#cluePlaceholder').fadeIn(function() {
              $(this).addClass('active-clue-placeholder');

              setTimeout(function(){
                $('#cluePlaceholder').animate({
                  opacity: 0,
                  width: $('#cluePlaceholder').width()/2,
                  height: $('#cluePlaceholder').height()/2,
                },
                400,
                function() {
                  $(this).hide();
                  $('#cluePlaceholder > img').attr('src', '');
                  $('#cluePlaceholder').attr('style', '');
                  $(this).removeClass('active-clue-placeholder');
                  $('#cluePlaceholder').removeClass('fakeClue');
                }
                );
              }, 1500);
          });

          $('#cluePlaceholder').addClass('fakeClue');
          $('#cluePlaceholder > .closeButtonRed').hide();
          //$('#cluePlaceholder > .closeButtonRed').show();
          // $('#cluePlaceholder > img').attr('src', "img/scene-0-props/photo_clue_' + (activeSceneIdx + 1) + '.jpg");
          $('#cluePlaceholder > img').attr('src', 'img/photo_clue_' + clueId + '.jpg');

          hideFakeClue();
      }

    }


});


$('#pano').on('click touchstart', function() {

    if ($('#cluePlaceholder').hasClass('active-clue-placeholder')) {
        $('#cluePlaceholder > .closeButtonRed').click();
    }

});

$('#cluePlaceholder').on('click', '.closeButtonRed', function(e) {

    if (!$('#cluePlaceholder').hasClass('fakeClue')) {



        $('#cluePlaceholder').animate({
            height: '20px',
            width: '20px',
            top: '85%',
            left: '90%',
        }, 400, function() {
            // $('.cluesCtr').show();
            $(this).hide();
            $('#cluePlaceholder > img').attr('src', '');
            $('#cluePlaceholder').attr('style', '');
            $('#cluePlaceholder').addClass('cluePlaceholder');
            $('#cluePlaceholder').removeClass('active-clue-placeholder');
        });

    }



});

$('#cluePlaceholder').on('click', '.btnBlood.active', function(e) {
    hidePage('#cluePlaceholder');
    showPage('#pageGuessName');
});


var showPage = function(newPage) {
    $(newPage).fadeIn();
}

var hidePage = function(page) {
    $(page).fadeOut();
}

var showClues = function() {
    var allCluesFound = 0;
    $('#pageClues .closeButtonRed').show();
    showPage('#pageClues');
    for (var i = 0; i < 3; i++) {
        if (cluesFound[i]) {
            var tempDom = $('#pageClues .clues img');
            $(tempDom[i]).attr('src', 'img/photo_clue_' + (i + 1) + '.jpg');
            allCluesFound++;
        }
    }
    $('#pageClues').on('click touchstart', '.closeButtonRed', function(e) {
        // $('.fadePage').fadeOut();
        $('#pageClues').hide();
    });

    $('#pageClues').on('click touchstart', '.clue-overlay', function(e) {
        // $('.fadePage').fadeOut();
        $('#pageClues').hide();
    });

    if (allCluesFound == 3) {
        $('#pageClues .btnBlood').addClass('active');
        // $('#pageClues .btnBlood.active').click(function(e) {
        //     hidePage('#pageClues');
        //     showPage('#pageGuessName');
        // });

        $('#pageClues').on('click touchstart', '.btnBlood.active', function(e) {
            hidePage('#pageClues');
            showPage('#pageGuessName');
        });
    }

    initSlick();

    // hidePage( '.fadePage' );
    // hidePage( '#pageClues' );
    // showPage( '#pageGuessName' );
    // $( '#pageGuessName' ).show();
}

function initSlick() {
    $('#pageClues .clues').slick({
        slidesToShow: 1,
        swipeToSlide: true,
        centerMode: true,
        infinite: false,
        arrows: false,
        mobileFirst: true,
        centerPadding: "40px",
        responsive: [{
            breakpoint: 600,
            settings: "unslick"

        }]
    }).slick('slickGoTo', '0', true);
}


function AnimateSprite(el, frameWidth, frameHeight, numCols, totalFrame, duration, currentFrameNo, onAnimateEnd) {
    if (!el || el.length == 0) return;

    var repeatAnimate = el.data('is-repeat') != undefined ? el.data('is-repeat') : 0;
    var tl = new TimelineMax({
        onComplete: animateEnd,
        repeat: repeatAnimate,
        repeatDelay: 1
    });

    for (var i = 0, numRows = Math.ceil(totalFrame / numCols); i < numRows; i++) {

        var numFrames = Math.min(numCols, totalFrame - (i * numCols)),
            steppedEase = new SteppedEase(numFrames - 1);

        tl.append(TweenMax.fromTo(
            el, duration, {
                backgroundPosition: '0 -' + (frameHeight * i) + 'px'
            }, {
                backgroundPosition: '-' + (frameWidth * (numFrames - 1)) + 'px -' + (frameHeight * i) + 'px',
                ease: steppedEase,
                immediateRender: false
            }
        ));
    }

    function animateEnd() {

        //when animation done, enable the pontianak to shiver
        if (typeof onAnimateEnd == 'function') {
            onAnimateEnd(currentFrameNo);
        }
    }

};

var triggerIdlePontianak;

function enableEnterButton(pontianakIdx) {
    $('#pageGuessName').find('.btnBlood').addClass('active');

    clearTimeout(triggerIdlePontianak);

    if (pontianakIdx != 9) {

        var nextFrameIndex = pontianakIdx + 1;

        triggerIdlePontianak = setTimeout(function() {
            $('.pontianakBox > div').hide();
            // $('.pontianak' + pontianakIdx).hide();
            $('.pontianak' + (nextFrameIndex)).show();

            clearInterval(frameInterval);

            frameInterval = setInterval(function() {
                //  waiting pontianak shivers
                AnimateSprite($('.pontianak' + nextFrameIndex), 640, 800, 3, frameQty[pontianakIdx], 0.15, pontianakIdx, function() {
                    clearInterval(frameInterval);
                });
            }, 5000);

        }, 1200);

    }

}

function animatePontianakError(triesLeft, haveWaiting) {

    $('.pontianakBox > div').hide();
    // $('.pontianak' + pontianakIdx-1).hide();
    var pontianakIdx = ((5 - triesLeft) * 2) + 1;

    $('.pontianak' + pontianakIdx).show();


    if (pontianakIdx == 9) {
        $('.guess-overlay').addClass('active');
        $('#pageGuessName').find('.single-column').hide();
        $('#pageGuessName').addClass('bg-hide');
        $('#pageGuessName .cluesCtr').hide();
    }

    if (pontianakIdx == 0) {
        AnimateSprite($('.pontianak' + pontianakIdx), 640, 800, 3, frameQty[pontianakIdx - 1], 0.2);
    } else {

        if (Modernizr.mq('(max-width: 480px)')) {
            AnimateSprite($('.pontianak' + pontianakIdx), 480, 635, 4, 16, 0.3);
        } else if (Modernizr.mq('(max-width: 769px)')) {
            AnimateSprite($('.pontianak' + pontianakIdx), 768, 1020, 4, 16, 0.3);
        } else {
            $('#pageGuessName').find('.btnBlood').removeClass('active');

            AnimateSprite($('.pontianak' + pontianakIdx), 640, 800, 3, frameQty[pontianakIdx - 1], 0.15, pontianakIdx, enableEnterButton);
        }

    }

}

function animatePontianakSpecial() {
    $('.pontianakSpecial').show();

    if (Modernizr.mq('(max-width: 480px)')) {

        AnimateSprite($('.pontianak' + pontianakIdx), 480, 635, 4, 16, 0.3);

    } else if (Modernizr.mq('(max-width: 769px)')) {

        AnimateSprite($('.pontianak' + pontianakIdx), 768, 1020, 4, 16, 0.3);

    } else {

        AnimateSprite($('.pontianakSpecial'), 640, 800, 3, 6, 0.15);

    }
}
var sfx = {};
sfx[ 'enter-game' ] = new Howl({
    src: [ 'audio/mp3/0100_ambient_background_loop_creepy_drone_wind_1_01.mp3'],
    loop: true
});

sfx[ 'take-photo' ] = new Howl({
    src: ['audio/mp3/takephoto.mp3', 'audio/ogg/takephoto_01.ogg']
});
sfx[ 'jump-scare' ] = new Howl({
    src: ['audio/mp3/jumpscare.mp3', 'audio/ogg/jumpscare_01.ogg']
});
sfx[ 'pon-appear' ] = new Howl({
    src: ['audio/mp3/pon_appear.mp3', 'audio/ogg/pon_appear_01.ogg']
});
sfx[ 'pon-dash' ] = new Howl({
    src: ['audio/mp3/pon_dash.mp3', 'audio/ogg/pon_dash_01.ogg']
});
sfx[ 'user-fails' ] = new Howl({
    src: ['audio/mp3/0100_ambient_background_loop_creepy_drone_wind_1_01.mp3', '0100_ambient_background_loop_creepy_drone_wind_1_01_01.ogg']
});

function playSfx(param) {
    console.log( param );
    sfx[ param ].play();
}
/*
    var folder = 'desktop';
    var extension = '.mp3';
    if (Modernizr.mq('(max-width: 769px)')) {
        folder = 'mobile';
        extension = '.ogg';
    }

    console.log( folder, extension );

    switch (param) {
        case 'enter-game':
            //TODO:: disable sound for now
            var snd1 = new Audio();
            var src1 = document.createElement("source");
            src1.type = "audio/mpeg";
            src1.src = "audio/" + folder + "/bgm" + extension;
            snd1.appendChild(src1);
            snd1.play();

            // document.getElementById("audio").innerHTML = "<embed src='audio/Bgm.mp3' autostart='true' loop='false' volume='100' hidden='true'>";
            break;
        case 'take-photo':
            var snd2 = new Audio();
            var src2 = document.createElement("source");
            src2.type = "audio/mpeg";
            src2.src = "audio/" + folder + "/takephoto" + extension;
            snd2.appendChild(src2);
            snd2.play();
            // document.getElementById("audio").innerHTML = "<embed src='audio/takephoto.mp3'  autostart='true' loop='false' volume='100' hidden='true'>";
            break;
        case 'jump-scare':
            var snd3 = new Audio();
            var src3 = document.createElement("source");
            src3.type = "audio/mpeg";
            src3.src = "audio/" + folder + "/jumpscare" + extension;
            snd3.appendChild(src3);
            snd3.play();
            // document.getElementById("audio").innerHTML = "<embed src='audio/jumpscare.mp3'  autostart='true' loop='false' volume='100' hidden='true'>";
            break;
        case 'pon-appear':
            var snd4 = new Audio();
            var src4 = document.createElement("source");
            src4.type = "audio/mpeg";
            src4.src = "audio/" + folder + "/pon_appear" + extension;
            snd4.appendChild(src4);
            snd4.play();
            // document.getElementById("audio").innerHTML = "<embed src='audio/pon_appear.mp3'  autostart='true' loop='false' volume='100' hidden='true'>";
            break;
        case 'pon-dash':
            var snd5 = new Audio();
            var src5 = document.createElement("source");
            src5.type = "audio/mpeg";
            src5.src = "audio/" + folder + "/pon_dash" + extension;
            snd5.appendChild(src5);
            snd5.play();
            // document.getElementById("audio").innerHTML = "<embed src='audio/pon_dash.mp3'  autostart='true' loop='false' volume='100' hidden='true'>";
            break;
        case 'user-fails':
            var snd6 = new Audio();
            var src6 = document.createElement("source");
            src6.type = "audio/mpeg";
            src6.src = "audio/" + folder + "/0016_piano_horror_alerted_d" + extension;
            snd6.appendChild(src6);
            snd6.play();
            // document.getElementById("audio").innerHTML = "<embed src='audio/0016_piano_horror_alerted_d.mp3'  autostart='true' loop='false' volume='100' hidden='true'>";
            break;

        default:
    }

    return true;
}
*/

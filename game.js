'use strict';

var canClick = false;
var clueIndex = 1;

// Get the viewer's underlying DragControlMethod instance for mouse drag.
var dragControlMethod = viewer.controls().method('mouseViewDrag').instance;

var tempHotspot = activeScene.marzipanoObject.hotspotContainer().createHotspot(document.querySelector("#clue-1"), {
    yaw: 1.4,
    pitch: 0.06
});

// tempHotspot.hide();

// Listen for the end of a drag.
dragControlMethod.addEventListener( 'parameterDynamics' , function(e) {
    canClick = false;
    // Get the current viewport dimensions
    var size = activeScene.marzipanoObject.view().size();

    // Transform the hotspot coordinates into screen coordinates.
    var screen = activeScene.marzipanoObject.view().coordinatesToScreen({
        yaw: tempHotspot.position().yaw,
        pitch: tempHotspot.position().pitch
    });

    // Check whether the hotspot is within regionSize pixels of the screen center.

    if (screen) {
        if (
            Math.abs(screen.x - size.width / 2) < 50 &&
            Math.abs(screen.y - size.height / 2) < 100
        ) {
            $('.empMeter').attr( 'src', 'img/emf_5.png');
            canClick = true;
        }
        else if (
            Math.abs(screen.x - size.width / 2) < 70 &&
            Math.abs(screen.y - size.height / 2) < 120
        ) {
            $('.empMeter').attr( 'src', 'img/emf_4.png');
        } else if (
            Math.abs(screen.x - size.width / 2) < 100  &&
            Math.abs(screen.y - size.height / 2) < 150
        ) {
            $('.empMeter').attr( 'src', 'img/emf_3.png');
        } else if (
            Math.abs(screen.x - size.width / 2) < 130 &&
            Math.abs(screen.y - size.height / 2) < 180
        ) {
            $('.empMeter').attr( 'src', 'img/emf_2.png');
        } else {
            $('.empMeter').attr( 'src', 'img/emf_1.png');
        }
    } else {
        $('.empMeter').attr( 'src', 'img/emf_1.png');
        canClick = false;
    }
});

$('.panoCenter').click(function(e) {
    if (canClick) {
        $( '#cluePlaceholder' ).attr( 'src', 'img/photo_clue_' + clueIndex + '.png' );
        clueIndex++;
    }
});

// $('.cluesCtr').click(function() {
//     console.log( 'here ');
//     $('#fade-wrapper').fadeIn();
// });
// $('#fade-wrapper').click(function() {
//     $(this).fadeOut();
// });

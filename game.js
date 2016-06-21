'use strict';

var canClick = false;

// Get the viewer's underlying DragControlMethod instance for mouse drag.
var dragControlMethod = viewer.controls().method('mouseViewDrag').instance;

var tempHotspot = activeScene.marzipanoObject.hotspotContainer().createHotspot(document.querySelector("#textInfo"), {
    yaw: 0.1,
    pitch: -0.24
});

tempHotspot.hide();

// Listen for the end of a drag.
dragControlMethod.addEventListener('parameterDynamics', function(e) {
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
            Math.abs(screen.x - size.width / 2) < 100 / 2 &&
            Math.abs(screen.y - size.height / 2) < 400 / 2
        ) {
            $('.empMeter').html('MAX');
            canClick = true;
        } else if (
            Math.abs(screen.x - size.width / 2) < 200 / 2 &&
            Math.abs(screen.y - size.height / 2) < 400 / 2
        ) {
            $('.empMeter').html('3');
        } else if (
            Math.abs(screen.x - size.width / 2) < 300 / 2 &&
            Math.abs(screen.y - size.height / 2) < 400 / 2
        ) {
            $('.empMeter').html('2');
        } else if (
            Math.abs(screen.x - size.width / 2) < 400 / 2 &&
            Math.abs(screen.y - size.height / 2) < 400 / 2
        ) {
            $('.empMeter').html('1');
        } else {
            tempHotspot.hide();
        }
    } else {
        tempHotspot.hide();
    }
});

$('.panoCenter').click(function(e) {
    if (canClick) {
        tempHotspot.show();
    }
});

// $('.cluesCtr').click(function() {
//     console.log( 'here ');
//     $('#fade-wrapper').fadeIn();
// });
// $('#fade-wrapper').click(function() {
//     $(this).fadeOut();
// });

'use strict';

var canClick        = [ false, false, false ];
var clueIndex       = 0;
var tempHotspots    = [];
var activeSceneList = [ '0-scene-1', '0-scene-2', '0-scene-3' ];

var activeSceneId = activeScene.data.id;

// Get the viewer's underlying DragControlMethod instance for mouse drag.
var dragControlMethod = viewer.controls().method('mouseViewDrag').instance;

// clue 1
var tempHotspot[ activeSceneId ] = scenes[ 0 ].marzipanoObject.hotspotContainer().createHotspot(document.querySelector("#clue-1"), {
    yaw: 1.4,
    pitch: 0.06
});


// switch 1
/*
var position = {
    yaw: Math.PI / 4,
    pitch: Math.PI / 8
};

activeScene.marzipanoObject.hotspotContainer().createHotspot(document.querySelector("#switch-1"), position);
*/

// tempHotspot.hide();
// Listen for the end of a drag.
dragControlMethod.addEventListener('inactive', function(e) {
    // Get the current viewport dimensions
    var size = activeScene.marzipanoObject.view().size();

    console.log( activeScene.data );

    // Transform the hotspot coordinates into screen coordinates.
    var screen = activeScene.marzipanoObject.view().coordinatesToScreen({
        yaw: tempHotspot.position().yaw,
        pitch: tempHotspot.position().pitch
    });

    // Check whether the hotspot is within regionSize pixels of the screen center.
    if (screen) {
        var
            xDistance = Math.abs(screen.x - size.width / 2),
            yDistance = Math.abs(screen.y - size.height / 2);

        if (xDistance < 50 && yDistance < 100) {
            $('.empMeter').attr('src', 'img/emf_5.png');
            canClick[clueIndex] = true;
            $('.panoCenter').show();
        } else if (xDistance < 70 && yDistance < 120) {
            $('.empMeter').attr('src', 'img/emf_4.png');
            canClick[clueIndex] = false;
            $('.panoCenter').hide();
        } else if (xDistance < 100 && yDistance < 150) {
            $('.empMeter').attr('src', 'img/emf_3.png');
            canClick[clueIndex] = false;
            $('.panoCenter').hide();
        } else if (xDistance < 130 && yDistance < 180) {
            $('.empMeter').attr('src', 'img/emf_2.png');
            canClick[clueIndex] = false;
            $('.panoCenter').hide();
        } else {
            $('.empMeter').attr('src', 'img/emf_1.png');
            canClick[clueIndex] = false;
            $('.panoCenter').hide();
        }
    }
});

$('.panoCenter').click(function(e) {
    if (canClick[clueIndex]) {
        $('#cluePlaceholder').show();
        $('#cluePlaceholder > .closeButtonRed').show();
        $('#cluePlaceholder > img').attr('src', 'img/photo_clue_' + (clueIndex + 1) + '.png');
        $('.panoCenter').hide();
        if (clueIndex < 2) {
            clueIndex++;
        }
    }
});

$('#cluePlaceholder > .closeButtonRed').click(function(e) {
    $('#cluePlaceholder').animate({
        height: '20px',
        width: '20px',
        top: '85%',
        left: '90%',
    }, 400, function() {
        $(this).hide();
        $('#cluePlaceholder > img').attr('src', '');
    });
});

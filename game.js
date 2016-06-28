'use strict';

var canClick        = [ false, false, false ];
var cluesFound      = [ false, false, false ];
var clueIndex       = 0;
var tempHotspots    = [];
var activeSceneList = [ '0-scene-1', '0-scene-2', '0-scene-3' ];

// Get the viewer's underlying DragControlMethod instance for mouse drag.
var dragControlMethod = viewer.controls().method('mouseViewDrag').instance;

// clue 1
tempHotspots[ 0 ] = scenes[ 0 ].marzipanoObject.hotspotContainer().createHotspot(document.querySelector("#clue-1"), {
    yaw: 1.4,
    pitch: 0.06
});

// clue 2
tempHotspots[ 1 ] = scenes[ 1 ].marzipanoObject.hotspotContainer().createHotspot(document.querySelector("#clue-2"), {
    yaw: -1.92,
    pitch: -0.10
});

// clue 3
tempHotspots[ 2 ] = scenes[ 2 ].marzipanoObject.hotspotContainer().createHotspot(document.querySelector("#clue-3"), {
    yaw: 1.9,
    pitch: 0.00
});

// Listen for the end of a drag.
dragControlMethod.addEventListener('inactive', function(e) {

    // Get the current viewport dimensions
    var size = activeScene.marzipanoObject.view().size();

    var activeSceneIdx = activeSceneList.indexOf( activeScene.data.id );

    // Transform the hotspot coordinates into screen coordinates.
    var screen = activeScene.marzipanoObject.view().coordinatesToScreen({
        yaw: tempHotspots[ activeSceneIdx ].position().yaw,
        pitch: tempHotspots[ activeSceneIdx ].position().pitch
    });

    // Check whether the hotspot is within regionSize pixels of the screen center.
    if (screen) {
        var
            xDistance = Math.abs(screen.x - size.width / 2),
            yDistance = Math.abs(screen.y - size.height / 2);

        if (xDistance < 50 && yDistance < 100) {
            $('.empMeter').attr('src', 'img/emf_5.png');
            canClick[ activeSceneIdx ] = true;
            $('.panoCenter').show();
        } else if (xDistance < 70 && yDistance < 120) {
            $('.empMeter').attr('src', 'img/emf_4.png');
            canClick[ activeSceneIdx ] = false;
            $('.panoCenter').hide();
        } else if (xDistance < 100 && yDistance < 150) {
            $('.empMeter').attr('src', 'img/emf_3.png');
            canClick[ activeSceneIdx ] = false;
            $('.panoCenter').hide();
        } else if (xDistance < 130 && yDistance < 180) {
            $('.empMeter').attr('src', 'img/emf_2.png');
            canClick[ activeSceneIdx ] = false;
            $('.panoCenter').hide();
        } else {
            $('.empMeter').attr('src', 'img/emf_1.png');
            canClick[  activeSceneIdx  ] = false;
            $('.panoCenter').hide();
        }
    }
});

$('.panoCenter').click(function(e) {
    var activeSceneIdx = activeSceneList.indexOf( activeScene.data.id );
    if ( canClick[ activeSceneIdx ] && !cluesFound[ activeSceneIdx ] ) {
        $('#cluePlaceholder').show();
        $('#cluePlaceholder > .closeButtonRed').show();
        $('#cluePlaceholder > img').attr('src', 'img/photo_clue_' + (activeSceneIdx + 1) + '.png');
        $('.panoCenter').hide();
        $('.empMeter').attr('src', 'img/emf_1.png');
        canClick[  activeSceneIdx  ] = false;
        cluesFound[ activeSceneIdx ] = true;
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
        $( '#cluePlaceholder').attr( 'style', '' );
        $( '#cluePlaceholder' ).addClass( 'cluePlaceholder' );
    });
});

var showPage = function( oldPage, newPage ) {
    if ( oldPage != '' ) {
        $( oldPage ).fadeOut();
    }
    $( newPage ).fadeIn();
}

var hidePage = function( page ) {
    $( page ).fadeOut();
}

var showClues = function() {
    for ( var i = 0; i < 3; i++ )
    {
        if ( cluesFound[ i ] ) {
            var temp = $( '.cluePics > div' );
            $( temp[ i ] ).append( '<img src="img/photo_clue_' + ( i + 1 ) + '.png">' );
        }
    }
}

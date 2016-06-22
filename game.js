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
dragControlMethod.addEventListener( 'inactive' , function(e) {
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
        var
            xDistance = Math.abs(screen.x - size.width / 2),
            yDistance = Math.abs(screen.y - size.height / 2);

        if ( xDistance < 50 && yDistance < 100 ) {
            $('.empMeter').attr( 'src', 'img/emf_5.png');
            canClick = true;
            $( '.panoCenter' ).show();
        }
        else if ( xDistance < 70 && yDistance < 120 ) {
            $('.empMeter').attr( 'src', 'img/emf_4.png');
            canClick = false;
            $( '.panoCenter' ).hide();
        }
        else if ( xDistance < 100 && yDistance < 150 ) {
            $('.empMeter').attr( 'src', 'img/emf_3.png');
            canClick = false;
            $( '.panoCenter' ).hide();
        }
        else if ( xDistance < 130 && yDistance < 180 ) {
            $('.empMeter').attr( 'src', 'img/emf_2.png');
            canClick = false;
            $( '.panoCenter' ).hide();
        }
        else {
            $('.empMeter').attr( 'src', 'img/emf_1.png');
            canClick = false;
            $( '.panoCenter' ).hide();
        }
    }
    // else {
    //     $('.empMeter').attr( 'src', 'img/emf_1.png');
    //     canClick = false;
    // }
});

$('.panoCenter').click(function(e) {
    if (canClick) {
        console.log( 'here' );
        $( '#cluePlaceholder' ).show();
        $( '#cluePlaceholder > .closeButtonRed' ).show();
        $( '#cluePlaceholder > img' ).attr( 'src', 'img/photo_clue_' + clueIndex + '.png' );
    }
});

$( '#cluePlaceholder > .closeButtonRed' ).click( function( e ) {
    // $( '#cluePlaceholder' ).hide();
    // $( '#cluePlaceholder > .closeButtonRed' ).hide();

    $( '#cluePlaceholder' ).animate({
       height: '20px',
       width: '20px',
       top: '85%',
       left: '85%',
   }, 450, function(){
       $( this ).hide();
       $( '#cluePlaceholder > img' ).attr( 'src', '' );
   });
});

// $('.cluesCtr').click(function() {
//     console.log( 'here ');
//     $('#fade-wrapper').fadeIn();
// });
// $('#fade-wrapper').click(function() {
//     $(this).fadeOut();
// });

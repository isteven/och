'use strict';

var canClick = [false, false, false];
var cluesFound = [false, false, false];
var clueIndex = 0;
var tempHotspots = [];
var activeSceneList = ['0-scene-1', '0-scene-2', '0-scene-3'];
var frameQty = [9, 8, 7, 8, 6, 8, 6, 8, 8];

// Get the viewer's underlying DragControlMethod instance for mouse drag.
var dragControlMethod = viewer.controls().method('mouseViewDrag').instance;

// clue 1
tempHotspots[0] = scenes[0].marzipanoObject.hotspotContainer().createHotspot(document.querySelector("#clue-1"), {
    yaw: -0.2,
    pitch: 0.06
});

// clue 2
tempHotspots[1] = scenes[1].marzipanoObject.hotspotContainer().createHotspot(document.querySelector("#clue-2"), {
    yaw: -3.52,
    pitch: -0.10
});

// clue 3
tempHotspots[2] = scenes[2].marzipanoObject.hotspotContainer().createHotspot(document.querySelector("#clue-3"), {
    yaw: 1.1,
    pitch: 0.00
});

// Listen for the end of a drag.
dragControlMethod.addEventListener('inactive', function(e) {

    // Get the current viewport dimensions
    var size = activeScene.marzipanoObject.view().size();

    var activeSceneIdx = activeSceneList.indexOf(activeScene.data.id);

    // Transform the hotspot coordinates into screen coordinates.
    var screen = activeScene.marzipanoObject.view().coordinatesToScreen({
        yaw: tempHotspots[activeSceneIdx].position().yaw,
        pitch: tempHotspots[activeSceneIdx].position().pitch
    });

    // Check whether the hotspot is within regionSize pixels of the screen center.
    if (screen) {
        var
            xDistance = Math.abs(screen.x - size.width / 2),
            yDistance = Math.abs(screen.y - size.height / 2);

        if (xDistance < 50 && yDistance < 100) {
            $('.empMeter').attr('src', 'img/emf_5.png');
            canClick[activeSceneIdx] = true;
            $('.panoCenter').show();
        } else if (xDistance < 70 && yDistance < 120) {
            $('.empMeter').attr('src', 'img/emf_4.png');
            canClick[activeSceneIdx] = false;
            $('.panoCenter').hide();
        } else if (xDistance < 100 && yDistance < 150) {
            $('.empMeter').attr('src', 'img/emf_3.png');
            canClick[activeSceneIdx] = false;
            $('.panoCenter').hide();
        } else if (xDistance < 130 && yDistance < 180) {
            $('.empMeter').attr('src', 'img/emf_2.png');
            canClick[activeSceneIdx] = false;
            $('.panoCenter').hide();
        } else {
            $('.empMeter').attr('src', 'img/emf_1.png');
            canClick[activeSceneIdx] = false;
            $('.panoCenter').hide();
        }
    }
});

$('.panoCenter').click(function(e) {
    var activeSceneIdx = activeSceneList.indexOf(activeScene.data.id);
    if (canClick[activeSceneIdx] && !cluesFound[activeSceneIdx]) {
        $('#cluePlaceholder').show();
        $('#cluePlaceholder > .closeButtonRed').show();
        $('#cluePlaceholder > img').attr('src', 'img/photo_clue_' + (activeSceneIdx + 1) + '.png');
        $('.panoCenter').hide();
        $('.empMeter').attr('src', 'img/emf_1.png');
        canClick[activeSceneIdx] = false;
        cluesFound[activeSceneIdx] = true;
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
            var element = document.querySelector('.pontianak' + (pontianakIdx + 1));
            var sprite = new Motio(element, {
                fps: 8,
                frames: frameQty[pontianakIdx]
            });
            sprite.play();
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

/*
twttr.ready(
    function(twttr) {
        // bind events here
        // console.log( 'twitter OK');
        twttr.events.bind('tweet', function(event) {
            // do somethings here
            console.log(event);
            console.log("Tweet has been successfully posted");

            var dataToSend = {
                id          : null,
                game        : configGet.gameId,
                account     : 'twitter',
                user_name   : param.user_name,
                full_name   : param.full_name,
                time        : $scope.elapsedGameTime,
                email       : param.email,
                phone       : param.phone
            };

            $.ajax({
                    url: configGet('apiUrl') + '_laravel/game/submit',
                    data: dataToSend
                })
                .done(function(success) {
                    console.log( 'twitter to DB success');
                    console.log( success );
                }, function( error ) {
                    console.log( 'twitter to DB error');
                    console.log( error );
                });
        });
    }
);
*/

// var cb = new Codebird;
// cb.setConsumerKey("bMdqxrquEtL9EonAu1RVE9HUx", "BE38cy1eBrPapx5OjfdndB50Z9f84Zb23sFfcObOJgyKlRQHAC");
// cb.setConsumerKey("0zZsYGibxFLOYIH3FnBuEDO09", "qHvOA5YTjpdjZmGUFbV20Gtqb6QDnR5qYJpCnEmpUBlIQ7wDMW");
// cb.setToken("751326231979667456-HyMlzvEtutiqFX8i6ZWqv5ADCIKdpnD", "AFLoy87eJiqHzl0LzR9NS7cCmr79CNFZEP5AUJJ33oJwW");


// gets a request token
/*
cb.__call(
    "oauth_requestToken",
    {oauth_callback: "oob"},
    function (reply,rate,err) {
        if (err) {
            console.log("error response or timeout exceeded" + err.error);
        }
        if (reply) {
            // stores it
            cb.setToken(reply.oauth_token, reply.oauth_token_secret);

            // gets the authorize screen URL
            cb.__call(
                "oauth_authorize",
                {},
                function (auth_url) {
                    window.codebird_auth = window.open(auth_url);
                }
            );
        }
    }
);
*/
// cb.__call(
//     "statuses_update",
//     {"status": "Whohoo, I just tweeted!"},
//     function (reply, rate, err) {
//         console.log( reply );
//         console.log( rate );
//         console.log( err );
//     }
// );

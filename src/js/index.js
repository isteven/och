'use strict';

var Marzipano = window.Marzipano;
var APP_DATA = window.APP_DATA;
var activeScene = null;
var globalView = null;
var shownScare = false;
var timeoutID;

// Grab elements from DOM.
var panoElement = document.querySelector('#pano');

var AnimateSprite = function(el, frameWidth, frameHeight, numCols, totalFrame, duration, currentFrameNo, onAnimateEnd) {
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

var jumpScare = {
    scare: function(status) {
        $('#scare').show();
        $('.scare-overlay').addClass('active');
        playSfx('jump-scare');
        shownScare = true;

        if (Modernizr.mq('(max-width: 700px)')) {
            var element = document.querySelector('#scare');
            var sprite = new Motio(element, {
                fps: 18,
                frames: 10
            });
            sprite.to(9);

            sprite.on('frame', function(eventName) {
                if (this.frame == 9) {
                    $('#scare').hide();
                    $('.scare-overlay').removeClass('active');
                }
            });
        } else {
            AnimateSprite($('#scare'), 974, 1119, 5, 10, 0.5, 0, function() {
                $('#scare').hide();
                $('.scare-overlay').removeClass('active');
            });
        }


        this.timeoutID = undefined;
    },
    setup: function() {
        this.timeoutID = window.setTimeout(function(status) {
            this.scare(status);
        }.bind(this), 6000);
    },

    cancel: function() {
        window.clearTimeout(this.timeoutID);
        this.timeoutID = undefined;
    }
};

// Viewer options.
var viewerOpts = {
    controls: {
        mouseViewMode: APP_DATA.settings.mouseViewMode
    }
};

// Initialize viewer.
var viewer = new Marzipano.Viewer(panoElement, viewerOpts);

// Register the custom control method.
var deviceOrientationControlMethod = new DeviceOrientationControlMethod();
var controls = viewer.controls();
controls.registerMethod('deviceOrientation', deviceOrientationControlMethod);

// Enable custom control method
controls.enableMethod('deviceOrientation');

// Create scenes.
var scenes = APP_DATA.scenes.map(function(sceneData) {

  var source = Marzipano.ImageUrlSource.fromString(
      "../img/och/" + sceneData.id + "/{f}.jpg");
    // var source = Marzipano.ImageUrlSource.fromString(
    //     cdn_url+"/och/" + sceneData.id + "/{f}.jpg");

    // var geometry = new Marzipano.CubeGeometry(sceneData.levels);
    var geometry = new Marzipano.CubeGeometry([{
        tileSize: 1024,
        size: 1024
    }]);

    // var limiter = Marzipano.RectilinearView.limit.traditional(sceneData.faceSize, 100 * Math.PI / 180, 120 * Math.PI / 180);
    var limiter = Marzipano.RectilinearView.limit.traditional(1024, 100 * Math.PI / 180, 120 * Math.PI / 180);
    var view = new Marzipano.RectilinearView(sceneData.initialViewParameters, limiter);

    var marzipanoScene = viewer.createScene({
        source: source,
        geometry: geometry,
        view: view,
        pinFirstLevel: true
    });

    // Create link hotspots.
    sceneData.linkHotspots.forEach(function(hotspot) {
        var element = createLinkHotspotElement(hotspot);
        marzipanoScene.hotspotContainer().createHotspot(element, {
            yaw: hotspot.yaw,
            pitch: hotspot.pitch
        });
    });

    // Create Props hotspots.
    if (sceneData.propHotspots !== undefined) {
        sceneData.propHotspots.forEach(function(hotspot) {
            var element = createPropHotspotsElement(hotspot);
            marzipanoScene.hotspotContainer().createHotspot(element, {
                yaw: hotspot.yaw,
                pitch: hotspot.pitch
            }, {
                perspective: {
                    radius: hotspot.radius,
                    extraRotations: hotspot.extraRotations
                }
            });
        });
    }

    return {
        data: sceneData,
        marzipanoObject: marzipanoScene
    };
});

// Display the initial scene.
switchScene(scenes[0]);

function sanitize(s) {
    return s.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;');
}

var hasVisitedScareZone = false;

function switchScene(scene) {

    scene.marzipanoObject.switchTo();
    activeScene = scene;

    if (hasVisitedScareZone) {
        jumpScare.cancel(); //clear timeout for jumpscare
    }

    if (scene.data.id == '0-scene-1') {
        $('.prop-hotspot-light').addClass('active');
    } else {
        $('.prop-hotspot-light').removeClass('active');
    }

    //  JAC: hide jump scare for time being...
    if (scene.data.id == '0-scene-2' && !shownScare) {
        hasVisitedScareZone = true;
        jumpScare.setup();
    }
}

function createLinkHotspotElement(hotspot) {

    // Create wrapper element to hold icon and tooltip.
    var wrapper = document.createElement('div');
    wrapper.classList.add('hotspot');
    wrapper.classList.add('link-hotspot');

    // Create image element.
    var icon = document.createElement('img');
    icon.src = cdn_url+'/och/link.png';
    icon.classList.add('link-hotspot-icon');

    // Set rotation transform.
    var transformProperties = ['-ms-transform', '-webkit-transform', 'transform'];
    for (var i = 0; i < transformProperties.length; i++) {
        var property = transformProperties[i];
        icon.style[property] = 'rotate(' + hotspot.rotation + 'rad)';
    }

    // Add click event handler.
    wrapper.addEventListener('click', function() {
        switchScene(findSceneById(hotspot.target));
    });

    // Prevent touch and scroll events from reaching the parent element.
    // This prevents the view control logic from interfering with the hotspot.
    stopTouchAndScrollEventPropagation(wrapper);

    // Create tooltip element.
    var tooltip = document.createElement('div');
    // tooltip.classList.add('hotspot-tooltip');
    tooltip.classList.add('link-hotspot-tooltip');

    var tooltip_inner1 = document.createElement('span');
    var tooltip_inner2 = document.createElement('span');

    tooltip_inner1.innerHTML = findSceneDataById(hotspot.target).name;
    tooltip_inner1.className += 'hotspot__text__en';
    tooltip_inner2.innerHTML = findSceneDataById(hotspot.target).zh_name;
    tooltip_inner2.className += 'hotspot__text__zh';

    tooltip.appendChild(tooltip_inner1);
    tooltip.appendChild(tooltip_inner2);

    wrapper.appendChild(icon);
    wrapper.appendChild(tooltip);

    return wrapper;
}

function createPropHotspotsElement(hotspot) {

    // Create wrapper element to hold icon and hotspot_link_info.
    var wrapper = document.createElement('div');
    wrapper.className += 'hotspot prop-hotspot-light';

    var prop = document.createElement('div');
    prop.className += 'prop-inner';
    prop.style.backgroundImage = "url('" + hotspot.path + "')";
    prop.style.width = hotspot.width + "px";
    prop.style.height = hotspot.height + "px";

    var dataFrames = document.createAttribute('data-frames');
    dataFrames.value = hotspot.frames;
    wrapper.setAttributeNode(dataFrames);

    // Prevent touch and scroll events from reaching the parent element.
    // This prevents the view control logic from interfering with the hotspot.
    stopTouchAndScrollEventPropagation(wrapper);

    wrapper.appendChild(prop);

    return wrapper;
}

// Prevent touch and scroll events from reaching the parent element.
function stopTouchAndScrollEventPropagation(element, eventList) {
    var eventList = ['touchstart', 'touchmove', 'touchend', 'touchcancel',
        'wheel', 'mousewheel'
    ];
    for (var i = 0; i < eventList.length; i++) {
        element.addEventListener(eventList[i], function(event) {
            event.stopPropagation();
        });
    }
}

function findSceneById(id) {
    for (var i = 0; i < scenes.length; i++) {
        if (scenes[i].data.id === id) {
            return scenes[i];
        }
    }
    return null;
}

function findSceneDataById(id) {
    for (var i = 0; i < APP_DATA.scenes.length; i++) {
        if (APP_DATA.scenes[i].id === id) {
            return APP_DATA.scenes[i];
        }
    }
    return null;
}

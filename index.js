'use strict';

// (function() {
    var Marzipano   = window.Marzipano;
    var bowser      = window.bowser;
    var screenfull  = window.screenfull;
    var APP_DATA    = window.APP_DATA;
    var activeScene = null;
    var globalView  = null;
    var shownScare  = false;
    var timeoutID;

    // Grab elements from DOM.
    var panoElement             = document.querySelector('#pano');
    var sceneNameElement        = document.querySelector('#titleBar .sceneName');
    var sceneListElement        = document.querySelector('#sceneList');
    var sceneElements           = document.querySelectorAll('#sceneList .scene');
    var sceneListToggleElement  = document.querySelector('#sceneListToggle');
    var autorotateToggleElement = document.querySelector('#autorotateToggle');
    var fullscreenToggleElement = document.querySelector('#fullscreenToggle');


    // Detect whether we are on a touch device.
    document.body.classList.add('no-touch');
    window.addEventListener('touchstart', function() {
        document.body.classList.remove('no-touch');
        document.body.classList.add('touch');
    });

    // Use tooltip fallback mode on IE < 11.
    if (bowser.msie && parseFloat(bowser.version) < 11) {
        document.body.classList.add('tooltip-fallback');
    }

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
            "tiles/" + sceneData.id + "/{f}.jpg" );

        // var geometry = new Marzipano.CubeGeometry(sceneData.levels);
        var geometry = new Marzipano.CubeGeometry([{ tileSize: 1024, size: 1024 }]);

        // var limiter = Marzipano.RectilinearView.limit.traditional(sceneData.faceSize, 100 * Math.PI / 180, 120 * Math.PI / 180);
        var limiter = Marzipano.RectilinearView.limit.traditional(1024, 100*Math.PI/180, 120 * Math.PI / 180);
        var view = new Marzipano.RectilinearView(sceneData.initialViewParameters, limiter);

        var marzipanoScene = viewer.createScene({
            source: source,
            geometry: geometry,
            view: view,
            pinFirstLevel: true
        });
        // console.log( sceneData );
        // Create link hotspots.
        sceneData.linkHotspots.forEach(function(hotspot) {
            var element = createLinkHotspotElement(hotspot);
            marzipanoScene.hotspotContainer().createHotspot(element, {
                yaw: hotspot.yaw,
                pitch: hotspot.pitch
            });
        });

        // Create info hotspots.
        /*
        sceneData.infoHotspots.forEach(function(hotspot) {
            var element = createInfoHotspotElement(hotspot);
            marzipanoScene.hotspotContainer().createHotspot(element, {
                yaw: hotspot.yaw,
                pitch: hotspot.pitch
            });
        });
        */

        // Create Props hotspots.
        if( sceneData.propHotspots !== undefined ) {
          sceneData.propHotspots.forEach(function(hotspot) {
            var element = createPropHotspotsElement(hotspot);
            marzipanoScene.hotspotContainer().createHotspot(element,
              { yaw: hotspot.yaw, pitch: hotspot.pitch },
              {
                perspective:
                {
                  radius: hotspot.radius,
                  extraRotations: hotspot.extraRotations
                }
              }
            );
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

    var jumpScare = {
      scare: function(status) {
        $('#scare').show();
        $('.scare-overlay').addClass('active');
        playSfx( 'jump-scare' );
        var element = document.querySelector('#scare');
        var sprite = new Motio(element, {
            fps: 18,
            frames: 10
        });
        sprite.to(9);

        shownScare = true;

        sprite.on('frame', function(eventName){
          if ( this.frame == 9 ) {
            $('#scare').hide();
            $('.scare-overlay').removeClass('active');
          }
        });
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
    }

    function switchScene(scene) {

        scene.marzipanoObject.switchTo();
        activeScene = scene;

        if ( hasVisitedScareZone ) {
          jumpScare.cancel(); //clear timeout for jumpscare
        }

        if (scene.data.id == '0-scene-1' ) {
          $('.prop-hotspot-light').addClass('active');
        }

        //  JAC: hide jump scare for time being...
        if (scene.data.id == '0-scene-2' && !shownScare) {
          hasVisitedScareZone = true;
          jumpScare.setup();
        }

        if (scene.data.id == '0-scene-3' ) {

        }

    }

    function updateSceneName(scene) {
        sceneNameElement.innerHTML = sanitize(scene.data.name);
    }

    function updateSceneList(scene) {
        for (var i = 0; i < sceneElements.length; i++) {
            var el = sceneElements[i];
            if (el.getAttribute('data-id') === scene.data.id) {
                el.classList.add('current');
            } else {
                el.classList.remove('current');
            }
        }
    }

    function createLinkHotspotElement(hotspot) {

        // Create wrapper element to hold icon and tooltip.
        var wrapper = document.createElement('div');
        wrapper.classList.add('hotspot');
        wrapper.classList.add('link-hotspot');

        // Create image element.
        var icon = document.createElement('img');
        icon.src = 'img/link.png';
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
        tooltip.classList.add('hotspot-tooltip');
        tooltip.classList.add('link-hotspot-tooltip');
        tooltip.innerHTML = findSceneDataById(hotspot.target).name;

        wrapper.appendChild(icon);
        wrapper.appendChild(tooltip);

        return wrapper;
    }

    function createInfoHotspotElement(hotspot) {

        // Create wrapper element to hold icon and tooltip.
        var wrapper = document.createElement('div');
        wrapper.classList.add('hotspot');
        wrapper.classList.add('info-hotspot');

        // Create hotspot/tooltip header.
        var header = document.createElement('div');
        header.classList.add('info-hotspot-header');

        // Create image element.
        var iconWrapper = document.createElement('div');
        iconWrapper.classList.add('info-hotspot-icon-wrapper');
        var icon = document.createElement('img');
        icon.src = 'img/info.png';
        icon.classList.add('info-hotspot-icon');
        iconWrapper.appendChild(icon);

        // Create title element.
        var titleWrapper = document.createElement('div');
        titleWrapper.classList.add('info-hotspot-title-wrapper');
        var title = document.createElement('div');
        title.classList.add('info-hotspot-title');
        title.innerHTML = hotspot.title;
        titleWrapper.appendChild(title);

        // Create close element.
        var closeWrapper = document.createElement('div');
        closeWrapper.classList.add('info-hotspot-close-wrapper');
        var closeIcon = document.createElement('img');
        closeIcon.src = 'img/close.png';
        closeIcon.classList.add('info-hotspot-close-icon');
        closeWrapper.appendChild(closeIcon);

        // Construct header element.
        header.appendChild(iconWrapper);
        header.appendChild(titleWrapper);
        header.appendChild(closeWrapper);

        // Create text element.
        var text = document.createElement('div');
        text.classList.add('info-hotspot-text');
        text.innerHTML = hotspot.text;

        // Place header and text into wrapper element.
        wrapper.appendChild(header);
        wrapper.appendChild(text);

        // Create a modal for the hotspot content to appear on mobile mode.
        var modal = document.createElement('div');
        modal.innerHTML = wrapper.innerHTML;
        modal.classList.add('info-hotspot-modal');
        document.body.appendChild(modal);

        var toggle = function() {
            wrapper.classList.toggle('visible');
            modal.classList.toggle('visible');
        };

        // Show content when hotspot is clicked.
        wrapper.querySelector('.info-hotspot-header').addEventListener('click', toggle);

        // Hide content when close icon is clicked.
        modal.querySelector('.info-hotspot-close-wrapper').addEventListener('click', toggle);

        // Prevent touch and scroll events from reaching the parent element.
        // This prevents the view control logic from interfering with the hotspot.
        stopTouchAndScrollEventPropagation(wrapper);
        console.log( wrapper );
        return wrapper;
    }

    function createPropHotspotsElement(hotspot) {

      // Create wrapper element to hold icon and hotspot_link_info.
      var wrapper = document.createElement('div');
      wrapper.className += 'hotspot prop-hotspot-light';

      var prop = document.createElement('div');
      prop.className += 'prop-inner';
      prop.style.backgroundImage = "url('" + hotspot.path + "')";
      prop.style.width = hotspot.width+"px";
      prop.style.height = hotspot.height+"px";

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

    // function tncToggle() {
    //   $('#tnc').toggle();
    // }

// })();

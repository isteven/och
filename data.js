var APP_DATA = {
  "scenes": [
    {
      "id": "0-scene-1",
      "name": "scene_1",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        },
        // {
        //   "tileSize": 512,
        //   "size": 1024
        // },
        // {
        //   "tileSize": 512,
        //   "size": 2048
        // }
      ],
      "faceSize": 2048,
      "initialViewParameters": {
          "yaw": 1.205997375568252,
          "pitch": -0.08318340417305322,
          "fov": 1.5707963267948966
        },
    //   "initialViewParameters": {
    //     "pitch": 0,
    //     "yaw": 0,
    //     "fov": 1.5707963267948966
    //   },
      "linkHotspots": [
        // {
        //   "yaw": 0.012387153953755003,
        //   "pitch": 0,
        //   "rotation": 0,
        //   "target": "1-home"
        // }
      ],
      "infoHotspots": [
        {
          "yaw": -1.0771514057627414,
          "pitch": -0.30409937519619845,
          "title": "Ghost",
          "text": "Xixixixi"
        }
      ]
    },
    {
      "id": "1-home",
      "name": "home",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        }
      ],
      "faceSize": 512,
      "initialViewParameters": {
        "pitch": 0,
        "yaw": 0,
        "fov": 1.5707963267948966
      },
      "linkHotspots": [],
    //     {
    //       "yaw": -0.5306184575628539,
    //       "pitch": -0.051823965795644966,
    //       "rotation": 0,
    //       "target": "0-snowy"
    //     }
    //   ],
      "infoHotspots": []
    }
  ],
  "name": "Project Title",
  "settings": {
    "mouseViewMode": "drag",
    "autorotateEnabled": false,
    "fullscreenButton": false,
    "viewControlButtons": false
  }
};

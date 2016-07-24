/* this is the active environment */
var environment = 'local';

/* insert required environment config items here */
var environmentConfigs = {

    local: {
        apiUrl  : 'http://stg.craftandcode.com.sg/clients/rws/hhn6/',
        gameId  : 1 // Old Changi Hospital
    },
    uat: {
        apiUrl  : 'http://stg.craftandcode.com.sg/clients/rws/hhn6/',
        gameId  : 1 // Old Changi Hospital
    },
    prod: {
        apiUrl  : 'http://halloweenhorrornights.com.sg/',
        gameId  : 1 // Old Changi Hospital
    }
};

/*
 * These are global configs, which will be injected into environmentConfigs
 * so you have to use use different variable names with the environmentConfigs.
 */
var globalConfigs = {
    apiVersion          : 'v1.0',
    dateFormat          : 'DD MMMM YYYY',
    dateTimeFormat      : 'DD MMMM YYYY, HH:mm'
};

var configGet = function( property ){
    return environmentConfigs[ environment ][ property ];
}

var fb_share_url = 'http://www.halloweenhorrornights.com.sg/';
var twitter_share_url = 'http://stg.craftandcode.com.sg/clients/rws/hhn6/game/twitter';
var weibo_share_url = 'http://stg.craftandcode.com.sg/clients/rws/hhn6/game/weibo';

var cdn_url = "https://dg0l7q9c72lxu.cloudfront.net/game";

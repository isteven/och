/* this is the active environment */
var environment = 'local';

/* insert required environment config items here */
var environmentConfigs = {

    local: {
        apiUrl              : 'http://stg.craftandcode.com.sg/clients/rws/hhn6/',
    },
    uat: {
        apiUrl              : 'http://stg.craftandcode.com.sg/clients/rws/hhn6/',
    },
    prod: {
        apiUrl				: 'http://stg.craftandcode.com.sg/clients/rws/hhn6/',
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

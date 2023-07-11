module.exports = function(config) {
    console.log('a1a273539c integration ran');
    console.log('with this config file: \n' + config);
    alloy("getIdentity").then(function (result) {
        console.log("result:", result);
        console.log("result ECID:", result.identity.ECID);
        console.log("result RegionId:", result.edge.regionId);
        // evolv.context.set('vzOmni.visitorId',result.identity.ECID);
    }).catch(function (error) {
        // The command failed.
        // "error" will be an error object with additional information.
    });
};
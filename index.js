module.exports = function (config) {
    // console.log('a1a273539c integration ran');
    // console.log('with this config file: \n' + JSON.stringify(config));

    // set the visitor ID
    // ==================
    // alloy() is an Adobe AEP async function returning a promise
    //
    waitFor(() => window.alloy)
    .then(alloy => {
        alloy('getIdentity').then(function (result) {
            // console.log('result:', result);
            // console.log('result ECID:', result.identity.ECID);
            // console.log('result RegionId:', result.edge.regionId);
            evolv.context.set('vzOmni.visitorId', result.identity.ECID);
        }).catch(function (error) {
            // nothing
        });
    })
    .catch(() => console.warn('window.alloy not set within timeout'))

    // set the time since last visit
    // =============================
    //     there are 6 buckets
    //         new visitor
    //         Less than an hour ago
    //         Less than a day ago
    //         Less than a week ago
    //         Less than 30 days ago
    //         More than 30 days ago
    //
    waitFor(() => window.vzdl?.utils?.lastVisit, 10000)
    .then(lastVisit => {
        var lastVisitBucket;
        if (lastVisit == 'New Visitor') {
            lastVisitBucket = 'New visitor';
        }
        var lastVisitInSec = convertToSeconds(lastVisit);
        if (lastVisitInSec < 3600) {
            lastVisitBucket = 'Less than an hour ago';
        } else if (lastVisitInSec < 86400) {
            lastVisitBucket = 'Less than a day ago';
        } else if (lastVisitInSec < 604800) {
            lastVisitBucket = 'Less than a week ago';
        } else if (lastVisitInSec < 2592000) {
            lastVisitBucket = 'Less than 30 days ago';
        } else {
            lastVisitBucket = 'More than 30 days ago';
        }
        evolv.context.set('vz.lastVisitBucket', lastVisitBucket);
    })
    .catch(() => console.warn('window.vzdl.utils.lastVisit not set within timeout'))

    // set visit start
    // ===============
    //     weekday
    //     6h day part
    //         Early Morning            Midnight - 6:00 AM
    //         Morning to Afternoon     6:0 AM - 12:00 PM
    //         Afternoon to Evening     12:00 PM - 6:00 PM
    //         Evening to Late Night    6:00 PM - Midnight
    //
    // example string to parse: "year=2023 | month=July | date=12 | day=Wednesday | time=11:02 PM"
    //
    waitFor(() => window.vzdl?.utils?.visitStart, 10000)
    .then(visitStart => {
        let components = visitStart.split(' | ');

        // find the component that starts with 'day='
        let dayComponent = components.find(component => component.startsWith('day='));

        if (dayComponent) {
            // split the day component by '=' to get the day of the week
            let dayOfWeek = dayComponent.split('=')[1];
            evolv.context.set('vz.dayOfWeek', dayOfWeek);
        }

        let timeComponent = components.find(component => component.startsWith('time='));

        // Convert the time string to a Date object
        let date = new Date(`1/1/1970 ${timeComponent}`);

        // Get the hour
        let hour = date.getHours();

        // Determine the part of the day
        let partOfDay;
        if (hour >= 0 && hour < 6) {
            partOfDay = 'Early Morning';
        } else if (hour >= 6 && hour < 12) {
            partOfDay = 'Morning to Afternoon';
        } else if (hour >= 12 && hour < 18) {
            partOfDay = 'Afternoon to Evening';
        } else {
            partOfDay = 'Evening to Late Night';
        }

        evolv.context.set('vz.partOfDay', partOfDay);
    })
    .catch(() => console.warn('window.vzdl.utils.dayOfWeek not set within timeout'))

    // Support functions
    function waitFor(callback, timeout = 5000, interval = 25) {
        return new Promise((resolve, reject) => {
            let poll;
            const timer = setTimeout(() => {
                clearInterval(poll);
                reject();
            }, timeout);
            poll = setInterval(() => {
                const result = callback();
                if (result) {
                    clearInterval(poll);
                    clearTimeout(timer);
                    resolve(result);
                }
            }, interval);
        });
    }

    function convertToSeconds(durationString) {
        const units = durationString.split(' ');
        const value = parseFloat(units[0]);
        const period = units[1];

        switch (period) {
            case 'seconds':
            case 'second':
                return Math.floor(value);
            case 'minutes':
            case 'minute':
                return Math.floor(value * 60);
            case 'hours':
            case 'hour':
                return Math.floor(value * 60 * 60);
            case 'days':
            case 'day':
                return Math.floor(value * 60 * 60 * 24);
            default:
                return null;
        }
    }
};
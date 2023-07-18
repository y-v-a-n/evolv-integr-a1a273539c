# evolv-integrations
## At the moment this integation does the following:

### `vzOmni.visitorId`
Sets this context variable to the Adobe visitor ID. A call is made to Adobe's alloy("getIdentity") async function and `vzOmni.visitorId` is set to the following property of the return value of the function: `result.identity.ECID`

### `vz.lastVisitBucket`
Sets the this context variable based on `window.vzdl.utils.lastVisit`. Example values for `window.vzdl.utils.lastVisit` are:  
`New Visitor`  
`16.75 hours` ago  
`2 days` ago  
Also added `seconds` and `minutes` and dealt with singular or plural on units, just in case. The buckets are:

| Time range | Bucket |
|-|-|
| New Visitor | `New visitor` |
| 1 sec - 60 min | `Less than an hour ago` |
| 1 hr - 24 h | `Less than a day ago` |
| 24 h - 7 days | `Less than a week ago` |
| 7 - 30 days | `Less than 30 days ago` |
| > 30 days | `More than 30 days ago` |

### `vz.dayOfWeek` and `vz.timeOfDay`
Sets these context variables, both based on `window.vzdl.utils.visitStart`. `vz.dayOfWeek` is set to the day of week the visit started, for example `Wednesday`. `vz.timeOfDay` is set to a 6-hour block of time, braking down the day in the following way, in local time:  

| Time range | Date part |
| ---------- | --------- |
| Midnight - 6:00 AM | `Early Morning` |
| 6:00 AM - 12:00 PM | `Morning to Afternoon` |
| 12:00 PM - 6:00 PM | `Afternoon to Evening` |
| 6:00 PM - Midnight | `Evening to Late Night` |
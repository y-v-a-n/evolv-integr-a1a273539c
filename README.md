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

### `vz.accountDeviceOs`
Sets this context variable based on `window.vzdl.park.evolv.accountDeviceOs`. Example values for `window.vzdl.park.evolv.accountDeviceOs` are: 

| Account Device OS |
| ---------- |
| `Apple iOS` |
| `Android` |

### `vz.billingState`
Sets this context variable based on `window.vzdl.park.evolv.billingState`. `vz.billingState` is set to the two lettr state abbreviation, for example `CA`.

### `vz.isUpgradeEligible`
Sets this context variable based on `window.vzdl.park.evolv.isUpgradeEligible`. `vz.isUpgradeEligible` is a boolean that is set to either true or false.

### `vz.userAgeBucket`
Sets this context variable based on `window.vzdl.park.evolv.userAgeBucket`. `vz.userAgeBucket` is set according to the following table. The vzdl includes an anonymous age bucket that is translated into an actual age bucket.

| Anonymous Age Bucket | Actual Age Bucket |
| -------------------- | ----------------- |
| `AgeLevel1` | `<18 years` |
| `AgeLevel2` | `18-24 years` |
| `AgeLevel3` | `25-34 years` |
| `AgeLevel4` | `35-44 years` |
| `AgeLevel5` | `45-54 years` |
| `AgeLevel6` | `55-64 years` |
| `AgeLevel7` | `>65 years` |
| `Undefined` | `unknown` |


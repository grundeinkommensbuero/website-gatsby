const MatomoTrackingStuff = `
// var _paq = _paq || [];
// _paq.push(['AbTesting::create', {
//     name: '3', // you can also use '3' (ID of the experiment) to hide the name
//     percentage: 100,
//     includedTargets: [{"attribute":"url","inverted":"0","type":"equals_simple","value":"https://expedition-grundeinkommen.de/brandenburg/"}],
//     excludedTargets: [],
//     variations: [
//         {
//             name: 'original',
//             activate: function (event) {
//                 // usually nothing needs to be done here
//             }
//         },
//         {
//             name: '8', // you can also use '8' (ID of the variation) to hide the name
//             percentage: 0,
//             activate: function(event) {
//                 event.redirect('https://expedition-grundeinkommen.de/brandenburg-1/');
//             }
//         },                        {
//             name: '9', // you can also use '9' (ID of the variation) to hide the name
//             percentage: 50,
//             activate: function(event) {
//                 event.redirect('https://expedition-grundeinkommen.de/brandenburg-2/');
//             }
//         }
//     ],
//     trigger: function () {
//         return true; // here you can further customize which of your visitors will participate in this experiment
//     }
// }]);
`;

export default MatomoTrackingStuff;

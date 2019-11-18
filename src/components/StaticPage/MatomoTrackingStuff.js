const MatomoTrackingStuff = `
    var _paq = _paq || [];
    _paq.push(['AbTesting::create', {
        name: '2', // you can also use '2' (ID of the experiment) to hide the name
        percentage: 100,
        includedTargets: [{"attribute":"url","inverted":"0","type":"equals_simple","value":"https:\/\/expedition-grundeinkommen.de\/brandenburg\/"}],
        excludedTargets: [],
        variations: [
            {
                name: 'original',
                activate: function (event) {
                    // usually nothing needs to be done here
                }
            },
            {
                name: '2', // you can also use '2' (ID of the variation) to hide the name
                activate: function(event) {
                    event.redirect('https://expedition-grundeinkommen.de/brandenburg-1/');
                }
            },                        {
                name: '3', // you can also use '3' (ID of the variation) to hide the name
                activate: function(event) {
                    event.redirect('https://expedition-grundeinkommen.de/brandenburg-2/');
                }
            },                        {
                name: '4', // you can also use '4' (ID of the variation) to hide the name
                activate: function(event) {
                    event.redirect('https://expedition-grundeinkommen.de/brandenburg-3/');
                }
            },                        {
                name: '5', // you can also use '5' (ID of the variation) to hide the name
                activate: function(event) {
                    event.redirect('https://expedition-grundeinkommen.de/brandenburg-4/');
                }
            },                        {
                name: '6', // you can also use '6' (ID of the variation) to hide the name
                activate: function(event) {
                    event.redirect('https://expedition-grundeinkommen.de/brandenburg-5/');
                }
            }            
        ],
        trigger: function () {
            return true; // here you can further customize which of your visitors will participate in this experiment
        }
    }]);
`;

export default MatomoTrackingStuff;

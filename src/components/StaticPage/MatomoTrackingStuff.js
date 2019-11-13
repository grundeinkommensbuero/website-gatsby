const MatomoTrackingStuff = `
    var _paq = _paq || [];
    _paq.push(['AbTesting::create', {
        name: 'PledgeBrandenburg', // you can also use '1' (ID of the experiment) to hide the name
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
                name: '1_weniger_drumrum', // you can also use '1' (ID of the variation) to hide the name
                activate: function(event) {
                    event.redirect('https://expedition-grundeinkommen.de/brandenburg-1/');
                }
            }            
        ],
        trigger: function () {
            return true; // here you can further customize which of your visitors will participate in this experiment
        }
    }]);
`;

export default MatomoTrackingStuff;

/*
 {
    "units":{"temperature":"F","speed":"mph","distance":"mi","pressure":"in"},
    "location":{"location_id":"ASXX0075","city":"Melbourne","state_abbreviation":"*","country_abbreviation":"AS","elevation":276,"latitude":-37.74000000000000,"longitude":144.90000000000001},
    "wind":{"speed":7.00000000000000,"direction":"WNW"},
    "atmosphere":{"humidity":"66","visibility":"6.21","pressure":"30.27","rising":"steady"},
    "url":"http:\/\/weather.yahoo.com\/forecast\/ASXX0075.html",
    "logo":"http:\/\/l.yimg.com\/a\/i\/us\/nt\/ma\/ma_nws-we_1.gif",
    "astronomy":{"sunrise":"06:46","sunset":"17:57"},
    "condition":{"text":"Partly Cloudy","code":"30","image":"http:\/\/l.yimg.com\/a\/i\/us\/we\/52\/30.gif","temperature":46.00000000000000},
    "forecast":[{"day":"Today","condition":"Mostly Sunny","high_temperature":"62","low_temperature":"47"},
                {"day":"Tomorrow","condition":"Partly Cloudy","high_temperature":"61","low_temperature":"48"}
                ]
}
*/

(function() {
    Ext.regModel('LabelText', {
        fields: ['label', 'text']
    })

    Ext.regStore('CitiesStore', new Ext.data.JsonStore({
        model: 'LabelText'
    }))

    Ext.regModel('City', {
        fields: [
            'wind',
            'sunrise',
            'sunset',
            'condition_now',
            'temp_today',
            'condition_today',
            'temp_tomorrow',
            'condition_tomorrow'
        ]
    })
})()

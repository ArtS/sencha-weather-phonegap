(function() {

    Ext.Router.draw(function(map) {
        map.connect(':controller/:action')
        map.connect(':controller/:action/:id')
    })

    Weather.controllers.weather = Ext.regController('weather', {

        loaded: false,

        listCities: function() {
            var townIDs = ['2018708', '1103816', '1105779', '1099805', '1100661', '1098081', '1100968']
              , data = []
              , i = 0
              , store = Ext.getStore('CitiesStore')
              , ctrl = Ext.ControllerManager.get('weather')

            Weather.viewport.setActiveItem(Ext.getCmp('citiesList'), 'slide')

            if (this.loaded)
                return

            function doneLoading() {
                store.loadData(data)

                // Let subscribers know that loading finished
                store.fireEvent('load')

                ctrl.loaded = true
            }

            function getNextTownData() {
                if (i === townIDs.length) {
                    doneLoading()
                    return
                }

                Ext.Ajax.request({
                    url: 'http://weather.yahooapis.com/forecastjson?w=' + townIDs[i],
                    success: function(r, o) {
                        var newData = Ext.decode(r.responseText)
                        newData.id = townIDs[i]
                        data.push(newData)
                        i++
                        getNextTownData()
                    },
                    failure: function() {
                        Ext.Msg.alert('Error', 'Error retrieving town id ' + townIDs[i], Ext.emptyFn);
                    }
                })
            }

            // Notify subscribers that store is busy loading data
            store.fireEvent('beforeload')

            // Start chained loading
            getNextTownData()
        },

        backToList: function() {
            Ext.dispatch({
                controller: 'weather',
                action: 'listCities',
                historyUrl: 'weather/listCities'
            })
        },

        refreshDetails: function() {
            var ctrl = Ext.ControllerManager.get('weather')
            ctrl.loaded = false
            ctrl.list()
        },

        details: function(opts) {

            var data
              , i = 0
              , store = Ext.getStore('CitiesStore')
              , formData

            Weather.viewport.setActiveItem(Ext.getCmp('details'), 'slide')

            for (; i < store.data.items.length; i++) {
                if (store.data.items[i].data.id == opts.id) {
                    data = store.data.items[i].data
                    break
                }
            }

            Ext.getCmp('detailsToolbar').setTitle(data.location.city)

            formData = Ext.ModelMgr.create({
                wind: Math.round(data.wind.speed) + ' ' + data.wind.direction,
                sunrise: data.astronomy.sunrise,
                sunset: data.astronomy.sunset,
                condition_now: data.condition.text,
                temp_now: Math.round(data.condition.temperature) + ' C',
                temp_today: Weather.utils.getCelsius(data.forecast[0].low_temperature) + ' ... ' +
                            Weather.utils.getCelsius(data.forecast[0].high_temperature) + 'C',
                condition_today: data.forecast[0].condition,
                temp_tomorrow: Weather.utils.getCelsius(data.forecast[1].low_temperature) + ' ... ' +
                               Weather.utils.getCelsius(data.forecast[1].high_temperature) + 'C',
                condition_tomorrow: data.forecast[1].condition
            }, 'City')

            Ext.getCmp('detailsForm').load(formData)

        }
    })
})()

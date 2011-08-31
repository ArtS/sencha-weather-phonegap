new Ext.Application({
    name: 'Weather',
    defaultUrl: 'weather/listCities',
    launch: function() {
        this.viewport = new Weather.Viewport({
            application: this
        })
    }
})


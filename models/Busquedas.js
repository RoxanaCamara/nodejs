const { default: axios } = require('axios')

class Busquedas {
    historial = []

    constructor(){}

    get getParamnsMapbox() {
        return {
            'access_token' : process.env.MAPBOX_KEY || '',
            'limit': 5,
            'languaje': 'es'
        }
    }    

    async ciudad (lugar=''){

        try {
            
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: this.getParamnsMapbox
            })

            const resp = await instance.get()
            
            return resp.data.features.map( l =>  ({
                id: l.id ,
                desc: l.place_name,
                lon: l.center[0],
                lat: l.center[1]
            }))
        } catch (error) {
            console.log(' Algo no funco')
            return []
        }
        
    }

    getParamnsOpenWeather(lugar) {
        return {
            'appid' : process.env.OPENWEATHER_KEY || '',
            'lang': 'es',
            'units': 'metric',
            'lat': lugar.lat,
            'lon': lugar.lon
        }
    }

    async clima (lugar){
        
        try {            
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: this.getParamnsOpenWeather(lugar)
            })
            const resp= await instance.get()
            const { main, weather } = resp.data
            
            return {
                descClima: weather[0].description,
                temMin: main.temp_min,
                temMax: main.temp_max,
                temp: main.temp
            }

        } catch (error) {
            console.log(' Algo no funco con el clima')
            return []
        }
        
    }

}

module.exports = Busquedas
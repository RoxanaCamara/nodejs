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
                nombre: l.place_name,
                lng: l.center[0],
                lat: l.center[1]
            }))            
        } catch (error) {
            console.log(' Algo no funco')
            return []
        }
        
    }
}

module.exports = Busquedas
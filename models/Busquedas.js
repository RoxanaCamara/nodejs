const { default: axios } = require("axios")
const {process} = require('fs');

class Busquedas {
    historial = []

    constructor(){}

    get getParamnsMapbox() {
        return {
            'access_token' : '',
            'limit': 5,
            'languaje': 'es'
        }
    }

    async ciudad (lugar =''){
        console.log(lugar)
        try {
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: this.getParamnsMapbox()
        })
            const resp = await axios.get('https://reqres.in/api/users?page=2')

            console.log(resp.data)
            return []            
        } catch (error) {
            return []
        }
        
    }
}

module.exports = Busquedas
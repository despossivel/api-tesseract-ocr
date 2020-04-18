// const request = require("request");
const axios = require('axios').default;


class GooglePlaces {

    constructor() {
        this.baseUrl = 'https://maps.googleapis.com/maps/api/place';
        this.responseType = 'json';
        this.KEY = process.env.GMK//'AIzaSyDMBr8mU-v74IONlPYQ5xAMi2Xdqj1aawM';
    }

    async search(nome, location = '-8.0297299,-50.0313114', radius = '500') {
        try {

            // return await request(, function (error, response, body) {
            const response = await axios.get(`${this.baseUrl}/nearbysearch/${this.responseType}?radius=${radius}&name=${nome}&location=${location}&key=${this.KEY}`);
            const { results } = response.data;

            if (results.length == 0) return {
                place_id: false
            };
            const [result] = results;
            const {
                place_id,
                geometry,
                vicinity,
                name,
            } = result;

            return {
                place_id,
                name,
                geometry,
                vicinity
            }

        } catch (error) {
            console.error(error)
            return {
                place_id: false
            }
        }
    }



    //ChIJN4gGfXgJ4JIRp-pGr2pBwCc
    async details(place_id) {
        try {
            const response = await axios.get(`${this.baseUrl}/details/${this.responseType}?placeid=${place_id}&key=${this.KEY}`);

            const { result } = response.data
            if (!result) return false;
            const {
                formatted_address,
                weekday_text,
                photos,
                rating,
                reviews,
                types
            } = result;

            return {
                formatted_address,
                weekday_text,
                photos,
                rating,
                reviews,
                types
            }

        } catch (error) {
            console.error(error)
            return false;
        }
    }


}

// const googlePlaces = new GooglePlaces();
// const result = googlePlaces.search('Na brasa', '-8.0297299,-50.0313114', '500')
// const details = googlePlaces.details('ChIJN4gGfXgJ4JIRp-pGr2pBwCc')
// result.then(result => console.log(result))
// details.then(details => console.log(details))

module.exports = new GooglePlaces();
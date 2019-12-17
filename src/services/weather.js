const geolocation = require('geolocation');
const DarkSkyApi = require('dark-sky-api');

export default class Weather {

    constructor() {
        // setup variables for runtime
        this.localStorageKeyLat = "lat";
        this.localStorageKeyLon = "lon";
        this.darkskykey = "735da4ffb933f40d8f00f005bad0cf42"
        this.darksky = new DarkSkyApi(this.darkskykey, null, 'auto');
    }

    getLatLonStorage() {
        let lat = localStorage.getItem(this.localStorageKeyLat);
        let lon = localStorage.getItem(this.localStorageKeyLon);

        return {latitude: lat, longitude: lon};
    }

    setLatLon(lat, lon) {
        localStorage.setItem(this.localStorageKeyLat, lat);
        localStorage.setItem(this.localStorageKeyLon, lon);
    }

    getWeather() {
        return new Promise((accept, reject) => {
            const latlon = this.getLatLonStorage();
            this.darksky.loadCurrent(latlon).then(result => {
                let current = result;

                this.darksky.loadForecast().then(
                    fore => {
                        accept({
                            current: current,
                            forecast: fore
                        });
                    },
                    e => {
                        reject(e);
                    }
                )

            }, e => reject(e));
        });
    }

    getLocation() {
        return new Promise((accept,reject) => {
            geolocation.getCurrentPosition((err, position) => {
                if(err) reject(err);
                else {
                    this.setLatLon(position.coords.latitude, position.coords.longitude);
                    accept(true);
                };
            });
        });
    }

}
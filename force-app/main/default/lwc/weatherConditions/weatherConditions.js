import { LightningElement, api } from 'lwc';
import todayWeather from '@salesforce/apex/WeatherController.today';

/**
 * 本日の天気概況をLivedoor天気APIから取得
 */

export default class WeatherConditions extends LightningElement {
    /** バインド変数 */

    description;

    /** getter */

    @api
    get number() {
        return this.description;
    }

    /** setter */

    set number(value) {
        todayWeather({
            city: value
        })
        .then(result => {
            const json = JSON.parse(result);
            this.description = json.description.text;
        })
        .catch(err => {
            this.error = err;
        });
    }
}
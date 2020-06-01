import { LightningElement, track } from 'lwc';
import todayWeather from '@salesforce/apex/WeatherController.today';

export default class MyFirstWebComponent extends LightningElement {
    title;
    weather;
    error;
    @track searchCity = '250010';

    /** 命令形Apex */

    // コンポーネント読み込み時に実行されるメソッド
    connectedCallback() {
		this.getWeather(this.searchCity);
    }
    
    // Apexコントローラーを呼び出し、APIコールを実行する
    getWeather(city) {
        todayWeather({
            city: city
        })
        .then(result => {
            const json = JSON.parse(result);
            this.title = json.title;
            this.weather = json.description.text;
        })
        .catch(err => {
            this.error = err;
        });
    }

    /** 命令形Apexでメソッドが引数を取る場合 */

    // 検索欄 入力後を300ms待ってからAPIコールを実行する
    handleSearchTermChange(event) {
        window.clearTimeout(this.delayTimeout);
        const searchCity = event.target.value;
        
        // eslint-disable-next-line @lwc/lwc/no-async-operation
		this.delayTimeout = setTimeout(() => {
            this.searchCity = searchCity;
            this.getWeather(this.searchCity);
        }, 3000);
    }
}
import { LightningElement, api, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';

const fields = [
    'Customer__c.Location__c',
    'Customer__c.LocationNumber__c'
]

/**
 * 詳細ページの所在地名、所在地番号を取得
 */

export default class LocationWeather extends LightningElement {
    /** 詳細データ取得 */
    @api recordId;
    @wire(getRecord, { recordId: '$recordId', fields })
    record;

    /** getter */

    /**
     * 詳細データから取得地点名を取得
     * @returns String
     */
    get location() {
        return this.record.data.fields.Location__c.value;
    }

    /**
     * 詳細データから地点番号を取得
     * @returns String
     */
    get location_number() {
        return this.record.data.fields.LocationNumber__c.value;
    }
}
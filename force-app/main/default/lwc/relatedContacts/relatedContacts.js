import { LightningElement, api, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
// import getContacts from '@salesforce/apex/AccountDetail.getContacts';

const fields = [
    'Account.Id',
    'Account.Name',
    'Account.SLA__c'
];

export default class RelatedContacts extends LightningElement {
    @api recordId;

    @wire(getRecord, { recordId: '$recordId', fields })
    contacts;

    account;
    error;

    get id() {
        return this.account.data.fields.Id.value;
    }

    get name() {
        return this.account.data.fields.Name.value;
    }

    get sla() {
        return this.account.data.fields.SLA__c.value;
    }
}
import { LightningElement, wire } from 'lwc';
import retrieveList from '@salesforce/apex/AccountController.retrieveList';

export default class WireRetrieveAccount extends LightningElement {
    @wire(retrieveList)
    accounts;
}
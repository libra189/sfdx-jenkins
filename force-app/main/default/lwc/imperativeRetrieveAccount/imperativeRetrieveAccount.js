import { LightningElement, track } from 'lwc';
import retrieveList from '@salesforce/apex/AccountController.retrieveList';

export default class ImperativeRetrieveAccount extends LightningElement {
    @track accounts;
    @track error;

    connectedCallback() {
        retrieveList()
        .then((result) => {
            this.accounts = result;
            this.error = undefined;

            console.log(this.accounts);
        })
        .catch((error) => {
            this.error = error;
            this.accounts = undefined;
        });
    }
}
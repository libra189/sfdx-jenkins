import { LightningElement, track } from 'lwc';

export default class ActivityHistory extends LightningElement {
    @track isShowModal = false;

    openModal() {
        this.isShowModal = true;
    }

    closeModal() {    
        // to close modal window set 'bShowModal' tarck value as false
        this.isShowModal = false;
    }
}
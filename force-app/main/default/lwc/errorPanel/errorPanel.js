import { LightningElement, api } from 'lwc';
import { reduceErrors, getErrorDetails } from 'c/ldsUtils';

export default class ErrorPanel extends LightningElement {
    /** Generic / user-friendly message */
    @api friendlyMessage = 'データの取得に失敗しました。';

    viewDetails = false;

    /** Single or array of LDS errors */
    @api errors;

    get errorMessages() {
        return reduceErrors(this.errors);
    }

    get errorDetails() {
        return getErrorDetails(this.errors);
    }

    handleCheckboxChange(event) {
        this.viewDetails = event.target.checked;
    }
}

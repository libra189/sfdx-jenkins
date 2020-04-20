import { createElement } from 'lwc';
import { registerApexTestWireAdapter } from '@salesforce/sfdx-lwc-jest';
import retrieveList from '@salesforce/apex/AccountController.retrieveList';
import WireRetrieveAccount from 'c/wireRetrieveAccount';

// Realistic data with a list of contacts
const mockGetAcountList = require('./data/getAcountList.json');

// Register as Apex wire adapter. Some tests verify that provisioned values trigger desired behavior.
const getAcountListAdapter = registerApexTestWireAdapter(retrieveList);

describe('c-wire-retrieve-account', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
        jest.clearAllMocks();
    });

    it('get retrieve account list', () => {
        const element = createElement('c-wire-retrieve-account', {
            is: WireRetrieveAccount
        });
        document.body.appendChild(element);

        getAcountListAdapter.emit(mockGetAcountList);

        return Promise.resolve().then(() => {
            // Select elements for validation
            const detailEls = element.shadowRoot.querySelectorAll('div');
            expect(detailEls.length).toBe(mockGetAcountList.length);
        });
    });
});
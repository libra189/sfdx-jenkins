import { LightningElement } from 'lwc';
import addContacts from '@salesforce/apex/AccountDetail.addContacts'; // 取引先責任者を作成するApexメソッド

export default class HelloWorld extends LightningElement {
    save() {
        // チェックボックス要素をリストで取得
        const elements = this.template.querySelectorAll('lightning-input');
        console.debug(elements);

        const contacts = []; // チェックのついている項目のみを格納する配列
        elements.forEach(elem => {
            if (elem.checked) {
                // チェックの付いているデータのみを配列に格納
                const val = elem.dataset.value;
                contacts.push(val);
                console.debug(val);
            }
        });

        console.debug(contacts);
        addContacts({contactNames: contacts})
        .then(result => {
            console.debug(result);
        })
        .catch(error => {
            console.error(error);
        })
    }
}
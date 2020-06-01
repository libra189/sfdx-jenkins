/**
 * LWCから呼び出すApexクラス
 */
public with sharing class AccountController {
    /**
     * 取引先を10件取得
     * @return List<Account>
     */
    @AuraEnabled(cacheable=true)
    public static List<Account> retrieveList() {
        return [
            SELECT Id, Name, Phone, Owner.Name
            FROM Account
            LIMIT 10
        ];
    }
}
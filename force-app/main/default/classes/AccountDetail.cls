public with sharing class AccountDetail {
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts(String accountId) {
        return [
            SELECT Id, Name, Email
            FROM Contact
            WHERE AccountId = :accountId
        ];
    }

    @AuraEnabled
    public static String addContacts(List<String> contactNames) {
        DevObject__c dev = new DevObject__c(
            Alias__c = 'エイリアス',
            TextInput__c = 'サンプル'
        );
        insert dev;

        for (String name: contactNames) {
            System.debug(name);
        }
        return 'OK';
    }
}

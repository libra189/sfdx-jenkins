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
        for (String name: contactNames) {
            System.debug(name);
        }
        return 'OK';
    }
}

@isTest
public with sharing class AccountDetailTest {
    @TestSetup
    static void setup() {
        Account acc = new Account(
            Name = 'テスト株式会社'
        );
        insert acc;

        Contact con = new Contact(
            LastName = 'テスト',
            AccountId = acc.Id
        );
        insert con;
    }

    @IsTest
    static void testGetContacts() {
        Account acc = [SELECT Id FROM Account LIMIT 1];

        List<Contact> contList = AccountDetail.getContacts(acc.Id);
        System.assert(contList.size() > 0);
    }

    @IsTest
    static void testAddContacts() {
        List<String> contactNames = new List<String>{'Contact1', 'Contact2', 'Contact3'};
        String res = AccountDetail.addContacts(contactNames);
        System.assertEquals('OK', res);
    }
}

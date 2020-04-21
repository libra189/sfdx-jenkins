@isTest
public with sharing class AccountControllerTest {
    @TestSetup
    static void setup() {
        List<Account> accList = new List<Account>();
        for (Integer i = 0; i < 20; i++){
            Account acc = new Account(
                Name = 'Test Inc. #' + String.valueOf(i)
            );
            accList.add(acc);
        }

        insert accList;
    }

    @IsTest
    static void testRetrieveList() {
        List<Account> accList = AccountController.retrieveList();
        System.assert(accList.size() <= 10);
    }
}

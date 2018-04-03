describe('Battle Test using Protractor', function() {
    it('Load the board', function() {
        browser.get('http://127.0.0.1:57207/Index.html');
        
        // Board should load successfully
        expect(browser.getTitle()).toEqual('Battleship Game (Using AngularJS)');
        // Initial warning message should be on
        var reqElement = element(by.id('reqId'));
        console.log("NITIN SAY ");
        element(by.id('reqId')).getText().then(function(text) {
            expect(text).toEqual('Guess input is mandatory');
        });
        console.log("IT COMPLETE NOW");
    });
});


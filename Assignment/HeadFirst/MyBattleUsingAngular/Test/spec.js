describe('Battle Test using Protractor', function() {
    it('Load the board', function() {
        browser.get('http://127.0.0.1:58000/Index.html');
        
        // Board should load successfully
        expect(browser.getTitle()).toEqual('Battleship Game (Using AngularJS)');
        // 1. Verify Initial error message
        element(by.id('reqId')).getText().then(function(text) {
            expect(text).toEqual('Guess input is mandatory');
        });
        // 2. Verify error attribute is set properly
        element(by.id('errorId')).getAttribute('ng-style').then(function(value) {
            expect(value).toEqual('error_message');
        });
        // 3. Verify error_message has red color
        element(by.id('errorId')).evaluate('error_message').then(function(value) {
            expect(value['color']).toEqual('red');
        });
        // 3. Verify Guess input is empty
        element(by.name('guessadd')).getText().then(function(text) {
            expect(text.length).toEqual(0);
        });
        // 4. Verify Message Area is empty
        element(by.id('messageArea')).getText().then(function(text) {
            expect(text.length).toEqual(0);
        });
        var scop;
        console.log("IT COMPLETE NOW");
    });
});


describe('Battle Test using Protractor', function() {
    beforeEach(function() {
        browser.get('http://127.0.0.1:63184/Index.html');
    });

    it('Load the board', function() {
        // Board should load successfully
        console.log("Basic Layout testing");
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
        // 5. Verify partial input with error
        element(by.model('guessForm.guessInput')).sendKeys('A');
        element(by.id('patternId')).getText().then(function(text) {
            expect(text).toEqual('Guess input require first character column (A-G) and second number (0-6)');
        });    
        // 5. Verify that RowColumn Setup don't have Hit/Miss 
        element.all(by.repeater('row in rowcolumnsetup')).then(function(rows) {
            rows.forEach(function(row) {
        //        row.findElements(by.tagName('td')).then(function(rowElems) {
          //         console.log("TEST"); 
            //    });
            });
        });
        console.log("Basic Layout testing completed");
    });
    it('User Interaction Functionality', function() {
        // We assume that board is loaded. Possible range of input A-G & 0-6
        console.log("Interaction testing");
        // 0. Clear the field
        element(by.model('guessForm.guessInput')).clear();
        // 2. Send the full input - Verify no error from A-G and 0-6
        var rowPos = ['A','B','C','D','E','F','G'];
        var colPos = [0,1,2,3,4,5,6];
        for(var rowcount = 0;rowcount < rowPos.length;rowcount++) {
            for(var count = 0; count < colPos.length;count++) {
                element(by.model('guessForm.guessInput')).sendKeys(rowPos[rowcount]);
                element(by.model('guessForm.guessInput')).sendKeys(colPos[count]);
                element(by.id('fireId')).click();
                element(by.model('guessForm.guessInput')).clear();
                console.log(rowPos[rowcount] + colPos[count]);
                element(by.id('messageArea')).getText().then(function(text) {
                    console.log(text);
                });    
            }
        }
    });
});


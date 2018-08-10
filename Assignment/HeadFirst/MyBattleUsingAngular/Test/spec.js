describe('Battle Test using Protractor', function() {
    beforeEach(function() {
        browser.ignoreSynchronization = true;
        browser.get('http://127.0.0.1:49312/Index.html').catch( function() {
            return browser.switchTo().alert().then(function(alert) {
                alert.accept();
                return browser.get('http://127.0.0.1:49312/Index.html');
            }, function(err) {
                if(err.code == webdriver.error.ErrorCode.UNEXPECTED_ALERT_OPEN) {
                    return browser.get('http://127.0.0.1:49312/Index.html');
                }
            });
        });
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
        var tableData = element.all(by.repeater('row in rowcolumnsetup')).map(function(row) {
            var tds = row.all(by.css('td'));
            
            return {
                class: tds.get(0).getAttribute('ng-style'),
                status: tds.get(0).getText()
            };
        });
        tableData.then(function(datas) {
            for(var count = 0;count < datas.length;count++) {
                expect(datas[count].class).toEqual('getClass($parent.$index,$index)');
                expect(datas[count].status.length).toEqual(0);
            }
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
                element(by.id('messageArea')).getText().then(function(text) {
                    //console.log(text);
                    expect(["HIT!","You miss the target","Message: You sank my battleship!","You sank all my battleships, in 3 guesses"]).toContain(text);
                });    
            }
        }
    });
});


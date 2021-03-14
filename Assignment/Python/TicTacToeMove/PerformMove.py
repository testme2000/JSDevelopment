def drawrow(coldivide):
    rowstring = " --- "
    print(rowstring * coldivide)

def drawactiverow(coldivide):
    rowstring = "---"
    print(rowstring * coldivide)


def blankcolumn(coldivide):
    colstring = "|  "
    finalbuffer = colstring
    finalbuffer += "  "
    print((finalbuffer * coldivide) + "|")

def drawcolumn(ActiveBoard,rownumber,size):
    colstring = "|"
    rowstring = ""
    for colcount in range(size):
        if ActiveBoard[rownumber][colcount] == 'X':
            colstring += ' X '
        elif ActiveBoard[rownumber][colcount] == 'O':
            colstring += ' O '
        else:
            colstring += '   '
        colstring += "|"
        rowstring += colstring 
        colstring = ""
    rowstring += "\n"
    return rowstring

def prepareActiveBoard(boardsetup,size):
    for count in range(size):
        # Prepare each column for the row
        columnforrow = []
        for colcount in range(size):
            columnforrow.append('-')
        # Append the column for the row
        boardsetup.append(columnforrow)

def drawInitialBoard(size):
    # Add Row and Column as per size
    for count in range(size):
        drawrow(size)
        blankcolumn(size)
    # Finally close the board
    drawrow(size)


def VerifyWinnerInRow(ActiveBoard):
    rowlen = len(ActiveBoard)
    winner = -1
    WinnerFound = False
    # Verify Row wise winner
    for count in range(rowlen):
        # Verify entire column
        collen = len(ActiveBoard[count])
        prevvalue = -1
        matchstatus = True
        for colcount in range(collen):
            if prevvalue == -1:
                prevvalue = ActiveBoard[count][colcount]
            elif ActiveBoard[count][colcount] != '-' and prevvalue == ActiveBoard[count][colcount]:
                # Mark possible winner
                winner = prevvalue
                continue
            else:
                matchstatus = False
                break
        # Verify whehter we found the winner
        if matchstatus == True:
            WinnerFound = True
            break
    return WinnerFound, winner


def VerifyWinnerInColumn(ActiveBoard):
    collen = len(ActiveBoard[0])
    WinnerFound = False
    for count in range(collen):
        # Verify entire column
        rowlen = len(ActiveBoard)
        prevvalue = -1
        winner = -1
        matchstatus = True
        for rowcount in range(rowlen):
            if prevvalue == -1:
                prevvalue = ActiveBoard[rowcount][count]
            elif ActiveBoard[rowcount][count] != '-' and prevvalue == ActiveBoard[rowcount][count]:
                # Mark possible winner
                winner = prevvalue
                continue
            else:
                matchstatus = False
                break
        # Verify whehter we found the winner
        if matchstatus == True:
            WinnerFound = True
            break
    return WinnerFound, winner

def VerifyWinnerInDimension(ActiveBoard):
    # Verify dimension  wise match
    # calculate dimension
    WinnerFound = False
    collen = len(ActiveBoard[0])
    rowlen = len(ActiveBoard)
    dimension = rowlen * collen
    prevvalue = -1
    winner = -1
    matchstatus = True
    for count in range(rowlen):
        # Verify entire column
        if prevvalue == -1:
            prevvalue = ActiveBoard[count][count]
        elif ActiveBoard[count][count] != '-' and prevvalue == ActiveBoard[count][count]:
            # Mark possible winner
            winner = prevvalue
            continue
        else:
            matchstatus = False
            break
    if not matchstatus:
        # Do reverse dimension check
        prevvalue = -1
        winner = -1
        matchstatus = True
        colcount = collen - 1
        for count in range(rowlen):
            # Verify entire column
            print("Index ",count)
            if prevvalue == -1:
                prevvalue = ActiveBoard[count][colcount]
                print("Value ",prevvalue)
                colcount -= 1
            elif ActiveBoard[count][colcount] != '-' and prevvalue == ActiveBoard[count][colcount]:
                # Mark possible winner
                print("value match ", ActiveBoard[count][colcount])
                winner = prevvalue
                colcount -= 1
                continue
            else:
                matchstatus = False
                break

    # Verify whehter we found the winner
    if matchstatus == True:
        WinnerFound = True
    return WinnerFound, winner


def VerifyWinner(ActiveBoard):
    gamestatus, winnerifany = VerifyWinnerInRow(ActiveBoard)
    if(gamestatus == False):
        gamestatus, winnerifany = VerifyWinnerInColumn(ActiveBoard)
        if gamestatus == False:
            gamestatus,winnerifany = VerifyWinnerInDimension(ActiveBoard)
    return gamestatus,winnerifany

def updateDisplayBoard(ActiveBoard,size):
    displayboard = ""
    updatedrow = ""
    rowdivder = ""
    for count in range(size):
        updatedrow = drawcolumn(ActiveBoard,count,size)
        rowdivider = ("-" * len(updatedrow))
        displayboard += rowdivider + "\n"
        displayboard += updatedrow
    displayboard += rowdivider + "\n"
    print(displayboard)


def updateBoard(row,column,player,ActiveBoard):
    # Update Internal state
    ActiveBoard[row][column] = player
    # Update display board
    updateDisplayBoard(ActiveBoard,size)


print("Welcome to TicTacToe Game")
choice = input("what size of game board you want to play : ")
size = int(choice)
coldivide = size
ActiveBoard = []

# Prepare internal Active board
prepareActiveBoard(ActiveBoard,size)
# Prepare initial display board
drawInitialBoard(size)
print("This is initial board internal status ", ActiveBoard)
# Declare Player
print("Player 1 is X and Player 2 is O")
print("Lets begin the game")

ActivePlayer = 'X'
while True:
    movechoice = "Select your move Player "
    if ActivePlayer == "X":
        movechoice += " X "
    else:
        movechoice += " O "
    movechoice += " enter row and column (type row number,column number) e.g. 2,3 : "
    movechoice = input(movechoice)
    movechoice = movechoice.strip()
    choiceadded = movechoice.split(",")
    # Validate Row and Column
    row = int(choiceadded[0].strip())
    column = int(choiceadded[1].strip())
    if row < 0 or row > size:
        print("Please type valid row number")
        continue
    if column < 0 or column > size:
        print("Please type valid column number")
        continue
    # Row,Column is valid, lets prepare the move 
    updateBoard(row-1,column-1,ActivePlayer,ActiveBoard)
    # Now verify winner if any
    gamestatus, winnerifany = VerifyWinner(ActiveBoard)
    if gamestatus == True:
        # We have winner
        output = "End of Game, Winner is Player "
        output += winnerifany + "\n"
        print(output)
        break
    # lets allow other player to play
    if ActivePlayer == "X":
        ActivePlayer = "O"
    else:
        ActivePlayer = "X" 
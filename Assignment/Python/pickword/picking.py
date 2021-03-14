from pathlib import Path
import random

def Readsowpodfile(filename):
    allword = []
    dictpath = Path(__file__).with_name(filename)
    # Open the dictionary file
    dictfile = open(dictpath)
    # Gather everything
    for line in dictfile:
        word = line.strip()
        allword.append(word)
    return allword

def SelectRandomWord(worddict):
    # Select random word
    choice = random.choice(worddict)
    return choice

def findallguess(word,guessletter):
    result = []
    count = 0
    index = 0
    position = 0
    while count < len(word):
        index = word.find(guessletter, position)
        if index == -1:
            return result
        else:
            result.append(index)
            count += 1
            position = index + 1

def playthegame(choice):
    validguess = set()
    worddict = []
    guessCount = 0
    guesslimit = 6
    templateholder = '-' * len(choice)
    templist = list(templateholder)
    print(templateholder)
    while True:
        guess = input("Guess your letter : ")
        guess = guess.upper()
        if guess in validguess:
            print("You already guess this letter, please try different letter")
            continue
        result = findallguess(choice,guess)
        if len(result) == 0:
            print("You guess it wrong, lets try again")
            guessCount += 1
            if guessCount < guesslimit:
                print("You have {0} guess remain ".format(guesslimit - guessCount))
                print(templateholder)
                continue
            else:
                print("Game over. You reached the limit (6 Guess)")
                print("Final word was ", choice)
                break
        else:
            for index in result:
                templist[index] = guess
                validguess.add(guess)
            templateholder = "".join(templist)
            if templateholder == choice:
                print("your guess is correct, you won, final word was ", choice)
                break
            print(templateholder)

print("Welcome to Hangman game")
worddict = Readsowpodfile('sowpods.txt')
while True:
    choice = SelectRandomWord(worddict)
    playthegame(choice)
    print("Let's try another round")

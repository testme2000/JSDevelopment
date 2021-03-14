userinp = input("Enter any string : ")
finalinp = userinp.lower()
print(finalinp)
revstr = finalinp[::-1]
if finalinp == revstr:
    print("Entered string : ",userinp, " is palindrome")

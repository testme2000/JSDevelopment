import re

def validatephonenumber():
    status = False
    validnumber = ""
    inputnum = input("Enter Phone Number : ")
    inputnum = inputnum.strip()
    # Check the length
    if len(alllength) != 8:
        return False
    # All must be number
    x = re.findall("[0-9]{8}", inputnum)
    if len(x) != 0:
        return False
    # First letter must be number 1,8,9
    x = re.findall("^[1,8,9]", inputnum)
    if len(x) == 0:
        return False
    
    return status

result = validatephonenumber()
if result == True:
    print("VALID")


    


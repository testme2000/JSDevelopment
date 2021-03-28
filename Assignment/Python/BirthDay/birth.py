import json
import os
from pathlib import Path


def ReadBirthDetail(filename):
    filepath = Path(__file__).with_name(filename)
    fileobject = open(filepath,"r")
    jsonrecord = json.load(fileobject)
    dictobj = jsonrecord["birthInformation"]
    return dictobj

def SearchBirthDetail(BirthDict,name):
    itemfound = None
    searchitem = next((elem for elem in BirthDict if elem["Name"] == name), None)
    if searchitem != None:
        itemfound = searchitem["Date"]
    return itemfound

def UpdateBirthDetail(BirthDict,name,filename):
    birthdate = input("Enter birth date in format MM/DD/YYYY ")
    birthdate = birthdate.strip()
    newobject = {
        "Name" : name,
        "Date" : birthdate
    }
    BirthDict.append(newobject)
    finaljsonobject = {
        "birthInformation" : BirthDict
    }
    filepath = Path(__file__).with_name(filename)
    fileobject = open(filepath,"w")
    json.dump(finaljsonobject,fileobject,indent=4)

print("Welcome to Birthday Dictionary Program")
print("Birth date of following person available for search")
BirthDict = ReadBirthDetail("Birth.json")
for record in BirthDict:
    print(record["Name"])

userinput = input("Who's birthday do you want to look up? ")
searchfor = userinput.strip()
valuefound = SearchBirthDetail(BirthDict,searchfor)
if valuefound == None:
    print("No Birthdate found for ", searchfor)
    prompt = "Do you want to add birth date for " + searchfor + " (Y/N) : "
    choice = input(prompt) 
    choice = choice.strip()
    choice = choice.upper()
    if choice == "Y":
        UpdateBirthDetail(BirthDict,searchfor,"Birth.json")
else:
    finalstring = searchfor + " : " + valuefound
    print(finalstring)

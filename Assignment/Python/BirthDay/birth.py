import json
import os
from pathlib import Path
import calendar


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
    print("Birth details added successfully")

def ProcessBirthDateByMonth(BirthDict):
    monthinfo = []
    months = range(1,13,1)
    for eachmonth in months:
        searchfor = str(eachmonth)
        if int(eachmonth) < 10:
            searchfor = "0" + str(searchfor)
        searchitem = [elem for elem in BirthDict if elem["Date"].startswith(searchfor)]
        totalcount = len(searchitem) 
        if  totalcount > 0:
            monthtext = calendar.month_name[eachmonth]
            monthobject = {
                monthtext : totalcount
            }
            monthinfo.append(monthobject)
    return monthinfo


print("Welcome to Birthday Dictionary Program")
print("Birth date of following person available for search")
BirthDict = ReadBirthDetail("Birth.json")
for record in BirthDict:
    print(record["Name"])
print("Here is total data for each month")
MonthInfo = ProcessBirthDateByMonth(BirthDict)
for record in MonthInfo:
    print(record)

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

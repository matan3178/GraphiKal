import os
import datetime
import pprint

rootdir = '/Users/gilbaz/Desktop/demoData/'

listOfMetaData = []

for subdir, dirs, files in os.walk(rootdir):
    for file in files:
        metaDataDict = {}
        fullPath = os.path.join(subdir, file)
        metaDataDict['name'] = file
        metaDataDict['fileType'] =  os.path.splitext(fullPath)
        dtc = datetime.datetime.fromtimestamp(os.path.getctime(fullPath)).date()
        metaDataDict['createDate'] = (dtc.day,dtc.month,dtc.year)
        metaDataDict['createTime'] = dtc.timetuple()
        listOfMetaData.append(metaDataDict)

for metaData in listOfMetaData:
    print('---')
    print('---')
    pprint.pprint(metaData)
#print(listOfMetaData)
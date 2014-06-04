import json
import os
import sys


basepath = os.path.dirname(__file__)

""" settings parh """
settingPath = os.path.abspath(os.path.join(basepath, ".."))

""" file path for SERVER """
#jsonfilepath = os.path.abspath(os.path.join(basepath, "..", "..", "..", "staticfiles", "data", "courseData.json"))

""" file path for LOCALHOST """
jsonfilepath = os.path.abspath(os.path.join(basepath, "..", "static", "data", "courseData.json"))

sys.path.append(settingPath)
os.environ['DJANGO_SETTINGS_MODULE'] = 'coursereview.settings'
from coursereview.models import Course

jFile = open(jsonfilepath)
data = json.load(jFile)
jFile.close()

""" area = [CSE, MTH, PHY] etc """
areaWiseDict = []

""" truncate all data from course table """
Course.objects.all().delete()

""" excluded courses """
exclude = "Special Topics", "MTech", "PhD"
addCount = 0
skipCount = 0

for courseArea in data:
    areaWiseDict = data[courseArea]
    if str(courseArea) == "MSC":
        print "Skipping:", len(areaWiseDict), courseArea, "courses"
        skipCount += len(areaWiseDict)
        continue

    for course in range(0, len(areaWiseDict)):
        cID = courseArea + areaWiseDict[course]['ID']
        cName = areaWiseDict[course]['Name']
        for x in exclude:
            if str(cName).find(x) != -1:
                print "Skipping:", cID, cName
                skipCount += 1
                break
        else:
            Course(courseID=cID, name=cName).save()
            addCount += 1

print addCount, "courses added!"
print skipCount, "courses skipped!"
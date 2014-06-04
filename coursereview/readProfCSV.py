import csv
import os
import sys


basepath = os.path.dirname(__file__)

""" settings parh """
settingPath = os.path.abspath(os.path.join(basepath, ".."))

""" file path for SERVER """
#csvfilepath = os.path.abspath(os.path.join(basepath, "..", "..", "..", "staticfiles", "data", "courseData.json"))

""" file path for LOCALHOST """
csvfilepath = os.path.abspath(os.path.join(basepath, "..", "static", "data", "profs_pruned.csv"))

sys.path.append(settingPath)
os.environ['DJANGO_SETTINGS_MODULE'] = 'coursereview.settings'
from coursereview.models import Faculty

csvFile = open(csvfilepath, 'r')
reader = csv.reader(csvFile)

""" truncate all data from course table """
Faculty.objects.all().delete()

addCount = 0
facultyID = 1
for row in reader:
    row = sorted(row, key=str.lower)
    print row
    for prof in row:
        Faculty(facultyID = facultyID, name=prof).save()
        facultyID += 1
        addCount += 1

print addCount, "professors added!"
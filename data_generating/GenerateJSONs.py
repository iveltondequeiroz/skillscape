
# coding: utf-8

# ### This code generates the jobs JSON files:

# In[59]:

import csv
import json

jsonFile = open("data.json", "r")
data = json.load(jsonFile)
jsonFile.close()

#add x and y fixed position of each node
rownum=0
with open('loc.csv', 'rb') as f:
    reader = csv.reader(f)
    for row in reader:
        if rownum != 0: #ignore header
           data["nodes"][rownum-1]["cx"] = row[1]
           data["nodes"][rownum-1]["cy"] = row[2]
        rownum+=1
      
#add RCA value to each node        
rownum=0
rownum2 = 0   
with open('bedoor_rca.csv', 'rb') as f:
    reader = csv.reader(f)
    for row in reader:
        if rownum != 0: #ignore header
            #add job title and OCC code
            data["title"]=row[1]
            data["OCC_Code"]=row[0]
            for x in range(0,len(data["nodes"])):
                   data["nodes"][x]["rca"] = row[x+2]
            
            #add job description  
            while True:
                with open("bedoor_occupation_description.csv", 'rb') as g:
                    mycsv = csv.reader(g)
                    mycsv = list(mycsv)
                    OCC = mycsv[rownum2][0]
                    if data["OCC_Code"]!=OCC:
                        rownum2+=1
                    else:
                        data["description"]=mycsv[rownum2][2]
                        break
                
            exec "jsonFile = open('../json files/%s.json', 'w+')" %(data["OCC_Code"],)
            jsonFile.write(json.dumps(data))
            jsonFile.close()
        rownum+=1



# ### This code divides the RCA values in n Quantiles

# In[1]:

import csv

arr = []
rownum=0
#copy all rca values to array
with open('bedoor_rca.csv', 'rb') as f:
    reader = csv.reader(f)
    for row in reader:
        if rownum != 0: #ignore header
            for x in range(0,244):
                   arr.append(row[x+2])
        rownum+=1

#order rca values in array
arr=[float(i) for i in arr]
    
arr.sort()

#figure out n class ranges
print "length =", len(arr)
n=10
for i in range(1,n+1):
    print arr[(len(arr)-1)*i/n]


# In[58]:

import csv

arr = []
rownum=0
#copy all rca values to array
with open('bedoor_rca_cities.csv', 'rb') as f:
    reader = csv.reader(f)
    for row in reader:
        if rownum != 0: #ignore header
            for x in range(0,244):
                   arr.append(row[x+2])
        rownum+=1

#order rca values in array
arr=[float(i) for i in arr]
    
arr.sort()

#figure out n class ranges
print "length =", len(arr)
n=10
for i in range(1,n+1):
    print arr[(len(arr)-1)*i/n]


# ### Generate drop down menu json file

# In[48]:

import csv
import json

jsonFile = open("../json files/job_categories.json", "r")
data = json.load(jsonFile)
jsonFile.close()

catnum=0
rownum=0
with open('bedoor_jobname.csv', 'rb') as f:
    reader = csv.reader(f)
    for row in reader:
        if rownum != 0: #ignore header
            while True:
                if (int(row[0][0]+row[0][1])==data[catnum]["code"]):
                    #print data[catnum]["code"],"::::",row[0], row[1]
                    data[catnum]["jobs"].append({"OCC_Code":row[0],"title":row[1]})
                
                rownum+=1
                    break
                else:
                    catnum+=1
                    #print data[catnum]["code"],"::::",row[0]
                    data[catnum]["jobs"].append({"OCC_Code":row[0],"title":row[1]})
                    break
        rownum+=1
        
jsonFile = open('../json files/job_categories.json', 'w+')
jsonFile.write(json.dumps(data))
jsonFile.close()        
        
        


# ### Generate cities data files

# In[55]:

import csv
import json

jsonFile = open("data.json", "r")
data = json.load(jsonFile)
jsonFile.close()

#add x and y fixed position of each node
rownum=0
with open('loc.csv', 'rb') as f:
    reader = csv.reader(f)
    for row in reader:
        if rownum != 0: #ignore header
           data["nodes"][rownum-1]["cx"] = row[1]
           data["nodes"][rownum-1]["cy"] = row[2]
        rownum+=1
      
#add RCA value to each node        
rownum=0  
with open('bedoor_rca_cities.csv', 'rb') as f:
    reader = csv.reader(f)
    for row in reader:
        if rownum != 0: #ignore header
            #add city name and code
            data["city_name"]=row[1]
            data["city_code"]=row[0]
            for x in range(0,len(data["nodes"])):
                   data["nodes"][x]["rca"] = row[x+2]
                
            exec "jsonFile = open('../json files/%s.json', 'w+')" %(data["city_code"],)
            jsonFile.write(json.dumps(data))
            jsonFile.close()
        rownum+=1


# # Add auto prob to each node in the data.json file

# In[8]:

import csv
import json

jsonFile = open("data.json", "r")
data = json.load(jsonFile)
jsonFile.close()

#if -1 means value doesn't exist
for i in range(0,244):
    data["nodes"][i]["p_auto"]=-1
    
#add prob auto to each skill set
with open('probAutoByOnetSkill.csv', 'rb') as f:
    reader = csv.reader(f)
    for row in reader:
        for i in range(0,244):
            if row[0]==data["nodes"][i]["name"]:
                data["nodes"][i]["p_auto"]=row[1]

jsonFile = open("data.json", 'w+')
jsonFile.write(json.dumps(data))
jsonFile.close()


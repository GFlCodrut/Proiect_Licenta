import urllib.request
import cv2
import numpy as np
from PIL import Image
from pytesseract import pytesseract
import mysql.connector
import datetime
import re



urll=["http://192.168.43.1:8080/shot.jpg"] #if we use multiple IP camera mobile
with urllib.request.urlopen("http://192.168.43.1:8080/shot.jpg") as url:
    urll = url.read()
    
cnx = mysql.connector.connect(
	host='192.168.43.29',
	user='user1',
	password='root',
	database='parkingappdb')


cursor = cnx.cursor()    
    
imgPath=urll
imgNp=np.array(bytearray(imgPath),dtype=np.uint8) 
img=cv2.imdecode(imgNp,-1)
cv2.imwrite("capturedImage.jpg",img)
cv2.imshow("image",img)






# Path to the image
image_path = r"/home/pi/Desktop/capturedImage.jpg"

# Opening the image
img = cv2.imread(image_path)

# Resizing the image if needed
img = cv2.resize(img, (600, 360))


# Extracting text from the image
text = pytesseract.image_to_string(img, config='--psm 11')

# Remove non-alphanumeric characters
filtered_text = re.sub(r'[^a-zA-Z0-9]', '', text)

# Converting the image to binary format
image_data = cv2.imencode('.jpg', img)[1].tobytes()

# Get the current date and time
current_datetime = datetime.datetime.now()

# Convert the current date and time to the desired format
timestamp = current_datetime.strftime('%Y-%m-%d %H:%M:%S')

# Inserting the image and text into the database
insert_query = "INSERT INTO records (licenseImage, licenseText,timestamp) VALUES (%s, %s, %s)"
data = (image_data, filtered_text, timestamp)


# Displaying the extracted text
if text[:-1] is None or text[:-1].strip()=="":
	print(filtered_text)
	print("Text not found!")
else:
	print(text)
	cursor.execute(insert_query, data)#image_data
	
cnx.commit()
print("Data send to the MySql Data Base.")

cursor.close()
cnx.close()








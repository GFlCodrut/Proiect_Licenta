# import mysql.connector

# # Connect to the MySQL server
# cnx = mysql.connector.connect(
#     host='localhost',
#     user='root',
#     password='root',
#     database='testdb1'
# )

# # Create a cursor object to execute SQL queries
# cursor = cnx.cursor()

# # Prepare the SQL query to insert text into the 'licenseText' field
# sql = "INSERT INTO records (licenseText) VALUES (%s)"

# # Define the text to insert
# text_to_insert = "This is the license text."

# # Execute the SQL query
# cursor.execute(sql, (text_to_insert,))

# # Commit the changes to the database
# cnx.commit()

# # Close the cursor and connection
# cursor.close()
# cnx.close()
# print("all done")

########################


import mysql.connector

mydb = mysql.connector.connect(
  host="192.168.1.4",
  user="root",
  password="root"
)

print(mydb)

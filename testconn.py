import mysql.connector

# MySQL connection details
cnx = mysql.connector.connect(
    host='192.168.43.29',
    user='user1',
    password='root',
    database='parkingappdb'
)

try:
    if cnx.is_connected():
        print('Connected to MySQL database!')

        # Perform database operations here

    else:
        print('Failed to connect to MySQL database!')

except mysql.connector.Error as e:
    print('Error connecting to MySQL database:', e)

finally:
    # Close the database connection
    cnx.close()

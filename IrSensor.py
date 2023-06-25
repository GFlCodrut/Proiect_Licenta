import RPi.GPIO as GPIO
import time

# Set GPIO mode and pin number
GPIO.setmode(GPIO.BCM)
sensor_pin = 17

# Set up the sensor pin as input
GPIO.setup(sensor_pin, GPIO.IN)

try:
    while True:
        if GPIO.input(sensor_pin):
            print("No movement.")
        else:
            print("Object detected!")

        time.sleep(3)  # Wait for 3 seconds

except KeyboardInterrupt:
    GPIO.cleanup()

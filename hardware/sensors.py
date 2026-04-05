import gpio_config as config

# Run in simulation mode if hardware is not detected
try:
    import RPi.GPIO as GPIO
    SIMULATION_MODE = False
except ImportError:
    SIMULATION_MODE = True
    print("Running in simulation mode - no hardware detected")

def read_sensor(which_sensor):
    if SIMULATION_MODE:
        print(f"{which_sensor} was read")
        return True
    else:
        if GPIO.input(which_sensor) == GPIO.HIGH:
            return True
        else:
            return False

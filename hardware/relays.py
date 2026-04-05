import gpio_config as config

# Run in simulation mode if hardware is not detected
try:
    import RPi.GPIO as GPIO
    SIMULATION_MODE = False
except ImportError:
    SIMULATION_MODE = True
    print("Running in simulation mode - no hardware detected")

# Set state for specific relay
def set_relay(which_relay, state):
    if SIMULATION_MODE:
        print(f"SIMULATION: relay {which_relay} set to {state}")
        return

    if state:
        GPIO.output(which_relay, GPIO.HIGH)
    else:
        GPIO.output(which_relay, GPIO.LOW)

# stop all relays
def turn_off_all_relays():
    set_relay(config.RELAY_DRAIN, False)
    set_relay(config.RELAY_WATER, False)
    set_relay(config.RELAY_DETERGENT, False)
    set_relay(config.RELAY_RINSE, False)
    set_relay(config.RELAY_SANITIZE, False)
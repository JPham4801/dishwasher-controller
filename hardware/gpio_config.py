# Relay pins
RELAY_DRAIN = 1             # replace with real pin number
RELAY_WATER = 2             # replace with real pin number
RELAY_DETERGENT = 3         # replace with real pin number
RELAY_RINSE = 4             # replace with real pin number
RELAY_SANITIZE = 5          # replace with real pin number

# Digital Input pins
DI_DOOR = 6                 # replace with real pin number
DI_START_BUTTON = 7         # replace with real pin number
DI_WATER_LEVEL = 8          # replace with real pin number
DI_PRESSURE_LEVEL = 9       # replace with real pin number
DI_EMERGENCY_STOP = 10      # replace with real pin number

# Machine settings
MIN_WATER_TEMP = 130        # Temperature in fahrenheit. Source from manufacturer's service checklist
MIN_PRESSURE = 0            # Replace with real min value. Pressure in PSI. Low pressure triggers critical error.
MAX_PRESSURE = 200          # Replace with real min value. Pressure in PSI. High pressure triggers critical error.
MIN_WATER_LEVEL = True      # Replace with real sensor type

#! /usr/bin/python
from gps import *
import time
import json
from flask import Flask
import threading
 
gpsd = gps(mode=WATCH_ENABLE|WATCH_NEWSTYLE) 
 
lat = 0.0
lon = 0.0
track = 0.0
magtrack = 0.0
magvar = 0.0
speed = 0.0
climb = 0.0
 
app = Flask(__name__)
@app.route('/')
def index():
    return json.dumps({'lat': lat,
                       'lon': lon,
                       'track':track,
                       'magtrack':magtrack,
                       'magvar':magvar,
                       'speed':speed,
                       'climb':climb
                       })
 
def get_gps_data():
    global lat
    global lon
    global track
    global magtrack
    global magvar
    global speed
    global climb 
    try:
        while True:
            report = gpsd.next() #
            if report['class'] == 'TPV':
 
                lat = getattr(report,'lat',0.0)
                lon = getattr(report,'lon',0.0)
                track = getattr(report,'track','0.0')
                magtrack = getattr(report,'magtrack','0.0')
                magvar = getattr(report,'magvar','0.0')
                speed =  getattr(report,'speed','0.0')
                climb = getattr(report,'climb','0.0')
            time.sleep(1) 
    except (KeyboardInterrupt, SystemExit): #when you press ctrl+c
        print("Done.\nExiting.")
 
if __name__=="__main__":
    threading.Thread(target=lambda: app.run()).start()
    get_gps_data()
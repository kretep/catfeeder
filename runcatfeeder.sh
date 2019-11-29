#!/bin/bash

#/usr/bin/fswebcam -r 640x480 -S 1 -l 1 --timestamp '%Y-%m-%d %H:%M:%S (%Z)' /home/pi/repos/catfeeder/public/stream.jpg > /dev/null 2>&1 &
#/usr/bin/fswebcam -r 640x480 -S 1 -l 1 --timestamp '%Y-%m-%d %H:%M:%S (%Z)' /home/pi/repos/catfeeder/public/stream.jpg > /tmp/fswebcam.log 2>&1 &
/usr/bin/fswebcam -r 640x480 -S 1 -l 1 --timestamp '%Y-%m-%d %H:%M:%S (%Z)' /home/pi/repos/catfeeder/public/stream.jpg > /dev/null 2>/tmp/fswebcam-error.log &

cd /home/pi/repos/catfeeder
sudo /usr/bin/node /home/pi/repos/catfeeder/index.js &

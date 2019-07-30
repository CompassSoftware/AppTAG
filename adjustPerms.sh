#!/bin/sh

# adjustPerms - adjust permissions
# script to make sure that all files have proper permissions

# to run this script you must make sure that the permssions
# on this script file are correct 
# by running this command: chmod a+rx adjustPerms.sh
# then you can run the script with this: ./adjustPerms

# recursively adds read permssion for all users to all files
chmod a+r -R *

# add search permission for all users on the folders
chmod a+x assets
chmod a+x assets/Panels
chmod a+x assets/Panels/RoomOne
chmod a+x assets/Panels/RoomTwo
chmod a+x assets/Puzzle

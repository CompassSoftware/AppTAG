#!/bin/sh

# adjustPerms - adjust permissions
# script to make sure that all files have proper permissions

# to run this script you must make sure that the permssions
# on this script file are correct 
# by running this command: chmod a+rx adjustPerms.sh
# then you can run the script with this: ./adjustPerms

# recursively adds read permssion for all users to all files
chmod -R a+r *
chmod a+r .
chmod a+x .

# add search permission for all users on the folders
chmod a+x assets
chmod a+x assets/Panels
chmod a+x assets/Panels/RoomOne
chmod a+x assets/Panels/RoomTwo
chmod a+x assets/Panels/RoomThree
chmod a+x assets/Panels/Journal_Room4
chmod a+x assets/Documents
chmod a+x assets/Room0
chmod a+x assets/Room1
chmod a+x assets/Room2
chmod a+x assets/Room2Act0
chmod a+x assets/Room2Act1
chmod a+x assets/Room2Act1/Puzzle
chmod a+x assets/Room2Act1/Puzzle/Puzzle
chmod a+x assets/Room2Act2
chmod a+x assets/Room3
chmod a+x assets/Room3Act1
chmod a+x assets/WinnersRoom
chmod a+x assets/Sounds
chmod a+x assets/Coin
chmod a+x assets/Map

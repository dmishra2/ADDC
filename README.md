# addc-automation-poc-tests

Steps to start:
1. npm install
2. npm install -g gulp-cli
3. Run Local appium server either on commandline or appium desktop client 

Steps to run single or multiple instance on test object:
1. Change or update parallel-travis.bat file to match the gulp task you want to run. 
2. In case, you want to run tests parallel use & operator at the end of each command but not the last one. For instance, gulp cucumber:android:testobject --tag <tagname> & gulp cucumber:ios:testobject --tag <tagname>.

Step to run single instance on local machine:
1. Change device details on devices.js file to match your test device/emulator
2. Run Android : gulp cucumber:android:local --tag <tagname>. 

Steps to run multiple instances in parallel on local machine.

Preparation to match environment to your local one - 
1. Supply your current emulator settings in scripts/nodeconfig.json file. The settings include: avd name, emulator name, OS version, platform and android port.
2. Create new nodeconfig.json for each of the emulator but make sure you use different appium port.
3. Supply relevant appium port, bootstrap port, emulator name and nodeconfig.json in appium_launch.bat file. Make sure the bootstrap port for the first emulator is 4726 and appium port is 4723. The second emulator and onwards should have ports with increments of 4. Each emulator's appium port launch command should end with & sign except the last one.
4. Supply similar information in parallel-local.bat file. i.e. relevant tag, avd name and devicename.
5. Get all the emulators ready.

Steps:
1. Move to scripts folder using command cd scripts
2. Start Selenium standalone server by running appium_grid.bat file using command ./appium_grid.bat
3. Once the standalone server/grid is launched, launch parallel appium servers on different ports. ./appium_launch.bat
4. Launch the parallel execution by supplying command - ./parallel-local.bat




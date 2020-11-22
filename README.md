# port-simulation-ts

Wellcome to Port-simulator !)
-----------------------------
---DESCRIPTION---

In this program, you can see the work of the ports and ships. Green ships are initially empty and red, on the contrary, full. Ships go to the ports and start either loading or unloading. Important rule: red ships can unload only in empty ports, and green ships can load only in full ports. If all ports are occupied, or there aren't full ports for green ships, or there aren't empty ports for red ships, they come to the bypass, where they wait for their turn. When a ship finished its business in port, it returns to sea and disappears from the game field.

---SETUP---

1.Download this repository on your device.
2.Use command npm install
```
$ npm install
```
to install all the necessary packages.
3.Use command npm start, to start the program.
```
$ npm start
```
4.enjoy :)

---UPDATES---

Current version: 1.02

1.02 ----------------

-Added enums
-Added interfaces
-Added function, that checks if the queue is full, and send other ships back in the sea
-Code was refactored and became shorter and more readable

1.01 ----------------

-Fixed bug with program launch on GitHub Pages
-Was reduced quantity of "any" types of data
-"Require" were changed on Imports
-Code was split at files according to their functions
-Ports are realized by Pixi elements instead of HTML elements
-Deleted all not used functions
-Fixed naming of classes and functions
-Fixed ships movement 
-Added responsive web-design
-Added commentaries to functions
-Added readme file in the repository


---LINKS---

Development branch link - https://github.com/VVGhost5/port-simulation-ts/tree/dev
The working version of this program you can test here - https://vvghost5.github.io/port-simulation-ts/

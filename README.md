## Drawer

Drawer is a 2D graphics editor that supports basic drawing operations. These operations include:

- Drawing shapes:
  - Line
  - Circle
  - Square
  - Triangle
- 2D Transformations:
  - Translation
  - Rotation
  - Scaling
- Zoom in
- Zoom extend (viewport)
- Clear

Drawer also provides two types of user interation, one by clicking on the drawing board and the second to insert commands.

### Instructions to Graphic User Interface
The navigation bar, allocated on the top of the application has all the buttons necessary to use the program. Once you drew a shape in the canvas, the name of the object with it's respective id will pop up on the top right corner of the screen. In front of the shape name will appear two icons, the first is to select the shape, and the last is to delete the shape. Once selected, the shape will change it's color to red. After select one or more object, it's possible to apply the transformations (Translation, Rotation, Scaling).

If you want to cancel the current operation, just press the key ESC at any time. 

### Instructions to command line

To open the command line, use the shortcut
`CRTL+SHIFT+K` on Firefox or `CRTL+SHIFT+J` on Chrome The workflow on the command line is similar to the GUI. First you have to create the shape, then you have to select, lastly you can apply thetransformation. Example:
```
create_line(x1, x2)
select_shape(id_shape)
scale(x1,x2)
```


| Command                               | Description                                |
| ---------------                       | -----------------------------------------  |
| create_line(x1, y1, x2, y2)           | Creates a line connecting two points       |
| create_triangle(x1, y1, x2, y2)       | Creates lines connecting three point       |
| create_square(x1, y1, x2, y2)         | Creates lines connecting four point        |
| create_circle(x1, y1, x2, y2)         | Creates a circle using a point and radius  |
| zoom_in(x1, y1, x2, y2)               | Zooms in a quadratic area                  |
| zoom_extend()                         | Adjust the viewport to fit the screen      |
| translate(x1, y1, x2, y2)             | Translate object to a determined point     |
| scale(x, y)                           | Scales an object using a point             |
| rotate(x, y, angle)                   | Rotates an object using an angle in degrees|
| undo (crtl + z)                       | Undo the last command                      |
| redo (crtl + y)                       | Redo the last command                      |
| clear (crtl + r)                      | Clear all the elements in the screen       |

## Technical specification
This program was written in Javascript with the library `Redux`.

To install `Redux` you can run the following command:

`npm install redux`

obs: This assumes you are using `npm` as your package manager.

## Run the drawer
To execute the program, you need to run the following command:

`npm install`
`node index.js`



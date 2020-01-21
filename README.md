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

Instructions

| Command         | Description                               |
| --------------- | ----------------------------------------- |
| create_line     | Creates a line connecting two points      |
| create_triangle | Creates lines connecting three point      |
| create_square   | Creates lines connecting four point       |
| create_circle   | Creates a circle using a point and radius |
| zoom_in         | Zooms in a quadratic area                 |
| zoom_extend     | Adjust the viewport to fit the screen     |
| translate       | Translate object to a determined point    |
| scale           | Scales an object using a point            |
| rotate          | Rotates an object using an angle          |
| undo (crtl + z) | Undo the last command                     |
| redo (crtl + y) | Redo the last command                     |
| help (crtl + h) | Open the instructions                     |

## Technical specification
This program was written in Javascript with the library `Redux`.

To install `Redux` you can run the following command:

`npm install redux`

obs: This assumes you are using `npm` as your package manager.

## Run the drawer
To execute the program, you need to run the following command:

`npm install`
`node index.js`



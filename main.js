import './style.css'

import { Application, Container, Sprite, Assets, Text, TextStyle,Graphics, Point,Color, Rectangle} from 'pixi.js';
import { remap, random} from './util.js';
import { Mover } from "./mover.js";
import { Vector } from "./vector.js";
import { Button } from "./button.js";
import { Grid } from "./grid.js";

(async () =>
{
  //=====================================================
  // Create a new application
  const app = new Application();
  // Initialize the application
  await app.init({ background: '#1099bb', resizeTo: window });
  //await app.init({ background: '#1099bb', width: 1600,height:900 });
  // Append the application canvas to the document body
  document.body.appendChild(app.canvas);
  //====================================================
  // SETUP
  const WIDTH = app.screen.width;
  const HEIGHT = app.screen.height;
  const CENTERX = WIDTH/2;
  const CENTERY = HEIGHT/2;
  let LIGHTCOLOR = "#FFF5E0";
  let LIGHTGREEN = "mint";
  let MIDDLEGREEN = "#41b06e"
  let DARKGREEN = "#436850";
  let DARKBLUE = "#141e46";

  let mouseX = 0;
  let mouseY = 0;
  let clickX = 0;
  let clickY = 0;

  let globalMouseDown = false;
  let globalPointerMove = false;

  console.log(WIDTH);
  console.log(HEIGHT);

  app.stage.eventMode = "static";
  app.stage.hitArea = app.screen;
  app.stage.on('pointermove',(e) => {
    mouseX = e.global.x;
    mouseY = e.global.y;
  });
  app.stage.on("pointerdown",(e) => {
    //console.log(e.global);
    clickX = e.global.x;
    clickY = e.global.y;
    globalMouseDown = true;

  });
  app.stage.on("pointerup",(e) => {
    globalMouseDown = false;

  });
  

//===================================================
// TEXT OBJECTS
const titleText = new Text({ 
    text: 'Summoning Thing',
  style:{
    fontFamily: 'Arial',
    fontSize: 100,
    fontWeight: "bold",
    //fontStyle: "italic",
    fill: "green",
    stroke: { color: 'white', width: 5, join: 'round' },
    dropShadow: {
      color: "black",
      blur: 4,
      angle: Math.PI / 6,
      distance: 6,
    },
    wordWrap: true,
    wordWrapWidth: 500,

} });

titleText.anchor.x = 0.5;
titleText.anchor.y = 0.5;
titleText.x = CENTERX;
titleText.y = 200;
titleText.eventMode = "none";

//---------------------------------------

const scoreText = new Text({ 
  text: '0',
style:{
  fontFamily: 'Arial',
  fontSize: 50,
  fill: "black",
  stroke: { color: 'white', width: 5, join: 'round' },

} });

scoreText.anchor.x = 1; // score grows left
scoreText.anchor.y = 0.5;
scoreText.x = WIDTH - 20;
scoreText.y = 50;
scoreText.eventMode = "none";

//-----------------------------------

const timerText = new Text({ 
  text: '0',
style:{
  fontFamily: 'Arial',
  fontSize: 50,
  fill: "black",
  stroke: { color: 'white', width: 5, join: 'round' },

} });

timerText.anchor.x = 0;
timerText.anchor.y = 0.5;
timerText.x = CENTERX-50;
timerText.y = 50;
timerText.eventMode = "none";

const startBtnText = new Text({ 
  text: 'Start',
style:{
  fontFamily: 'Arial',
  fontSize: 25,
  fill: "black",
  stroke: { color: 'white', width: 5, join: 'round' },

} });

startBtnText.anchor.x = 0.5;
startBtnText.anchor.y = 0.5;
startBtnText.eventMode = "none";





//-------------------------------------------
const infoText = new Text({ 
  text: 'Use mouse to draw, then hit start.',
style:{
  fontFamily: 'Arial',
  fontSize: 40,
  fontWeight: "bold",
  //fontStyle: "italic",
  fill: "black",
  stroke: { color: 'white', width: 5, join: 'round' },
} });

infoText.anchor.x = 0.5;
infoText.anchor.y = 0.5;
infoText.x = CENTERX;
infoText.y = HEIGHT - 30;
infoText.eventMode = "none";
//===================================================
// UI
let normal = "green";
let hover = "#b0ff00";
let press = "#003f00";
let startBtn = new Graphics();
let startBtnClicked = false;

startBtnText.x = CENTERX;
startBtnText.y = 425;

startBtn.roundRect(-100,0,200,50,5);
startBtn.fill("green");
startBtn.stroke({width:2,color:"white"});
startBtn.x = CENTERX;
startBtn.y = 400;
startBtn.eventMode = "static";
startBtn.hitArea = new Rectangle(-100,0,200,50);
startBtn.on("pointerleave",(e) => {
  //console.log("leave");
  startBtn.clear();
  startBtn.roundRect(-100,0,200,50,5);
  startBtn.fill(normal);// normal color
  startBtn.stroke({width:2,color:"white"});
}).on("pointerout",(e) => {
  //console.log("out");
  startBtn.clear();
  startBtn.roundRect(-100,0,200,50,5);
  startBtn.fill(normal);// normal color
  startBtn.stroke({width:2,color:"white"});
}).on("pointerenter",(e) => {
  //console.log("enter");
  startBtn.clear();
  startBtn.roundRect(-115,-10,230,70,5);
  startBtn.fill(hover);// light color
  startBtn.stroke({width:2,color:"white"});
}).on("pointerup",(e) => {
  //console.log("up");
  startBtn.clear();
  startBtn.roundRect(-115,-10,230,70,5);
  startBtn.fill(hover);// light color
  startBtn.stroke({width:2,color:"white"});
}).on("pointerdown",(e) => {
  //console.log("down");
  startBtn.clear();
  startBtn.roundRect(-115,-10,230,70,5);
  startBtn.fill(press);// dark color
  startBtn.stroke({width:2,color:"white"});
  startBtnClicked = true;
}).on("pointerover",(e) => {
  //console.log("over");
  startBtn.clear();
  startBtn.roundRect(-115,-10,230,70,5);
  startBtn.fill(hover);// light color
  startBtn.stroke({width:2,color:"white"});
});



//===================================================


//=======================================================


const gridContainer = new Container();

function drawGrid(){

  //for(let x = 0; x < 100; x++){
  //  grid_rect(random(0,WIDTH),random(0,HEIGHT),gridCell,gridCell);
  
  //}
  //console.log("draw grid");
  // draw interactive grid

  // for(let x = 0; x < 300; x += gridCell){
  //   for(let y = 0; y < 300; y += gridCell){
  //     grid_rect(x,y,gridCell,gridCell);
  //     //stroke({width:2,color:"blue"});
  //     //grid.set(new Vector(x,y),0);
  //   }
  // }


  // draw visual grid
  // for(let x = 0; x < 300; x += gridCell){
  //   for(let y = 0; y < 300; y += gridCell){
  //     const gr = new Graphics().circle(0,0,20);
  //     gr.stroke({width:2,color:"black"});
  //     gr.x = x + 25;
  //     gr.y = y + 25;
  //     gr.eventMode = "none";
  //     gridContainer.addChild(gr);
 
  //   }
  // }
}
//=======================================================
















  // usefull for examples, delete later

  // Create and add a container to the stage
  //const container = new Container();
  //app.stage.addChild(container);

  // Load the bunny texture
  //const texture = await Assets.load('https://pixijs.com/assets/bunny.png');
  //const bunny = new Sprite(texture);
    

  //==================================================
  // UPDATE
  let prevScene = null; // global scum needed for sceneManager
  let doOnce = true;

  let m1 = new Mover(0,0);
  const g = new Graphics();
  g.eventMode = "none";
  let prev = new Vector(0,0); // for drawing

  // if true automata will calculate
  // make sure theres stuff to draw for this
  let calculate = false;

  let FUCKINGSTOP = false;

  let genBtn = new Button(WIDTH - 150,100,100,50);
  let stopBtn = new Button(WIDTH - 150,200,100,50);
  let resetBtn = new Button(WIDTH - 150,300,100,50);

  //-------------------------------------------------
  const title = (time) =>
  {
    if(doOnce){
      //printChildren();
      removeChildren();
      //console.log("in title");
      doOnce = false;

      app.stage.addChild(titleText);
      app.stage.addChild(startBtn);
      app.stage.addChild(startBtnText);
    }
    if(startBtnClicked){
      startBtnClicked = false;
      //console.log("title clicked");
      doOnce = true;
      sceneManager(main);
    }
    

  }
  //-------------------------------------------------
  let tutorial = () => {
    if(doOnce){
      removeChildren();
      //console.log("in tutorial");
      doOnce = false;
      drawTutorial();
      startBtnClicked = false;
    }
    
  };
  //-------------------------------------------------



  let generation = 0;
  let timeID;
  let timeOut = 500;
  let timer = (time) => {
    FUCKINGSTOP = true;
  }

  const main = (time) =>
  {
    if(doOnce){
      console.log("main")
      timeID = clearInterval(timeID);
      FUCKINGSTOP = false;
      //printChildren();
      removeChildren();
      //console.log("in main");
      doOnce = false;
      startBtnClicked = false;
      //app.stage.addChild(timerText);
      app.stage.addChild(scoreText);
      m1.setApp(app);
      gridContainer.anchor = 0.5;
      
      gridContainer.x = CENTERX - GRIDWIDTH/2;
      gridContainer.y = CENTERY - GRIDHEIGHT/2;
      
      app.stage.addChild(gridContainer);
      
      app.stage.addChild(infoText);

      genBtn.add(app);
      stopBtn.add(app);
      stopBtn.setText("Stop");
      resetBtn.add(app);
      resetBtn.setText("Reset");
      //console.log(app.stage.children);

      generation = 0;
      scoreText.text = "0";

      // this is default grid
      grid = new Grid();
      grid.create(GRIDWIDTH,GRIDHEIGHT,cellSize);
      drawingGrid(grid);
       
      let gb = new Graphics().rect(0,0,GRIDWIDTH,GRIDHEIGHT);
      gb.x = CENTERX - GRIDWIDTH/2;
      gb.y = CENTERY - GRIDHEIGHT/2;
      gb.stroke({width:4,color:DARKBLUE});
      app.stage.addChild(gb);

       // this is the random grid
      // grid.createRandom(GRIDWIDTH,GRIDHEIGHT,cellSize);
      // drawGrid(grid);

      // draw visual grid
      let blah = new Graphics();
      blah.x = CENTERX - GRIDWIDTH/2;
      blah.y = CENTERY - GRIDHEIGHT/2;

      for(let x = 0; x < GRIDWIDTH; x += cellSize){
        for(let y = 0; y < GRIDHEIGHT; y += cellSize){   
            blah.rect(x,y,cellSize,cellSize);
            //blah.fill("white");
            blah.stroke({width:2,color:"gray"});
            blah.zIndex = -10;
        }
      }
      app.stage.addChild(blah);

    }
    //let t = 0.01 * time.deltaTime;
    //let p = +timerText.text;
    //timerText.text = Number.parseFloat(t + p).toFixed(2);
    
    //console.log(mouseX + "/" + mouseY);
    //m1.setTarget(mouseX,mouseY);
    //m1.move();
    //m1.edges();
  //===================================================
    // calculate cell automata

    
    // start button
    if(genBtn.pressed()){
      genBtn.setPressed(false);
      console.log("start pressed");
      timeID = setInterval(timer,timeOut);
      scoreText.text = "0";

    }
    // stop button
    if(stopBtn.pressed()){
      stopBtn.setPressed(false);
      console.log("stop pressed");
      timeID = clearInterval(timeID);
      FUCKINGSTOP = false;
    }
    // reset button
    if(resetBtn.pressed()){
      resetBtn.setPressed(false);
      console.log("reset pressed");
      FUCKINGSTOP = false;
      grid.create();
      let kids = gridContainer.children;
      let len = kids.length;
      for(let c of kids){
        gridContainer.removeChildren(0,len);
      }
      scoreText.text = "0";
      doOnce = true;
      sceneManager(main);
      g.clear();
    }


    if(FUCKINGSTOP){
      FUCKINGSTOP = false;
      //genBtn.setPressed(false)
      console.log("calculate is true" + calculate);
      //g.clear()'
      calculateEverything();
    }
   
          


      
    
    

    
  //===================================================

  //-------------------------------------
  // draw line here
  if(globalMouseDown){
    if(prev.x === 0 && prev.y === 0){
      //console.log("0 0");
      prev.x = mouseX;
      prev.y = mouseY;
    }
    //m1.setTarget(mouseX,mouseY);
    //m1.move();
    g.moveTo(prev.x,prev.y);
    g.lineTo(mouseX,mouseY);
    g.stroke({width:2,color:"#adbc9f"});
    app.stage.addChild(g);

    prev.x = mouseX;
    prev.y = mouseY;
  }else{
    prev.x = mouseX;
    prev.y = mouseY;
  }  
  //   //scoreText.text = "0";
  //   //g.clear();
    
  //   //for(let c of gridContainer.children){
  //   //  if(c instanceof Graphics){
  //   //    c.alpha = 0;
  //   //  }
  //   //}

    
  // }
    //-------------------------------------

  }

  //=================================================

  sceneManager(title);


















  //==================================================
  // CELL AUTOMATA STUFF
  let tempGrid = {};
  let cellSize = 10;
  let GRIDWIDTH = 800;
  let GRIDHEIGHT = 800;

  let border = new Graphics().rect(0,0,GRIDWIDTH,GRIDHEIGHT);
  //border.fill("black");
  border.stroke({width:5,color:"black"});
  

  let grid;


  // replace this with drawing later
  function resetGridDrawing(){
    for(let x = 0; x < GRIDWIDTH; x += cellSize){
      for(let y = 0; y < GRIDHEIGHT; y += cellSize){
        //let value = gridValue.getCell(x,y);
          // draw stuff
          let blah = grid_rect(x,y,cellSize,cellSize);
          //if(value === 1){
          blah.alpha = 0;
          //}
      }
    }
  }
  function drawGridRandom(gridValue){
    gridValue = new Grid();
    gridValue.createRandom(GRIDWIDTH,GRIDHEIGHT,cellSize);
    for(let x = 0; x < GRIDWIDTH; x += cellSize){
      for(let y = 0; y < GRIDHEIGHT; y += cellSize){
        let value = gridValue.getCell(x,y);
          // draw stuff
          let blah = grid_rect(x,y,cellSize,cellSize);
          if(value === 1){
             blah.alpha = 1;
          }
      }
    }
  }

  function drawingGrid(gridValue){
    //grid.createRandom(GRIDWIDTH,GRIDHEIGHT,cellSize);
    
    for(let x = 0; x < GRIDWIDTH; x += cellSize){
      for(let y = 0; y < GRIDHEIGHT; y += cellSize){
          //let value = gridValue.getCell(x,y);  
          
          let blah = drawing_rect(x,y,cellSize,cellSize);
          //if(value === 1){
          // blah.alpha = 1;
          //}
      }
    }
  }

  function drawGrid(gridValue){
    //grid.createRandom(GRIDWIDTH,GRIDHEIGHT,cellSize);
    
    for(let x = 0; x < GRIDWIDTH; x += cellSize){
      for(let y = 0; y < GRIDHEIGHT; y += cellSize){
          let value = gridValue.getCell(x,y);  
          let blah = grid_rect(x,y,cellSize,cellSize);
          if(value === 1){
             blah.alpha = 1;
          }
      }
    }

    //grid.print();
    //grid.createFrom(tempGrid,GRIDWIDTH,GRIDHEIGHT,cellSize);
    //grid.print();
  }
  //------------------------------------------

  function calculateEverything(){
    let next = new Grid();
      next.create(GRIDWIDTH,GRIDHEIGHT,cellSize);

      // Compute next based on grid
      for (let x = 0; x < GRIDWIDTH; x += cellSize) {
        for (let y = 0; y < GRIDHEIGHT; y += cellSize) {
          //let state = grid[i][j];
          //grid.print();
          let state = grid.getCell(x,y);
          //console.log("state = " + state);
          
          // Count live neighbors!
          let sum = 0;
          //console.log("-------------------");
          sum = grid.countNeighbors(x,y);
          //console.log("sum " + sum);
          
          //console.log("-------------------");
          let neighbors = sum;

          if (state == 0 && neighbors == 3) {
            //next[i][j] = 1;
            next.setCell(x,y,1);
          } else if (state == 1 && (neighbors < 2 || neighbors > 3)) {
            //next[i][j] = 0;
            next.setCell(x,y,0);
          } else {
            //next[i][j] = state;
            next.setCell(x,y,state);
          }
        }

      
      }
      
      let kids = gridContainer.children;
      let len = kids.length;
      for(let c of kids){
        gridContainer.removeChildren(0,len);
      }

      drawGrid(next);
      grid = next;
      generation += 1;
      scoreText.text = generation;
  }
  //------------------------------------------















  //==================================================
  // UTILITY FUNCTIONS

  function sceneManager(func){
    //console.log(func);
    if(prevScene){
        // this changes the scene
        //console.log("removing");
        app.ticker.remove(prevScene);
    }
    //console.log(prev);
    app.ticker.add(func);
    prevScene = func;
  }
  //-----------------------------
  function printChildren(){
    console.log(app.stage.children);
  }

  function removeChildren(){
    for(let c of app.stage.children){
      app.stage.removeChildren(0,app.stage.children.length);
    }
    
  }


  //---------------------------------------
// this is specifically for the grid
let gridTarget = new Vector();
let gridTarget2 = new Vector();

let prevAlpha = 0;

let pover = false;

let textValue = 0;
let gridText = new Text();


//-----------------------------------------
function drawing_rect(x,y,w,h){
  let rx = x + (w/2);
  let ry = y + (h/2);

  let r = new Graphics();
  textValue = "";
  // -------------------------------
  //text shows up for each cell
  gridText = new Text({ 
    text: textValue,
  style:{
    fontFamily: 'Arial',
    fontSize: 25,
    fill: "black",
    stroke: { color: 'white', width: 5, join: 'round' },

  } });

  gridText.anchor.x = 0.5;
  gridText.anchor.y = 0.5;
  gridText.x = rx;
  gridText.y = ry;
  gridText.eventMode = "none";
  
  //-------------------------------


  r.eventMode = "static";
  r.hitArea = new Rectangle(x,y,w+1,h+1);
  //game.graphicsObject(r);
  r.rect(x,y,w,h);
  //r.circle(x+25,y+25,20);
  r.fill(DARKGREEN);
  r.stroke({width:2,color:"white"});
  r.alpha = 0;
  r.zIndex = 10;
  //--------------------------------
  r.on("pointerenter",(e) => {
    // for gw1 to follow mouse on grid
    //gridTarget2 = new Vector(x,y);
    // for turning off cells when we enter and activated
    if(globalMouseDown){
 
      // add each new cell taht we enter
      
      //console.log(total);
      //console.log(grid.get(vectorToMap(x,y)));
      if(grid.getCell(x,y) === 0){
        //let total = +scoreText.text + +gridText.text;
        //scoreText.text = total;
        //gridText.text = '🐭';
        r.alpha = 1;
        grid.setCell(x,y,1);
        //if(grid.get(vectorToMap(x,y))){
        //  console.log(x + " " + y);
        //};
        //console.log(grid.get(new Vector(x,y)));
        
      }//else{
        //r.alpha = 0;
        //gridText.text = "0";
      }
    //}
    //console.log(grid.get(vectorToMap(x,y)));
  });
  r.on("pointerdown",(e) => {
    // add the number we click on first
    //console.log(grid.get(vectorToMap(x,y)));
    if(grid.getCell(x,y) === 0){
        //gridText.text = '🐭';
        r.alpha = 1;
        grid.setCell(x,y,1);
        //if(grid.get(vectorToMap(x,y))){
        //  console.log(x + " " + y);
        //};
        //console.log(grid.get(new Vector(x,y)));
        //let total = +scoreText.text + +gridText.text;
    //console.log(total);
    //scoreText.text = total;
        //gridText.text = "0";
        //grid.set(new Vector(x,y),1);
      }//else{
        //r.alpha = 1;
        //gridText.text = "1";
        //grid.set(new Vector(x,y),0);
     // }
      //console.log(grid.get(vectorToMap(x,y)));
  });
  let mouseDown = false;
  let path = [];

  r.on("pointerup",(e) => {
    //scoreText.text = "0";
    //g.clear();
  });

  r.on("pointerover",(e) => {
    pover = true;
  });
  r.on("pointerout",(e) => {
    pover = false;
  });

  
  //gridContainer.addChild(gridText);
  gridContainer.addChild(border);
  gridContainer.addChild(r);
  
  //app.stage.addChild(gridText);
  //app.stage.addChild(r);
  return r;
}
//-----------------------------------------

function grid_rect(x,y,w,h){
  let rx = x + (w/2);
  let ry = y + (h/2);

  let r = new Graphics();
  textValue = "";
  // -------------------------------
  //text shows up for each cell
  gridText = new Text({ 
    text: textValue,
  style:{
    fontFamily: 'Arial',
    fontSize: 25,
    fill: "black",
    stroke: { color: 'white', width: 5, join: 'round' },

  } });

  gridText.anchor.x = 0.5;
  gridText.anchor.y = 0.5;
  gridText.x = rx;
  gridText.y = ry;
  gridText.eventMode = "none";
  
  //-------------------------------


  r.eventMode = "static";
  r.hitArea = new Rectangle(x,y,w+1,h+1);
  //game.graphicsObject(r);
  r.rect(x,y,w,h);
  //r.circle(x+25,y+25,20);
  r.fill(DARKGREEN);
  r.stroke({width:2,color:"white"});
  r.alpha = 0;
  r.zIndex = -10;
  //--------------------------------
  r.on("pointerenter",(e) => {
    // for gw1 to follow mouse on grid
    //gridTarget2 = new Vector(x,y);
    // for turning off cells when we enter and activated
    if(globalMouseDown){
 
      // add each new cell taht we enter
      
      //console.log(total);
      //console.log(grid.get(vectorToMap(x,y)));
      //if(grid.getCell(x,y) === 0){
        //let total = +scoreText.text + +gridText.text;
        //scoreText.text = total;
        //gridText.text = '🐭';
       // r.alpha = 1;
        //grid.setCell(x,y,1);
        //if(grid.get(vectorToMap(x,y))){
        //  console.log(x + " " + y);
        //};
        //console.log(grid.get(new Vector(x,y)));
        
      //}else{
        //r.alpha = 0;
        //gridText.text = "0";
      }
    //}
    //console.log(grid.get(vectorToMap(x,y)));
  });
  r.on("pointerdown",(e) => {
    // add the number we click on first
    //console.log(grid.get(vectorToMap(x,y)));
    //if(grid.getCell(x,y) === 0){
        //gridText.text = '🐭';
       // r.alpha = 1;
       // grid.setCell(x,y,1);
        //if(grid.get(vectorToMap(x,y))){
        //  console.log(x + " " + y);
        //};
        //console.log(grid.get(new Vector(x,y)));
        //let total = +scoreText.text + +gridText.text;
    //console.log(total);
    //scoreText.text = total;
        //gridText.text = "0";
        //grid.set(new Vector(x,y),1);
      //}else{
        //r.alpha = 1;
        //gridText.text = "1";
        //grid.set(new Vector(x,y),0);
     // }
      //console.log(grid.get(vectorToMap(x,y)));
  });
  let mouseDown = false;
  let path = [];

  r.on("pointerup",(e) => {
    //scoreText.text = "0";
    //g.clear();
  });

  r.on("pointerover",(e) => {
    pover = true;
  });
  r.on("pointerout",(e) => {
    pover = false;
  });

  
  //gridContainer.addChild(gridText);
  gridContainer.addChild(border);
  gridContainer.addChild(r);
  
  //app.stage.addChild(gridText);
  //app.stage.addChild(r);
  return r;
}
  //==================================================
})();

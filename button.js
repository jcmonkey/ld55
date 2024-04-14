import {Text, Graphics, Rectangle, Container} from "pixi.js";

export class Button {
    constructor(x,y,w,h,app){
        this.app = app;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.b = new Graphics().roundRect(this.x,this.y,this.w,this.h,10);
        this.b.fill("green");
        this.b.stroke({width:4,color: "white"});
        this.text = "Start";
        this.normal = "green";
        this.hover = "#b0ff00";
        this.press = "#003f00";
        this.clicked = false;
        this.b.eventMode = "static";
        this.b.hitArea = new Rectangle(this.x,this.y,this.w,this.h);

        this.bText = new Text({ 
            text: 'Start',
          style:{
            fontFamily: 'Arial',
            fontSize: 25,
            fill: "black",
            stroke: { color: 'white', width: 5, join: 'round' },
          
          } });
          
        this.bText.zIndex = 100;
        this.bText.anchor.x = 0.5;
        this.bText.anchor.y = 0.5;
        this.bText.eventMode = "none";
        
        this.bText.x = this.x + this.w/2;
        this.bText.y = this.y + this.h/2;

        this.holder = new Container();
        this.holder.addChild(this.bText)
        this.holder.addChild(this.b);

        

        this.b.on("pointerleave",(e) => {
            //console.log("leave");
            this.b.fill(this.normal);
            this.b.stroke({width:4,color: "white"});
          }).on("pointerout",(e) => {
            //console.log("out");
            this.b.fill(this.normal);
            this.b.stroke({width:4,color: "white"});
          }).on("pointerenter",(e) => {
            //console.log("enter");
            this.b.fill(this.hover);
            this.b.stroke({width:4,color: "white"});
          }).on("pointerup",(e) => {
            //console.log("up");
            this.clicked = false;
            this.b.fill(this.normal);
            this.b.stroke({width:4,color: "white"});
          }).on("pointerdown",(e) => {
            //console.log("down");
            this.clicked = true;
            this.b.fill(this.press);
            this.b.stroke({width:4,color: "white"});
          }).on("pointerover",(e) => {
            //console.log("over");
            this.b.fill(this.hover);
            this.b.stroke({width:4,color: "white"});
          });
    }
    add(app){
        this.app = app;
        this.app.stage.addChild(this.holder);
    }
    pressed(){
        return this.clicked;
    }
    setPressed(c){
        this.clicked = c;
    }
    fill(c){
        this.b.fill(c);
    }
    stroke(s){
        this.b.stroke(s);
    }
    setText(t){
        this.text = t;
        this.bText.text = t;
    }
    setNormalColor(nc){
        this.normal = nc;
    }
    setPressColor(pc){
        this.press = pc;
    }
    setHoverColor(hc){
        this.hover = hc;
    }
}

export default Button;




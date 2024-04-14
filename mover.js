import {Vector} from "./vector.js";
import {remap, random} from './util.js';
import {Graphics} from 'pixi.js';

export class Mover {
    constructor(x=0,y=0,visual=new Graphics()){
        this.pos = new Vector(x,y);
        this.vel = new Vector();
        this.acc = new Vector();
        this.target = new Vector();
        this.prevTarget = new Vector();
        this.arrived = false;
        this.visual = visual;
        this.speed = 2;
        this.canMove = true;
        this.r = 10
        this.maxSpeed = 6;
        this.maxForce = 0.4;
        this.app = null;
        this.count = 0;

    }

    setApp(app){
        this.app = app;
        //console.log(this.app);
        //this.visual = new Graphics().circle(0,0,10).stroke({width:3,color:"green"});
        this.visual = new Graphics().rect(0,0,10).stroke({width:3,color:"white"});
        this.app.stage.addChild(this.visual);
    }

    setVisual(visual){
        this.visual = visual;
    }

    setTarget(x,y){
        this.target = new Vector(x,y);
    }

    applyForce(force){
        this.acc.add(force);
    }

    evade(vehicle) {
        let pursuit = this.pursue(vehicle);
        pursuit.mult(-1);
        return pursuit;
    }

    pursue(vehicle) {
        let target = vehicle.pos.copy();
        let prediction = vehicle.vel.copy();
        prediction.mult(10);
        target.add(prediction);
        //fill(0, 255, 0);
        //circle(target.x, target.y, 16);
        return this.seek(target);
    }

    arrive(target) {
        // 2nd argument true enables the arrival behavior
        return this.seek(target, true);
    }

    flee(target) {
        return this.seek(target).mult(-1);
    }

    seek(target, arrival = false) {
        let force = Vector.sub(target, this.pos);
        let desiredSpeed = this.maxSpeed;
        if (arrival) {
          let slowRadius = 100;
          let distance = force.mag();
          if (distance < slowRadius) {
            this.arrived = false;
            desiredSpeed = remap(distance, 0, slowRadius, 0, this.maxSpeed);
          }
          if(distance < 3){
            this.arrived = true;
          }
        }
        force.setMag(desiredSpeed);
        force.sub(this.vel);
        force.limit(this.maxForce);
        return force;
    }
    
    move(){
        if(this.canMove){
            // calculate acceleration
            //this.acc = this.vectorTo(this.target);
            //this.acc.setMag(1);
            //this.arrive(this.target);
            this.applyForce(this.arrive(this.target));

            // calculate the velocity
            this.vel.add(this.acc);
            this.vel.limit(this.maxSpeed);

            // add velocity to position
            this.pos.add(this.vel);
            
            this.acc.mult(0);
            // make the visual match the changes
            if(!this.arrived){ 
                //console.log("same target");
                //this.count += 1;
                //console.log(this.count);
                //this.visual.circle(0,0,10).stroke({width:3,color:"green"});
                //this.app.stage.addChild(this.visual);
                this.visual.x = this.pos.x;
                this.visual.y = this.pos.y;
            }

            
            
            this.prevTarget = this.target;
        }
        
        
        // desired = target - pos
        // desired = mouse - pos
    }

    edges(width,height) {
        if (this.pos.y >= height-this.r) {
            this.pos.y = height-this.r;
            //this.vel.y *= -1;
        } else if (this.pos.y <= this.r) {
            this.pos.y = this.r;
            //this.vel.x *= -1;
        }
    
        if (this.pos.x >= width-this.r) {
            this.pos.x = width-this.r;
            //this.vel.x *= -1;
        } else if (this.pos.x <= this.r) {
            this.pos.x = this.r;
            //this.vel.x *= -1;
        }
    }

    vectorTo(target){
        return Vector.sub(target,this.pos);
    }
}

export default Mover;
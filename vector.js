// this is a copy of p5's vector class

//======================================
const _PI = Math.PI;
const PI = _PI;
const HALF_PI = _PI / 2;
const QUARTER_PI = _PI / 4;
const TAU = _PI * 2;
const TWO_PI = _PI * 2;

export default function def_func(){}

export class Vector {
    constructor(x=0,y=0){
        this.x = x || 0;
        this.y = y || 0;
    }
    //----------------------------------
    toString(){
        return [this.x,this.y].toString();
    }
    //----------------------------------
    set(x,y){
        if(x instanceof Vector){
            this.x = x.x || 0;
            this.y = x.y || 0;
            return this;
        }
        if(Array.isArray(x)){
            this.x = x[0] || 0;
            this.y = x[1] || 1;
            return this;
        }
        this.x = x || 0;
        this.y = y || 0;
        return this;
    }
    //----------------------------------
    copy(){
        return new Vector(this.x,this.y);
    }
    //----------------------------------
    add(x, y){
        if (x instanceof Vector) {
          this.x += x.x || 0;
          this.y += x.y || 0;
          return this;
        }
        if (Array.isArray(x)) {
          this.x += x[0] || 0;
          this.y += x[1] || 0;
          return this;
        }
        this.x += x || 0;
        this.y += y || 0;
        return this;
    }

    sub(x, y){
        if (x instanceof Vector) {
          this.x -= x.x || 0;
          this.y -= x.y || 0;
          return this;
        }
        if (Array.isArray(x)) {
          this.x -= x[0] || 0;
          this.y -= x[1] || 0;
          return this;
        }
        this.x -= x || 0;
        this.y -= y || 0;
        return this;
      }
    
      mult(x, y){
        if (x instanceof Vector) {
        // new p5.Vector will check that values are valid upon construction but it's possible
        // that someone could change the value of a component after creation, which is why we still
        // perform this check
          if (
            Number.isFinite(x.x) &&
          Number.isFinite(x.y) &&
          typeof x.x === 'number' &&
          typeof x.y === 'number'
          ) {
            this.x *= x.x;
            this.y *= x.y;
          } else {
            console.warn(
              'Vector mult:',
              'x contains components that are either undefined or not finite numbers'
            );
          }
          return this;
        }
        if (Array.isArray(x)) {
          if (
            x.every(element => Number.isFinite(element)) &&
          x.every(element => typeof element === 'number')
          ) {
            if (x.length === 1) {
              this.x *= x[0];
              this.y *= x[0];
         
            } else if (x.length === 2) {
              this.x *= x[0];
              this.y *= x[1];
            } 
          } else {
            console.warn(
              'Vector mult:',
              'x contains elements that are either undefined or not finite numbers'
            );
          }
          return this;
        }
    
        const vectorComponents = [...arguments];
        if (
          vectorComponents.every(element => Number.isFinite(element)) &&
        vectorComponents.every(element => typeof element === 'number')
        ) {
          if (arguments.length === 1) {
            this.x *= x;
            this.y *= x;
          }
          if (arguments.length === 2) {
            this.x *= x;
            this.y *= y;
          }
        } else {
          console.warn(
            'Vector mult:',
            'x, y, or z arguments are either undefined or not a finite number'
          );
        }
    
        return this;
      }

      div(x, y) {
        if (x instanceof Vector) {
        // new p5.Vector will check that values are valid upon construction but it's possible
        // that someone could change the value of a component after creation, which is why we still
        // perform this check
          if (
            Number.isFinite(x.x) &&
          Number.isFinite(x.y) &&
          typeof x.x === 'number' &&
          typeof x.y === 'number'
          ) {
            
            if (x.x === 0 || x.y === 0) {
              console.warn('p5.Vector.prototype.div:', 'divide by 0');
              return this;
            }
            this.x /= x.x;
            this.y /= x.y;
          } else {
            console.warn(
              'p5.Vector.prototype.div:',
              'x contains components that are either undefined or not finite numbers'
            );
          }
          return this;
        }
        if (Array.isArray(x)) {
          if (
            x.every(element => Number.isFinite(element)) &&
          x.every(element => typeof element === 'number')
          ) {
            if (x.some(element => element === 0)) {
              console.warn('p5.Vector.prototype.div:', 'divide by 0');
              return this;
            }
    
            if (x.length === 1) {
              this.x /= x[0];
              this.y /= x[0];
            } else if (x.length === 2) {
              this.x /= x[0];
              this.y /= x[1];
            } 
          } else {
            console.warn(
              'p5.Vector.prototype.div:',
              'x contains components that are either undefined or not finite numbers'
            );
          }
    
          return this;
        }
    
        const vectorComponents = [...arguments];
        if (
          vectorComponents.every(element => Number.isFinite(element)) &&
        vectorComponents.every(element => typeof element === 'number')
        ) {
          if (vectorComponents.some(element => element === 0)) {
            console.warn('p5.Vector.prototype.div:', 'divide by 0');
            return this;
          }
    
          if (arguments.length === 1) {
            this.x /= x;
            this.y /= x;
          }
          if (arguments.length === 2) {
            this.x /= x;
            this.y /= y;
          }
          
        } else {
          console.warn(
            'p5.Vector.prototype.div:',
            'x, y, or z arguments are either undefined or not a finite number'
          );
        }
    
        return this;
      }


      mag(){
        return Math.sqrt(this.magSq());
      }

      setMag(n) {
        return this.normalize().mult(n);
      }

      magSq(){
        const x = this.x;
        const y = this.y;
        return x * x + y * y;
      }

      dot(x, y) {
        if (x instanceof Vector) {
          return this.dot(x.x, x.y);
        }
        return this.x * (x || 0) + this.y * (y || 0);
      }

      // this is probably only a 3D thing
      cross(v) {
        const x = this.y * v.z - this.z * v.y;
        const y = this.z * v.x - this.x * v.z;
        //2const z = this.x * v.y - this.y * v.x;
      
        return new Vector(x, y);
      }

      dist(v){
        return v.copy().sub(this).mag();
      }

      normalize() {
        const len = this.mag();
        // here we multiply by the reciprocal instead of calling 'div()'
        // since div duplicates this zero check.
        if (len !== 0) this.mult(1 / len);
        return this;
      }

      limit(max) {
        const mSq = this.magSq();
        if (mSq > max * max) {
          this.div(Math.sqrt(mSq)) //normalize it
            .mult(max);
        }
        return this;
      }

      heading() {
        const h = Math.atan2(this.y, this.x);
        return h;
      }

      // let a be in radians already
      setHeading(a) {
        let m = this.mag();
        this.x = m * Math.cos(a);
        this.y = m * Math.sin(a);
        return this;
      }

      // let this be in radians already
      rotate(a) {
        let newHeading = this.heading() + a;
        const mag = this.mag();
        this.x = Math.cos(newHeading) * mag;
        this.y = Math.sin(newHeading) * mag;
        return this;
      }

      angleBetween(v) {
        const magSqMult = this.magSq() * v.magSq();
        // Returns NaN if either vector is the zero vector.
        if (magSqMult === 0) {
          return NaN;
        }
        const u = this.cross(v);
        // The dot product computes the cos value, and the cross product computes
        // the sin value. Find the angle based on them. In addition, in the case of
        // 2D vectors, a sign is added according to the direction of the vector.
        let angle = Math.atan2(u.mag(), this.dot(v)) * Math.sign(u.z || 1);
        if (this.isPInst) {
          angle = this._fromRadians(angle);
        }
        return angle;
      }

      lerp(x, y, amt) {
        if (x instanceof Vector) {
          return this.lerp(x.x, x.y, y);
        }
        this.x += (x - this.x) * amt || 0;
        this.y += (y - this.y) * amt || 0;
        return this;
      }

      reflect(surfaceNormal) {
        surfaceNormal.normalize();
        return this.sub(surfaceNormal.mult(2 * this.dot(surfaceNormal)));
      }

      array() {
        return [this.x || 0, this.y || 0, this.z || 0];
      }

      equals(x, y) {
        let a, b, c;
        if (x instanceof Vector) {
          a = x.x || 0;
          b = x.y || 0;
        } else if (Array.isArray(x)) {
          a = x[0] || 0;
          b = x[1] || 0;
        } else {
          a = x || 0;
          b = y || 0;
        }
        return this.x === a && this.y === b;
      }

      // static methods 

      static fromAngle(angle, length) {
        if (typeof length === 'undefined') {
          length = 1;
        }
        return new Vector(length * Math.cos(angle), length * Math.sin(angle));
      }

      static fromAngles(theta, phi, length) {
        if (typeof length === 'undefined') {
          length = 1;
        }
        const cosPhi = Math.cos(phi);
        const sinPhi = Math.sin(phi);
        const cosTheta = Math.cos(theta);
        const sinTheta = Math.sin(theta);
    
        return new Vector(
          length * sinTheta * sinPhi,
          -length * cosTheta,
          length * sinTheta * cosPhi
        );
      }

      


      static random2D() {
        return this.fromAngle(Math.random() * TWO_PI);
      }

      static copy(v) {
        return v.copy(v);
      }

      static add(v1, v2, target) {
        if (!target) {
          target = v1.copy();
        //   if (arguments.length === 3) {
        //     p5._friendlyError(
        //       'The target parameter is undefined, it should be of type p5.Vector',
        //       'p5.Vector.add'
        //     );
        //   }
        } else {
          target.set(v1);
        }
        target.add(v2);
        return target;
      }

      static sub(v1, v2, target) {
        if (!target) {
          target = v1.copy();
        //   if (arguments.length === 3) {
        //     p5._friendlyError(
        //       'The target parameter is undefined, it should be of type p5.Vector',
        //       'p5.Vector.sub'
        //     );
        //   }
        } else {
          target.set(v1);
        }
        target.sub(v2);
        return target;
      }

      static mult(v, n, target) {
        if (!target) {
          target = v.copy();
        //   if (arguments.length === 3) {
        //     p5._friendlyError(
        //       'The target parameter is undefined, it should be of type p5.Vector',
        //       'p5.Vector.mult'
        //     );
        //   }
        } else {
          target.set(v);
        }
        target.mult(n);
        return target;
      }

      static div(v, n, target) {
        if (!target) {
          target = v.copy();
    
        //   if (arguments.length === 3) {
        //     p5._friendlyError(
        //       'The target parameter is undefined, it should be of type p5.Vector',
        //       'p5.Vector.div'
        //     );
        //   }
        } else {
          target.set(v);
        }
        target.div(n);
        return target;
      }

      static rotate(v, a, target) {
        if (arguments.length === 2) {
          target = v.copy();
        } else {
        //   if (!(target instanceof p5.Vector)) {
        //     p5._friendlyError(
        //       'The target parameter should be of type p5.Vector',
        //       'p5.Vector.rotate'
        //     );
        //   }
          target.set(v);
        }
        target.rotate(a);
        return target;
      }


      static dot(v1, v2) {
        return v1.dot(v2);
      }

      static cross(v1, v2) {
        return v1.cross(v2);
      }

      static dist(v1, v2) {
        return v1.dist(v2);
      }

      static lerp(v1, v2, amt, target) {
        if (!target) {
          target = v1.copy();
        //   if (arguments.length === 4) {
        //     p5._friendlyError(
        //       'The target parameter is undefined, it should be of type p5.Vector',
        //       'p5.Vector.lerp'
        //     );
        //   }
        } else {
          target.set(v1);
        }
        target.lerp(v2, amt);
        return target;
      }

      static mag(vecT) {
        return vecT.mag();
      }

      static magSq(vecT) {
        return vecT.magSq();
      }

      static normalize(v, target) {
        if (arguments.length < 2) {
          target = v.copy();
        } else {
        //   if (!(target instanceof p5.Vector)) {
        //     p5._friendlyError(
        //       'The target parameter should be of type p5.Vector',
        //       'p5.Vector.normalize'
        //     );
        //   }
          target.set(v);
        }
        return target.normalize();
      }

      static limit(v, max, target) {
        if (arguments.length < 3) {
          target = v.copy();
        } else {
        //   if (!(target instanceof p5.Vector)) {
        //     p5._friendlyError(
        //       'The target parameter should be of type p5.Vector',
        //       'p5.Vector.limit'
        //     );
        //   }
          target.set(v);
        }
        return target.limit(max);
      }

      static setMag(v, len, target) {
        if (arguments.length < 3) {
          target = v.copy();
        } else {
        //   if (!(target instanceof p5.Vector)) {
        //     p5._friendlyError(
        //       'The target parameter should be of type p5.Vector',
        //       'p5.Vector.setMag'
        //     );
        //   }
          target.set(v);
        }
        return target.setMag(len);
      }

      static heading(v) {
        return v.heading();
      }

      static angleBetween(v1, v2) {
        return v1.angleBetween(v2);
      }

      static reflect(incidentVector, surfaceNormal, target) {
        if (arguments.length < 3) {
          target = incidentVector.copy();
        } else {
        //   if (!(target instanceof p5.Vector)) {
        //     p5._friendlyError(
        //       'The target parameter should be of type p5.Vector',
        //       'p5.Vector.reflect'
        //     );
        //   }
          target.set(incidentVector);
        }
        return target.reflect(surfaceNormal);
      }
    
      static array(v) {
        return v.array();
      }


      static equals(v1, v2) {
        let v;
        if (v1 instanceof p5.Vector) {
          v = v1;
        } else if (Array.isArray(v1)) {
          v = new p5.Vector().set(v1);
        } else {
        //   p5._friendlyError(
        //     'The v1 parameter should be of type Array or p5.Vector',
        //     'p5.Vector.equals'
        //   );
        }
        return v.equals(v2);
      }

}// END VECTOR CLASS

//======================================
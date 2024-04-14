import { remap, random} from './util.js';

export class Grid {
    constructor(w=800,h=800,cellSize=10){
        this.w = w;
        this.h = h;
        this.cellSize = cellSize;
        this.grid = {};
    }
    create(w=800,h=800,cellSize=10){
        this.w = w;
        this.h = h;
        this.cellSize = cellSize;
        for(let x = 0; x < w; x += cellSize){
            this.grid[x] = {}
            for(let y = 0; y < h; y += cellSize){
                this.grid[x][y] = {x:x,y:y,value:0};
            }
        }
    }
    createRandom(w,h,cellSize){
        this.w = w;
        this.h = h;
        this.cellSize = cellSize;
        for(let x = 0; x < w; x += cellSize){
            this.grid[x] = {}
            for(let y = 0; y < h; y += cellSize){
                this.grid[x][y] = {x:x,y:y,value:Math.floor(random(0,2))};
            }
        }
    }
    createFrom(f,w,h,cs){
        this.w = w;
        this.h = h;
        this.cellSize = cs;
        this.grid = f;
    }
    createZero(w,h,cs){
        
    }
    print(){
        console.log(this.grid);
    }
    setCell(x,y,value){
        this.grid[x][y].value = value;
    }
    getCell(x,y){
        try{
            if(this.grid[x][y] === undefined){
                return 0;
            }
            return this.grid[x][y].value;
        }catch(e){
            //console.log("error: " + e);
        }
        return 0;
    }
    checkEdges(x,y){
        
        if(x === undefined){
            return 1;
        }
        else if(x === 0){
            // were on left side
            //console.log("on left edge");
            return 1;
        }else if(x === this.w){
            // were on right side
            //console.log("on right edge");
            return 1;
        }else{

        }

        if(y === undefined){
            return 1;
        }
        else if(y === 0){
            // were on top side
            //console.log("on top edge");
            return 1;
        }else if(x === this.h){
            // were on bottom side
            //console.log("on bottom edge");
            return 1;
        }else{

        }

        return 0;
    }
    countNeighbors(x, y) {
        // super dumb make better later
        // need to check for undefined values
        // undefined values are wraparounds
        let sum = 0;
        let v1 = 0;

        if(this.checkEdges(x,y) === 0){
            v1 = this.getCell(x,y + this.cellSize);
            if(v1 === 1 || v1 === 0){
                sum += v1;
            }
        }
        
        if(this.checkEdges(x,y) === 0){
            v1 = this.getCell(x,y - this.cellSize);
            if(v1 === 1 || v1 === 0){
                sum += v1;
            }
        }
        

        if(this.checkEdges(x,y) === 0){
            v1 = this.getCell(x + this.cellSize,y);
            if(v1 === 1 || v1 === 0){
                sum += v1;
            }
        }
        

        if(this.checkEdges(x,y) === 0){
            v1 = this.getCell(x - this.cellSize,y);
            if(v1 === 1 || v1 === 0){
                sum += v1;
            }
        }
        

        if(this.checkEdges(x,y) === 0){
            v1 = this.getCell(x + this.cellSize,y + this.cellSize);
            if(v1 === 1 || v1 === 0){
                sum += v1;
            }
        }
        

        if(this.checkEdges(x,y) === 0){
            v1 = this.getCell(x - this.cellSize,y - this.cellSize);
            if(v1 === 1 || v1 === 0){
                sum += v1;
            }
        }
        

        if(this.checkEdges(x,y) === 0){
            v1 = this.getCell(x + this.cellSize,y = this.cellSize);
            if(v1 === 1 || v1 === 0){
                sum += v1;
            }
        }
        

        if(this.checkEdges(x,y) === 0){
            v1 = this.getCell(x - this.cellSize,y + this.cellSize);
            if(v1 === 1 || v1 === 0){
                sum += v1;
            }
        }
        

        return sum;   
    }

}

export default Grid;
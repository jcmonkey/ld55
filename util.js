//==============================================================
export default function default_func(){}

export function remap(value, istart, istop, ostart, ostop) {
    return ostart + (ostop - ostart) * 
    ((value - istart) / (istop - istart));    
}
//--------------------------------------------------------------
export function random(min,max=0){
    if(max === 0){
        max = min;
        min = 0;
    }

    return randomRange(min,max);
}
//--------------------------------------------------------------
export function randomInt(max) {
    return Math.floor(Math.random() * max);
}
//--------------------------------------------------------------
export function randomRange(min,max){
    return Math.random() * (max - min) + min;
}
//--------------------------------------------------------------
// The maximum is exclusive and the minimum is inclusive
export function randomRangeInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); 
}
//--------------------------------------------------------------
// returns a random angle between 0 and 360
export function randomAngle(){
    return Math.random() * 2 * Math.PI;
}
//--------------------------------------------------------------
// get the x coordanate of the circle of radius and angle
export function getXFromAngle(radius,angle){
    return radius * Math.cos(angle);
}
//-------------------------------------------------------------- 
// get the y coordanage of the circle of radius and angle
export function getYFromAngle(radius,angle){
    return radius * Math.sin(angle);
}
//-------------------------------------------------------------- 
export function randomPointOnCircle(radius){
    let angle = randomAngle();
    return {x : getXFromAngle(radius,angle),
        y : getYFromAngle(radius,angle)};

}
//-------------------------------------------------------------- 
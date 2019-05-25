let ob = [];
let statics = [];
let num = 1;
let numS = 2;

function setup() {
    createCanvas(windowWidth, windowHeight);
    for(let x = 0; x < numS; x++){
        statics[x] = new Static(random(-700,700),0,random(50,100));
    }
    
    for(let x = 0; x < num; x++){
        ob[x] = new Mover(-300,-300,random(5,15),statics,random(20,40),5);
    }
    
    
}

function draw() {
    createCanvas(windowWidth, windowHeight);
    background(0);
    translate(width/2, height/2);
    
    /*if(onmousedown){
        for()
        statics.press = true;
    }*/
        
    for(let x = 0; x < numS; x++){
        statics[x].show();
    }
    for(let x = 0; x < num; x++){
        //ob[x].xs = statics.position.x;
        //ob[x].ys = statics.position.y;
        ob[x].show();
        
    }
    strokeWeight(4);
    stroke(255);
    point(ob[0].obj.x,ob[0].obj.y);
    
}

class Static{
    
    constructor(x, y, m){
        this.position = createVector(x,y);
        this.mass = m;
        this.on = false;
        this.press = false;
    }
    
    show(){
        this.d = dist(mouseX-width/2,mouseY-height/2,this.position.x,this.position.y)
        
        /*if(this.d <= this.mass){
            fill(200);
            if(this.press){
                this.on = true;
            }
            
        }
        else{
            fill(255);
        }
        
        if(this.press && this.on){
            fill(140);
            this.position.x = mouseX - width/2;
            this.position.y = mouseY - height/2;
        }*/
        
        ellipse(this.position.x,this.position.y,40,40);
    }
}

/*function mousePressed() {
    statics.press = true;
}*/

/*function mouseReleased(){
    statics.press = false;
    
    statics.on = false;
}*/

class Mover{
    
    
    constructor(x, y, r, s, m, v){
        this.obj = createVector(x,y);
        this.xs = [];
        this.ys = [];
        this.static = [];
        this.mass1 = [];
        this.mul;
        
        for(let x = 0; x < s.length; x++){
            this.xs[x] = s[x].position.x;
            this.ys[x] = s[x].position.y;
            this.mass1[x] = s[x].mass;
            this.static[x] = createVector(s[x].position.x,s[x].position.y);
        }
        
        this.d = [];
        this.force = [];
        this.mass = m;
        this.G = 0.0001;
        this.acc_x = 0;
        this.acc_y = 0;
        this.Vel_x = 0;
        this.Vel_y = 0;
        this.vi = v;
        this.range = r;
    }
    
    
    show(){
        
        for(let x = 0; x < this.static.length; x++){
            this.force[x] = this.static[x].sub(this.obj);
            this.d[x] = this.force[x].mag();
            this.force[x].normalize();
        }
        for(let x = 0; x < this.static.length; x++){
            this.mul = this.G * (this.mass * this.mass1[x])/this.d[x]*this.d[x];
            
            for(let y = 0; y < this.static.length; y++){
                if(y != x){
                    this.mul += this.G * (this.mass * this.mass1[y])/this.d[y]*this.d[y];
                }
            }
            this.force[x].mult(this.mul);
        }
        
        for(let x = 0; x < this.static.length; x++){
            this.acc_x = this.force[x].x;
            this.Vel_x += this.acc_x;
            this.obj.x += this.Vel_x;
            this.obj.x += this.vi;

            this.acc_y = this.force[x].y;
            this.Vel_y += this.acc_y;
            this.obj.y += this.Vel_y;

            this.static[x].x = this.xs[x];
            this.static[x].y = this.ys[x];
        }
        
        
        stroke(255);
        //line(this.obj.x,this.obj.y,this.static.x,this.static.y);
        fill(255);
        ellipse(this.obj.x ,this.obj.y,this.range,this.range);
    }
}





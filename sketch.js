var cells = [];
var currentCell;
var nextcell;
var storedCells = [];

var ShortestPath = [];
var End;

var r = 20;

var finish = false;
var start = false;

function setup() {
	
  	createCanvas(800,800);
	
	for(var i = 1; i<= width/r; i++){
		cells[i] = [];
		for(var j = 1; j<= height/r; j++){
			
			cells[i][j] = new Cell(i,j,r);
			
		}
	}
	
	currentCell = cells[1][1];
	End = cells[width/r][height/r];
}

function draw() {
	
	background(51);
  	
	if(start && storedCells.length < 1){
		finish = true;
		currentCell = cells[1][1];
		
		for(var i = 1; i<= width/r; i++){
			for(var j = 1; j<= height/r; j++){

				cells[i][j].chek = false;

			}
		}
	}
	
	fill(0,0,255);
	noStroke();
	rect((currentCell.i-1)*r,(currentCell.j-1)*r,r,r);
	
	if(finish){
		start = false;
		
		for(var x = 0; x < ShortestPath.length; x++){
			fill(0,255,0);
			noStroke();
			rect((ShortestPath[x].i-1)*r,(ShortestPath[x].j-1)*r,r,r);
		}
		
		fill(0,255,0);
		noStroke();
		rect((End.i-1)*r,(End.j-1)*r,r,r);
		
	}
	
	if(!finish){
		
		currentCell.neighbours.splice(0,currentCell.neighbours.length);
		currentCell.FindNeighbours();

		currentCell.chek = true;

		if(currentCell.neighbours.length > 0){

			nextcell = currentCell.PickRandomNeighbour();	
			RemoveWalls();
			storedCells.push(currentCell);

		}else if(storedCells.length > 0){

			nextcell = storedCells[storedCells.length - 2];
			storedCells.splice(storedCells.length-1,1);

		}
		
		currentCell = nextcell;
		
		start = true;
		
	}
	
	if(currentCell == End){
		
		for(var x = 0; x < storedCells.length; x++){
			ShortestPath[x] = storedCells[x];
		}
	}
	
	for(var i = 1; i<= width/r; i++){
		for(var j = 1; j<= height/r; j++){
			
			cells[i][j].show();
			
		}
	}
	
	//frameRate(10);
	
}

class Cell{
	
	constructor(i,j,r){
		this.i = i;
		this.j = j;
		this.r = r;
		
		this.walls = [true,true,true,true];
		
		this.chek = false;
		
		this.neighbours = [];
		
		this.num = this.i+(this.j-1)*width/this.r;
	}
	
	show(){
		
		stroke(255);
		
		if(this.walls[3]){
			line((this.i-1)*this.r,(this.j-1)*this.r,(this.i-1)*this.r,this.j*this.r);
		}
		
		if(this.walls[2]){
			line((this.i-1)*this.r,this.j*this.r,this.i*this.r,this.j*this.r);
		}
		
		if(this.walls[1]){
			line(this.i*this.r,this.j*this.r,this.i*this.r,(this.j-1)*this.r);
		}
		
		if(this.walls[0]){
			line(this.i*this.r,(this.j-1)*this.r,(this.i-1)*this.r,(this.j-1)*this.r);
		}
		
	}
	
	FindNeighbours(){
		
		this.ind = 0;
		
		if(this.j > 1 && !cells[this.i][this.j-1].chek){
			this.neighbours.push(cells[this.i][this.j-1]);
		}
		if(this.i < width/this.r && !cells[this.i+1][this.j].chek){
			this.neighbours.push(cells[this.i+1][this.j]);
		}
		if(this.j < height/this.r && !cells[this.i][this.j+1].chek){
			this.neighbours.push(cells[this.i][this.j+1]);
		}
		if(this.i > 1 && !cells[this.i-1][this.j].chek){
			this.neighbours.push(cells[this.i-1][this.j]);
		}
		
		
	}
	
	PickRandomNeighbour(){
		
		return random(this.neighbours);
		
	}
	
}

function RemoveWalls(){

	if(currentCell.i > nextcell.i){
		currentCell.walls[3] = false;
		nextcell.walls[1] = false;
	}

	if(currentCell.i < nextcell.i){
		currentCell.walls[1] = false;
		nextcell.walls[3] = false;
	}

	if(currentCell.j < nextcell.j){
		currentCell.walls[2] = false;
		nextcell.walls[0] = false;
	}

	if(currentCell.j > nextcell.j){
		currentCell.walls[0] = false;
		nextcell.walls[2] = false;
	}
}


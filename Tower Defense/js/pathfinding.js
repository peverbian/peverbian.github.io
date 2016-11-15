//provides a list of indexes as waypoints to reach a goal.
//takes a 2 dimensional array of an int and a bool for movement cost and walkable.

function Pathfinder(board, goal) {

	this.board;
	this.next = new Array();
	this.visited = new Array();
	this.frontier = new Array();
	this.goal;
	this.start;


	this.init = function(board) {
		this.board = board;
	}

	this.calcPaths = function() {
		delete this.next;
		delete this.visited;
		delete this.frontier;
		this.next = new Array();
		this.visited = new Array();
		this.frontier = new Array();
		this.frontier.push(goal);
		var current;
		while(this.frontier.length > 0) {
			current = frontier.shift();
			visited[current] = true;
			

		}
	}
}
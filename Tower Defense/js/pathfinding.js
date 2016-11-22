


//takes the following arguments
//walkable = array of costs to walk, -1 is not walkable.
//goal = index of goal, all tiles will get a next index point to this tile.
//neighbors = array of arrays of indexes for the neighbors of a given cell;

// returns next = array of indexes for the next point towards the goal

function calcPaths(walkable, goal, neighbors) {
	var frontier = new Array();
	var visited = new Array();
	var next = new Array();
	visited[goal] = true;
	frontier.push(goal);
	while(frontier.length > 0) { 
		var current = frontier.shift();
		var cn = neighbors[current];
		for (var i = cn.length - 1; i >= 0; i--) {
			nextIndex = cn[i]
			if(!visited[nextIndex]) {
				if(walkable[nextIndex]) {
					frontier.push(nextIndex)
				}
				visited[nextIndex] = true;
				next[nextIndex] = current;
			}
		}
	}
	return next;
}

function testTower (walkable, goal, neighbors, tower, start, mobLocs) {
	var testWalkable = walkable.slice();
	for (var i = tower.length - 1; i >= 0; i--) {
		testWalkable[tower[i]] = false;
	}
	var testNext = calcPaths(testWalkable, goal, neighbors);
	if(!testNext[start]) {
		return false
	}
	for(var i = 0; i < mobLocs.length; i++) {
		if(mobLocs[i] && !testNext[i]) {
			return false;
		}
	}
	return true;
}
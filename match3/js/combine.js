	//checks if the board is full.
	function boardFull1(board) {
		//console.log("checking for 1 spot");
		var full = true;
		for(var i = 0; i < board.length; i++) {
			for(var j = 0; j < board[i].length; j++) {
				if(board[i][j] == null) {
					//console.log("found a spot");
					return false;
				}
			}
		}
		//console.log("board is full");
		return true;
	}	

	function boardFull2(board) {
		//console.log("checking for 2 spots");
		for(var i = 0; i < board.length; i++) {
			for(var j = 0; j < board[i].length-1; j++) {
				if(board[i][j] == null && board[i][j+1] == null ) {
					//console.log("found 2 spots next to each other");
					return false;
				}
			}
		}
		for(var i = 0; i < board.length-1; i++) {
			for(var j = 0; j < board[i].length; j++) {
				if(board[i][j] == null && board[i+1][j] == null ) {
					//console.log("found 2 spots next to each other");
					return false;
				}
			}
		}
		//console.log("board is full");
		return true;
	}

	//check if there's a match of 3 - found by the middle one and returned.
	function checkBoard(board) {
		var value = 0;
		var count = 0;
		var index = {x:-1,y: -1};
		for(var i = 0; i < board.length; i++) {
			for(var j = 0; j < board[i].length; j++) {
				count = 0;
				if(board[i][j] != null) {
					if(i > 0) {
						if(board[i-1][j] != null) {
							if(board[i-1][j].value == board[i][j].value) {
								count++
							}
						}
					}
					if(i < board.length-1) {
						if(board[i+1][j] != null) {
							if(board[i+1][j].value == board[i][j].value) {
								count++
							}
						}
					}
					if(j > 0) {
						if(board[i][j-1] != null) {
							if(board[i][j-1].value == board[i][j].value) {
								count++
							}
						}
					}
					if(j < board[i].length-1) {
						if(board[i][j+1] != null) {
							if(board[i][j+1].value == board[i][j].value) {
								count++
							}
						}
					}
				}
				if(count >= 2) {
					index.x = i;
					index.y = j;
					return index;
				}
			}
		}
		return index;
	}

	//combine all the gems that are connected to the given index
	function getCombination(board, index) {
		var combination = [];
		combination.push(index);
		var matchValue = board[index.x][index.y].value;
		var combinedAll = false;
		var tempIndex = {x: 0, y: 0};
		var combinationIndex = 1;
		while(combinedAll == false) {
			//go through the combination and get neighbors that match
			combinedAll = true;
			var length = combination.length;
			for(var i = 0; i < length; i++) {
				//check right for a match
				tempIndex.x = combination[i].x + 1;
				tempIndex.y = combination[i].y;
				if(checkIndex(board, matchValue, tempIndex, combination) == true) {
					combination[combinationIndex] = {x: 0, y: 0};
					combination[combinationIndex].x = tempIndex.x;
					combination[combinationIndex].y = tempIndex.y;
					combinationIndex++;
					combinedAll = false;
				}

				//check left for a match
				tempIndex.x = combination[i].x - 1;
				tempIndex.y = combination[i].y;
				if(checkIndex(board, matchValue, tempIndex, combination) == true) {
					combination[combinationIndex] = {x: 0, y: 0};
					combination[combinationIndex].x = tempIndex.x;
					combination[combinationIndex].y = tempIndex.y;
					combinationIndex++;
					combinedAll = false;
				}

				//check up for a match
				tempIndex.x = combination[i].x;
				tempIndex.y = combination[i].y - 1;
				if(checkIndex(board, matchValue, tempIndex, combination) == true) {
					combination[combinationIndex] = {x: 0, y: 0};
					combination[combinationIndex].x = tempIndex.x;
					combination[combinationIndex].y = tempIndex.y;
					combinationIndex++;
					combinedAll = false;
				}
				
				
				//check down for a match
				tempIndex.x = combination[i].x;
				tempIndex.y = combination[i].y + 1;
				if(checkIndex(board, matchValue, tempIndex, combination) == true) {
					combination[combinationIndex] = {x: 0, y: 0};
					combination[combinationIndex].x = tempIndex.x;
					combination[combinationIndex].y = tempIndex.y;
					combinationIndex++;
					combinedAll = false;
				}
			}
		}
		for(var i = 0; i < combination.length; i++) {
			console.log("Matching " + combination[i].x + "," + combination[i].y + " s:" + combination[i].sequence);
		}
		return combination;
	}

	//get the most recent gem in the combination of gems
	function getRoot(board, combination) {
		var rIndex = {x:0, y:0};
		rIndex.x = combination[0].x;
		rIndex.y = combination[0].y;
		for(var i = 1; i < combination.length; i++) {
			if(board[combination[i].x][combination[i].y].sequence >= board[rIndex.x][rIndex.y].sequence) {
				rIndex.x = combination[i].x;
				rIndex.y = combination[i].y;
			}
		}
		return rIndex;	
	}

	//check if the given index is already part of the match
	function isIndexInCombination(combination, index) {
		//check if index is already in the combination
		for(var j = 0; j < combination.length; j++) {
			if(combination[j].x == index.x && combination[j].y == index.y) {
				return true;
			}
		}
		return false;
	}

	//check if the given index is in bounds and matches the value
	function checkIndex(board, value, index, combination) {
		if(index.x >= 0 && 
		   index.x < board.length &&
		   index.y >= 0 && 
		   index.y < board[0].length &&
		   isIndexInCombination(combination, index) == false) {
			if(board[index.x][index.y] != null) {
				if(board[index.x][index.y].value == value) {
					return true;
				}
			}
		}
		return false;
	} 

	//empty the combination
	function clearCombination(combination) {
		var tempGem;
		while(combination[0] != null) {
			tempGem = combination.pop();
			delete tempGem;
		}
	}

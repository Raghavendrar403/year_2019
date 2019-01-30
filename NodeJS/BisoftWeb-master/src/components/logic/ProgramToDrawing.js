var board, connections, maxCols, curRow, curCol, selectorOpen,
    activeRef, activeParentRef, activeIndex; // These are initialized in the main exported method

function addRow() {
  board.push([{type: 'blank'}]);
}

function makeRowsProper() {
  board.forEach(row => {
    while (row.length < maxCols + 15) row.push({type: 'blank'});
  });
}

function setCurCol(newValue) {
  curCol = newValue;
  if (curCol > maxCols) maxCols = curCol;
}

function recurse(instructions, active) {
  if (instructions.length === 0) {
    while (board.length <= curRow) addRow();
    while (board[curRow].length < curCol) {
      board[curRow].push({type: 'blank'});
    }
  } else {
    instructions.map((instruction, index) => {
      const oldCol = curCol;
      if (instruction.type === 'if' || instruction.type === 'loop') {
        curRow += 2;
        if (board[curRow] && board[curRow].length >= curCol) setCurCol(maxCols+2);
        // For the vertiacal arrow
        connections.push({from: [curRow - 2, curCol], to: [curRow, curCol]});
        const oldCol = curCol;
        recurse(instruction.subprogram, active);
        board[curRow].push({type: 'end_' + instruction.type});
        if (curRow === active[0] && board[curRow].length - 1 === active[1]) {
          activeRef = board[curRow][board[curRow].length-1];
          activeParentRef = instruction.subprogram;
          activeIndex = instruction.subprogram.length;
        }
        // For the arrows to end if and end loop.
        if (instruction.subprogram.length > 0) connections.push({from: [curRow, curCol - 1], to: [curRow, curCol]});
        curRow -= 2;
        setCurCol(oldCol);
      }
      while (board.length <= curRow) addRow();
      while (board[curRow].length <= curCol) {
        board[curRow].push({type: 'blank'});
      }
      board[curRow][curCol].type = instruction.type;
      if (curRow === active[0] && curCol === active[1]) {
        activeRef = instruction;
        activeParentRef = instructions;
        activeIndex = index;
      }
      // Draw arrow from previous cell if there's a previous cell.
      if (index != 0) connections.push({from: [curRow, oldCol - 1], to: [curRow, curCol]});
      setCurCol(curCol+1);
    })
  }
}

function drawHands(currentProgramGuide, active, add) {
  var row = 1;
  if (currentProgramGuide < 0) return;
  while (currentProgramGuide > 0) {
    board[row][board[row].length-1] = {type: 'hand'};
    row += 2; currentProgramGuide--;
  }
  if (active[0] === row && active[1] === board[row].length - 1) {
    var col = board[row].length-1;
    selectorOpen = true;
    board[row][col] = {type: 'highlighted_hand'};
    while (board[row-1].length < col) board[row-1].push({type: 'blank'});
    board[row-1][col] = {type: 'if', onClick: ()=>add('if')};
    board[row-1][col+1] = {type: 'wait', onClick: ()=>add('wait')};
    if (!board[row+1]) addRow();
    while (board[row+1].length < col) board[row+1].push({type: 'blank'});
    board[row+1][col] = {type: 'loop', onClick: ()=>add('loop')};
    board[row+1][col+1] = {type: 'output', onClick: ()=>add('output')};
    if (row === 1) board[row][col+1] = {type: 'repeat', onClick: ()=>add('repeat')};
    else {
      const type = 'end_' + board[row-2][board[row-2].length-2].type;
      board[row][col+1] = {type: type, onClick: ()=>add(type)};
    }
  }
  else board[row][board[row].length-1] = {type: 'active_hand'};
}

module.exports = function (program, end, currentProgramGuide, active, add,
                           insertState,insertNode, deleteNode) {
  // (Re)initialize the variables
  board = [];
  connections = [];
  curRow = 1; maxCols = 0; setCurCol(1);
  activeRef = undefined; activeParentRef = undefined; activeIndex = 0;
  selectorOpen = false;
  addRow();
  addRow();
  recurse(program, active);
  connections.push({from: [1,board[1].length-1], to: [1,board[1].length]});
  board[1].push({type: end.state});
  if (active[0] === 1 && active[1] === board[1].length - 1) {
    activeRef = end;
    activeParentRef = program,
    activeIndex = program.length;
  }
  if (active[0] !== -1 && active[1] !== -1) {
    board[active[0]][active[1]].highlighted = true;
    while (board[active[0]-1].length <= active[1]) board[active[0]-1].push({type: 'blank'});
    if (activeRef.type !== 'start') {
      if (!activeRef.type.startsWith('end'))
        board[active[0]-1][active[1]] = {type: 'delete', onClick: ()=>deleteNode()};
      board[active[0]-1][active[1]+1] = {type: 'insert', onClick: ()=>insertNode()};
    }
  }
  drawHands(currentProgramGuide, active, add);
  // Fill the board with blank hexagons
  while (board.length < 10) addRow(); // Add enough blank rows
  addRow(); // Add one extra blank row for insertNode selector
  makeRowsProper();
  if (insertState) {
    board[active[0]-1][active[1]] = {type: 'if', onClick: ()=>insertNode('if')};
    board[active[0]-1][active[1]+1] = {type: 'wait', onClick: ()=>insertNode('wait')};
    board[active[0]+1][active[1]] = {type: 'loop', onClick: ()=>insertNode('loop')};
    board[active[0]+1][active[1]+1] = {type: 'output', onClick: ()=>insertNode('output')};
  }
  activeRef = activeRef || {};
  return { board, connections, selectorOpen, updated: true, activeRef, activeParentRef, activeIndex };
}
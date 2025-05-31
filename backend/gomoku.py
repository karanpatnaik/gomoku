import numpy as np
def main():
   board = np.zeros((15, 15), dtype=int)
   isPlayer1Turn = True 
   gameOver = False
   row = input("Enter row Coord")
   col = input("Enter col Coord")
   placeTile(row, col)
   displayBoard(board)

def placeTile(board, r, c, isPlayer1Turn):
    if isPlayer1Turn:  
        board[r][c] = 1 
    else: 
        board[r][c] = 2
        
def displayBoard(board):
    for i in range(15):
        for j in range(15): 
            print(board[i][j])

import numpy as np

def main():
   board = np.zeros((15, 15), dtype=int)
   isPlayer1Turn = True 
   gameOver = False
   while not gameOver:
        while True:
            row = int(input("Enter row Coord: "))
            col = int(input("Enter col Coord: "))
            result = placeTile(board, row, col, isPlayer1Turn)
            print(result)
            if result.startswith("Tile Placed"):
                break
        displayBoard(board)
        if(checkWins(board, row, col)):
            if (isPlayer1Turn):
                print("Player 1 won")
            else:
                print("Player 2 won")     
            gameOver = True
        else: 
            isPlayer1Turn = not isPlayer1Turn 

def placeTile(board, r, c, isPlayer1Turn):
    if not isValid(r,c):
        return ("invalid index found in placeTile")
    if board[r][c] > 0:
        return ("Tile Occupied")
    if isPlayer1Turn:  
        board[r][c] = 1 
        return ("Tile Placed for Player 1")
    else: 
        board[r][c] = 2
        return ("Tile Placed for Player 2")
        
def displayBoard(board):
    for i in range(15):
        print()
        for j in range(15): 
            print(board[i][j], end='')
            print(" ", end='')
    print()
    print()
    
def isValid(row, col): 
    if row < 0 or row > 14: 
        return False 
    if col < 0 or col > 14:
        return False
    return True 

def checkWins(board, r, c):
    player = board[r][c]
    directions = [(0, 1), # right
                  (1, 0), # down
                  (1, 1), # down-right
                  (1, -1) # down-left
                 ]
    for dr, dc in directions:
        count = 1
        # direction
        nr, nc = r + dr, c + dc
        while (isValid(nr, nc) and board[nr][nc] == player):
            count += 1
            nr += dr
            nc += dc
        # inverse direction
        nr, nc = r - dr, c - dc
        while (isValid(nr, nc) and board[nr][nc] == player):
            count += 1
            nr -= dr
            nc -= dc
        if count == 5:
            return True
    return False

"""
def checkWins(board):
    for i in range(15):
        for j in range(15):
            if board[i][j] > 0:
                if(isValid(i + 4, j)): 
                    if(checkSouth(board, i, j)):
                        return True 
                if(isValid(i - 4, j)):
                    if(checkNorth(board, i, j)):
                        return True
                if(isValid(i + 4, j + 4)):
                    if(checkSouthEast(board, i, j)):
                        return True
                if(isValid(i - 4, j - 4)):
                    if(checkNorthWest (board, i, j)):
                        return True
                if(isValid(i, j - 4)):
                    if(checkWest (board, i, j)):
                        return True
                if(isValid(i, j + 4)):
                    if(checkEast(board, i, j)):
                        return True
                if(isValid(i - 4, j + 4)):
                    if(checkNorthEast(board, i, j)):
                        return True
                if(isValid(i + 4, j - 4)):
                    if(checkSouthWest(board, i , j)):
                        return True
    return False

def checkNorth(board, r, c):
    return(board[r][c] == board[r-1][c] == board[r-2][c] == board[r-3][c] == board[r-4][c])   
        
def checkNorthEast(board, r, c):
    return(board[r][c] == board[r-1][c+1] == board[r-2][c+2] == board[r-3][c+3] == board[r-4][c+4])
    
def checkNorthWest(board, r, c):
    return(board[r][c] == board[r-1][c-1] == board[r-2][c-2] == board[r-3][c-3] == board[r-4][c-4])

def checkSouthEast(board, r, c):
    return(board[r][c] == board[r+1][c+1] == board[r+2][c+2] == board[r+3][c+3] == board[r+4][c+4]) 

def checkSouthWest(board, r, c):
    return(board[r][c] == board[r+1][c-1] == board[r+2][c-2] == board[r+3][c-3] == board[r+4][c-4])

def checkWest(board, r, c): 
    return(board[r][c] == board[r][c-1] == board[r][c-2] == board[r][c-3] == board[r][c-4])

def checkSouth(board ,r, c):
    return(board[r][c] == board[r+1][c] == board[r+2][c] == board[r+3][c] == board[r+4][c])

def checkEast(board, r, c):
    return(board[r][c] == board[r][c+1] == board[r][c+2] == board[r][c+3] == board[r][c+4])    
"""

if __name__ == "__main__":
    main()
from mcts import Node

import numpy as np

def isValid(row, col): 
    if row < 0 or row > 14: 
        return False 
    if col < 0 or col > 14:
        return False
    return True 

def checkWins(board, move, player):
    r, c = move
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

def displayBoard(board):
    for i in range(15):
        print()
        for j in range(15): 
            print(board[i][j], end='')
            print(" ", end='')
    print()
    print()

def playFriends():
    board = np.zeros((15, 15), dtype=int)
    player = 1

def playMCTS(simulations=1000):
    board = np.zeros((15, 15), dtype=int)
    root = Node(None, board, 1)
    humanPlayer = 1
    player = 1

    while True:
        displayBoard(root.board)
        if player == humanPlayer: # player turn
            valid = False
            while not valid:
                row = int(input("Enter row Coord: "))
                col = int(input("Enter col Coord: "))
                if (isValid(row, col) and root.board[row][col] == 0):
                    newBoard = root.board.copy()
                    newBoard[row][col] = player
                    if checkWins(root.board, (row, col), root.player):
                        displayBoard(root.board)
                        print("Player wins")
                        break
                    if (row, col) in root.children:
                        root = root.children[(row, col)]
                    else:
                        root = Node(root, newBoard, -player, move=(row, col))
                    valid = True
        else: # MCTS turn
            print("MCTS turn")
            for i in range(simulations):
                leaf = root.selection()
                child = leaf.expansion()
                result = child.simulation(child.board, child.player)
                child.backpropagation(result) 
            bestMove = max(root.children.items(), key=lambda item: item[1].N)[0]
            root = root.children[bestMove]
            row, col = bestMove
            if checkWins(root.board, (row, col), root.player):
                displayBoard(root.board)
                print("MCTS wins") 
                break
        player = -player

def main():
    playMCTS(simulations=20000)

if __name__ == "__main__":
    main()
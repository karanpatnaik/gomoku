import math
import random
import copy

class Node:

    def __init__(self, parent, board, player, move=None):
        self.parent = parent
        self.board = board
        self.player = player # player 1 = 1, player 2 = -1
        self.move = move
        self.children = {} # key: move ex. (7,8), value: Node object
        self.T = 0 # wins
        self.N = 0 # simulations
    
    # step 1: select child node w/ most promising outcome
    def selection(self):
        current = self
        while current.children:
            bestScore = float('-inf')
            bestChild = None
            for child in current.children.values():
                score = child.getScore()
                if score > bestScore:
                    bestScore = score
                    bestChild = child
            current = bestChild
        return current
    
    # step 2: expand the tree from child node
    def expansion(self):
        possibleMoves = []
        for move in self.getMoves():
            if move not in self.children:
                possibleMoves.append(move)
        if not possibleMoves:
            return self
        move = random.choice(possibleMoves)
        newBoard = copy.deepcopy(self.board)
        newBoard[move[0]][move[1]] = self.player
        childNode = Node(self, newBoard, -self.player, move)
        self.children[move] = childNode
        return childNode
    
    # step 3: simulate a random game
    def simulation(self, board, player):
        from game import checkWins
        currentPlayer = player
        currentBoard = copy.deepcopy(board)
        while True:
            possibleMoves = []
            for i in range(15):
                for j in range(15):
                    if currentBoard[i][j] == 0:
                        possibleMoves.append((i, j))
            if not possibleMoves:
                return 0
            move = random.choice(possibleMoves)
            currentBoard[move[0]][move[1]] = currentPlayer
            if checkWins(currentBoard, move, currentPlayer):
                return currentPlayer
            currentPlayer = -currentPlayer
    
    # step 4: transfer info from child back to parent
    def backpropagation(self, result):
        node = self
        while node:
            node.N += 1
            if result == node.player: # if win
                node.T += 1
            elif result == 0: # if draw
                node.T += 0.5
            node = node.parent # if lose

    def getScore(self):
        if self.N == 0:
            return float('inf')  
        return (self.T/self.N) + math.sqrt(2) * math.sqrt(math.log(self.parent.N)/self.N) # UCB formula
    
    def getMoves(self):
        moves = []
        for i in range(15):
            for j in range(15):
                if self.board[i][j] == 0:
                    moves.append((i, j))
        return moves


    
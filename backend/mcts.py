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
    
    def expand(self):
        possibleMoves = []
        for move in self.getMoves():
            if move not in self.children:
                possibleMoves.append(move)
        move = random.choice(possibleMoves)
        newBoard = copy.deepcopy(self.board)
        newBoard[move[0]][move[1]] = self.player
        childNode = Node(self, newBoard, -self.player, move)
        self.children[move] = childNode
        return childNode
    
    def bestChild(self):
        current = self
        while current.children:
            bestScore = None
            bestChild = None
            for child in current.children.values():
                score = child.getScore()
                if score > bestScore:
                    bestScore = score
                    bestChild = child
                current = bestChild
        return current
    
    

    


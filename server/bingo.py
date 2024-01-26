import random

# need to add weighting to buzzwords, to account for more/less common ones
buzzwords = [
        "Post Covid",
        "It's not political",
        "#QandA's the hashtag",
        "Gig economy",
        "Royal Commision",
        "Host claps back against panelist",
        "New normal",
        "Obvious dodge",
        "Blame it on the opposition",
        "Welcome to country",
        ]

class Player:

    def __init__(self):
        self.board = Board()

class Board:
    
    def __init__(
            self,
            dimensions:tuple = (2, 2)
            ):
        self.dimensions = dimensions
        self.sample_size = dimensions[0] * dimensions[1]
        self.sample = random.sample(buzzwords, self.sample_size)
        self.matrix_data = [random.sample(buzzwords, self.dimensions[1]) for i in range(self.dimensions[0])] # the buzzword
        self.matrix_state = [[False for i in range(self.dimensions[1])] for i in range(self.dimensions[0])]  # whether it has been used or not

    def __repr__(self):
        return \
f"""Dimensions: {self.dimensions}
Sample: {self.sample}
Matrix data: {self.matrix_data}
Matrix state: {self.matrix_state}
"""


player = Player()
print(player.board)

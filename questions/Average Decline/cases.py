cases = [
    TestCase(
        inputs=([4, 3, 5, 8, 6, 1, 2],),
        expected=True,  
    ),
    TestCase(
        inputs=([5, 5, 5, 5, 5, 5],),
        expected=False,  
    ),
    TestCase(
        inputs=([10, 9, 8, 7, 2, 3, 1],),
        expected=True,  
    ),
    TestCase(
        inputs=([1, 2, 3, 4, 5, 6, 7, 8],),
        expected=False,  
    ),
    TestCase(
        inputs=([9, 8, 7, 6, 4, 3, 2, 1],),
        expected=True,  
    ),

    TestCase(
        inputs=([3, 3, 3, 3, 2, 2, 2, 2],),
        expected=True,  
    ),
]
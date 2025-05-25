cases = [
    TestCase(inputs=([7, 7, 7, 7],), expected=0),
    TestCase(inputs=([1, 2, 3, 4, 5],), expected=4),
    TestCase(inputs=([7, 2, 5, 13, 18, 4, 15, 10],), expected=16),
    TestCase(inputs=([-10, -3, -25, -1],), expected=24), 
    TestCase(inputs=([-5, 0, 10, 3],), expected=15),  
    TestCase(inputs=([1000000, 1, 500000],), expected=999999),
]

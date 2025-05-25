cases = [
    TestCase(inputs=("I will be going to the cinema today. Nulla sodales, nisl ac ornare luctus, orci purus egestas erat, sit amet dictum enim erat id urna. Pellentesque eget elit dui. Ut congue ullamcorper sem. Mauris porttitor lacinia nunc eu aliquam. Mauris viverra pellentesque rhoncus. Sed sed sagittis lorem. Proin in porttitor dui. Ut facilisis felis imperdiet sem tristique, tempus sodales diam placerat. Etiam non nunc nec lacus consectetur scelerisque. ",), expected="I will be going to the cinema today."),
    
    TestCase(inputs=("Hopefully Joel Embiid will make the conference finals this year. Fusce tristique lectus leo, vitae commodo erat fringilla quis. Cras quis ipsum elit. Quisque efficitur odio non erat egestas finibus. Vestibulum in sollicitudin ligula. Praesent mauris risus, venenatis sit amet bibendum tempus, semper nec velit. Ut vitae elit lorem. Integer ultrices nisi libero, eget laoreet orci volutpat vel. Aliquam eget semper mi. ",), expected="Hopefully Joel Embiid will make the conference finals this year."),

   TestCase(inputs=("Hi, I must I ask you something. Nunc rhoncus, felis sed gravida pellentesque, diam nibh dictum eros, sed tempus nibh odio eu lectus. Mauris feugiat semper justo. Sed a varius leo, sit amet tempus risus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Integer eu tellus eros. ",), expected="Hi, I must I ask you something."),

   TestCase(inputs=("Today I felt like a single sentence text would be enough.",), expected="Today I felt like a single sentence text would be enough."),
]

export default function About() {
  return (
    <div className="[&_p]:text-gray-300 [&_a]:text-blue-500 text-lg my-8  max-w-7xl mx-auto ">
      <p>
        Hi! I am Doruk Cem the creator of this site. I hope that you find the
        questions here useful and fun.
      </p>

      <br />
      <p>
        This site meant to serve a as set of programming questions especially
        focusing on elementary level questions. The only thing you need for
        starting is the basic Python Syntax which you can learn from
        <a href="https://youtu.be/rfscVS0vtbw"> any beginner resource.</a> You
        do not need any knowledge of Data Structures and Algorithms which is
        required for most code solving sites such as LeetCode.
      </p>
      <br />
      <p>
        You can start solving question immediately in any order. The questions
        are sorted from simple to less simple but objectively giving questions a
        difficulty is notoriously difficult. You can optionally create an
        account to track the questions that you have solved across devices but
        it will still be tracked on your browsers localstorage if you do not.
        Signup is entirely handled by OAuth in general, this reveals no
        information about you beyond what is already public.
      </p>
      <br />
      <p>
        Each question is composed of two parts. The flavour text is mean to give
        some fun context to the question and for the most part it is not
        required to solve the question. The actual question will always be below
        the flavor text which should contain all information needed to solve the
        question. If you are not in the mood for reading a short story you can
        just jump to that part.
      </p>
      <br />
      <p>
        Unlike most sites for solving coding questions, you can view each test
        case for a given question. You can also check hints (if there are any)
        for a given question or view the solutions. You are solely responsible
        for how you learn from these questions.
      </p>

      <p>
        You are free to employ any strategy for learning from these questions. My
        approach would be that you are free too Google any part that you need
        for the solution expect for the question as a whole itself. For example
        if you know that you need to do x,y,z to solve a question instead of
        googling the question itself, google x,y,z separately and put them
        together yourself. I would also try to scribble a solution without using
        code, on paper or a tool like Paint before starting a question to build
        a diagram on how the code should act. You can see a good example of this
        practice <a href="https://www.youtube.com/watch?v=KLlXCFG5TnA">here</a>.
        If you are totally stuck and cannot produce anything even after trying
        to come up with a solution for 30 minutes it is fine to look at the
        solution. At that point, you have already spent so much time trying to
        come up with a solution that once you are given the solution you will
        probably internalize it. Again, feel free to use any approach; this is
        just my approach to coding questions.
      </p>
        <br/>
      <p>
        Use: <span className="underline">doruk.cem@gmail.com</span> to contact me.
      </p>
    </div>
  );
}

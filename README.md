# Filter TDD Workshop

## What is TDD?

Test-Driven Development (TDD) is a software development methodology that emphasizes writing tests before writing the actual code. The TDD cycle is a short, repetitive process that consists of three main phases: Red, Green, and Refactor. Here’s a closer look at each phase:

1. **Red**: Write a test for a new function or feature before you actually write the code to implement that function. Initially, since the code for the new feature doesn't exist yet, running the test will result in a failure. This is the "Red" phase, where the focus is on creating a test that defines a desired improvement or new function.

2. **Green**: Once you have a failing test, the next step is to write the minimum amount of code necessary to make the test pass. This phase is focused on making the test green as quickly as possible, which sometimes means not worrying about code quality or efficiency. The primary goal here is to ensure that the new code meets the requirements specified by the test.

3. **Refactor**: After getting the test to pass, the next step is to clean up the code. This can involve removing duplication, improving clarity, and applying any other code quality improvements. The key during this phase is to make sure that the improvements do not cause the tests to fail. This ensures that the functionality remains intact while improving the internal structure of the code.

The cycle then repeats for each new feature or piece of functionality, with tests written first, followed by the code to make those tests pass, and then refactoring to improve the quality of the codebase.

The benefits of TDD include:

- **Improved code quality**: Since TDD focuses on small, testable pieces of functionality, it often leads to more modular, flexible code with fewer bugs.
- **Better design**: Writing tests first can help developers think through the design of their code before they write it, leading to more thoughtful, well-designed systems.
- **Documentation**: Tests serve as a form of documentation that describes what the code is supposed to do.
- **Confidence**: Developers can make changes or refactor code with confidence, knowing that the suite of tests will catch any regressions or unintended side effects.

While TDD can lead to higher quality code and software, it also requires discipline and can initially slow down development as developers adapt to writing tests first. However, many teams find that the long-term benefits in terms of code quality, reduced debugging time, and more reliable software make it a worthwhile investment.

## How to complete this workshop

1. Install the recommended VS Code extensions.

2. Right-click on slide deck `slide-deck.md` and select `Open Preview` (Ctrl+Shift+V)

3. Follow the instructions in the slide deck.

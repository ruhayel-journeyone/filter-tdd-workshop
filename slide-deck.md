---
marp: true
---

# Filter TDD Workshop

---

## Step -1: Thinking about `filter`

---

What do we mean when we talk about [filtering](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)?

---

```js
const arrayToFilter = [0, -1, 3, -9, -0];
// I'd like an array containing only positive numbers
const arrayContainingOnlyPositiveNumbers = [0, 3, -0];
```

```js
const arrayToFilter = [4, 9, 17, 8];
// I'd like an array containing only even numbers
const arrayContainingOnlyEvenNumbers = [4, 8];
```

```js
const arrayToFilter = [null, undefined, "g'day", "0", -0, "-1", NaN];
// I'd like an array containing only 'truthy' values
// See: https://developer.mozilla.org/en-US/docs/Glossary/Truthy
const arrayContainingOnlyEvenNumbers = ["g'day", "0", "-1"];
```

## <!-- Given an existing array, we'd like to create a *new* array containing only those values that pass a given test -->

The `filter` function should always be invoked with 2 parameters:

1. `arrayToFilter`
2. `callbackFunction`

---

The `filter` function should always be invoked with 2 parameters:

1. **`arrayToFilter`** <---
2. `callbackFunction`

<!--
You might be wondering why that's the case. Let's break it down a bit.

First of all, if wanted to write a generic, reusable filtering function, we would need to allow the users of our function to define the _array_ that they wanted to filter.

This might sound obvious, but it's an important point.

We won't know which _array_ is being filtered upfront - we'll only know that information when the user of our `filter` function invokes it.
 -->

---

The `filter` function should always be invoked with 2 parameters:

1. `arrayToFilter`
2. **`callbackFunction`** <---

<!-- Secondly, the users of the `filter` function will need to define _how_ the items in the array in question will be filtered.

It's all well and good to say that we are going to filter an array, but how exactly do we decide if we are keeping an item in the array or not?

Hopefully, you agree that this is a worthwhile question. Let's dig into it a bit further. -->

---

What is an `Array`?

<!-- Put succinctly, it's a collection of items in a particular order. -->

---

```js
[1, 2, 3];
```

- value: 1 @ 0<sup>th</sup> index
- value: 2 @ 1<sup>st</sup> index
- value: 3 @ 2<sup>nd</sup> index

<!-- For example, the array `[1,2,3]` contains the values `1`,`2` and `3`, with the value `1` at the 0<sup>th</sup> index, `2` at the 1<sup>st</sup> index and `3` at the 2<sup>nd</sup> index. -->

---

```js
// Thirsty for a camel
["camel", "aardvark", "poison dart frog"];
```

<!-- When we talk about filtering an `Array`, what we are actually talking about is filtering the items contained within the `Array`.

For example, you might ask me to filter out any items that aren't "camel"

How would I go about doing that?  -->

---

```js
// 1. "camel" === "camel" ? true
// 2. "aardvark" === "camel" ? false
// 3. "poison dart frog" === "camel" ? false

//Original Array
["camel", "aardvark", "poison dart frog"];
```

```js
// Filtered Array
["camel"];
```

<!-- I would need to visit each item in the `Array`.

For each item, I would then check if the item in question's value was equal to `camel`. Any items with a value equal to `camel` would then be added to a new `Array` and then returned to the caller. -->

---

```js
// 1. "camel" === "camel" ? true
// 2. "aardvark" === "camel" ? false
// 3. "poison dart frog" === "camel" ? false

//Original Array
["camel", "aardvark", "poison dart frog"];
```

<!-- The decision on whether an item will make it into the filtered array is made by considering _only a single item_ at a time.

We ask ourselves if the item in question should remain in the _new_, _filtered_ array - this question has one of two possible answers: yes (`true`) or no (`false`). -->

---

<!-- In code, we could write 3 expressions, one per item in the array `["camel","aardvark","poison dart frog"]` that would evaluate to `true` or `false` depending on whether that item's value is equal to `camel`: -->

- `"camel"==="camel"` - evaluates to `true`
- `"aardvark"==="camel"` - evaluates to `false`
- `"poison dart frog"=="camel"` - evaluates to `false`

---

- `"camel"=="camel"` - evaluates to `true`
- `"aardvark"==="camel"` - evaluates to `false`
- `"poison dart frog"=="camel"` - evaluates to `false`

<!-- The issue with these expressions is that they _immediately_ evaluate to `true` or `false`, furthermore, they don't generalize to any other arrays.

Is there a way we can defer the evaluation of our comparison expression until we know what the item in hand is?

The answer is - yes, using a _function_. Functions allow us to _wrap_ our statements to defering execution until a time of our choosing.

And why might we want to defer the execution of those statements?

One reason might be that we are missing critical information required, such as in our example above - the item in an array (this may be because we don't even know what array we filtering in the first place!).-->

---

```js
const arrayToFilter = ["camel", "aardvark", "poison dart frog"];
arrayToFilter[0] === "camel"; // immediately evaluates to `true`
arrayToFilter[1] === "camel"; // immediately evaluates to `false`
arrayToFilter[2] === "camel"; // immediately evaluates to `false`
```

---

<!-- What if we didn't have an array to filter yet?
In that case, we wouldn't know what the left handside operand in
the expression is... -->

```js
unknownOperand === "camel";
```

---

<!-- Obviously, it makes no sense to evaluate this expression until
we know what the left handside operand is. If we were to evaluate
such an expression we would get the following error: -->

```js
"Uncaught ReferenceError: unknownOperand is not defined";
```

---

<!-- This is where a function comes in handy.

Let's declare a function to determine if an item should remain
in our new, filtered array.  -->

```js
function isCamel(unknownOperand) {
  // <--- We've defined a named parameter `unknownOperand`
  return unknownOperand === "camel";
}
```

---

<!-- Now we can choose when the expression `unknownOperand > 2` is evaluated,
namely, this is when the `isGreaterThanTwo` function is invoked: -->

```js
function isCamel(unknownOperand) {
  return unknownOperand === "camel";
}

isCamel("winfield"); // This returns `false`
```

---

<!-- Above, we were invoking the function `isGreaterThanTwo`, passing in an argument
of value `1` for the named parameter `unknowOperand`.

Before our function evaluates the statements in the function body
(statements between the {... }), it will initialize a function-scoped
variable called `unknownParameter` and assign it the value of `1`.
You can think of it as though we had done the following: -->

```js
function isCamel() {
  const unknownOperand = "Tay Tay"; // This happens automatically before the function executes the `unknownOperand === "camel"` statement below.
  return unknownOperand === "camel";
}
```

---

<!-- Finally, lets refactor our function so that it's parameter name is a bit more expressive: -->

```js
function isCamel(itemInArray) {
  return itemInArray === "camel";
}
```

---

```js
function isCamel(itemInArray) {
  return itemInArray === "camel";
}
```

<!-- Great! So now we have a handy weapon in our arsenal - a way to decide if a particular item in an array should be filtered out.

The function `isCamel` accepts the value of the item in question as an argument, and returns `true` or `false` depending on whether the item should be filtered out (i.e. if the item is === "camel"). -->

---

> Goal: Filter the contents of an existing array into a new array, based on a condition of our choosing.

<!-- So stepping back up a level, our goal was to filter the contents of an existing array into a new array, based on a condition of our choosing. -->

---

To recap what we don't know:

1. We **don't know** _what array we'll be filtering_
2. We **don't know** _how to decide if an item in the array should be filtered into the new array we'll be returning_

<!-- In the general case, we don't know what the array that we'll be filtering is, nor do we know how to decide if an item should be filtered out into the new array. -->

---

<!-- Let's pretend we had an array in hand, and function that could tell us if an item should be filtered into a new array.

How would this look?

Firstly, we need a new array that we can add the filtered items to:

-->

```js
const filteredArray = [];
```

---

<!-- Next, we'd need to visit each item in the array.
We can do this using a simple for loop statment -->

```js
const filteredArray = [];

for (let arrayIndex = 0; arrayIndex < arrayToFilter.length; arrayIndex++) {}
```

---

<!-- Now we can retrieve the item at the current index -->

```js
const filteredArray = [];

for (let arrayIndex = 0; arrayIndex < arrayToFilter.length; arrayIndex++) {
  const arrayItemAtCurrentIndex = arrayToFilter[arrayIndex];
}
```

---

<!-- A decision needs to made about `arrayItemAtCurrentIndex` -  are we adding it to the filteredArray or not?
Let's assume that a function exists that can make that decision - let's invoke the function and pass it the current item -->

```js
const filteredArray = [];

for (let arrayIndex = 0; arrayIndex < arrayToFilter.length; arrayIndex++) {
  const arrayItemAtCurrentIndex = arrayToFilter[arrayIndex];

  const itemShouldBeAddedToFilteredArray =
    functionToDecideIfItemWillBeAddedToFilteredArray(arrayItemAtCurrentIndex);
}
```

---

<!-- Finally, we add the item to the *new* filtered array if meets the required condition -->

```js
const filteredArray = [];

for (let arrayIndex = 0; arrayIndex < arrayToFilter.length; arrayIndex++) {
  const arrayItemAtCurrentIndex = arrayToFilter[arrayIndex];

  const itemShouldBeAddedToFilteredArray =
    functionToDecideIfItemWillBeAddedToFilteredArray(arrayItemAtCurrentIndex);

  if (itemShouldBeAddedToFilteredArray) {
    filteredArray.push(arrayItemAtCurrentIndex);
  }
}
```

<!-- So, the code above looks great, but we don't know what the `arrayToFilter` or
`functionToDecideIfItemWillBeAddedToFilteredArray` are. This is a familiar problem to the one we just solved - we need to perform an activity, but we don't have all the information in hand. Functions to the rescue! -->

---

<!-- Let's make it possible to defer the execution of the above code untill we have the information required. We can do this by wrapping the statements above in a function.

When choosing a name for the function we should consider its responsibility. In this case, our function encapsulates statements that created a filtered array, so how about the verb `filter`? -->

```js
function filter(
  functionToDecideIfItemWillBeAddedToFilteredArray,
  arrayToFilter
) {
  const filteredArray = [];

  for (let arrayIndex = 0; arrayIndex < arrayToFilter.length; arrayIndex++) {
    const arrayItemAtCurrentIndex = arrayToFilter[arrayIndex];

    const itemShouldBeAddedToFilteredArray =
      functionToDecideIfItemWillBeAddedToFilteredArray(arrayItemAtCurrentIndex);

    if (itemShouldBeAddedToFilteredArray) {
      filteredArray.push(arrayItemAtCurrentIndex);
    }
  }
}
```

<!-- There's a small issue with the above function - can you spot it? -->

<!-- The goal of function is to produce a filtered array - and when the function is invoked, the statements within it are executed one at a time.

This results in the values in the `arrayToFilter` being added to the `filteredArray` should they pass the test provided by `functionToDecideIfItemWillBeAddedToFilteredArray`.-->

---

<!-- Currently, `filteredArray` is declared within the scope of `filter`, however once `filter` finishes executing, the value of `filteredArray` will be discarded. -->

```js
function filter(
  functionToDecideIfItemWillBeAddedToFilteredArray,
  arrayToFilter
) {
  const filteredArray = []; // <---- declared within the scope of `filter`

  for (let arrayIndex = 0; arrayIndex < arrayToFilter.length; arrayIndex++) {
    const arrayItemAtCurrentIndex = arrayToFilter[arrayIndex];

    const itemShouldBeAddedToFilteredArray =
      functionToDecideIfItemWillBeAddedToFilteredArray(arrayItemAtCurrentIndex);

    if (itemShouldBeAddedToFilteredArray) {
      filteredArray.push(arrayItemAtCurrentIndex);
    }
  }
}
```

---

<!-- If we want the caller of `filter` to have access to that value, we should `return` the value. To do this, we simply add a return statement to the end of the function: -->

```js
function filter(
  functionToDecideIfItemWillBeAddedToFilteredArray,
  arrayToFilter
) {
  const filteredArray = [];

  for (let arrayIndex = 0; arrayIndex < arrayToFilter.length; arrayIndex++) {
    const arrayItemAtCurrentIndex = arrayToFilter[arrayIndex];

    const itemShouldBeAddedToFilteredArray =
      functionToDecideIfItemWillBeAddedToFilteredArray(arrayItemAtCurrentIndex);

    if (itemShouldBeAddedToFilteredArray) {
      filteredArray.push(arrayItemAtCurrentIndex);
    }
  }
  return filteredArray; // <-- Return the `filteredArray` to caller
}
```

---

<!-- Now any caller of `filter` can reference `filteredArray`: -->

```js
function isGreaterThanTwo(itemInArray) {
  return itemInArray > 2;
}

const arrayToFilter = [1, 2, 3];

const myFilteredArray = filter(isGreaterThanTwo, arrayToFilter);

console.log(myFilteredArray); // logs: [2,3]
```

<!-- Ok, so now we can start writing some code, let's get ourselves set up!  -->

---

## Step 0: Setting Up

---

### Checkout the starter project

1. In a terminal, navigate to the folder where your projects are located:

   ```sh
   cd path/to/your/projects
   ```

2. Clone the workshop repository

   ```sh
   git clone git@github.com:ruhayel-journeyone/filter-tdd-workshop.git
   ```

3. Change into the workshop directory:

   ```sh
   cd filter-tdd-workshop
   ```

---

### Open the project folder using your favorite IDE

For VS Code users, run the following:

```sh
code .
```

---

### Ensure tests are being run continuously

In your IDE open a _new intgerated terminal_ and run the following commands

```sh
npm install
npm run test-watch
```

---

### Create a `filter.test.js` file in the `src` directory

```sh
cd src
touch filter.test.js
```

---

### Add a top-level block in the `filter.test.js` file

```js
describe("filter", () => {});
```

Note the signature of the [`describe`](https://jestjs.io/docs/api#describename-fn) function. It accepts two arguments:

1. `name`: `'filter'`
2. `fn`: `()=>{}` - Note: this is an [_arrow_ **function**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)

<!-- The purpose of the `describe` function is to create a block that groups related test cases, specifically, all of the tests relating to the `filter` function. -->

---

## Step 1: RED

---

<!-- How should the `filter` function behave? The `filter` function should accept two arguments: -->

Arguments to `filter` function:

1. A function that tells us if an item in the array should be filtered out
2. An array (containing the items) to filter

<!-- Given these two arguments, how should it behave?

Well, we have a function we can use to decide if an item in the array should be filtered out, it is logical to expect that that function should be invoked once per item in the array we are filtering. -->

---

<!-- Let's write a test case to that effect. -->

Begin by adding a new block using the `describe` function:

```js
describe("filter", () => {
  describe("Given a callback function and an array", () => {}); // <-- Add this line
});
```

<!-- Notice that we haven't described the behaviour of the `filter` function yet.

We are simply describing our assumptions (givens) about how the function will be used. -->

---

Next, we'll describe the first behaviour of `filter` using the [`it` (alias `test`) function](https://jestjs.io/docs/api#testname-fn-timeout).

```js
describe("filter", () => {
  describe("Given a callback function and an array", () => {
    it("invokes the callback function once per item in the array", () => {}); // <-- Add this line
  });
});
```

---

The `it` (or `test`) function accepts the following arguments:

1. `name` - a description of the behaviour under test
2. `fn` - a function that contains the expectations to test

---

<!-- What does it mean to talk about *expectations*? To *test* if our function meets our *expectation* we need to verify that it behaves in the way we *expect* it to. In this case, we *expect* that when the `filter` method is invoked, passing in an array and a callback function, the `filter` function will invoke the callback function we passed in once per item in the array. -->

When invoked with a **callback function** and an **array** we _expect_ `filter` to:

> Invoke the **callback function** once for each item in the **array**

---

<!-- Assuming we know how many times the callback function was invoked, we can use jest's [`expect` function](https://jestjs.io/docs/expect#expect) to test the value: -->

```js
describe("filter", () => {
  describe("Given a callback function and an array", () => {
    it("invokes the callback function once per item in the array", () => {
      expect(numberOfTimesCallbackFunctionWasInvoked);
    });
  });
});
```

<!-- This doesn't seem very useful though.

We've invoked `expect` and passed it in the number of times the callback was invoked, but we haven't made any *assertions* about what that number *should be*! -->

---

```js
describe("filter", () => {
  describe("Given a callback function and an array", () => {
    it("invokes the callback function once per item in the array", () => {
      expect(numberOfTimesCallbackFunctionWasInvoked); // <--- returns a collection of matchers
    });
  });
});
```

<!-- This is where `matchers` come in handy. The `expect` function returns a collection of [`matchers`](https://jestjs.io/docs/expect#matchers) that you can use to make *assertions* about the value in question. -->

---

<!-- In this case, we expect the number of invocations to equal the number of items in the array being filtered. The [`toBe` matcher](https://jestjs.io/docs/expect#tobevalue) allows us to compare primitive values (e.g. `1`,`2` etc.)

This is what it looks like: -->

```js
describe("filter", () => {
  describe("Given a callback function and an array", () => {
    it("invokes the callback function once per item in the array", () => {
      expect(numberOfTimesCallbackFunctionWasInvoked).toBe(
        numberOfItemsInArrayToFilter
      ); // <-- Add this line
    });
  });
});
```

---

```js
describe("filter", () => {
  describe("Given a callback function and an array", () => {
    it("invokes the callback function once per item in the array", () => {
      // Where is `numberOfTimesCallbackFunctionWasInvoked` defined?
      // Where is `numberOfItemsInArrayToFilter` defined?
      expect(numberOfTimesCallbackFunctionWasInvoked).toBe(
        numberOfItemsInArrayToFilter
      );
    });
  });
});
```

<!-- The astute amongst you are probably wondering where `numberOfTimesCallbackFunctionWasInvoked` and `numberOfItemsInArrayToFilter` are defined.

Well, they aren't - yet.

Conceptually, we know the value we want to assert on(`numberOfTimesCallbackFunctionWasInvoked`)...

...and what value we expect it to have (`numberOfItemsInArrayToFilter`), so we started there.

Now we *work backwards* to define these variables and assign them a value. -->

---

<!-- Let's start with `numberOfItemsInArrayToFilter`. This comes from the array we are filtering: -->

```js
describe("filter", () => {
  describe("Given a callback function and an array", () => {
    it("invokes the callback function once per item in the array", () => {
      const numberOfItemsInArrayToFilter = arrayToFilter.length; // <-- Add this line
      expect(numberOfTimesCallbackFunctionWasInvoked).toBe(
        numberOfItemsInArrayToFilter
      );
    });
  });
});
```

---

<!-- Again, notice that we accessed the `length` property of `arrayToFilter` before `arrayToFilter` was defined. Let's now declare a variable called `arrayToFilter` and assign it a value: -->

```js
describe("filter", () => {
  describe("Given a callback function and an array", () => {
    it("invokes the callback function once per item in the array", () => {
      const arrayToFilter = [1, 2, 3]; // <-- Add this line
      const numberOfItemsInArrayToFilter = arrayToFilter.length;
      expect(numberOfTimesCallbackFunctionWasInvoked).toBe(
        numberOfItemsInArrayToFilter
      );
    });
  });
});
```

---

<!-- Now we turn our attention to `numberOfTimesCallbackFunctionWasInvoked`. How could we track the number of times a function has been invoked? Take a moment to see if you can come up with an approach. -->

> How can we track the number of times a function has been invoked?

<!-- To keep track of the number of invocations of a particular function we need a counter that is incremented with each invocation.

The counter, however, cannot exist only within the scope of the function we are invoking, otherwise, it would be destroyed each time the function finished executing.

Let's look at an example: -->

---

```js
let invocationCounter = 0; // <--- `invocationCounter` is declared in the outer scope of `incrementInvocationCounter`

function incrementInvocationCounter() {
  invocationCounter++;
}

console.log(`invocationCounter: ${invocationCounter}`); // invocationCounter: 0

incrementInvocationCounter();

console.log(`invocationCounter: ${invocationCounter}`); // invocationCounter: 1

incrementInvocationCounter();

console.log(`invocationCounter: ${invocationCounter}`); // invocationCounter: 2
// And so on...
```

---

<!-- Applying this approach to our test case, we *work backwards*, first declaring our counter, `numberOfTimesCallbackFunctionWasInvoked` and initializing its value to `0`: -->

```js
describe("filter", () => {
  describe("Given a callback function and an array", () => {
    it("invokes the callback function once per item in the array", () => {
      const arrayToFilter = [1, 2, 3];
      const numberOfItemsInArrayToFilter = arrayToFilter.length;
      let numberOfTimesCallbackFunctionWasInvoked = 0; // <--- Add this line
      expect(numberOfTimesCallbackFunctionWasInvoked).toBe(
        numberOfItemsInArrayToFilter
      );
    });
  });
});
```

<!-- If you look in your terminal at this point you should notice a *RED*, failing test. The expected value for `numberOfTimesCallbackFunctionWasInvoked` is `3` (the length of the array), but the observed value is `0`. -->

<!-- This is because the counter is never incremented. Next, we'll write a callback function that increments the counter with each invocation: -->

---

```js
describe("filter", () => {
  describe("Given a callback function and an array", () => {
    it("invokes the callback function once per item in the array", () => {
      const arrayToFilter = [1, 2, 3];
      const numberOfItemsInArrayToFilter = arrayToFilter.length;
      let numberOfTimesCallbackFunctionWasInvoked = 0;
      function callbackFunction() {
        // <--- Add this line
        numberOfTimesCallbackFunctionWasInvoked++; // <--- Add this line
      } // <--- Add this line
      expect(numberOfTimesCallbackFunctionWasInvoked).toBe(
        numberOfItemsInArrayToFilter
      );
    });
  });
});
```

---

<!-- Ofcourse our test is still failing, as `callbackFunction` is never invoked.

It's the `filter` function that is responsible for invoking `callbackFunction`, once per item in the array it is tasked with filtering.

So let's now invoke the `filter` function, passing it the `callbackFunction` and the `arrayToFilter`: -->

```js
describe("filter", () => {
  describe("Given a callback function and an array", () => {
    it("invokes the callback function once per item in the array", () => {
      const arrayToFilter = [1, 2, 3];
      const numberOfItemsInArrayToFilter = arrayToFilter.length;
      let numberOfTimesCallbackFunctionWasInvoked = 0;
      function callbackFunction() {
        numberOfTimesCallbackFunctionWasInvoked++;
      }
      filter(callbackFunction, arrayToFilter); // <--- Add this line
      expect(numberOfTimesCallbackFunctionWasInvoked).toBe(
        numberOfItemsInArrayToFilter
      );
    });
  });
});
```

---

<!-- Ok, now we're talking, our `filter` test is finally exercising the `filter` function for the first time. Looking at our test runner though, shows that the test case is still failing. This time it's because the `filter` function is not defined. -->

> Now our test is failing because `filter` is **not defined**

---

<!-- *Working backwards*, we need to [`import`](https://nodejs.org/api/esm.html#resolution-algorithm-specification) the `filter` function from the module it's defined in.

In this case, we'll import `filter` from a file `filter.js` adjacent to `filter.test.js`. Note that this file does not exist yet! -->

```js
import filter from "./filter"; // <-- Add this line
describe("filter", () => {
  describe("Given a callback function and an array", () => {
    it("invokes the callback function once per item in the array", () => {
      const arrayToFilter = [1, 2, 3];
      const numberOfItemsInArrayToFilter = arrayToFilter.length;
      let numberOfTimesCallbackFunctionWasInvoked = 0;
      function callbackFunction() {
        numberOfTimesCallbackFunctionWasInvoked++;
      }
      filter(callbackFunction, arrayToFilter);
      expect(numberOfTimesCallbackFunctionWasInvoked).toBe(
        numberOfItemsInArrayToFilter
      );
    });
  });
});
```

---

<!-- Our test is now failing due to fact that the module `./filter` cannot be resolved.  -->

> Now our test is failing because `./filter` **cannot be resolved**

<!-- That's ok, we haven't built `filter` yet!

Before we don there's one more thing we should talk about with regards to our test -->

---

<!-- To keep track of the number of invocations of the callback function we were passing to `filter` we overloaded our `callbackFunction` with the responsibility of tracking how many times it had been called. -->

> `callbackFunction` is now responsibile for:
>
> - Tracking how many times it's been invoked
> - Determining if an item in the array will be filtered out

---

> The [Single Responsiblity Principle](https://en.wikipedia.org/wiki/Single_responsibility_principle) dictates that _"a module should be responsible to one, and only one actor"_ <sup>[source](https://en.wikipedia.org/wiki/Single_responsibility_principle#cite_note-1)</sup>

---

<!-- A responsibility can be thought of as a *reason to change*, in this case, the `callbackFunction` is responsible for determining if an item in the array is to be filtered out; keeping track of how many times it was invoked is not its responsibility. -->

> `callbackFunction` is now responsibile for:
>
> - <s>Tracking how many times it's been invoked</s>
> - Determining if an item in the array will be filtered out

<!-- Thankfully, jest gives us a way to `decorate` our functions so that we can `spy` on their behaviour, including when they are invoked indirectly by some other code (e.g. our `callbackFunction` being invoked by `filter`).-->

---

We can create a [mock](https://jestjs.io/docs/mock-function-api) by invoking `jest.fn()`:

```js
const meMock = jest.fn();
```

---

<!-- Firstly, if you invoke `meMock`, it will currently always return `undefined`-->

Let's invoke meMock a few times:

```js
const meMock = jest.fn();

meMock(); // <--- Returns undefined
meMock(); // <--- Returns undefined
```

---

<!-- Now the cool stuff - we can work out how many times `meMock` was invoked by
accessing its `calls` property. The length of `calls` indicates how many times
the mock was invoked. -->

```js
const meMock = jest.fn();

meMock();
meMock();

console.log(meMock.calls.length); // This logs out '2'
```

---

<!-- We can even spy on another function. When we create our mock function we can pass it the function we want to spy on: -->

```js
const privateBloke = () => console.log("Bugger off!");

const spyOnPrivateBloke = jest.fn(privateBloke);
```

---

<!-- `spyOnPrivateBloke` is now spying on `privateBloke`
We can now invoke `spyOnPrivateBloke` and `privateBloke` will be invoked -->

```js
const privateBloke = () => console.log("Bugger off!");
const spyOnPrivateBloke = jest.fn(privateBloke);

spyOnPrivateBloke(); // This logs out 'Bugger off!'
```

---

<!-- Now we can see how many times privateBloke was invoked,
by looking at the `calls` property on `spyOnPrivateBloke` -->

```js
const privateBloke = () => console.log("Bugger off!");
const spyOnPrivateBloke = jest.fn(privateBloke);

spyOnPrivateBloke(); // This logs out 'Bugger off!'

console.log(spyOnPrivateBloke.calls.length); // This logs out '1'
```

---

<!-- With this knowledge in hand, let's revisit our current test case: -->

```js
import filter from "./filter";

describe("filter", () => {
  describe("Given a callback function and an array", () => {
    it("invokes the callback function once per item in the array", () => {
      const arrayToFilter = [1, 2, 3];
      const numberOfItemsInArrayToFilter = arrayToFilter.length;
      const callbackFunction = jest.fn(); // <--- create a mock named `callbackFunction`
      filter(callbackFunction, arrayToFilter); // <--- call `filter`
      let numberOfTimesCallbackFunctionWasInvoked =
        callbackFunction.calls.length; // <--- get the number of calls made the (mocked) `callbackFunction`
      expect(numberOfTimesCallbackFunctionWasInvoked).toBe(
        numberOfItemsInArrayToFilter
      );
    });
  });
});
```

---

<!-- We can go a step further, and use a special matcher [`toHaveBeenCalledTimes`](https://jestjs.io/docs/expect#tohavebeencalledtimesnumber) to assert against the number of times a mock was invoked. Let's take a look: -->

Let's use the [`toHaveBeenCalledTimes`](https://jestjs.io/docs/expect#tohavebeencalledtimesnumber) matcher:

```js
import filter from "./filter";
describe("filter", () => {
  describe("Given a callback function and an array", () => {
    it("invokes the callback function once per item in the array", () => {
      const arrayToFilter = [1, 2, 3];
      const numberOfItemsInArrayToFilter = arrayToFilter.length;
      const callbackFunction = jest.fn();
      filter(callbackFunction, arrayToFilter);

      // Instead of:
      // let numberOfTimesCallbackFunctionWasInvoked = callbackFunction.calls.length
      // expect(numberOfTimesCallbackFunctionWasInvoked).toBe(numberOfItemsInArrayToFilter)

      // Do this instead:
      expect(callbackFunction).toHaveBeenCalledTimes(
        numberOfItemsInArrayToFilter
      );
    });
  });
});
```

---

We've now finished writing our _RED_ (failing) test. Before we move onto the _GREEN_ phase (making the test pass), we need to commit our work.

```sh
git add src/filter.test.js # Stage the changes to `filter.test.js` for commit
git commit -m "RED: Given a callback function and an array, it invokes the callback function once per item in the array"
```

---

## Step 1: GREEN

---

<!-- As you may recall, our test is currently failing due to fact that the module `./filter` could not be resolved.  -->

> Our test is _currently_ failing because `./filter` **cannot be resolved**

<!-- So let's build the `filter` module! -->

---

<!-- Create a file in the `src` directory called `filter.js`.

In a new integrated terminal, issue the following commands: -->

In a separate terminal to the one where your tests are running:

```sh
cd src
touch filter.js
```

---

<!-- Looking at the output from our test runner, we now see a new error, telling us that `filter` is not a function. This makes sense, as we have not defined and exported a function from the `filter.js` module we just created. -->

> Now our test is failing because `filter` is **not a function**.

---

<!-- To fix that, open `filter.js` in your IDE and add the following content: -->

Add the following content to `filter.js`:

```js
function filter() {}

export default filter;
```

---

<!-- Finally, we have a test failure related to the behaviour of `filter`, as opposed to its non-existence. Before you launch off into the *RED-GREEN-REFACTOR* cycle, there's one small item left to discuss. -->

> Finally - we have test failure due to the behaviour of `filter`!

---

```js
const filter = (callbackFunction, array) => {
  for (let index = 0; index < array.length; index++) {
    callbackFunction();
  }
};
export default filter;
```

---

Now that our tests are all passing (_GREEN_), we will stage and commit our changes:

```sh
git add src/filter.js # Stage the changes to `filter.js` for commit
git commit -m "GREEN: Given a callback function and an array, it invokes the callback function once per item in the array"
```

---

## Step 2: RED

---

```js
import filter from "./filter";
describe("filter", () => {
  describe("Given a callback function and an array", () => {
    it("invokes the callback function once per item in the array", () => {
      const callbackFunction = jest.fn();
      const arrayToFilter = [1, 2, 3];
      filter(callbackFunction, arrayToFilter);
      expect(callbackFunction).toHaveBeenCalledTimes(3);
    });
    // Add the next test case ///////////////////////////////////////
    it("invokes the callback function passing it an item from the array as a paramater", () => {
      const callbackFunction = jest.fn();
      const arrayToFilter = [1];
      filter(callbackFunction, arrayToFilter);
      expect(callbackFunction).toHaveBeenNthCalledWith(1, 1);
    });
    /////////////////////////////////////////////////////////////////
  });
});
```

---

We've now finished writing our _RED_ (failing) test. Before we move onto the _GREEN_ phase (making the test pass), we need to commit our work.

```sh
git add src/filter.test.js # Stage the changes to `filter.test.js` for commit
git commit -m "RED: Given a callback function and an array, it invokes the callback function passing it an item from the array as a paramater"
```

---

## Step 2: GREEN

---

```js
const filter = (callbackFunction, array) => {
  for (let index = 0; index < array.length; index++) {
    callbackFunction(array[index]);
  }
};
export default filter;
```

---

Now that our tests are _all passing_ (_GREEN_), we can stage and commit our changes:

```sh
git add src/filter.js # Stage the changes to `filter.js` for commit
git commit -m "GREEN: Given a callback function and an array, it invokes the callback function passing it an item from the array as a paramater"
```

---

## Step 3: RED

---

```js
import filter from "./filter";
describe("filter", () => {
  describe("Given a callback function and an array", () => {
    it("invokes the callback function once per item in the array", () => {
      const callbackFunction = jest.fn();
      const arrayToFilter = [1, 2, 3];
      filter(callbackFunction, arrayToFilter);
      expect(callbackFunction).toHaveBeenCalledTimes(3);
    });
    it("invokes the callback function passing it an item from the array as a paramater", () => {
      const callbackFunction = jest.fn();
      const arrayToFilter = [1];
      filter(callbackFunction, arrayToFilter);
      expect(callbackFunction).toHaveBeenNthCalledWith(1, 1);
    });
    // Add the next test case ///////////////////////////////////////
    it("returns an array", () => {
      function callbackFunction(item) {}
      const arrayToFilter = [];
      const filteredArray = filter(callbackFunction, arrayToFilter);
      expect(filteredArray).toBeInstanceOf(Array);
    });
    /////////////////////////////////////////////////////////////////
  });
});
```

---

We've now finished writing our _RED_ (failing) test. Before we move onto the _GREEN_ phase (making the test pass), we need to commit our work.

```sh
git add src/filter.test.js # Stage the changes to `filter.test.js` for commit
git commit -m "RED: Given a callback function and an array, it returns an array"
```

---

```js
const filter = (callbackFunction, array) => {
  for (let index = 0; index < array.length; index++) {
    callbackFunction(array[index]);
  }
  return array;
};
export default filter;
```

---

Now that our tests are _all passing_ (_GREEN_), we can stage and commit our changes:

```sh
git add src/filter.js # Stage the changes to `filter.js` for commit
git commit -m "GREEN: Given a callback function and an array, it returns an array"
```

---

## Step 4: RED

---

```js
import filter from "./filter";
describe("filter", () => {
  describe("Given a callback function and an array", () => {
    it("invokes the callback function once per item in the array", () => {
      const callbackFunction = jest.fn();
      const arrayToFilter = [1, 2, 3];
      filter(callbackFunction, arrayToFilter);
      expect(callbackFunction).toHaveBeenCalledTimes(3);
    });
    it("invokes the callback function passing it an item from the array as a paramater", () => {
      const callbackFunction = jest.fn();
      const arrayToFilter = [1];
      filter(callbackFunction, arrayToFilter);
      expect(callbackFunction).toHaveBeenNthCalledWith(1, 1);
    });
    it("returns an array", () => {
      function callbackFunction(item) {}
      const arrayToFilter = [];
      const filteredArray = filter(callbackFunction, arrayToFilter);
      expect(filteredArray).toBeInstanceOf(Array);
    });
    // Add the next test case ///////////////////////////////////////
    it("returns a new array", () => {
      function callbackFunction(item) {
        return item > 2;
      }
      const arrayToFilter = [];
      const filteredArray = filter(callbackFunction, arrayToFilter);
      expect(filteredArray).not.toBe(arrayToFilter);
    });
    /////////////////////////////////////////////////////////////////
  });
});
```

---

We've now finished writing our _RED_ (failing) test. Before we move onto the _GREEN_ phase (making the test pass), we need to commit our work.

```sh
git add src/filter.test.js # Stage the changes to `filter.test.js` for commit
git commit -m "RED: Given a callback function and an array, it returns a new array"
```

---

## Step 4: GREEN

---

```js
const filter = (callbackFunction, array) => {
  for (let index = 0; index < array.length; index++) {
    callbackFunction(array[index]);
  }
  return [];
};
export default filter;
```

---

Now that our tests are _all passing_ (_GREEN_), we can stage and commit our changes:

```sh
git add src/filter.js # Stage the changes to `filter.js` for commit
git commit -m "GREEN: Given a callback function and an array, it returns a new array"
```

---

## Step 4: REFACTOR

---

```js
const filter = (callbackFunction, array) => {
  let filteredArray = [];
  for (let index = 0; index < array.length; index++) {
    callbackFunction(array[index]);
  }
  return filteredArray;
};
export default filter;
```

---

Now that we've completed refactoring our code, we can stage and commit our changes:

```sh
git add src/filter.js # Stage the changes to `filter.js` for commit
git commit -m "REFACTOR: Given a callback function and an array, it returns a new array"
```

---

## Step 5: RED

---

```js
import filter from "./filter";
describe("filter", () => {
  describe("Given a callback function and an array", () => {
    it("invokes the callback function once per item in the array", () => {
      const callbackFunction = jest.fn();
      const arrayToFilter = [1, 2, 3];
      filter(callbackFunction, arrayToFilter);
      expect(callbackFunction).toHaveBeenCalledTimes(3);
    });
    it("invokes the callback function passing it an item from the array as a paramater", () => {
      const callbackFunction = jest.fn();
      const arrayToFilter = [1];
      filter(callbackFunction, arrayToFilter);
      expect(callbackFunction).toHaveBeenNthCalledWith(1, 1);
    });
    it("returns an array", () => {
      function callbackFunction(item) {}
      const arrayToFilter = [];
      const filteredArray = filter(callbackFunction, arrayToFilter);
      expect(filteredArray).toBeInstanceOf(Array);
    });
    it("returns a new array", () => {
      function callbackFunction(item) {}
      const arrayToFilter = [];
      const filteredArray = filter(callbackFunction, arrayToFilter);
      expect(filteredArray).not.toBe(arrayToFilter);
    });
    // Add the next test case ///////////////////////////////////////
    it("returns an array of items for which the callback function is truthy", () => {
      function callbackFunction(item) {
        return item > 2;
      }
      const arrayToFilter = [1, 2, 3];
      const filteredArray = filter(callbackFunction, arrayToFilter);
      expect(filteredArray).toEqual([3]);
    });
    /////////////////////////////////////////////////////////////////
  });
});
```

---

## Step 5: GREEN

---

```js
const filter = (callbackFunction, array) => {
  let filteredArray = [];
  for (let index = 0; index < array.length; index++) {
    if (callbackFunction(array[index])) {
      filteredArray.push(array[index]);
    }
  }
  return filteredArray;
};
export default filter;
```

---

Now that our tests are _all passing_ (_GREEN_), we can stage and commit our changes:

```sh
git add src/filter.js # Stage the changes to `filter.js` for commit
git commit -m "GREEN: Given a callback function and an array, it returns an array of items for which the callback function is truthy"
```

---

## Step 5: REFACTOR

---

```js
const filter = (callbackFunction, array) => {
  let filteredArray = [];
  for (let index = 0; index < array.length; index++) {
    const currentItem = array[index];
    if (callbackFunction(currentItem)) {
      filteredArray.push(currentItem);
    }
  }
  return filteredArray;
};
export default filter;
```

---

Now that we've completed refactoring our code, we can stage and commit our changes:

```sh
git add src/filter.js # Stage the changes to `filter.js` for commit
git commit -m "REFACTOR: Given a callback function and an array, it returns an array of items for which the callback function is truthy"
```

---

THE END

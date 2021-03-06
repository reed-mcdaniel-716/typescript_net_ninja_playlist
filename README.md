# [Net Ninja TypeScript Tutorial Playlist](https://youtube.com/playlist?list=PL4cUxeGkcC9gUgr39Q_yD6v-bSyMwKPUI)

- files [here](https://github.com/iamshaunjp/typescript-tutorial)

## Table of Contents

1. [Introduction & Setup](#intro)
2. [Compiling TypeScript](#compile)
3. [Type Basics](#type_basics)
4. [Objects & Arrays](#objs_arrays)
5. [Explicit Types](#explicit_types)
6. [Dynamic (Any) Types](#dynamic_any_types)
7. [Better Workflow & `tsconfig`](#workflow)
8. [Function Basics](#functions)
9. [Type Aliases](#type_aliases)
10. [Function Types (Signatures)](#func_types_sigs)
11. [The DOM & Type Casting](#dom_type_casting)
12. [Classes](#classes)
13. [Public, Private, Readonly](#public_private_readonly)
14. [Modules](#modules)
15. [Interfaces](#interfaces)
16. [Interfaces and Classes](#interfaces_and_classes)
17. [Rendering an HTML Template](#html_templates)
18. [Generics](#generics)
19. [Enums](#enums)
20. [Tuples](#tuples)

---

1. Introduction & Setup <a name='intro'></a>

- superset of JavaScript with strict type system amongst other things
  - error checking and debugging becomes easier
- because browsers don't understand TS by default, it must be compiled to JS
  ```shell
  npm init
  npm install --save-dev typescript
  npm install --save-dev commonjs
  ```
- Additional features like generics, interfaces, tuples, and more

---

2. Compiling TypeScript <a name='compile'></a>

- Using Microsoft's Live Preview to have a server serving this content in the browser at port 3000
- TypeScript code must be compiled before if can be rendered in the browser
- This can be done with the following command:

```shell
npx tsc app.ts app.js
```

where `app.ts` could be replaced with any input TS filename, and `app.js` could be replaced with any output JS filename

- **_can't have both files open at the same due to naming conflicts_**
- if you want the input and output files to have the same name you can leave off the output file name
- if you want typescript to watch a file and automatically recompile TS code to JS code on saved changes:

```shell
npx tsc app.ts -w
```

---

3. Type Basics <a name='type_basics'></a>

- the type a variable is at declaration is the type it must stay as
  - if you try to assign a different type to it later, you will get an error
  - you cna however change it's value withing the declaration type
- TS infer types based on assignment, but they can also be explicitly defined
- You should however define the type for function parameters to ensure type checking
- Type checking is done at compilation > i.e. code won't compile to JS if type errors exist

---

4. Objects and Arrays <a name='objs_arrays'></a>

- All elements of an array **must** be of the same type **if** the original array is declared with just a single type
- You can have an array of mixed types only if it is declared with mixed types
  - you can also redefine an index of the array as a different type i.e. if `arr[0]` was defined as a number, it can reassigned to any type as long as the array was declared with mixed types
- In an object, the key-value pair assignents work like variable assignments in that the type of a particular key cannot be changes
- Once an object is declared, you cannot add or remove a property
- Additionally, arrays must remain arrays, and likewise for objects

---

5. Explict Types <a name='explicit_types'></a>

- To initialize a variable without initializing it, we should give it an explicit type since there is nothing for TS to infer from.

```typescript
let age: number;
```

- The same type strictness will now apply
- A similar thing can be done with arrays

```typescript
let ninjas: string[] = [];
// assigning to an empty array so that it is alread initialized for use
```

- We use the `union` type to define multiple the types a variable may house

```typescript
let ninjas: (string | number)[] = [];
// could add a string or number, but not a boolean

let uuid: string | number;
```

- We can similarly define a variable as an object, which is a superclass of array

```typescript
let obj: object;
// could be an object or array

let obj2: {
  name: string;
  age: number;
};
// more structure to be enforced when the variable is given a value
```

---

6. Dynamic (Any) Types <a name='dynamic_any_types'></a>

- `any` type for variables that can be of any type, and can therefore also change type over time

```typescript
let age: any;
age = 25;
age = "twenty-five";
// both are acceptable

let anyArr: any[] = [];
// can add any values to this array

let obj: {
  name: any;
  age: any;
};
// same for an object; still can't add or remove properties
```

- kind of reverts TS back to JS, removing a lot of its useful features

---

7. Better Workflow & `tsconfig` <a name='workflow'></a>

- May want to structure you project separating your `public` files (i.e. CSS, HTML, compiled JS code), from your `src` source TS files
- But how do we connect these files? > with `tsconfig`

```shell
npx tsc --init
```

- This creates a `tsconfig.json` file:
  - could change `"target"` to `ESNext` from `es5`, indicating the higest JS version your TS version supports
  - could also change `"module"` to `ESNext`
  - set `"outDir"` to where you want compiled JS files, and `"rootDir"` to where your source TS files will be housed
- Must also tell TS what to watch now with `npx tsc -w`
  - unfortunately, this now has TS watching all file with the extension `.ts`, and compiling them in the `public` folder, even those outside of the source `src` folder
  - to address this, you can specify which files should be included in watching in the `tsconfig.json` file by adding the following at the top level of the object:
  ```json
  {
    ...,
    "include": ["src"]
  }
  ```

---

8. Function Basics <a name='functions'></a>

- TS will infer the type of a function variable as well when it is defined
- Could also define this explicitly

```typescript
let greet: Function;
// can be a traditional or arrow function
```

- Recall, you can also explicitly type function parameters
- You can also define functions with optional types, and make parameters themselves optional as well, and default values

```typescript
const add = (a: number, b: number, c: number | string) => {};
// optional type

const add = (a: number, b: number, c?: number | string) => {};
// optional variable; defaults to undefined

const add = (a: number, b: number = 10, c?: number | string) => {};
// default value; don't need to make a variable optional if it is given a default
// leave optional and defalut params until after other params
```

- The return type of a function may be inferred, but best to be explicit

```typescript
const add = (a: number, b: number = 10): void => {
  console.log("adding...");
};
// void return type

const add = (a: number, b: number = 10): number => {
  return a + b;
};
// numeric return type
```

- If you assign the return value of a function to a variable, note that this will set the infered type of that variable, and it cannot be changed

```typescript
let result = add(1, 3);
// the type of result is now inferred to be the return type of add() which is a number
```

---

9. Type Aliases <a name='type_aliases'></a>

- Type aliases can be defined to reuse type specifications for DRYer code

```typescript
type StringOrNum = string | number;
// type alias

const logDetails = (uuid: StringOrNum) => {};

const logMore = (uuid: StringOrNum, hash: number) => {};
```

---

10. Function Types (Signatures) <a name='func_types_sigs'></a>

- Function signature decribe in more detail a function, including the arguments (nd their types) it takes, and the return value(s) and type(s)
  - names of params in signature **_need not_** match the final name of the params in the defined function

```typescript
let logDetails: (obj: { name: string; age: number }) => void;

type person = { name: string; age: number };

logDetails = (ninja: person): void => {
  console.log(`${ninja.name} is ${ninja.age} years old`);
};
```

---

11. The DOM & Type Casting <a name='dom_type_casting'></a>

- TypeScript doesn't have special access to your HTML, so it doesn't know if certain element will exist (or be null) after compilation
- As a result, you must either handle for null values (conditional statements), or, explicitly let TS know that a particular HTML element exists
  - this is done by putting an exclaimation point at the end of assignment before the semi-colon
- TS also has special types for each DOM element type
  - knows all properties and methods available on that element type
  - for example, it knows that `<a>` tags (of type `HTMLAnchorElement`) have a `href` property
- TS however cannot infer the type of an element if it is grabbed by something other then it's tag type i.e. if you grab it by its class
  - in this case, you must type cast that element if you want access to its specific type properites and methods

---

12. Classes <a name='classes'></a>

- Classes in TS behave much like how they do in JS, with the addition of the strict type system
- To make an array of a user-defined class, you can do the following:

```typescript
class MyClass{
  ...
}

let myClassArr: myClass[] = [];
```

---

13. Public, Private, Readonly <a name='public_private_readonly'></a>

- TypeScript provides access modifiers (like in Java) for class properties and methods
  - `public`: any access and modification inside and outside of the class
  - `private`: only access and modification within a class
  - `readonly`: can access from inside and outside the class, but not modify it in either context
- accessors can be applied whenever a variable is first declared, either at the beginning of a class or within a class constructor

---

14. Modules <a name='modules'></a>

- We may wish to split our code out into separate files via [ES6 modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) i.e. what you `import` and `export`
  - because `modules` are only supported for newer browsers, TS doesn't compile them down to something older browsers will understand, so it's important to be using a modern browser to enable this functionality
  - Another option is `webpack` + TS (out of scope) for bundling and support for older browsers
- To use modules, in any `<script></script>` tags that have a compiled JS module (i.e. one that was written in TS then compiled to JS code in youas a `src`, set the property `type="module"`

---

15. Interfaces <a name='interfaces'></a>

- for the difference between type aliases and intefaces (they look quite similar...) [read this](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces)
- recall, interfaces are like contracts, telling you what you can expect from a class that implements or other interface that extends it
- an instantiation of an interface must have all properties and only the properties defined in the interface
- this can be very helpful in enforcing what argements are passed as parameters to a function

```typescript
// interfaces

interface IsPerson {
  name: string;
  age: number;
  speak(a: string): void;
  spend(a: number): number;
}

const me: IsPerson = {
  name: "reed",
  age: 25,
  speak(text: string): void {
    console.log(text);
  },
  spend(amount: number): number {
    console.log(` spent ${amount}`);
    return amount;
  },
};
```

---

16. Interfaces and Classes<a name='interfaces_and_classes'></a>

- classes can implement interfaces
- intefaces can be used much like types in that they can be used to enforce the structure and content of variable, lists, and classes

---

17. Rendering an HTML Template<a name='html_templates'></a>

- make use of the `render()` function defined in a class directly
- interacting with the DOM directly using the `document` JS interface

---

18. Generics <a name='generics'></a>

- Generics are a feature in TS that allow us to create blocks of reusable code that can be used with different types

```typescript
const addUID = (obj: object) => {
  let uid = Math.floor(Math.random() * 100);
  return { ...obj, uid };
};

let docOne = addUID({ name: "yoshi", age: 40 });
console.log(docOne);
console.log(docOne.name); // error

// but can't access any properties of the object because the function doesn't know what kind of object this is
// and therefore, we can't know the properties of the returned object
// must use generics
```

- we can capture the specifics of whatever type is passed in like this

```typescript
const addUID = <T>(obj: <T>) => {
  let uid = Math.floor(Math.random() * 100);
  return { ...obj, uid };
};

// but we're no longer enforcing that this parameter must be an objects
```

- instead, we can enforce that whatever is returned must extend the type that is passed in

```typescript
const addUID = <T extends object>(obj: <T>) => {
  let uid = Math.floor(Math.random() * 100);
  return { ...obj, uid };
};

```

- or even more precisely

```typescript
const addUID = <T extends {name: string}>(obj: <T>) => {
  let uid = Math.floor(Math.random() * 100);
  return { ...obj, uid };
};

```

- alternatively, generics can be implemented with interfaces

```typescript
interface Resource<T> {
  uid: number;
  resourceName: string;
  data: T;
}

const docThree: Resource<object> = {
  uid: 1,
  resourceName: "person",
  data: { name: "reed" },
};

const docFour: Resource<string[]> = {
  uid: 1,
  resourceName: "person",
  data: ["reed", "mcdaniel"],
};
```

---

19. Enums<a name='enums'></a>

- **enums** are a special data type that allow us to store a collection of constants and assiciate each one with a numeric value

```typescript
enum ResourceType {
  BOOK,
  AUTHOR,
  FILM,
  DIRECTOR,
  PERSON,
}
interface Resource<T> {
  uid: number;
  resourceType: ResourceType;
  data: T;
}

const docThree: Resource<object> = {
  uid: 1,
  resourceType: ResourceType.BOOK,
  data: { name: "reed" },
};

console.log(docThree.resourceType); // returns 0 i.e. the index of BOOK in the enum
```

20. Tuples<a name='tuples'></a>

- tuples, like in python, are immutable in that the type at a particular index cannot be changed

```typescript
// lists
let arr = ["ryu", 25, true];
arrr[0] = false;
arr = [30, false, "yoshi"];
// the above is all fine for lists

//tuple
let tup: [string, number, boolean] = ["ryu", 25, true];
tup[0] = false; // error
tup[0] = "yoshi"; // allowed
```

- tuples are useful for eforcing structure on a collection, for example passing in args as a tuple

```typescript
let student: [string, number];
student = [98, "reed"]; // error
student = ["reed", 98]; //allowed
```

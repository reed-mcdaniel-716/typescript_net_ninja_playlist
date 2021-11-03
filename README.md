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

---

1. Introduction & Setup <a name='intro'></a>

- superset of JavaScript with strict type system amongst other things
  - error checking and debugging becomes easier
- because browsers don't understand TS by default, it must be compiled to JS
  ```shell
  npm init
  npm install --save-dev typescript
  ```
- Additional features like generics, interfaces, tuples, and more

2. Compiling TypeScript <a name='compile'></a>

- Using Microsoft's Live Preview to have a server serving this content in the browser at port 3000
- TypeScript code must be compiled before if can be rendered in the browser
- This can be done with the following command:

```shell
npx tsc sandbox.ts sandbox.js
```

where `sandbox.ts` could be replaced with any input TS filename, and `sanbox.js` could be replaced with any output JS filename

- **_can't have both files open at the same due to naming conflicts_**
- if you want the input and output files to have the same name you can leave off the output file name
- if you want typescript to watch a file and automatically recompile TS code to JS code on saved changes:

```shell
npx tsc sandbox.ts -w
```

3. Type Basics <a name='type_basics'></a>

- the type a variable is at declaration is the type it must stay as
  - if you try to assign a different type to it later, you will get an error
  - you cna however change it's value withing the declaration type
- TS infer types based on assignment, but they can also be explicitly defined
- You should however define the type for function parameters to ensure type checking
- Type checking is done at compilation > i.e. code won't compile to JS if type errors exist

4. Objects and Arrays <a name='objs_arrays'></a>

- All elements of an array **must** be of the same type **if** the original array is declared with just a single type
- You can have an array of mixed types only if it is declared with mixed types
  - you can also redefine an index of the array as a different type i.e. if `arr[0]` was defined as a number, it can reassigned to any type as long as the array was declared with mixed types
- In an object, the key-value pair assignents work like variable assignments in that the type of a particular key cannot be changes
- Once an object is declared, you cannot add or remove a property
- Additionally, arrays must remain arrays, and likewise for objects

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

7. Better Workflow & `tsconfig` <a name='workflow'></a>

- May want to structure you project separating your `public` files (i.e. CSS, HTML, compiled JS code), from your `src` source TS files
- But how do we connect these files? > with `tsconfig`

```shell
npx tsc --init
```

- This creates a `tsconfig.json` file:
  - could change `target` to `ESNext` from `es5`, indicating the higest JS version your TS version supports
  - set `outDir` to where you want compiled JS files, and `rootDir` to where your source TS files will be housed
- Must also tell TS what to watch now with `npx tsc -w`
  - unfortunately, this now has TS watching all file with the extension `.ts`, and compiling them in the `public` folder, even those outside of the source `src` folder
  - to address this, you can specify which files should be included in watching in the `tsconfig.json` file by adding the following at the top level of the object:
  ```json
  {
    ...,
    "include": ["src"]
  }
  ```

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

9. Type Aliases <a name='type_aliases'></a>

- Type aliases can be defined to reuse type specifications for DRYer code

```typescript
type StringOrNum = string | number;
// type alias

const logDetails = (uuid: StringOrNum) => {};

const logMore = (uuid: StringOrNum, hash: number) => {};
```

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

11. The DOM & Type Casting <a name='dom_type_casting'></a>

- TypeScript doesn't have special access to your HTML, so it doesn't know if certain element will exist (or be null) after compilation
- As a result, you must either handle for null values (conditional statements), or, explicitly let TS know that a particular HTML element exists
  - this is done by putting an exclaimation point at the end of assignment before the semi-colon
- TS also has special types for each DOM element type
  - knows all properties and methods available on that element type
  - for example, it knows that `<a>` tags (of type `HTMLAnchorElement`) have a `href` property
- TS however cannot infer the type of an element if it is grabbed by something other then it's tag type i.e. if you grab it by its class
  - in this case, you must type cast that element if you wnat access to its specific type properites and methods

12. Classes

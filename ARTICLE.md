# Introducing List Comprehension for TypeScript

List comprehension is a method from mathematics to describe a collection of values in a very compact and elegant way. This notation has been implemented by a lot of languages where it primarily is used to construct and populate a list in a single expression instead of population an empty list with a multitude of loops and if-statements. Because of its connections to mathematics and expression based nature list comprehension works incredibly well within functional programming. 

It does then not come as a surprise than languages like Haskell and F# come with a rich and complete implementation of this technique, but also languages that are popular by data scientists like Python and R offer list comprehension as a language feature.

## What is list comprehension?

But enough talk about programming languages, what is list comprehension and how does is work? List comprehension allows you to create your collection with an expression that exists out of three parts: the output expression, the input sets and the predicates that filter the input set. This is properly best shown with some Python code :

```python
[var * 2 for var in input_list if var % 2 == 0]  
```

Here the var * 2 is the expression that creates the value in the lists. This expression will be used for every item in the input_list. But this list will be filtered by the expression after the if: var % 2 == 0. For small lists this might just look like some syntax sugar, but with big multidimensional collections this notation will be become a real lifesaver!

In this article I will walk you through a list comprehension library that I created for TypeScript. It allows you to use regular TypeScript code while still enjoying all the advantages of list comprehension. I will mainly focus on how the api guarantees type safety when using multiple input sets to create multidimensional collections. The result will look like shown below:

```ts
const s = select(x => y => [x, y])
  .from(range(0, 10), range(10, 11))
  .where((_, y) => y % 2 == 0)
  .asArray()  
```

## The foundation
We will start of by setting up the basic types for the builder in the example above. In this first version we will only support the usage of input source. Later on we'll talk about the challenges a dynamic amount of input sources brings with it.

```ts
type InputSet = number[]

interface FromBuilder<res> {
  from(input: InputSet):ResultBuilder<res>
}

interface ResultBuilder<res> {
  where(p: (n: number) => boolean, ...pp: ((n: number) => boolean)[]): ResultBuilder<res>
  asArray(): res[]
}

const select = <res>(out: (n: number) => res): FromBuilder<res> => null!
```

In those examples I will ignore the implementation of the interfaces. You can find those in the source code of the library over [HERE]. I omitted then because they aren’t doing anything to special and do take up a lot of space.

Multiple input sources
In the example shown below we can only use one input source. This is a very severe limitation on what we can do with our list comprehension. For example, creating a multidimensional collection is now impossible or even merging two collection is not supported. For the sake of argument we can take a bit of a naive approach to this and create a version that works on two inputs:

```ts
type InputSet = number[]

interface SetBuilder2<res> {
  from(input1: InputSet, input2: InputSet):ResultBuilder2<res>
}

interface ResultBuilder2<res> {
  where(p: (n1: number, n2: number) => boolean, ...pp: ((n: number) => boolean)[]): ResultBuilder2<res>
  asArray(): res[]
}

const select2 = <res>(out: (n1: number, n2: number) => res): SetBuilder2<res> => null!
```

And this will work like a charm, but what if I want three inputs? Or even four or five? Just keeping coping our code (including the implementation) and numbering the names is not really a nice way of doing this. Want we do want is to just start writing our list comprehension code and for the compiler to figure out on how many inputs we working. This means that the return type of the select function is going to be different based on how many inputs we are expecting. For this we can use overloading in TypeScript to create a link between the amount of arguments we expect and the return type of the select function.

To use this we are going to define a callable interface for the select function (you will see how this works in a bit) and create overload for all the amounts of inputs we support. This will be a little bit repetitive, but way less than just copying the complete library around. Another thing we need to consider is that the argument to select needs to be unique for each overload. This means that we can’t use a function that gets N arguments because in TypeScript a function with 1 arguments is assignable to a function that get two arguments as long as the type of the first arguments is the same. Look to the functions f1 and f2 below, they are the same as far as TypeScript is concerned.

```ts
type F = (a: number, b: number) => number
const f1: F = (a: number, b: number) => a
const f2: F = (a: number) => a
```

Because of this we will use curried functions that have one argument and return a new function for the second argument. With this we can give the select function a function that expects to work on a certain amount of input sources and TypeScript will force us to provide the exact amount of input sources. This means that we will not run into any null-errors because we forgot to provide one of the inputs. 

```ts
interface Select {
  <res>(out: (a: number) => (b: number) => (c: number) => res): ResultBuilder3<res>
  <res>(out: (a: number) => (b: number) => res): ResultBuilder2<res>
  <res>(out: (a: number) => res): ResultBuilder<res>
}

const select: Select = () => null!

const s = select(x => y => x + y) //ResultBuilder2<number]>
```


## Conditions and multiple input sources



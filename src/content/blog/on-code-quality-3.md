---
title: On code quality in frontend development (Part 3)
author: Adrian Zinko
pubDatetime: 2024-05-04T06:11:07Z
modDatetime:
slug: on-quality-in-frontend-development-3
featured: true
draft: false
tags:
  - JavaScript
  - Frontend Development
  - Code Quality
description: |
  In this part, I will discuss the application of mentioned principles in frontend development and how they can help you build better software
---

> In this part, I will discuss the application of mentioned principles in frontend development and how they can help you build better software

## Table of contents

There's a discussion about whether practices like SOLID or CUPID, which originate from object-oriented paradigms, integrate well with the functionally driven nature of modern frontend development. Is there any truth to these claims?

## High-Quality Components

The cornerstone of any user interface today is its components. It's essential to adhere to the "single responsibility" rule and ensure components are part of a larger, cohesive whole. It's nearly impossible to envision a high-caliber application that relies on a single component to manage all user interactions. More commonly, the UI is divided into smaller, modular pieces that can be easily interchanged, often reflecting the naming conventions of their operational domain.

These practices embody three key principles:

Single Responsibility Principle (SOLID)
Composability (CUPID)
Domain-based Naming (CUPID)

Early planning of even the simplest application structure is beneficial. It helps in foreseeing the implications of certain layouts and understanding state and data flow requirements, aligning the entire team on the decision-making process that impacts project execution. This subject will be expanded in the last module focused on frontend architecture. Upcoming lessons will introduce various state management strategies that emerge from the component arrangements.

## API Communication and Dependency Management

How should you handle API communications? Are libraries like axios or superagent meant to bind us indefinitely, or should you consider the increasingly standard fetch API? Clean coding and adherence to design patterns simplify the transition to new technologies.
If components are tightly bound to specific HTTP libraries, updates can become cumbersome. The Dependency Inversion Principle dictates that such dependencies should be loosely connected with the application core and injected from outside.

In Angular, direct instantiation of an HTTP client within a component would violate best practices:

```typescript
class MyComponent {
  private http: HttpService = new AxiosService(); // Breach of Dependency Inversion
}
```

A preferable approach leverages Angular's Dependency Injection system to keep dependencies separate from component logic:

```typescript
class MyComponent {
  constructor(private http: HttpService) { ... } // Constructor-based Dependency Injection
}

// Example of creating an instance with Dependency Injection:
const cmp = new MyComponent(new FetchService()); // Managed by Angular
```

React lacks a built-in Dependency Injection framework, but component separation can be achieved with custom hooks:

```typescript
function PostsList() {
  const { posts, isLoading, error } = useFetchClient();

  return (
    <>
      <h1 className="font-bold text-xl mb-4 text-gray-800">Posts</h1>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div className="grid grid-cols-1 gap-4">
        {posts.map(post => <PostPreview key={post.id} {...post} />)}
      </div>
    </>
  );
}
```

The **useFetchClient** hook is showcased below, encapsulating the data fetching process:

```typescript
import { useEffect, useState } from "react";
import fetch from "cross-fetch";
import { Post, PostResponse } from "./types";

function useFetchClient() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch("http://example.com/api/posts")
      .then(response => response.json())
      .then(data => {
        setPosts(data.posts);
      })
      .catch(error => {
        setError("Failed to load posts.");
        console.error(error);
      })
      .finally(() => setLoading(false));
  }, []);

  return { posts, isLoading, error };
}
```

Separating the business logic (hook) from the UI (component) not only makes the code more testable but also simplifies the testing setup, focusing on the crucial business requirements. This approach is in line with the Dependency Inversion Principle, which emphasizes the importance of loose coupling between components and their dependencies.

### Open and Closed Component

In the theoretical discourse on SOLID practices, the Open-Closed Principle advises creating code that is:

- Open to extensions
- Closed to modifications

One practical implementation technique for this principle in the React ecosystem is the use of render props. Render props refer to a technique for sharing code between React components using a prop whose value is a function.

Here’s a simple example to demonstrate how render props enable a component to be open for extension but closed for modification:

```typescript
// Define a List component that accepts a renderItem function as a prop
function List({ items, renderItem }) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{renderItem(item)}</li>
      ))}
    </ul>
  );
}

// Usage of List component with render prop for customized rendering
function App() {
  const numbers = [1, 4, 6, 8, 10];

  return (
    <List
      items={numbers}
      renderItem={(item) => <strong>{item * 2}</strong>}
    />
  );
}
```

In this example:

- The List component is closed to modifications because it does not need to change whenever the way you want to render items changes.
- It is open to extensions because it can handle any type of rendering passed to it via renderItem, without requiring modifications to its internal implementation.

This architecture significantly reduces the risk of bugs, as changes are localized to the parts of the application that genuinely need them, without affecting a well-tested component like `List`.

### Inspired by Unix Systems

CUPID references coding according to the Unix Philosophy. Unix systems advocate for small, single-purpose programs (like awk, grep, tr, etc.), which can pass data to one another using pipes and collectively accomplish a larger task:

```bash
echo "1 4 6 8 10" |
  tr ' ' '\n' |                  # Split into multiple lines
  awk '{print $1*2}' |           # Multiply by 2
  awk '$1<=10' |                 # Filtering
  awk '{sum+=$1} END {print sum}' # Summing
```

In the frontend, similar principles can be applied. Instead of imperative commands, you can leverage micro-tools and higher-order functions that can be seamlessly integrated. For example, transforming an array processing sequence from an imperative loop to a declarative chain using map, filter, and reduce:

```typescript
const numbers = [1, 4, 6, 8, 10];

const sum = numbers
  .map(n => n * 2) // Multiply by 2
  .filter(n => n <= 10) // Filtering
  .reduce((acc, n) => acc + n, 0); // Summing

This approach mirrors the Unix philosophy by reducing complexity and focusing on modular, reusable components that enhance maintainability and reduce error rates. Such techniques not only simplify the development process but also enhance the testability and robustness of the software.

## References

[What is ECMA Script? - Mozilla Developer Network](https://developer.mozilla.org/en-US/docs/Web/JavaScript/JavaScript_technologies_overview)
[Dependency Inversion Principle Explained - Blog LogRocket](https://blog.logrocket.com/dependency-inversion-principle-typescript/)
[Commonsense Programming Practices - Grug Brain](https://grugbrain.dev/)
[Understanding the Philosophy of Software Design](https://lubimyczytac.pl/ksiazka/4902573/a-philosophy-of-software-design)
[The Pragmatic Programmer - Andy Hunt and Dave Thomas](https://www.amazon.com/Pragmatic-Programmer-Journeyman-Master/dp/020161622X)
[Component structure vs complexity](https://epicreact.dev/one-react-mistake-thats-slowing-you-down/)
```

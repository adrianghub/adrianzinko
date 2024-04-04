---
title: On Re-renders in React
author: Adrian Zinko
pubDatetime: 2024-03-01T07:42:51Z
modDatetime: 2024-04-04T07:22:47Z
slug: on-re-renders-in-react
featured: true
draft: false
tags:
  - JavaScript
  - React
  - TypeScript
description: "In the React ecosystem, understanding the intricacies of re-renders is crucial for optimizing application performance."
---

> In the React ecosystem, understanding the intricacies of re-renders is crucial for optimizing application performance. This exploration is inspired by the first chapter of "Advanced React", focusing on the significant impact of re-renders and how to manage them efficiently.

## Table of contents

## Intro

At the heart of React's performance considerations is the concept of re-renders. A re-render in React occurs when the state or props of a component change, prompting React to update the DOM. However, not all changes lead to a re-render, and understanding this behavior is key to optimizing React applications.

## Common Misconceptions and Optimizations

One common misconception is that any change to props triggers a re-render. While props changes can lead to re-renders, the true catalysts are state updates within components. This understanding leads to the optimization strategy of "lifting state up" or "moving state down" to manage where and how often re-renders occur.

Imagine a React application where opening a modal dialog causes the entire app to re-render, significantly impacting performance. This problem stems from the way state changes trigger re-renders throughout the component tree.

```js
const App = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="app">
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
      {isOpen && <Modal onClose={() => setIsOpen(false)} />}
      <VerySlowComponent />
    </div>
  );
};
```

In this example, toggling the isOpen state to show or hide the Modal component causes the entire App component, including the VerySlowComponent, to re-render, which is unnecessary and inefficient.

## Optimizing with Component Extraction

The key to optimizing this scenario is to isolate the state and the components that depend on it. By extracting the modal-related functionality into its own component, we limit the scope of re-renders to just that component, improving overall performance.

```js
const ModalTrigger = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
      {isOpen && <Modal onClose={() => setIsOpen(false)} />}
    </>
  );
};

const App = () => {
  return (
    <div className="app">
      <ModalTrigger />
      <VerySlowComponent />
    </div>
  );
};
```

By moving the state and modal into the ModalTrigger component, we've effectively isolated the re-rendering process. Now, when the modal's visibility state changes, it doesn't affect the VerySlowComponent. This isolation ensures that only the components that need to update are re-rendered, which is a crucial strategy for optimizing React applications for better performance.

## Custom hooks

Hooks in React exist to abstract away stateful logic. It seems reasonable. However, custom hooks can introduce re-render issues if not implemented correctly. Hooks hide the fact that we have state in the app. The place you put the state is crucial to prevent unnecessary re-renders. Ideally place the state as close as possible to where it's used.

## Key Takeaways

1. Understand Re-renders: Knowing what triggers re-renders in React is fundamental to performance optimization.
2. Manage State Wisely: Place state as close as possible to where it's used to prevent unnecessary re-renders.
3. Optimization Techniques: Use patterns like memoization (React.memo) and hooks (useMemo, useCallback) to further control re-render behavior.
4. Props don't always trigger re-renders: While props changes can lead to re-renders, state updates are the primary cause of re-rendering in React.

## References

- Advanced React: [https://www.advanced-react.com/](https://www.advanced-react.com/ "https://www.advanced-react.com/")

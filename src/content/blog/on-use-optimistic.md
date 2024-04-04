---
title: On useOptimistic
author: Adrian Zinko
pubDatetime: 2024-03-01T07:42:51Z
slug: on-use-optimistic-in-react
featured: true
draft: false
tags:
  - JavaScript
  - React
description: "The Magic of useOptimistic hook in React"
---

> In today's fast-paced digital world, the responsiveness of applications plays a crucial role in user experience. React developers constantly seek ways to make apps feel quicker and more responsive. One innovative approach to achieving this is through optimistic UI updates, a concept that the useOptimistic hook in React brings to the forefront..

## Table of contents

## Intro

The useOptimistic hook is a powerful tool in React's arsenal, designed to enhance user experience by optimistically updating the UI. This means that instead of waiting for an operation (like a network request) to complete, the UI is updated as if the operation has already succeeded. This approach provides immediate feedback to the user, making the application feel faster and more responsive.

## How Does It Work?

1. Optimistic State: A temporary state that reflects the expected result of an operation.
2. Update Function: A function that merges the optimistic state with the current state, ensuring that the UI can revert to its original state if the operation fails.

Imagine a chat application where users expect immediate feedback upon sending a message. With useOptimistic, you can show the message in the chat immediately with a "Sending..." indicator, enhancing the perception of speed.

```js
function ChatMessageSender({ messages, sendMessage }) {
  const [optimisticMessages, addOptimistic] = useOptimistic(messages, (currentMessages, newMessage) => [...currentMessages, { ...newMessage, sending: true }]);

  const handleSubmit = async (message) => {
    addOptimistic(message);
    await sendMessage(message);
  };

  return (
    // JSX for message input and send button
  );
}
```

## References

- useOptimistic: [https://react.dev/reference/react/useOptimistic](https://react.dev/reference/react/useOptimistic "https://react.dev/reference/react/useOptimistic")

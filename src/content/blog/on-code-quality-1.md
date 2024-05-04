---
title: On code quality in frontend development (Part 1)
author: Adrian Zinko
pubDatetime: 2024-05-04T05:37:47Z
modDatetime:
slug: on-quality-in-frontend-development-1
featured: true
draft: false
tags:
  - JavaScript
  - Frontend Development
  - Code Quality
description: This article explores practical strategies and examples for improving the quality of code in frontend development, including modern JavaScript practices and clean code principles.
---

> Dive into the essentials of maintaining high-quality code in frontend development, focusing on JavaScript practices, clean code principles, and effective patterns.

## Table of contents

## Introduction

Maintaining high code quality is essential in frontend development. This article explores various patterns, practices, and techniques that can enhance the quality of your frontend projects, making them more scalable, maintainable, and robust.

## Why Code Quality Matters

High-quality code directly impacts the development speed and success of projects. Clear, low-complexity code leads to fewer bugs, easier maintenance, and better team morale. It also reduces the risk of costly downtime and negative customer feedback, protecting the business value and financial stability of the project.

## Real-World Impact

When discussing quality, we must not forget the real conditions under which we often implement our projects:

- The first often-encountered condition is **time pressure**. There's a new release around the corner, promises to clients have been made, contracts signed, and yet the site isn't performing as it should. Few developers would choose this moment to have a frank discussion with their manager - what will likely change is the acceptable quality of subsequent pull requests, squinting at code reviews, or orange tests.
- Additionally, different projects are characterized by varying levels of difficulty. A so-called **greenfield** project, or a project built from scratch, is an opportunity to implement all the high-quality methods and techniques recently learned (like those covered in Master Frontend). However, you may also encounter **brownfield** projects, which have been passed through several generations of developers and may have been tossed around within the organization. The quality in both scenarios will be radically different, but in both, we must find our way as programmers.
- Speaking of programmers, we can't ignore our own limitations in knowledge and experience. Just as social media has built opinion bubbles around us, our own programming journey can also occur in such a bubble of one framework or library. Even when better and easier solutions are available on the market, some of us will unknowingly choose the harder path because we're unfamiliar with it (or worse, sometimes we don't want to learn it).

## Simple Language for Complex Applications

JavaScript was created by Brendan Eich in 1995 with the intention of adding simple interactions to static web pages. As the author himself admits, the whole process of creating the first version of this language took him just... 10 days!
Initially, it was a language with very limited capabilities, suitable for simple pages and the capabilities of the hardware on which those pages were loaded. Over time, the role of this language gradually increased. Today, it is the foundation for creating complex, multi-layered, interactive web applications, occupying the top spots in popularity rankings.
While the language's popularity and flexibility have positively influenced the rapid development of the frontend ecosystem, the mentioned divergence of original assumptions and growing expectations has become a challenge for everyone who approached JavaScript without proper preparation.
One of the main difficulties in working with JavaScript is its relatively poor standard library, especially when compared to languages like Python or Java. Differences are visible in areas such as handling more complex data types, date and time management, file system operations, and debugging and profiling code. This limited functionality means that developers must rely on external runtime environments such as Node, as well as multiplying dependencies on libraries and tools that are not always developed in a professional manner.
An additional complication is also the varied runtime environments (browsers, servers, embedded systems, etc.) and application layers in which the same JavaScript we try to run. We have often participated in discussions where we explained to someone why the same language function works in Chrome but does not work in Safari (not to mention Internet Explorer, but we will skip that topic).
Not enough? Add to this piece the very nature of the applications we create using JavaScript. The frontend is the layer where user interaction with the application takes place, which involves handling events, animations, state updates, asynchronous data queries, and rendering handling. Managing these aspects in a way that is both efficient and easily maintainable is no trivial task.
All this means that it is relatively easy to encounter so-called “code smells” on the frontend, i.e., low-quality code fragments and practices that complicate the complexity of the solutions being built.

Examples include:

- excessive reliance on external dependencies
- lack of separation between view layers and application logic
- overuse of global variables and configuration objects
- insufficient modularity of code within business domains
- difficult-to-debug application state and data flow
- lack of control over error handling and server queries
- excessive and uncontrolled updating of application views

Something tells me that you have already had the opportunity to encounter several of these problems on your own.

## Modern JavaScript Practices

JavaScript has evolved from a simple scripting language into the backbone of complex web applications. Embracing modern JavaScript features can significantly enhance code readability and efficiency. Some key practices include:

- Using ES6+ features like arrow functions, destructuring, and template literals
- Leveraging modules for better code organization and reusability
- Employing async/await for asynchronous operations instead of callbacks or promises
- Utilizing modern APIs like fetch for network requests and localStorage for client-side storage
- Adopting TypeScript for static type checking and improved code quality
- Implementing functional programming concepts for cleaner, more predictable code
- Applying code splitting and lazy loading for optimized performance
- Writing unit tests and end-to-end tests to ensure code correctness and reliability
- Integrating linting tools like ESLint and Prettier for consistent code style and error prevention
- Using bundlers like Webpack or Rollup for efficient code bundling and optimization
- Following the latest ECMAScript specifications and best practices
- Embracing new frameworks and libraries that simplify complex tasks and improve developer productivity

## Foundations of Clean, High-Quality Code

Writing clean code is essential for maintainability, readability, and collaboration in frontend projects. By following clean code principles, you can create code that is easy to understand, modify, and extend.

### Care for Readability

The first of the foundations that come to mind when talking about good programming practices is **readability.** We paid particular attention to this when conducting hundreds of Code Reviews in the Master JavaScript course. When participants shared their solutions to course exercises with us, the problem often turned out to be careless code formatting, unintuitive variable and function naming, and suboptimal organization of individual expressions.

Just compare two pieces of code. What does the function below do?

```javascript
var successMessage = "you must be over 18 years old";

function f(entry) {
  var n = entry.firstName,
    s = entry.lastName,
    a = entry.age;

  if (a < 18) {
    return successMessage;
  }

  var result = "";
  var map = {
    firstName: "First name: ",
    lastName: "Last name: ",
    age: "Age: ",
  };
  for (const key in map) {
    result += map[key] + entry[key] + ", ";
  }

  return result.slice(0, -2);
}
```

And what does this function do?

```javascript
// User.ts
interface User {
  firstName: string;
  lastName: string;
  age: number;
}

// index.ts
function formatUserInfo(user: User): string {
    const { firstName, lastName, age } = user;
    const AGE_LIMIT = 18;
    const WARNING_MESSAGE = "You must be over 18 years old";

    if (age < AGE_LIMIT) {
        return WARNING_MESSAGE;
    }

    return `First name: ${firstName}, Last name: ${lastName}, Age: ${age}`;
}
```

As you probably noticed - both functions perform exactly the same task. They take an object with user data, retrieve the necessary information, perform an additional age check, and - in case of bypassing the limit - return the correct message.

The difference in the difficulty of understanding each of them is radically different, of course, in favor of the latter, where readability is at a higher level. What decides this?

- The function name tells you what task you can accomplish with it (formatUserInfo)
- The parameter name indicates the domain and type of object you are working with (user)
- Constants are easy to identify thanks to the convention of using uppercase letters (AGE_LIMIT)
- The function has relatively low complexity and does not use unnecessary loops and objects
- The parameter and return value from the function have clearly defined data types

**Readability** of code can be compared to reading a well-written book. When each sentence smoothly transitions into the next and the chapters are logically arranged, reading becomes enjoyable and understandable. Similarly, clean and well-organized code allows you to quickly understand its intentions and structure, making working with it efficient and satisfying. This also translates to project navigation when, instead of one module, we work with dozens or hundreds at once.

### Set Rules

When talking about readability, it's hard not to mention standards, rules, and code formatting tools that allow us to control the shape of the project, and - equally importantly - introduce more objective standards for formatting and organizing code at the team level (e.g., where to put spaces, what to indent with, what destructuring should look like).

Tools that allow you to care for readable, well-formatted code include:

- **eslint** - the most popular current tool for static code analysis with a wide base of rules published in the form of Open Source, e.g.:
- **eslint-config-google** - configuration used by Google
- **eslint-config-airbnb** - configuration used by AirBnb
- **@shopify/eslint-plugin** - configuration used by Shopify
- **Prettier** - equally popular code formatter with built-in rules for the most important frontend languages, including JavaScript, TypeScript, HTML, and CSS
- **Biome** - a set of tools for maintaining code consistency based on the Rust language (formerly Rome)

### Utilize Language Capabilities

Readability is influenced not only by naming but also by skillful use of modern constructs allowed by your favorite language.

- Instead of using the overly general keyword var, we can use the more precise let and const, also indicating whether the variable can change ;)- Instead of unnecessary extraction and rewriting of variables, in the above example, we use destructuring to retrieve data.
- Instead of manually building the final message, or composing it in an overly complicated way, we use string literals and templates.

I definitely recommend keeping your finger on the pulse of changes around JavaScript. The whole process is documented by the TC39 working group, which conducts regular discussions on further improvements and the pace of their implementation.
If you're not sure whether modern constructs can be used in production, use the CanIUse.com page, which will show you browser support in the area you choose.

### Avoid Unnecessary Complexity

When we use disproportionately complex data structures, expressions, or algorithms to solve specific problems, code complexity increases. This translates negatively to long-term project maintenance, team collaboration efficiency, and effective bug solving in production.
Complexity can also increase by:

- Introducing non-standard data structures into the code
- Building complex algorithms
- Abusing or ignoring design patterns
- Insufficient or excessive reliance on external libraries
- Changes introduced as part of so-called premature optimization

> "If you make an optimization and don’t measure to confirm the performance increase, all you know for certain is that you’ve made your code harder to read." - Martin Fowler [source](https://www.martinfowler.com/ieeeSoftware/yetOptimization.pdf)

Managing complexity is a much more demanding aspect of a programmer's work than correct naming or using new language constructs. It is a skill we develop throughout our careers, working on diverse projects and learning previously unknown approaches to coding.
Note that I also consciously use the term "managing complexity" and not reducing it, because in the case of particularly difficult problems, this complexity cannot be completely avoided. Then, however, it is worth taking care of proper isolation of particularly complex code fragments from the rest, so that if necessary, they can be easily replaced or updated.
If, on the other hand, we are not working on such particularly important problems, it is safe to use the practical principle of KISS, or "Keep It Simple, Stupid."

### Organizing Larger Code Fragments

If we have mastered the art of writing readable code, using modern language constructs, and keeping complexity under control, we can move on to the level of modules and larger project fragments. What should we keep in mind in this context?

> "The primary feature for easy maintenance is locality: Locality is that characteristic of source code that enables a programmer to understand that source by looking at only a small portion of it." - Richard Gabriel

Two closely related rules that are worth applying are "Locality of Behavior" and "Proximity Principle". Although we could consider them separately, in simplification, they boil down to two points:

- Keep as close as possible those parts of the project that are closely related and change at the same pace
- Minimize the actions and activities needed to understand a given project fragment

Imagine that we are developing an order handling form for an online store. Code maintained in accordance with the proximity rule should allow us to introduce changes in a maximally small area of the project, often even within a single folder. In it, we could find:

- A component defining the operation of the form
- Styles affecting the appearance of the form
- Tests verifying the most important aspects of the form's operation
- Interfaces and data types used in the form
- Communication with the backend
- Data validation logic
- Error handling

Such project organization allows us to easily understand the boundaries of responsibility between modules, makes it easier to build alternative solutions almost next to each other, and makes it easier to remove code, which in the context of maintaining low complexity is often more important than adding it.

## Effective Patterns and Techniques

There are several effective patterns and techniques that can enhance the quality of your frontend projects. Some key patterns include:

- Component-based architecture for modular, reusable UI components
- State management libraries like Redux, MobX, or Recoil for managing complex application state
- Container/presentational component pattern for separating logic from presentation
- Higher-order components (HOCs) and render props for code reuse and composition
- Context API for sharing state across components without prop drilling
- Error boundaries and suspense for handling errors and loading states gracefully
- Server-side rendering (SSR) and static site generation (SSG) for improved performance and SEO
- Progressive web app (PWA) features like service workers, push notifications, and offline support
- Responsive design and mobile-first development for optimal user experience on all devices
- Accessibility best practices like semantic HTML, ARIA roles, and keyboard navigation
- Performance optimization techniques like lazy loading, code splitting, and image optimization
- Security measures like HTTPS, content security policy (CSP), and input validation
- Internationalization (i18n) and localization for supporting multiple languages and regions
- Continuous integration (CI) and continuous deployment (CD) pipelines for automated testing and deployment
- Monitoring and analytics tools for tracking user behavior, performance metrics, and errors
- Code profiling and optimization tools for identifying bottlenecks and improving performance
- Error tracking and logging services for monitoring and debugging production issues
- Browser developer tools for inspecting and debugging frontend code
- Code editors and IDEs with advanced features like code completion, linting, and debugging
- Version control systems like Git for tracking changes, collaborating with others, and rolling back to previous versions
- Code review tools and practices for sharing feedback, catching bugs, and improving code quality
- Pair programming and mob programming for collaborative problem-solving and knowledge sharing

## Conclusion

The journey to maintaining high-quality code in frontend development is not just about employing the latest JavaScript features or adopting the newest frameworks. It involves a deep understanding of clean code principles, readability, proper use of language constructs, and effective management of project complexity. As developers, our ultimate goal is to create maintainable, scalable, and efficient applications that deliver great user experiences while being easy to manage and evolve. By embracing these practices and patterns discussed, frontend developers can significantly enhance the quality of their projects, leading to more successful and sustainable development outcomes.

## Key Takeaways

1. Importance of Code Quality: High code quality is crucial for reducing bugs, easing maintenance, and enhancing team morale, which in turn ensures the project's success and longevity.
2. Dealing with Real-World Challenges: Developers often face time pressures, diverse project types, and personal limitations in knowledge. Adapting code quality practices to these realities is essential.
3. Leveraging Modern JavaScript: Utilizing ES6+ features, modular architecture, and modern APIs like fetch and localStorage can drastically improve the maintainability and efficiency of code.
4. Emphasis on Clean Code: Writing clean, readable code is fundamental. This not only involves following naming conventions and formatting but also using tools like ESLint and Prettier to maintain code standards.
5. Complexity Management: Managing complexity effectively involves avoiding unnecessary complexities and striving for simplicity to enhance the code's understandability and maintainability.
6. Patterns and Techniques: Employing patterns like component-based architecture, state management libraries, and responsive design principles are key to building robust and user-friendly interfaces.
7. Continuous Learning and Adaptation: Staying updated with the latest enhancements in JavaScript and adopting new tools and practices are crucial for frontend development excellence.

## References

[What is ECMA Script? - Mozilla Developer Network](https://developer.mozilla.org/en-US/docs/Web/JavaScript/JavaScript_technologies_overview)
[Dependency Inversion Principle Explained - Blog LogRocket](https://blog.logrocket.com/dependency-inversion-principle-typescript/)
[Commonsense Programming Practices - Grug Brain](https://grugbrain.dev/)
[Understanding the Philosophy of Software Design](https://lubimyczytac.pl/ksiazka/4902573/a-philosophy-of-software-design)
[The Pragmatic Programmer - Andy Hunt and Dave Thomas](https://www.amazon.com/Pragmatic-Programmer-Journeyman-Master/dp/020161622X)
[Component structure vs complexity](https://epicreact.dev/one-react-mistake-thats-slowing-you-down/)

---
title: On code quality in frontend development (Part 2)
author: Adrian Zinko
pubDatetime: 2024-05-01T06:11:07Z
modDatetime: 2024-05-04T06:19:33Z
slug: on-quality-in-frontend-development-2
featured: true
draft: false
tags:
  - JavaScript
  - Frontend Development
  - Code Quality
description: |
  In this part, I will discuss the importance of clean code practices like SOLID principles and so on.
---

> In this part, I will discuss the importance of clean code practices like SOLID principles and so on.

## Table of contents

## DRY, SOLID, CUPID

**DRY**, or "Don’t Repeat Yourself", is one of the most popular recommendations in the programming world.

In its assumption, its message is quite reasonable - avoid repetitions, build reusable functions, modules, and libraries, save time by introducing changes only in one place. In the case of simple projects, this should definitely be enough.

In practice, however, it turns out that you should approach DRY pragmatically. Occasional duplication of a code fragment is not an immediate recipe for failure, but a way to avoid unnecessary links and so-called “coupling”. It happens that a fragment of code repeated in two places remains identical only for a moment, and after a while, one of the variants begins to evolve in a new direction. Building abstractions and modules ready for all future extensions is not always the optimal solution.

DRY can also be introduced gradually. You don't always have to start by building a truly reusable, downloadable library that you'll place outside the project. If an algorithm in the project is repeated twice, you can start by moving it to a dedicated module, which you will then import twice. We will save time, avoid duplication, and gain a moment for a better assessment of the situation.

**SOLID** is a set of five software design principles that say:

- A function or module should perform one task (Single Responsibility Principle)
- Code should be open to extensions and closed to changes (Open-Closed Principle)
- Exchanging smaller fragments of the application should not force updating the entire architecture (Liskov Substitution Principle)
- Instead of one general interface, use several independent ones (Interface Segregation Principle)
- External dependencies should be loosely connected with consumers and ready for exchange (Dependency Inversion Principle)
- Dozens of articles have already been written about the SOLID rules, and I assume that you probably don't encounter them for the first time in our course. However, to check if you really understand their operation, the exercises at the end of this lesson will allow you to test frontend SOLID in practice.

If you find the SOLID rules unconvincing or not entirely suitable for your daily tasks, take a closer look at the CUPID approach, which puts the joy of coding in the foreground.

Unlike the well-defined SOLID five, **CUPID** is primarily "experiences" and a direction you can gradually follow while refactoring your code.

CUPID's author, Dan North, explains it this way:

> "Properties define a goal or center to move towards. Your code is only closer to or further from the center, and there is always a clear direction of travel. You can use properties as a lens or filter to assess your code, and you can decide which ones to address next." - Dan North

See what characterizes code compliant with CUPID:

Composable - Code easy to reuse, with a specific purpose
[Unix Philosophy](http://www.catb.org/~esr/writings/taoup/html/ch01s06.html) - Code based on small, precise, interconnected modules
Predictable - Code that does what its architecture suggests at first glance
Idiomatic - Code consistent with the ecosystem and tradition in which it was created
Domain-based - Code using the terminology of the problem it solves

Unlike the SOLID rules, CUPID does not focus on black-and-white determination of code quality with respect to specific practices. It is rather a pragmatic set of recommendations and goals that you should set when building maintainable software that another programmer in a similar position to you will understand.

## References

[What is ECMA Script? - Mozilla Developer Network](https://developer.mozilla.org/en-US/docs/Web/JavaScript/JavaScript_technologies_overview)
[Dependency Inversion Principle Explained - Blog LogRocket](https://blog.logrocket.com/dependency-inversion-principle-typescript/)
[Commonsense Programming Practices - Grug Brain](https://grugbrain.dev/)
[Understanding the Philosophy of Software Design](https://lubimyczytac.pl/ksiazka/4902573/a-philosophy-of-software-design)
[The Pragmatic Programmer - Andy Hunt and Dave Thomas](https://www.amazon.com/Pragmatic-Programmer-Journeyman-Master/dp/020161622X)
[Component structure vs complexity](https://epicreact.dev/one-react-mistake-thats-slowing-you-down/)

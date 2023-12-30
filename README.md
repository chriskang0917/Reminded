<div align="center">

![Logo](./public/assets/logo.png)

  <p align="center">
   <a href="#reminded">About</a>
    ｜
   <a href="#demo">Demo</a>
  </p>
  <p><a href="https://www.linkedin.com/in/chriskang0917/">
    <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" />
  </a>
  <a href="mailto:chriskang0917@gmail.com">
    <img src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white" />
  </a></p>
</div>

# Reminded

[Reminded](https://reminded.web.app) is productivity tool that comes with an idea-action-todo workflow. Add todo and ideas via input modal with shortcut seamlessly. Designed for the users seeking seamless idea transformation into actionable tasks, empowering efficient life management.

### Product Concept

We usually records lots of ideas on the daily basis, but don't know how to manage them or classify them.

![Concept](./public/assets/product_concept.jpeg)

#### What is idea in Reminded?

Reminded doesn't let you classify everything at the beginning. On the contrary, Reminded let you record every idea at the first time, but allow you to transform to actionable task later.

#### What is action in Reminded?

The definition in Reminded is to let you transform rough idea to actionable and clear task. For example, _research for TypeScript_ or _have a great travel plan_ is rough. Instead, action should be _Read TypeScript official document of the beginner part_ and _List all of the desire destination for travel_.

#### What is the next?

After setting action with due date, actions will transform to todo cards. During daily work, we receive more and more ideas from every day continuously. Eventually, it would be a infinite loop for Reminded flow.

---

## About Reminded's Tech Stack

### Language

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6.svg?style=for-the-badge&logo=TypeScript&logoColor=white)

### Library

![React](https://img.shields.io/badge/React-61DAFB.svg?style=for-the-badge&logo=React&logoColor=black) ![React Router](https://img.shields.io/badge/React%20Router-CA4245.svg?style=for-the-badge&logo=React-Router&logoColor=white) ![MobX](https://img.shields.io/badge/MobX-FF9955.svg?style=for-the-badge&logo=MobX&logoColor=white) ![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4.svg?style=for-the-badge&logo=Tailwind-CSS&logoColor=white) ![Next UI](https://img.shields.io/badge/NextUI-000000.svg?style=for-the-badge&logo=NextUI&logoColor=white)

`Driver.js` `Framer Motion`

### Tools and Services

![Firebase](https://img.shields.io/badge/Firebase-FFCA28.svg?style=for-the-badge&logo=Firebase&logoColor=black) ![Git](https://img.shields.io/badge/Git-F05032.svg?style=for-the-badge&logo=Git&logoColor=white) ![Vite](https://img.shields.io/badge/Vite-646CFF.svg?style=for-the-badge&logo=Vite&logoColor=white) ![PNPM](https://img.shields.io/badge/pnpm-F69220.svg?style=for-the-badge&logo=pnpm&logoColor=white)

### Details

- Implemented centralized global **state management** and data transformation using `MobX`.
- Enhanced UX by implementing **drag-and-drop** functionality using `dnd kit` for seamless card swapping.
- Elevated card manipulation experience with `Framer Motion` for better UX.
- Integrated **debounce** mechanism to reduce request frequency.
- Optimized code structure using **Strategy pattern** and **Dependency Injection**.
- Created responsive layouts with `Tailwind` and `NextUI`, ensuring rapid development.
- Incorporated tag input using `react-mentions`, enabling rapid addition of tags by typing ‘#'.
- Built tutorial UI flow with `driver.js` for improved user guidance.
- Implemented `Firebase Authentication` and `Cookies` for secure login with a 30-day expiration.

### Page Structure

After login, there are 6 main pages in the side bar. Each page has different variants inside each router.

<img src="./public/assets/pages.png" style="width:700px" alt="pages' structure" />

### Components' Structure

<img src="./public/assets/components.png" style="width:300px" alt="quick add" />

- **Card** | idea/action/todo card and toolbar
- **DND** | Drag-and-Drop with
- **Editor** | Note editor and its modal
- **Heading** | Title banner of each page
- **Helper** | Tutorials components
- **Input** | Shared Input in quick input modal and input in each page
- **Layout** | All routers' page layout with Outlet
- **Motion** | Compound Component of Framer Motion
- **Section** | Each Section in the each page, including idea, action, todo, note, today, and its scroll shadow
- **Sidebar** | Shared sidebar and subside bar in idea/action/todo

### Other folders

<img src="./public/assets/folders.png" style="width:300px" alt="folders structure" />

- **config** | firebase config
- **models** | All class constructors
- **pages** | Each page displayed in different routers
- **store** | all stores of MobX
- **test** | unit test related to rapid addition of tags
- **utils** | all util functions in this folder

---

## Demo

### Login with test account

###### Login [Reminded](https://reminded.web.app) **test account** by clicking the button `測試帳號`.

<img src="./public/assets/test_account.png" style="width:700px" alt="test account" />

### Product Tutorial

###### Understand the operation of Reminded.

<img src="./public/assets/tutorial.gif" style="width:700px" alt="tutorial" />

### Add Idea / Todo

###### Add ideas or todo with tags instantly with input modal by typing "N".

<img src="./public/assets/quick_add.gif" style="width:700px" alt="quick add" />

### Drag and Drop

###### Organize your idea / action / todo with drag and drop easily.

<img src="./public/assets/dnd.gif" style="width:700px" alt="drag and drop" />

### Transform Action

###### Transform idea card to actionable task.

<img src="./public/assets/idea_action.gif" style="width:700px" alt="idea to action card" />

### Transform Todo

###### Transform action card to todo with drag-and-drop or setting date with picker.

<img src="./public/assets/action_todo.gif" style="width:700px" alt="action to todo card" />

### Note Editor

###### Record the note and idea more comprehensively.

<img src="./public/assets/note.gif" style="width:700px" alt="create note" />

### Search Idea / Action / Notes

###### Search all the idea with fuzzy keywords

<img src="./public/assets/search.gif" style="width:700px" alt="Search cards" />

---

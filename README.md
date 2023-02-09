<a name="readme-top"></a>

<!-- TABLE OF CONTENTS -->

# 📗 Table of Contents

- [📖 About the Project](#about-project)
  - [🛠 Built With](#built-with)
    - [Tech Stack](#tech-stack)
    - [Key Features](#key-features)
    - [Decisions & Results](#decisions-results)
  - [🚀 Live Demo](#live-demo)
- [💻 Getting Started](#getting-started)
  - [Setup](#setup)
  - [Prerequisites](#prerequisites)
  - [Install](#install)
  - [Usage](#usage)
  - [Run tests](#run-tests)
- [👥 Authors](#authors)
- [🤝 Contributing](#contributing)
- [⭐️ Show your support](#support)
- [📝 License](#license)

<!-- PROJECT DESCRIPTION -->

# 📖 LovelyStay Frontend Coding Test <a name="about-project"></a>

This is a coding test for LovelyStay, the goal here is to use GitHub REST API to search for a user and display specific information, the website consists of two pages:

1. The search page - With an input to type the Github username you want to search for and a search button.

2. The user page - A page to display the user information and repositories. With a back button to return to the search page.

## 🛠 Built With <a name="built-with"></a>

### Tech Stack <a name="tech-stack"></a>

<details>
  <summary>Frontend</summary>
  <ul>
    <li><a href="https://reactjs.org/">React.js</a></li>
    <li><a href="https://redux.js.org/">Redux</a></li>
    <li><a href="https://www.typescriptlang.org/">TypeScript</a></li>
  </ul>
</details>

<!-- Features -->

### Key Features <a name="key-features"></a>

- **Search for a github user and check their information and repositories**

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- Decisions & Results -->

### Decisions & Results <a name="decisions-results"></a>

- I have used `HashRouter` instead of `BrowserRouter` mainly because I deployed the app to GitHub Pages as it doesn't support the technologies used by the latter.
- I have decided to use SASS in this project, for the colors I chose colors similar to GitHub, I tried to keep it simple and concise I hope you like it.
- I used Redux in this project, I felt it's better to use it as in my opinion it simplifies things and it helps me write a cleaner code, I know it wasn't a requirement I hope that's alright.
- I have used TypeScript as well, I've been using TypeScript more than JavaScript in my React projects recently as it provides the types safety better.
- I have added a 404 not found page.
- I looked to GitHub's repositories page for inspiration on the pagination I implemented.
- I did my best to cover all edge cases and errors that I can think of, I also added a message that shows the rate has been exceeded, as I didn't use authenticated requests for the API just not to complicate things.
- I have tried to cover every piece of code I had with the tests I've made, and I am proud to show the results of the coverage:
  ![image](https://user-images.githubusercontent.com/20567503/217895071-7810c076-92b6-4fe8-bc3c-9e2c09c7b499.png)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LIVE DEMO -->

## 🚀 Live Demo <a name="live-demo"></a>

- [Live Demo Link](https://mirouhml.github.io/lovelystay-frontend-coding-test/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## 💻 Getting Started <a name="getting-started"></a>

To get a local copy up and running, follow these steps.

### Prerequisites

In order to run this project you need:

- Browser
- Node.js 16.13.\*
- npm 9.1.\*

### Setup

Clone this repository to your desired folder:

```sh
  cd my-folder
  git clone git@github.com:mirouhml/lovelystay-frontend-coding-test.git
```

### Install

Install this project with:

```sh
  cd lovelystay-frontend-coding-test
  npm install
```

### Usage

To run the project, execute the following command:

```sh
  npm start
```

### Run tests

To run tests, run the following command:

```sh
  npm run test
```

To check tests coverage, run the following command:

```sh
  npm run test:coverage
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- AUTHORS -->

## 👥 Authors <a name="authors"></a>

👤 **Ammar Hamlaoui**

- GitHub: [@mirouhml](https://github.com/mirouhml)
- LinkedIn: [ammar-hamlaoui](https://www.linkedin.com/in/ammar-hamlaoui/)
- Twitter: [@kuronomirou](https://twitter.com/kuronomirou)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## 🤝 Contributing <a name="contributing"></a>

Contributions, issues, and feature requests are welcome!

Feel free to check the [issues page](../../issues/).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- SUPPORT -->

## ⭐️ Show your support <a name="support"></a>

If you like this project give it a STAR!

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- LICENSE -->

## 📝 License <a name="license"></a>

This project is [MIT](./LICENSE) licensed.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

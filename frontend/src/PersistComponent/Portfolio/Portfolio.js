import React from 'react'
import './Portfolio.css'

const Portfolio = () => {
  return (
    <div className="container">
      <header>
        <h1>Sourabh Sivare</h1>
        <p>
          9977799311 |{' '}
          <a href="mailto:sivaresourabh@gmail.com">sivaresourabh@gmail.com</a> |{' '}
          <a href="#">LinkedIn</a> | <a href="#">GitHub</a>
        </p>
      </header>

      <section>
        <h2>Experience</h2>
        <div className="experience">
          <h3>Soft Spectrum Technologies - Intern</h3>
          <ul>
            <li>
              Developed tree-like graphs using D3.js library for visual
              representation of hierarchical data structures.
            </li>
            <li>
              Implemented interactive features allowing users to extend nodes
              and navigate through the graph using forward and backward arrows.
            </li>
            <li>
              Developed RESTful API for navigating nested folder systems,
              enabling retrieval of all files and folders within a specified
              directory using Depth-First Search algorithm.
            </li>
            <li>
              Researched and implemented circuit breaker solutions to enhance
              system reliability and resilience.
            </li>
          </ul>
        </div>
      </section>

      <section>
        <h2>Education</h2>
        <ul>
          <li>
            <strong>B.Tech. (CSE)</strong> – 7.69 CGPA, PIEMR, Indore (2020 –
            2024)
          </li>
          <li>
            <strong>Higher Secondary</strong> - 90%, Madhya Pradesh Board of
            Secondary Education (2020)
          </li>
          <li>
            <strong>Secondary</strong> – 90%, Madhya Pradesh Board of Secondary
            Education (2018)
          </li>
        </ul>
      </section>

      <section>
        <h2>Projects</h2>
        <div className="project">
          <h3>CINEMASCOOP</h3>
          <p>
            Live | <a href="#">GitHub</a>
          </p>
          <ul>
            <li>
              Developed a user-friendly movie review website, "CinemaScoop"
              using ReactJS and TailwindCSS, delivering a modern and visually
              appealing interface.
            </li>
            <li>
              Implemented multi-page functionality and routing to create a
              dynamic and seamless user experience for customers.
            </li>
            <li>Tech Used: ReactJS, TailwindCSS, Material-UI, Firebase.</li>
            <li>Key Features: Responsive Design, User-friendly interface.</li>
          </ul>
        </div>
        <div className="project">
          <h3>TICKETMATE</h3>
          <p>
            <a href="#">GitHub</a> 2023
          </p>
          <ul>
            <li>
              Created a Web-App to re-sell purchased tickets of Bus, Concerts,
              Events, Cricket Matches, etc.
            </li>
            <li>Component-based approach and clean code.</li>
            <li>Smooth State management using Redux and Context API.</li>
            <li>
              Tech Used: React JS, Javascript, Redux, Context API, React-hooks.
            </li>
            <li>
              Key Features: Centralized State Management, Removed Prop Drilling,
              Lazy-Loading.
            </li>
          </ul>
        </div>
        <div className="project">
          <h3>BAYMAX</h3>
          <p>
            Live | <a href="#">GitHub</a> 2023
          </p>
          <ul>
            <li>
              Developed a user-friendly notes application that allows
              individuals to conveniently take and upload their notes.
            </li>
            <li>
              Developed a full-stack web application using NodeJS and ExpressJS
              serving REST API with React as the frontend.
            </li>
            <li>Tech Used: ReactJS, NodeJS, ExpressJS, MongoDB.</li>
            <li>
              Key Features: User-friendly interface, user authentication and
              secure session management using JWT.
            </li>
          </ul>
        </div>
      </section>

      <section>
        <h2>Technical Skills</h2>
        <ul>
          <li>
            <strong>Programming languages:</strong> C++, JAVA
          </li>
          <li>
            <strong>Concepts:</strong> Adv. DSA, OOPS, Design Patterns,
            Event-Loop, JS Engine
          </li>
          <li>
            <strong>Frameworks and Libraries:</strong> ReactJS, TailwindCSS,
            BootStrap, Redux, SpringBoot, Hibernate, Servlets, JDBC, J2EE, SQL
          </li>
          <li>
            <strong>Tools:</strong> GitHub, VS Code, Git, MYSQL, Eclipse,
            Postman
          </li>
        </ul>
      </section>

      <section>
        <h2>Achievements</h2>
        <ul>
          <li>
            Solved more than 700+ Coding Questions over platforms including
            Leetcode, Geeksforgeeks, and Codechef.
          </li>
          <li>Achieved global rank 81 in codechef div3 contest Oct 21.</li>
          <li>Codechef max rating: 1496</li>
        </ul>
      </section>
    </div>
  )
}

export default Portfolio

# Bagni X Booking System
![Application banner](docs/assets/github-banner.png)

![GitHub Workflow Status](https://img.shields.io/github/workflow/status/ASW-Project-Team/Bagni-X-Booking-System/Docker%20Compose%20CI?label=Docker%20Compose%20CI%20Build)
![GitHub Workflow Status](https://img.shields.io/github/workflow/status/ASW-Project-Team/Bagni-X-Booking-System/Angular%20CD?label=Angular%20GH%20Pages%20CD)
![Website](https://img.shields.io/website?label=GH%20Pages%20demo%20site&url=https%3A%2F%2Fasw-project-team.github.io%2FBagni-X-Booking-System)
![Lines of code](https://img.shields.io/tokei/lines/github/ASW-Project-Team/Bagni-X-Booking-System)
![GitHub repo size](https://img.shields.io/github/repo-size/ASW-Project-Team/Bagni-X-Booking-System)
[![GitHub license](https://img.shields.io/github/license/ASW-Project-Team/Bagni-X-Booking-System)](https://github.com/ASW-Project-Team/Bagni-X-Booking-System/blob/master/LICENSE)

Project for the couse [Applicazioni e Servizi Web](https://www.unibo.it/it/didattica/insegnamenti/insegnamento/2020/412604), part of the master's degree in [Ingegneria e Scienze Informatiche](https://corsi.unibo.it/magistrale/IngegneriaScienzeInformatiche), Università di Bologna.

## Team members
 - [Riccardo Maldini](https://github.com/maldins46) - [riccardo.maldini2@studio.unibo.it](riccardo.maldini2@studio.unibo.it)
 - [Francesco Gorini](https://github.com/francescogorini) - [francesco.gorini@studio.unibo.it](francesco.gorini@studio.unibo.it)
 - [Thomas Angelini](https://github.com/ThomasAngeliniUnibo) - [thomas.angelini@studio.unibo.it](thomas.angelini@studio.unibo.it)
    
## Professor 
[Silvia Mirri](https://www.unibo.it/sitoweb/silvia.mirri)
 
## Project
The project aims to create a web app, designed for a generic bathhouse "Bagni X". The purpose is the **management of reservations**: customers can register, then book certain positions - umbrellas, in a given period of time.

## Final report, documentation and demo
The final report is available [here](./docs/report.pdf), in the position `/docs/report.pdf`. Further API specification is available at [this repository](https://github.com/ASW-Project-Team/Bagni-X-Api-Documentation/blob/master/swagger.yaml), or in an easy-to-read format [here](https://asw-project-team.github.io/Bagni-X-Api-Documentation/). A demo version of the project front-end (with a fake back-end) is up in the [GitHub Pages domain of the project](https://asw-project-team.github.io/Bagni-X-Booking-System) (more about how this works inside the report).

## Deploy
A makefile is provided within the project, to make the deployment of containers on Docker technology immediate. Among the most important commands:
- **`make`** (or **`make deploy`**): it deploys all containers used for database and web server (for activation in production);
- **`make server-dev`**: it generates dependencies and builds for the web server and starts a local instance of the web server directly on Node, without going through Docker containerization (useful in the server development phase). Requires a MongoDB instance running in `localhost:27017`;
- **`make client-dev`**: it generates dependencies and builds for the Angular client and launches a local instance of the development Angular server, without going through Docker containerization (useful in client development). It requires no server and database instances, basing responses on a fake backend;
- **`make integration`**: it generates dependencies and builds for the Angular client and for the web server, starting a local instance of the web server including the Angular client (useful in the client-server integration phase). Requires a MongoDB instance running in `localhost:27017`;

## Functionalities
Two access point will be provider by the application, one for the **admin** user (with the role of bathhouse manager), and one for the **customer** user.

The admin can **customize** how bathhouse data are shown to the customers, the prices per period (ex. high and low season, midweek discounts, etc.), and additional services provided. The admin will also be able to manage customer reservations, viewing **reservations** statistics, confirming or refusing them.

The information shown to the admin, in particular, will have:
 - **predictive** characteristics, estimating the trend of the current season, based on historical data, and on other relevant information;
 - **historical** characteristics, aggregating previous data from the current season, through charts and different visualizations.
The customer can view the the characteristics of the bathhouse, and **make reservation requests** for some given periods (half day, full day, multiple days), for one or more umbrellas. It may also specify whe willingness to use additional services (such as an additional sunbed, or access to the beach volleyball court). The admin will than have to confirm the booking, through their interface.

The primary purpose of the project is to create a **reservation system, but not a payment system**. This is beyond the scope of the project, and also presents problems that are difficult to manage.

## Additional functionalities
If the project times allow it, and it will not be too complex to implement it, it is planned to refine the application through extra features, according to an incremental approach.

For example, it was thought to use weather forecast data, to refine predictions, and show additional information to customer users. Or again, to refine predictive algorithms even more, exploiting neural networks, and ML frameworks such as TensorFlow.

**Update**: with respect to the initial project plan, further functions are being evaluated; in particular:
 - Different technologies for authentication management, compared to the initial draft. Firebase Authentication introduces interesting features, but also additional complexity, and the lack of a centralized authentication management. We are therefore considering using the internal Node server to handle the complete authentication flow;
 - Further possibilities of implementing the umbrella layout for the admin;
 - Personalization of the welcome screen shown to customers by the admin.

## Technologies
It is planned to develop the project through a pure MEAN stack, that is, using Angular for the front-end, Express and NodeJS for the back-end aspects, and MongoDB for the aspects related to persistent data storage. Authentication will be implemented through Firebase Authentication, a Google service that acts as a separate authentication server, allowing the use of OAuth2 providers such as those of Google and Facebook (**update**: not anymore, as stated before).

Various testing methodologies will be used, both with regard to HCI/UX/UI aspects (through focus groups, tests with users, interface prototyping via the Adobe XD suite), and with regard to the mere correctness of the code, using CI techniques.

It is also planned to organize the work through Scrum and GitHub Flow methodologies. The various services (client, server, db) will be implemented through Docker containers, one or more GitHub repositories will be provided at the end of the project, with the testable report.


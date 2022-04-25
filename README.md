# Doctors Appointment APP

## Tech stack
- [Nest](https://github.com/nestjs/nest)
- Docker
- PostGreSQL
- TypeORM


## Prerequisite 
- Docker installation


## Running the app
Need to run
```bash
$ docker-compose up
```
_Application will start on port `4040`. Navigate to [App](http://localhst:4040)_ 


## Testing Application

For Documentation [Swagger](https://swagger.io/) has been congfigure. 
To hit the APIs navigate to [Documentation](http://localhst:4040/api) after running the app. 
The Appropriate sequence to test the APIs
- Create user with role `doctor` or `patient`.
- Login using `email` and `passord`.
- Copy the `token` received in login response and click Authorization but with 🔓 icon or click
🔓 on any API to test.
- Enter token on Popup appeared after click on lock button 
- Test any API that is allowed for the loggedin role.

## DB Diagram
There five table `users`, `doctors`, `slots`, `patients`, and `appointments`.
![Test Image 1](./dbDiagram.png)


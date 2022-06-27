# FitSocialFrontEnd

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.26.

## Running as NodeJs application
- Install NodeJs v12 +
- Run command ```npm run host```

## Running in Docker Container
- Install Docker for Desktop
- Building Image
    ``` docker build -t <docker_user_id>/<repository_name>:Major.Minor.Patch . ```

e.g. ``` docker build -t sriharsha4/prj-fs-frnt:1.0.0 . ```

- Running
 ```  docker container run -p 4200:4200 <docker_user_id>/<repository_name>:Major.Minor.Patch ```

e.g. ``` docker container run -p 4200:4200 sriharsha4/prj-fs-frnt:1.0.0 ```

To Preview
``` http://localhost:4200 ```
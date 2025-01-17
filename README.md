## NinjaOne Assignment:

## How To Use:

#### Install Project Dependencies:
- `npm install`
#### Clone API and Client:
- `npm run clone:client`
- `npm run clone:api`

#### Install API and Client:
- `npm run install:client`
- `npm run install:api`

#### Run Tests:
- `npm run test:api`
- `npm run test:e2e`

##### Local (not really necessary, but in case there's bad data in the server, this bypasses it):
- `npm run test:e2e:local`

## Assignment Tests:

- All of the tests described on the assignment were completed, and they are currently stable.
- API tests were also developed as an exercise. Some of them are failing for legitimate reasons, we have a bug report on this repository that explain the current issues.

### Code Structure
- The code for this assignment is structured in the following fashion:
   - test-infra: test infrastructure
      - api: axios code to support API access
      - e2e: TestCafe code to support our e2e tests
          - pageObjects: as the name suggests, these are the pageObjects of our automation
          - userActions: here we keep the actions that our users can perform. E.g: fill a input field, or click in a button.
    - tests: holds tests
       - api: stores API tests for the `devicesTask_serverApp` - uses Axios and Jest
       - e2e: stores tests for the `devices-clientapp` - uses TestCafe
       - utils: stores helper functions for assertions.

### Patterns in the testing code:

- This E2E solution follows the POM (Page Object Model), together with `userActions` in order to achieve our goal.
- `User Actions` in our context are simply methods that are used to abstract user interactions with the system. They can be many, such as `clickOnEditDevice`, or `reloadPage`. And they will do as it's been implied by their names (click on the `edit device` button, or reload the page). So in our tests, you will see lines of code like so: 
     
     ```
        await userAttemptsTo.clickOnDeleteDevice(nameOfDeviceToBeDeleted);
     ```
- Which was thought and implemented like this in order to provide better readability to the test, reusability and put focus on user actions. Eventually these actions could expand to the APIs also.

- On other note, verifications are done by searching for elements or checking elements states on our DOM with the help of our POM, nothing fancy. And a code line will usually look like this:
    ```
        await t.expect((await mainPage.getDeviceBox(newDeviceName)).exists).ok();
    ``` 
    - Here we have simple expectations made on elements that are returned by the POM setup, in this case, something from the mainPage. 


- This is a briefly explanation but I am sure we can learn more from looking at the code.

--- 
## CI

- We have one CI for the E2E tests and one for the API.
- In the E2E CI:
    - We start the environment;
    - Install dependencies and Start our app;
    - Install our test dependencies;
    - Execute the tests;
- Same as the steps on the E2E CI, the difference is that we only start the API server and execute the API tests;
- Observations: It is known that the API CI is failing. This is due to bugs found and caught by the automation. 


--- 
## Bug Report:

- A bug report for the API can be found on `BUG_REPORT_API.md`


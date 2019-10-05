# REST API demo

REST API demo using NodeJS, Typescript, Express and MongoDB

## How to start the application

1. Clone the repository  
    ```
    git clone git@github.com:pablodicosta/api-demo.git
    ```

2. Install dependencies  
    ```
    npm i
    ```

3. Setup configuration environment variables  
   
   - **API_TOKEN** - Bearer token to authorize the API requests - DEFAULT **asdfg12345**
   - **APP_PORT** Port for the server - DEFAULT **3000**
   - **DB_HOST**  MongoDB host - DEFAULT **localhost**
   - **DB_PORT**  MongoDB port - DEFAULT **27017**
   - **DB_USER**  MongoDB user - DEFAULT **root**
   - **DB_PWD**   MongoDB password - DEFAULT **root**
   - **DB_NAME**  MongoDB database name - DEFAULT api-**demo**

4. Set a MongoDB instance and configure it properly
   
5. Start the server
   - Production mode:  
      ```
      npm run build
      npm start
      ```
   - Development mode (auto reload on code changes)  
      ```
      npm run start-dev
      ```

## Running tests

```
npm test
```

## Viewing API documentation

- Start the server and go to http://localhost:3000/docs/swagger/#/
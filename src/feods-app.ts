import express from "express";
import helmet from "helmet";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import * as path from "path";

import { connectToFeodsMongodb } from "./common-functions/mongo-connect";
import { createAndReturnFeodsRouter } from "./server-routes/feods-routes";

class FeodsApp {
    public server: express.Application;
    constructor() {
        this.server = express();
        dotenv.config({
            path: path.resolve(__dirname, "../config/config.env"),
        });
        this.instantiateApplicationInfrastructure();
    }

    public async instantiateApplicationInfrastructure() {
        let result = connectToFeodsMongodb()
            .then(async function(result) {
                await feodsApp.instantiateMiddleware();
                feodsApp.startExpress();
            })
            .catch(function(error) {
                //TODO: If the promise was rejected, throw the error and terminate.
                console.log(error);
            });
        return;
    }

    public async instantiateMiddleware()  {
        let promiseFunction = function(resolve, reject) {
            //this.server.use(helmet());
            this.server.use(bodyParser.json());
            let feodsRouter = createAndReturnFeodsRouter();
            this.server.use("/", feodsRouter);
            this.server.get("/testServerRoutes", function(req, res) {
                res.send("Server is running correctly.");
            });
            return resolve(0);
        }.bind(this);
        this.createPromise(promiseFunction);
    }

    public async startExpress() {
        //TODO: set port in dotenv.
        this.server.listen(process.env.PORT);
        console.log(
            `Feods Server Started! Listening on port: ${process.env.PORT}`
        );
    }

    public async createPromise(promiseFunction) {
        return new Promise(promiseFunction);
    }
}

let feodsApp: FeodsApp;
function createSingletonApplication() {
    if (!feodsApp) {
        console.log("Instantiating Singleton Feods Application");
        feodsApp = new FeodsApp();
        return 0;
    } else {
        return 1;
    }
}

createSingletonApplication();

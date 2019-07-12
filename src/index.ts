import * as express from 'express';
import { Request, Response } from "express";
import * as path from 'path';
import router from './routes';
import * as bodyParser from "body-parser"

class App {
    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }
    public app: express.Application;
    private config(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }
    private routes(): void {
        this.app.use("/", router);
    }
}

export default new App().app
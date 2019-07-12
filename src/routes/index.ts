import { Router, Request, Response } from 'express';
import controllers from '../controllers';

class Routes {
    public router: Router;
    constructor() {
        this.router = Router();
        this.init();
    }
    private init(): void {
        this.router.post('/postformat', this.savePostFormat)
        this.router.post('/formattext', this.formatText)
    }
    private async savePostFormat(req: Request, res: Response) {
        let controller = new controllers;
        try {
            let bookDetails = await controller.savePostFormat(req.body);
            res.status(200).send(bookDetails);
        } catch (err) {
            console.log(err);
            res.status(500).send({
                mesaage: "Something is not right"
            });
        }

    }
    private async formatText(req: Request, res: Response) {
        let controller = new controllers;
        try {
            let formattedText = await controller.formatText(req.body);
            res.status(200).send(formattedText);
        } catch (err) {
            console.log(err);
            res.status(500).send({
                mesaage: "Something is not right"
            });
        }

    }

}

export default new Routes().router
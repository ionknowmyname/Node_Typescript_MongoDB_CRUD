import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import validateMiddleware from '@/middleware/validation.middleware';
import validate from '@/resources/post/post.validation';
// import { create } from '@/resources/post/post.validation';
import PostService from '@/resources/post/post.service';

class PostController implements Controller {
    public path = '/posts';
    public router = Router();
    private PostService = new PostService();

    constructor() {
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.post(
            `${this.path}/new`, 
            validateMiddleware(validate.create),  // validateMiddleware(create)
            this.create
        );
    }

    private create = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { title, body } = req.body;

            const post = await this.PostService.create(title, body);
            res.status(201).json({ post });
        } catch (e: any) {   // e is error thrown from try-catch in service
            next(new HttpException(400, e.message));
        }
    }
}

export default PostController;
import { Router } from 'express'
import { checkAdmin} from '../middleware/admin';
import { productosController }  from '../controller/productos'
import asyncHandler from 'express-async-handler'

const miRouter = Router();



miRouter.get(
    '/listar',
    asyncHandler(productosController.getInstance().hayProductos),
    asyncHandler(productosController.getInstance().getProducts)
);

miRouter.get(
    '/listar/:id',
    asyncHandler(productosController.getInstance().hayProductos),
    asyncHandler(productosController.getInstance().productExists),
    asyncHandler(productosController.getInstance().getProducts)
);

miRouter.post(
    '/agregar',
    checkAdmin,
    productosController.getInstance().isAproduct,
    asyncHandler(productosController.getInstance().addProducts)
);

miRouter.put(
    '/actualizar/:id',
    checkAdmin,
    asyncHandler(productosController.getInstance().hayProductos),
    asyncHandler(productosController.getInstance().productExists),
    asyncHandler(productosController.getInstance().isAproduct),    
    asyncHandler(productosController.getInstance().updateProducts)
);

miRouter.delete(
    '/borrar/:id',
    checkAdmin,
    asyncHandler(productosController.getInstance().hayProductos),
    asyncHandler(productosController.getInstance().productExists),
    asyncHandler(productosController.getInstance().deleteProducts)
);

export default miRouter;
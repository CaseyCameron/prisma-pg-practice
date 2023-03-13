import Router from 'express'
import { body } from 'express-validator'
import { catchErrors } from '../../utils/handlers/catchErrors'
import { composersController } from '../controllers';

const router = Router()
const validationCriteria = [body('name').notEmpty()]

router.post('/', validationCriteria, catchErrors(composersController.addComposer))
router.get('/:id', catchErrors(composersController.getComposerById))
router.get('/', catchErrors(composersController.getComposers))
router.put('/:id', catchErrors(composersController.editComposer))
router.delete('/:id', catchErrors(composersController.deleteComposer))
router.delete('/', catchErrors(composersController.deleteAllComposers))

export const composersRouter = router

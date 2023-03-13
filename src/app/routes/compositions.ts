import Router from 'express'
import { body } from 'express-validator'
import { catchErrors } from '../../utils/handlers/catchErrors'
import { compositionsController } from '../controllers';

const router = Router()
const validationCriteria = [body('name').notEmpty()]

router.post('/', validationCriteria, catchErrors(compositionsController.addComposition))
router.get('/:id', validationCriteria, catchErrors(compositionsController.getCompositionById))
router.get('/', validationCriteria, catchErrors(compositionsController.getCompositions))
router.put('/:id', validationCriteria, catchErrors(compositionsController.editComposition))
router.delete('/:id', validationCriteria, catchErrors(compositionsController.deleteComposition))
router.delete('/', validationCriteria, catchErrors(compositionsController.deleteAllCompositions))

export const compositionsRouter = router

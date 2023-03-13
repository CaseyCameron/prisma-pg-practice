import Router from 'express'
import { body } from 'express-validator'
import { catchErrors } from '../../utils/handlers/catchErrors'
import { scalesController } from '../controllers/scales';

const router = Router()
const validationCriteria = [body('name').notEmpty()]

router.post('/', validationCriteria, catchErrors(scalesController.addScale))
router.get('/:id', validationCriteria, catchErrors(scalesController.getScaleById))
router.get('/', validationCriteria, catchErrors(scalesController.getScales))
router.put('/:id', validationCriteria, catchErrors(scalesController.editScale))
router.delete('/:id', validationCriteria, catchErrors(scalesController.deleteScale))
router.delete('/', validationCriteria, catchErrors(scalesController.deleteAllScales))

export const scalesRouter = router

import Router from 'express'
import { body } from 'express-validator'
import { catchErrors } from '../../utils/handlers/catchErrors'
import { modesController } from '../controllers/modes';

const router = Router()
const validationCriteria = [body('name').notEmpty()]

router.post('/', validationCriteria, catchErrors(modesController.addMode))
router.get('/:id', catchErrors(modesController.getModeById))
router.get('/', catchErrors(modesController.getModes))
router.delete('/', catchErrors(modesController.deleteAllModes))

export const modesRouter = router

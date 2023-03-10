import Router from 'express'
import { body } from 'express-validator'
import { catchErrors } from '../../utils/handlers/catchErrors'
import { scalesController } from '../controllers/scales';

const router = Router()
const validationCriteria = [body('name').notEmpty()]

router.post('/', validationCriteria, catchErrors(scalesController.addScale))

export const scalesRouter = router
import Router from 'express'
import { body } from 'express-validator'
import { catchErrors } from '../../utils/handlers/catchErrors'
import { genresController } from '../controllers/genres';

const router = Router()
const validationCriteria = [body('name').notEmpty()]

router.post('/', validationCriteria, catchErrors(genresController.addGenre))
router.get('/:id', catchErrors(genresController.getGenreById))
router.get('/', catchErrors(genresController.getGenres))
router.put('/:id', catchErrors(genresController.editGenre))
router.delete('/:id', catchErrors(genresController.deleteGenre))
router.delete('/', catchErrors(genresController.deleteAllGenres))

export const genresRouter = router

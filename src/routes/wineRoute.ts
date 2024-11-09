import express from 'express'
import { createWine, deleteWine, findAllWine, findWine, toggleHabilitacionWine, updateWine } from '../controllers/wineControllers'

//import toNewUser from '../extras/utils'

const router = express.Router()

router.route('/')
    .get(findAllWine)
    .post(createWine)

router.route('/:id')
    .get(findWine)
    .put(updateWine)
    .delete(deleteWine)

router.route('/:id/habilitacion')
    .patch(toggleHabilitacionWine)

export default router
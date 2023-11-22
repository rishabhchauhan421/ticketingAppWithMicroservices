import express from 'express';

const router = express.Router();

router.get('/api/users/signout', (req, res) => {
  req.session = null;
  return res.status(200).send({});
});

export { router as signoutRouter };

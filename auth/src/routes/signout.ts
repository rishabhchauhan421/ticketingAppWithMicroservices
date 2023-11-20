import express from 'express';

const router = express.Router();

router.get('/api/users/signout', (req, res) => {
  console.log('Hi There!');
});

export { router as signoutRouter };

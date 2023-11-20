import express from 'express';

const router = express.Router();

router.get('/api/users/signup', (req, res) => {
  console.log('Hi There!');
});

export { router as signupRouter };

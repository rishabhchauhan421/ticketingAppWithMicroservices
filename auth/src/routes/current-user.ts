import express from 'express';

const router = express.Router();

router.get('/api/users/currentUser', (req, res) => {
  console.log('Hi There!');
});

export { router as currentUser };

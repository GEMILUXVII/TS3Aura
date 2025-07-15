import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json({
    success: true,
    data: {
      status: 'ok',
      timestamp: new Date()
    }
  });
});

export default router;

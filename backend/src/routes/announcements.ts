import { Router } from 'express';

const router = Router();

// 简单的公告接口，实际项目中可能会连接数据库或CMS
const announcements = [
  {
    id: 1,
    title: '服务器维护通知',
    titleEn: 'Server Maintenance Notice',
    content: '我们将在每周五进行例行服务器维护，维护期间可能会导致短暂的服务中断。',
    contentEn: 'We will perform routine server maintenance every Friday, which may cause brief service interruptions.',
    date: '2025-07-12',
    important: true
  },
  {
    id: 2,
    title: '新版本功能上线',
    titleEn: 'New Features Launched',
    content: '我们更新了频道管理功能，现在管理员可以更方便地管理频道权限。',
    contentEn: 'We have updated the channel management features. Admins can now manage channel permissions more easily.',
    date: '2025-07-08',
    important: false
  }
];

router.get('/', (req, res) => {
  res.json({
    success: true,
    data: announcements,
    timestamp: new Date()
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const announcement = announcements.find(a => a.id === parseInt(id));
  
  if (!announcement) {
    return res.status(404).json({
      success: false,
      error: `Announcement with ID ${id} not found`,
      timestamp: new Date()
    });
  }
  
  res.json({
    success: true,
    data: announcement,
    timestamp: new Date()
  });
});

export default router;

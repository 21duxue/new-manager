const Router = require('koa-router')
const MessageController = require('../controllers/message')

const router = new Router({
    prefix: '/api/v1'
})

/**
 * 文章接口
 */
// 创建文章接口（路由）
router.post('/message-create', MessageController.create);
// 创建文章接口（路由）
router.post('/upload', MessageController.uploadimg);
// 获取文章详情接口（路由）
router.get('/message', MessageController.detail);
// 获取列表接口（路由）
router.get('/message-list', MessageController.list);

router.delete('/message-delete/:id', MessageController.delete);

router.post('/message-update/:id', MessageController.update);

module.exports = router

const Router = require('koa-router')
const MessageController = require('../controllers/edge');

const router = new Router({
    prefix: '/api/v1'
})

/**
 * 文章接口
 */
// 创建文章接口（路由）
router.post('/edge-create', MessageController.create);
// 创建文章接口（路由）
router.post('/upload', MessageController.uploadimg);
// 获取文章详情接口（路由）
router.get('/edge', MessageController.detail);
// 获取列表接口（路由）
router.get('/edge-list', MessageController.list);

router.delete('/edge-delete/:id', MessageController.delete);

router.post('/edge-update/:id', MessageController.update);

module.exports = router

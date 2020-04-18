const Router = require('koa-router')
const GrowLogController = require('../controllers/grow-log')

const router = new Router({
    prefix: '/api/v1'
})

/**
 * 文章接口
 */
// 创建文章接口（路由）
router.post('/grow-create', GrowLogController.create);
// 创建文章接口（路由）
router.post('/upload', GrowLogController.uploadimg);
// 获取文章详情接口（路由）
router.get('/grow', GrowLogController.detail);
// 获取列表接口（路由）
router.get('/grow-list', GrowLogController.list);

router.delete('/grow-delete/:id', GrowLogController.delete);

router.post('/grow-update/:id', GrowLogController.update);

module.exports = router

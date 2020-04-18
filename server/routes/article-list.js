const Router = require('koa-router')
const ArticleListController = require('../controllers/article-list')

const router = new Router({
    prefix: '/api/v1'
})

/**
 * 文章接口
 */
// 创建文章接口（路由）
router.post('/article-create', ArticleListController.create);
// 创建文章接口（路由）
router.post('/upload', ArticleListController.uploadimg);
// 获取文章详情接口（路由）
router.get('/article', ArticleListController.detail);
// 获取列表接口（路由）
router.get('/article-list', ArticleListController.list);

router.delete('/article-delete/:id', ArticleListController.delete);

router.post('/article-update/:id', ArticleListController.update);

module.exports = router

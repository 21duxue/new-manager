const ArticleListModel = require('../modules/message')
const fs = require('fs')

function delDir(path){
    let files = [];
    if(fs.existsSync(path)){
        files = fs.readdirSync(path);
        files.forEach((file, index) => {
            let curPath = path + "/" + file;
            if(fs.statSync(curPath).isDirectory()){
            } else {
                fs.unlinkSync(curPath); //删除文件
            }
        });
    }
}

class growLogController {
    /**
     * 创建文章
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async create(ctx) {
        // 接收客服端
        let req = ctx.request.body;
        console.log(req)
        if (req.name // 文章标题
            && req.content // 文章内容
        ) {
            try {
                // 创建文章模型
                const ret = await ArticleListModel.createGrowLog(req);
                console.log(ret)
                // 把刚刚新建的文章ID查询文章详情，且返回新创建的文章信息
                const data = await ArticleListModel.getGrowLogDetailById(ret.id);

                ctx.response.status = 200;
                ctx.body = {
                    code: 200,
                    msg: '创建留言成功',
                    data
                }

            } catch (err) {
                console.log(err)
                ctx.response.status = 412;
                ctx.body = {
                    code: 200,
                    error_code:-1,
                    msg: '创建留言失败',
                    data: err
                }
            }
        } else {
            ctx.response.status = 416;
            ctx.body = {
                code: 200,
                msg: '参数不齐全',
                error_code:-1
            }
        }

    }

      //上传图片
      static async uploadimg(ctx) {
        let file = ctx.request.files; // 获取上传文件
        // 创建可读流
        const reader = fs.createReadStream(file['file'].path);
        let filePath = `./upload/` + `/${file['file'].name}`;
        let remotefilePath = `http://localhost:3001/upload` + `/${file['file'].name}`;
        // 创建可写流
        const upStream = fs.createWriteStream(filePath);
        // 可读流通过管道写入可写流
        reader.pipe(upStream);
        delDir((__dirname, './upload1'))
        return ctx.body = {
            url: remotefilePath,
            message: "文件上传成功",
            code:200
        }   
    }

    /**
     * 获取文章详情
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async detail(ctx) {
        let id = ctx.query.id;
        console.log(ctx.query.id)
        if (id) {
            try {
                // 查询文章详情模型
                let data = await ArticleListModel.getGrowLogDetail(id);
                ctx.response.status = 200;
                ctx.body = {
                    code: 200,
                    msg: '查询成功',
                    data
                }

            } catch (err) {
                console.log(err)
                ctx.response.status = 400;
                ctx.body = {
                    code: 400,
                    msg: '查询失败',
                }
            }
        } else {
            let data = await ArticleListModel.getGrowLogList();
            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                msg: '文章ID必须传',
                data
            }
        }
    }

    /**
     * 获取日记列表
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async list(ctx) {
            try {
                // 查询文章详情模型
                let data = await ArticleListModel.getGrowLogList();
                ctx.response.status = 200;
                ctx.body = {
                    code: 200,
                    msg: '查询成功',
                    data
                }

            } catch (err) {
                ctx.response.status = 400;
                ctx.body = {
                    code: 400,
                    msg: '查询失败',
                }
            }
    }

    /**
     * 获取日记列表
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async delete(ctx) {
        let id = ctx.params.id;
        if (id) {
            try {
                // 查询文章详情模型
                let data = await ArticleListModel.deletetGrowLog(id);
                ctx.response.status = 200;
                ctx.body = {
                    code: 200,
                    msg: '删除成功',
                    data
                }

            } catch (err) {
                ctx.response.status = 400;
                ctx.body = {
                    code: 400,
                    msg: '删除失败',
                }
            }
        } else {
            ctx.response.status = 416;
            ctx.body = {
                code: 416,
                msg: '文章ID必须传'
            }
        }
    }

    /**
     * 获取日记列表
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async update(ctx) {
        let id = ctx.params.id;
        let req = ctx.request.body;
        if (id) {
            try {
                // 查询文章详情模型
                let data = await ArticleListModel.updateGrowLog(id,req);
                ctx.response.status = 200;
                ctx.body = {
                    code: 200,
                    msg: '更新成功',
                    data
                }

            } catch (err) {
                ctx.response.status = 400;
                ctx.body = {
                    code: 400,
                    msg: '更新失败',
                }
            }
        } else {
            ctx.response.status = 416;
            ctx.body = {
                code: 416,
                msg: '文章ID必须传'
            }
        }
    }
}

module.exports = growLogController
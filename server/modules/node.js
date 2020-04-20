// 引入刚刚在第五点建立连接mysql数据库的db.js文件
const db = require('../config/db');
// 引入Sequelize对象
const Sequelize = db.sequelize;
const Op = db.Sequelize.Op
// 引入上一步的文章数据表模型文件
const GrowLog = Sequelize.import('../schema/node.js');
// 自动创建表
GrowLog.sync({force: false});

formatDate = (date) => {  
    var y = date.getFullYear();  
    var m = date.getMonth() + 1;  
    m = m < 10 ? '0' + m : m;  
    var d = date.getDate();  
    d = d < 10 ? ('0' + d) : d;  
    return y + '-' + m + '-' + d;  
};  

class GrowLogModel {
    /**
     * 创建文章模型
     * @param data
     * @returns {Promise<*>}
     */
    static async createGrowLog(id,data) {
        return await GrowLog.create({
            flow_id:id,
            type:data.type,
            shape:type.shape,
            size:data.size,
            color:data.color,
            label:data.label,
            x:data.x,
            y:data.y,
            id:data.id
        })
    }

    /**
     * 查询取文章详情数据
     * @param id  文章ID
     * @returns {Promise<Model>}
     */
    static async getGrowLogDetail(title) {
        return await GrowLog.findAll({
            where: {
                title:{
                    [Op.like]:'%'+title+"%"
                }
            },
        })
    }

      /**
     * 查询取文章详情数据
     * @param id  文章ID
     * @returns {Promise<Model>}
     */
    static async getGrowLogDetailById(id) {
        return await GrowLog.findAll({
            where: {
                id
            },
        })
    }

    /**
     * 查询取日记列表
     * @param id  文章ID
     * @returns {Promise<Model>}
     */
    static async getGrowLogList() {
        return await GrowLog.findAll({
        })
    }

    
    /**
     * 删除日记
     * @param id  文章ID
     * @returns {Promise<Model>}
     */
    static async deletetGrowLog(id) {
        return await GrowLog.destroy({
            where: {
                id,
            },
        })
    }

     /**
     * 更新日记
     * @param id  文章ID
     * @returns {Promise<Model>}
     */
    static async updateGrowLog(id,query) {
        return await GrowLog.update({
            disable:query.disable
        },{
            where: {      
                id    
            }   
        })
    }
}

module.exports = GrowLogModel
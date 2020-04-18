const moment = require('moment');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('article-list', {
        // 文章ID
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: true,
            autoIncrement: true,
        },
        // 文章标题
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'title',
        },
        // 分类id
        sort_id: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'sort_id'
        },
        // 文章内容
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
            field: 'content'
        },
        remark: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'remark'
        },
        img: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'img'
        },
        click_num: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'click_num'
        },
        // 创建时间
        createdAt: {
            type: DataTypes.DATE,
            get() {
                return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss');
            }
        },
        // 更新时间
        updatedAt: {
            type: DataTypes.DATE,
            get() {
                return moment(this.getDataValue('updatedAt')).format('YYYY-MM-DD HH:mm:ss');
            }
        }
    }, {
        // 如果为 true 则表的名称和 model 相同，即 user
        // 为 false MySQL创建的表名称会是复数 users
        // 如果指定的表名称本就是复数形式则不变
        freezeTableName: true
    })

}
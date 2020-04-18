const moment = require('moment');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('grow_log', {
        // 成长记录ID
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
        // 图片
        img: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'img'
        },
        // 文章内容
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
            field: 'content'
        },
        // 创建时间
        time: {
            type: DataTypes.DATE,
            get() {
                return moment(this.getDataValue('time')).format('YYYY-MM-DD');
            }
        }
    }, {
        // 如果为 true 则表的名称和 model 相同，即 user
        // 为 false MySQL创建的表名称会是复数 users
        // 如果指定的表名称本就是复数形式则不变
        freezeTableName: true
    })

}
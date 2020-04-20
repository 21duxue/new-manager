const moment = require('moment');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('edges', {
        // 文章ID
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: true,
        },
        // 文章标题
        x: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'x',
        },
        y: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'y',
        },
        // 文章作者
        type: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'type'
        },
        // 文章内容
        size: {
            type: DataTypes.TEXT,
            allowNull: false,
            field: 'size'
        },
        // 文章分类
        shape: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'shape'
        },
        // 创建时间
        color: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'color'
        },
        // 更新时间
        label: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'label'
        },
        flow_id: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'flow_id'
        }
    }, {
        // 如果为 true 则表的名称和 model 相同，即 user
        // 为 false MySQL创建的表名称会是复数 users
        // 如果指定的表名称本就是复数形式则不变
        freezeTableName: true
    })

}
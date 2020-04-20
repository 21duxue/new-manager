const moment = require('moment');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('nodes', {
        // 文章ID
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: true,
        },
        // 文章标题
        source: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'source',
        },
        sourceAnchor: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'sourceAnchor',
        },
        // 文章作者
        target: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'target'
        },
        // 文章内容
        targetAnchor: {
            type: DataTypes.TEXT,
            allowNull: false,
            field: 'targetAnchor'
        },
        // 文章分类
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
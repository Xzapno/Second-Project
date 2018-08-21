module.exports = function(sequelize, DataTypes)
{
    var Survey = sequelize.define("Survey",
    {
        userid:
        {
            type: DataTypes.TEXT,
            allowNull: false
        },
        q01: 
        {
            type: DataTypes.INTEGER,
            allwoNull: false,
            validate: 
            {
                len: [1,2]
            }
        },
        q02: 
        {
            type: DataTypes.INTEGER,
            allwoNull: false,
            validate: 
            {
                len: [1,2]
            }
        },
        q03: 
        {
            type: DataTypes.INTEGER,
            allwoNull: false,
            validate: 
            {
                len: [1,2]
            }
        },
        q04: 
        {
            type: DataTypes.INTEGER,
            allwoNull: false,
            validate: 
            {
                len: [1,2]
            }
        },
        q05: 
        {
            type: DataTypes.INTEGER,
            allwoNull: false,
            validate: 
            {
                len: [1,2]
            }
        },
        q06: 
        {
            type: DataTypes.INTEGER,
            allwoNull: false,
            validate: 
            {
                len: [1,2]
            }
        },
        q07: 
        {
            type: DataTypes.INTEGER,
            allwoNull: false,
            validate: 
            {
                len: [1,2]
            }
        },
        q08: 
        {
            type: DataTypes.INTEGER,
            allwoNull: false,
            validate: 
            {
                len: [1,2]
            }
        },
        q09: 
        {
            type: DataTypes.INTEGER,
            allwoNull: false,
            validate: 
            {
                len: [1,2]
            }
        },
        q10: 
        {
            type: DataTypes.INTEGER,
            allwoNull: false,
            validate: 
            {
                len: [1,2]
            }
        },
        q11: 
        {
            type: DataTypes.INTEGER,
            allwoNull: false,
            validate: 
            {
                len: [1,2]
            }
        },
        genre: 
        {
            type: DataTypes.INTEGER,
            allwoNull: false,
            validate: 
            {
                len: [1,2]
            }
         }   
    });

    return Survey;
};
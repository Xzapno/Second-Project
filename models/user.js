module.exports = function(sequelize, DataTypes) 
{
  var User = sequelize.define("user",
  {
    email:
    {
      type: DataTypes.TEXT,
      allowNull: false,
      notEmpty: true,
      validate:
      {
        isEmail: true
      }
    },
    username: 
    {
      type: DataTypes.TEXT,
      allowNull: false,
      notEmpty: true
    },
    password: 
    {
      type: DataTypes.STRING,
      allowNull: false,
      notEmpty: true
    }
  });

  return User;
};
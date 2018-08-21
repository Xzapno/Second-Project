module.exports = function(sequelize, DataTypes) 
{
  var Genre = sequelize.define("Genre",
  {
    igdbval:
    {
      type: DataTypes.INTEGER,
      allwoNull: false
    },
    name: 
    {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  return Genre;
};
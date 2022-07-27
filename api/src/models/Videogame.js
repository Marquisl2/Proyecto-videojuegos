const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull:false,
      primaryKey:true
    },
    name: {
      type: DataTypes.STRING,
      unique:true,
      allowNull: false
    },
    img:{
      type: DataTypes.STRING
    },
    description:{
      type:DataTypes.TEXT,
      allowNull: false
    },
    releaseDate:{
      type: DataTypes.DATEONLY,
        allowNull: true,
    },
    rating:{
      type:DataTypes.FLOAT
    }
    ,
    platforms:{
      type: DataTypes.ARRAY(DataTypes.TEXT),
        allowNull: false
    },
    createdAtDb:{
      type:DataTypes.BOOLEAN,
      defaultValue: true
    }
  },{
    timestamps: false
  });
};

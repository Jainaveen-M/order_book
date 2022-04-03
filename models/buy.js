
module.exports = (sequelize,DataTypes) =>{
    const Buy = sequelize.define(
        "buy",
        {
            id: {
                type : DataTypes.INTEGER,
                allowNull:false,
                primaryKey: true,
                autoIncrement: true,
                validate:{
                    notEmpty:true,
                }
            },
            qty: {
                type : DataTypes.INTEGER,
                allowNull:false,
                validate:{
                    notEmpty:true,
                }
            },
            price: {
                type : DataTypes.INTEGER,
                allowNull:false,
                validate:{
                    notEmpty:true,
                }
            },
            total_price: {
                type : DataTypes.INTEGER,
                allowNull:false,
                validate:{
                    notEmpty:true,
                }
            }
        }
    ); 
    return Buy;
};
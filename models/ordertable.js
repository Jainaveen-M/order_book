module.exports = (sequelize, DataTypes) => {
    const Ordertable = sequelize.define(
        "ordertable", {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                validate: {
                    notEmpty: true,
                }
            },
            qty: {
                type: DataTypes.DOUBLE,
                allowNull: false,
                validate: {
                    notEmpty: true,
                }
            },
            price: {
                type: DataTypes.DOUBLE,
                allowNull: false,
                validate: {
                    notEmpty: true,
                }
            },
        }
    );
    return Ordertable;
};
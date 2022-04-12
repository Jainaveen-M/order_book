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
            last_update: {
                type: 'TIMESTAMP',
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
                allowNull: false
            },
        }
    );
    return Ordertable;
};
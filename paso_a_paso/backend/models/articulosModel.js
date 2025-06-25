import { Model, DataTypes } from "sequelize";
import sequelize from "./db.js";

class Articulo extends Model {};

Articulo.init({
    id: {
      type: DataTypes.INTEGER,
      field: "IdArticulo",
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING(60),
      field: "Nombre",
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Nombre es requerido",
        },
        len: {
          args: [5, 60],
          msg: "Nombre debe ser tipo caracteres, entre 5 y 60 de longitud",
        },
      },
      unique: {
        args: true,
        msg: "este Nombre ya existe en la tabla!",
      },
    },
    precio: {
      type: DataTypes.DECIMAL(10, 2),
      field: "Precio",
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Precio es requerido",
        }
      }
    },
    codigoDeBarra: {
      type: DataTypes.STRING(13),
      field: "CodigoDeBarra",
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Codigo De Barra es requerido",
        },
        is: {
          args: ["^[0-9]{13}$", "i"],
          msg: "Codigo de Barra debe ser numérico de 13 digitos",
        },
      },
    },
    idCategoria: {
      type: DataTypes.INTEGER,
      field: "IdCategoria",
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "IdCategoria es requerido",
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      field: "Stock",
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Stock es requerido",
        }
      }
    },
    fechaAlta: {
      type: DataTypes.STRING,
      field: "FechaAlta",
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Fecha Alta es requerido",
        }
      }
    },
    activo: {
      type: DataTypes.BOOLEAN,
      field: "Activo",
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Activo es requerido",
        }
      }
    },
},
  {
    sequelize,
    tableName: "Articulo",
    modelName: "Articulo",
    // pasar a mayusculas
    hooks: {
        beforeValidate: function (articulo, options) {
            if (typeof articulo.nombre === "string") {
                articulo.nombre = articulo.nombre.toUpperCase().trim();
        }
      },
    },
  }
);

export default Articulo;
import { Model, DataTypes, NOW, Op } from "sequelize";
import { sequelize } from "./sequelizeInstance";

export class User extends Model {
  public id!: number;
  public username!: string;
  public password!: string;
  public email!: string;
  public userRank!: string;
  public userAvatar!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
  public authenticated!: boolean;
  public authCodeId!: number;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userRank: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Studenciak",
    },
    userAvatar: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue:
        "https://res.cloudinary.com/survikrowa/image/upload/v1597051975/sq6iqojgm6qlm5lqcifv.jpg",
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: NOW,
    },
    authenticated: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    authCodeId: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
  },
  {
    tableName: "mzg_backend",
    sequelize,
  }
);

export const createUser = async (
  { username, password, email }: Partial<User>,
  authCodeId: number
) => {
  try {
    await User.create({
      username,
      password,
      email,
      authCodeId,
    });
  } catch (error) {
    console.error(error);
  }
};

export const findUserByUsername = async (username: string) => {
  try {
    return User.findOne({
      where: {
        username,
      },
    });
  } catch (error) {
    return error;
  }
};

export const findUserByEmail = async (email: string) => {
  try {
    return User.findOne({
      where: {
        email,
      },
    });
  } catch (error) {
    return error;
  }
};

export const updateUserAuthStatus = async (authCodeId: string) => {
  try {
    return User.update(
      {
        authenticated: true,
      },
      {
        where: {
          authCodeId,
          [Op.and]: {
            authenticated: false,
          },
        },
      }
    );
  } catch (error) {
    return error;
  }
};

export const checkDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Success db connection");
  } catch (error) {
    console.error(error);
  }
};

class UserRepository {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async Register(user) {
        const { userName, email, password, companyName, createdAt, updatedAt } = user;
        const createUser = await this.userModel.create({
            userName,
            email,
            password,
            companyName,
            createdAt,
            updatedAt
        })
        const userWithoutPassword = createUser.toObject()
        delete userWithoutPassword.password
        console.log(userWithoutPassword)
        return userWithoutPassword
    }

    async Login(email) {
        const user = await this.userModel.findOne({ email: email })

        return user
    }
}

module.exports = { UserRepository };

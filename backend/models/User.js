const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
    {
        fullName: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        profileImageUrl: { type: String, default: null },
    },
    { timestamps: true }
);

// Hash password before saving
// UserSchema.pre("save", async function (next) {
//     // Если пароль не менялся, выходим
//     if (!this.isModified("password")) return next() ;
//     this.password = await bcrypt.hash(this.password, 10);
//     next();
// });

// // Исправление: используем async функцию БЕЗ аргумента next Работает!
// UserSchema.pre("save", async function () {
//     // Если пароль не менялся, выходим
//     if (!this.isModified("password")) {
//         return;
//     }
//
//     // Генерируем соль и хеш
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
// });

UserSchema.pre("save", async function () { // Убрали аргумент next Работает!
    // Если пароль не менялся, просто выходим из функции
    if (!this.isModified("password")) return;

    // Хешируем
    this.password = await bcrypt.hash(this.password, 10);

    // В конце функции промис сам зарезолвится (аналог next())
});


// Method to compare passwords
UserSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);
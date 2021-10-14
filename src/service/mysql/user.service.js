const dbUsers = (query, cb) => {
    setTimeout(() => {
        cb(["eduardo", "cristian"]);
    }, 200);
};

class UserService {
    async getAll() {
        return new Promise((resolve) => {
            dbUsers("select * from users", (result) => {
                resolve(result);
            });
        });
    }
}

module.exports = UserService;
class User {
    constructor(database) {
        this.database = database
    }
    
    get usersList() {
        let results = {};

        this.database.query('select * from user', (error, results, fields) => {
            if (error) throw error;
        });
        return results;
    }

}

module.exports = {
    User
}
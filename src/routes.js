module.exports = (app, container) => {
    // users routes configuration
    const userController = container.resolve('userController');

    app.get('/api/users', userController.getAll.bind(userController));
    app.get("/api/users/:id", userController.getById.bind(userController));
    app.post("/api/users/", userController.create.bind(userController));
    app.put("/api/users/:id", userController.update.bind(userController));
    app.delete("/api/users/:id", userController.delete.bind(userController));

    // other routes go here ..
};
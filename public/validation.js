const databaseLogin = {
    save(databaseLogin) {
        localStorage.setItem('databaseLogin', JSON.stringify(databaseLogin));
    },

    get() {
        return JSON.parse(localStorage.getItem('databaseLogin'));
    }
}

function logout () {
    validation.logout();
}

const validation = {
    validate: function () {
        this.login = databaseLogin.get();
       if (!this.login) {
            window.location.href = "index.html";
        }
    },
    logout: function () {
        localStorage.removeItem('databaseLogin');
    }
}

validation.validate();
class User {
    constructor () {
        this.users = [];
    }

    addUser(id,name,room){
        var user  = {id,name,room};
        this.users.push(user);
        return user;
    }

    removeUser(id){
        var removedUsers = this.users.filter((user)=>(user.id===id));
        if(removedUsers[0]){
            this.users = this.users.filter((user)=>user.id !== id);
        }
        return removedUsers[0];

    }

    getUser(id){
        var users = this.users.filter((user)=>(user.id===id));
        return users[0];
    }

    getUserList(room){
        var users = this.users.filter((user)=>(user.room === room));
        var userNames = users.map((user)=>user.name);
        return userNames;
    }
}

module.exports = {User};
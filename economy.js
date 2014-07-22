var economy = {
    casino: {
        dice: {
            compareRolls: function (rolls, players, room) {
                var winner = '';
                var loser = '';
                if (rolls[Users.users[players[0]]] > rolls[Users.users[players[1]]]) {
                    winner = Users.users[players[0]].userid;
                    loser = Users.users[players[1]].userid;
                } else {
                    winner = Users.users[players[1]].userid;
                    loser = Users.users[players[0]].userid;
                }
                if (!rolls[Users.users[players[1]] === rolls[Users.users[players[0]]]]) {
                    room.addRaw(Users.users[players[0]].name + ' rolled a <font color=red>' + rolls[Users.users[players[0]]] + '</font>');
                    room.addRaw(Users.users[players[1]].name + ' rolled a <font color=red>' + rolls[Users.users[players[1]]] + '</font>');
                    room.addRaw('<font color=#24678d> ' + winner + ' wins the dice game and ' + '<font color=red>' + dice[room.id].bet + '</font> bucks.</font>');

                    var giveMoney = Number(dice[room.id].bet);
                    var money = Core.stdin('money.csv', Users.users[winner].userid);
                    var total = Number(money) + Number(giveMoney);
                    Core.stdout('money.csv', Users.users[winner].userid, total);

                    var takeMoney = Number(dice[room.id].bet);
                    var bucks = Core.stdin('money.csv', Users.users[loser].userid);
                    var amount = Number(bucks) - Number(takeMoney);
                    Core.stdout('money.csv', Users.users[loser].userid, amount);
                } else {
                    return room.add('It was a draw, both frens keep their money');
                }
                delete this[room.id];
            },
            generateRolls: function (players, room) {
                var facez = [1, 2, 3, 4, 5, 6];
                for (var i = 0; i < players.length; i++) {
                    this[room.id].rolls[Users.users[players[i]]] = facez[Math.floor(Math.random() * 6)];
                }
            }
        }
    }
};

/**
*   Função para gerar um valor
*   de XP aleatório entre
*   os valores 15 e 50
*/

const randomXP = function() {

    var maxXP = 50;
    var minXP = 15;
    var xp = Math.random() * (maxXP - minXP) + minXP;

    return Math.round(xp) ;

}

/**
*   
*   
*   
*/

const levelUP = function(user) {

    var userLevel = user.level;
    var calcUserXP = user.xp / 200;

    if(calcUserXP >= userLevel+1) {
        return true;
    }
    return false;
}

module.exports = { 
    randomXP,
    levelUP
}
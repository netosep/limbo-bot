function msToSec(time) {
    return Math.round(time / 1000);
}

function msToMin(time) {
    return Math.round(time / 60000);
}

function msToHour(time) {
    return Math.round(time / 3600000);
}

const convertTime = function(time) {

    time = parseInt(time);

    // segundos
    if(time >= 1000 && time < 60000) { 
        return `${msToSec(time)} segundos`;
    }
    // minutos
    else if(time >= 60000 && time < 3600000) {
        return `${msToMin(time)} minuto${msToMin(time) > 1 ? "s" : ""}`;
    }
    // horas
    else if(time >= 3600000) {
        var hour = msToHour(time);
        var min = msToMin(time % 3600000);
        var string = `${hour} hora${hour > 1 ? "s" : ""} ${min > 0 ? `e ${min} min` : ""}`;
        return string;
    } else {
        return `${time} ms`;
    }

}

module.exports = { convertTime }
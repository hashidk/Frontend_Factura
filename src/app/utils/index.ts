
function obtenerCookie(clave:string):String {
    var name = clave + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
  }

function comprobarCookie(clave:string):boolean {
    var clave:string = obtenerCookie(clave) as string;
    return clave !== "";
  }

export {
    comprobarCookie
}
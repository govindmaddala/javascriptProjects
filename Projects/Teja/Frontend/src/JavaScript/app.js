const jquery = require('jquery');
jquery(document).ready(() => {
    jquery("#heading").click(()=>{
        jquery("#heading").css("width","20px")
    })

    jquery("#heading").css("color","red")
})
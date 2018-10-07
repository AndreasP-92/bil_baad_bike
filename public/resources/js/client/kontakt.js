(function(){
thankYou()
})();

function thankYou () {
    document.getElementById('submitButton').addEventListener('click',function(event){
        event.preventDefault();
        // alert('læst')
        var body        = document.querySelector('.bodys')
        var success     = document.querySelector('.success')
        var unsuccess   = document.querySelector('.unsuccess')
        var form        = document.querySelector('#contactForm')
        var name        = document.querySelector('.name')
        var mail        = document.querySelector('.mail');
        var topic       = document.querySelector('.topic');
        var msg         = document.querySelector('.msg');

        if( name.value == "" || mail.value == "" || topic.value == "" || msg.value == ""){
            // alert('Udfyld alle felter tak')
            unsuccess.classList.toggle("successAproved")
            setTimeout(function(){ 
                // alert('test')
                unsuccess.classList.toggle("hide")
            }, 2300);

        }else{
            success.classList.toggle("successAproved")
            setTimeout(function(){ 
                form.submit()
            }, 1500);
        }
    })

}
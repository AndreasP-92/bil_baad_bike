document.addEventListener("DOMContentLoaded", function(event) {
    button();

    
});

function button (){
    document.getElementById('submitButton').addEventListener('click',function(event){
        event.preventDefault();

        const registerForm      = document.querySelector('#registerForm');
        const getUser           = document.querySelector('#login__username');
        const getEmail          = document.querySelector('#email');
        const getName           = document.querySelector('#name');
        const getTextbox        = document.querySelector('#textbox');
        const getImg            = document.querySelector('#file');
        const validUserDiv      = document.querySelector('#userValid');
        const getPassword01     = document.querySelector('#password01');
        const getPassword02     = document.querySelector('#password02');
        const validPasswordDiv  = document.querySelector('#passwordValid');
        const success           = document.querySelector('.rigistrationSuccess');
        const form              = document.querySelector('.card-container');
        
        console.log(getEmail.value)

        const url = '/register/find/'+getUser.value;

        fetch (url)
            .then(function(response){
                return response.json();
            }).then(function(result){
                console.log(result)
// IF SUCCESS ====================================
                if(result[0].username == 0 && getPassword01.value == getPassword02.value && getEmail.value != "" && getName.value != "" && getTextbox.value != ""){
                    document.getElementById('passwordValid').innerHTML = "";                                        
                    document.getElementById('userValid').innerHTML = "";
                    success.classList.toggle("showSuccess")
                    form.classList.toggle('hide')
                    
                    setTimeout(function(){ 
                        registerForm.submit()
                    }, 2000);
                                        

// VALIDATING USER ==============================
                } if(result[0].username == 1) {
                    getUser.select()

                    document.getElementById('userValid').innerHTML = "Bruger Findes Allerede"

                    if(getPassword01.value == getPassword02.value){
                        document.getElementById('passwordValid').innerHTML = "";                       
                    };

// VALIDATING PASSWORD ==============================
                } if(getPassword01.value != getPassword02.value){
                    document.getElementById('passwordValid').innerHTML = "Kodeord skal være ens";

                    if(result[0].username == 0){
                        document.getElementById('userValid').innerHTML = "";  
                    }   
// VALIDATING EMAIL ==============================
                } if(getEmail.value == ""){
                    document.getElementById('email_valid').innerHTML = "Email Skal indsættes";

                    if(getEmail.value != ""){
                        document.getElementById('email_valid').innerHTML = "";  
                    } 
// VALIDATING NAME ==============================
                } if(getName.value == ""){
                    document.getElementById('name_valid').innerHTML = "Navn Skal indsættes";

                    if(getName.value != ""){
                        document.getElementById('name_valid').innerHTML = "";  
                    } 
// VALIDATING TEXTBOX ==============================
                } if(getTextbox.value == ""){
                    document.getElementById('textbox_valid').innerHTML = "Tekst Skal Indsættes";

                    if(getTextbox.value != ""){
                        document.getElementById('textbox_valid').innerHTML = "";  
                    } 
                } if(getImg.value == ""){
                    document.getElementById('file_valid').innerHTML = "Billede Skal Tilføjes";

                    if(getImg.value != ""){
                        document.getElementById('file_valid').innerHTML = "";  
                    } 
                }
                
            })
        });
}
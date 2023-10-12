const buttons = [".red", ".green", ".blue", ".yellow"];
//generates numbers
function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
//New button
var to_be_clicked = [];
var clicked = [];
//#слагам го за индекс на to_be_clicked[]
var count_clicked_total = 0;
var count_clicked_current = 0;

//Generate to_be_clicked[i]

function number_assign(){
    for (var i = 0; i<20; i++){
        var number = generateRandomNumber(0,3);
        to_be_clicked.push(number);

    }
}

//extract first class

function extract_first_class (event_object){
    var ready = $(event_object.target).attr("class").split(" ")[1];
    return ready;
}

//Class to number converter; ex. input red blue etc.

function class_to_index (Class){
    var class_formated = "."+ Class;
    switch (class_formated){
        
        case (buttons[0]):
            class_formated = 0;
            break;
        
        case (buttons[1]):
            class_formated = 1;
            break;
        
        case (buttons[2]):
            class_formated = 2;
            break;
        
        case (buttons[3]):
            class_formated = 3;
            break;
        default:
            class_formated = "something went wrong!";
    }
    return class_formated;
}
//switch if "a" is pressed

switch_a = 0;

//Какво, като е натиснат?: - знам кой
function css_pressed(index) {

    $(buttons[index]).addClass("pressed");
    

    setTimeout(function() {
        $(buttons[index]).removeClass("pressed");
    }, /*Time delay = */ 200);
}



//Game On/Off  Off, докато не се натисне ,,A"
var game_state = "Off";

  
  //вика функцията, щом се натисне, знам кой бутон и index-a му
function play_sound(index) {
    var dir = "./sounds/";
    if (index == 0){
        var audio = new Audio(dir + "red.mp3");
        audio.play();
    }
    else if (index == 1){
        var audio = new Audio(dir + "green.mp3");
        audio.play();
    }
    else if (index == 2){
        var audio = new Audio(dir + "blue.mp3");
        audio.play();
    }
    else if (index == 3){
        var audio = new Audio(dir + "yellow.mp3");
        audio.play();
    }
    else if (index == 5){
        var audio = new Audio(dir + "start.mp3");
        audio.play();
    }
    else{
        console.log("bug!!!" + index)
    }
  //console.log("Button clicked at index:", index);
  //console.log("Button class:", event.target.className);
}
//Start
function started (){
    //f() numbers
    $("h1").text("Simon Game, Let's goooo");
    number_assign();
    game_state = "On";
    play_sound(5);

}
//button call
function button_call(index){
    play_sound(index);
    css_pressed(index);
}

//Starting to call section:













//call game_start with "a"
$("html").keypress(function (event) { 
    if ((event.key == "a" || event.key == "A") && switch_a == 0){
        started ();
        switch_a = 1;
        $("h1").text("Press D for profesionnal Press N for Noob.");
        var difficulty;
        $("html").keypress(function (event_diff) {
        if (event_diff.key == "d" || event_diff.key == "D"){
            difficulty = 10;
            setTimeout(function(){
                (function delayed (){
                    button_call(to_be_clicked[count_clicked_total]);
                })();
              }, 500);
            
            
        }
        else if(event_diff.key == "n" || event_diff.key == "N"){
            difficulty = 7;
            setTimeout(function(){
                (function delayed (){
                    button_call(to_be_clicked[count_clicked_total]);
                })();
              }, 500);
        }
        else {
            alert("Brooo, choose your difficulty. C'mon, it's not THAT hard. Or is it?");
        }
    })}
    else if ((event.key == "a" || event.key == "A") && switch_a == 1){
        alert("Bruh, you already clicked a ");
    }
    else if(!(event.key == "d" || event.key == "D" || event.key == "n" || event.key == "N")){
        alert("Check yo keyboard language.");
    }
});


//Checks if correct button is clicked
$("html").click(function (event) { 
    //firstClass отчита цвета
    
    
    var wut_clicked = $(event.target).attr("type");
    if (game_state == "Off"){
        //do nothing
    }
    //проверява дали е натиснат изобщо бутон. Бъгва функцията extract_first_class(event) иначе!
    else if(wut_clicked == "button"){
        
        var firstClass = extract_first_class(event);
        console.log(count_clicked_current + "current count");
        console.log(count_clicked_total + "total count");
        if (count_clicked_current == count_clicked_total){
            var reset = true; //boolean
        }
        else{
            reset = false;
        }
        
        //number_pressed - знам кой № е натиснат
        var number_pressed = class_to_index(firstClass);
        console.log(number_pressed + "this is number pressed");
        console.log(to_be_clicked[count_clicked_current] + "this is what should be clicked");
        
        //WHat should be clicked: - знам to_be_clicked value
        if (game_state == "On")
        {//Demo# 
             if (number_pressed == to_be_clicked[count_clicked_current]){
                //#code - ако се уцели бутона
                button_call(number_pressed);
                
                count_clicked_current++;
                if (reset){
                    count_clicked_current = 0;
                    count_clicked_total++;
                    setTimeout(function(){
                        (function delayed (){
                            button_call(to_be_clicked[count_clicked_total]);
                        })();
                      }, 1500);
                }
                if(count_clicked_current == 8){
                    $("h1").text("Wait! Not finished");
                    game_state = "Off";
                    $("body").addClass("game-won");
                    setTimeout(function(){
                        (function delayed (){
                          alert("Check this out! https://www.youtube.com/watch?v=bueFTrwHFEs");
                        })();
                      }, 1500);
                }
                
            }
            else{
                game_state = "Off";
                var audio_over = new Audio("./sounds/shutdown.mp3");
                audio_over.play();
                $("h1").text("Messed up,huh?-reload");
                $("body").addClass("gnuuus");
            }
        }
        //What if NOT correct clicked?:
        else{
            game_state = "Off";
            var audio_over = new Audio("./sounds/shutdown.mp3");
            audio_over.play();
            $("h1").text("Messed up,huh?-reload");
            $("body").addClass("gnuuus");
        }
}
});
//# dx взички count_total за count_current, където викат f() + намери начин за count_current
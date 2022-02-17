const app = () =>{
    const song = document.querySelector(".song");
    const play = document.querySelector(".play");
    let iconBtn = document.querySelector(".play button");
    const backvideo = document.querySelector(".back-video-container video");
    const timeSelect = document.querySelectorAll(".time-select button")
    const soundSelect = document.querySelectorAll(".sound-select button")
    let fakeDuration = 600;
    const timeDisplay = document.querySelector(".time-display");

    //play pause button
    play.addEventListener('click',function(){
        checkPlaying(song);
    });

    //time selecting from buttons
    timeSelect.forEach(option => {
        option.addEventListener("click",function (){
            fakeDuration = this.getAttribute("data-time");
            timeDisplay.textContent = `${Math.floor(fakeDuration/60)}:${Math.floor(fakeDuration % 60)}`;
        });
    });

    // selecting sound and video that plays
    soundSelect.forEach(option => {
        option.addEventListener("click",function (){
            song.src = this.getAttribute("data-sound");
            backvideo.src = this.getAttribute("data-video");
            checkPlaying(song);

        });
    });

    //play pause button song function
    const checkPlaying = song =>{
        if(song.paused){
            song.play();
            backvideo.play();
            if(iconBtn.innerHTML=="<i class=\"fa-solid fa-pause\">"){
                iconBtn.innerHTML="<i class=\"fa-solid fa-play\">";
            }
            else{
                iconBtn.innerHTML="<i class=\"fa-solid fa-pause\">"
            }
        }
        else{
            song.pause();
            backvideo.pause();
            if(iconBtn.innerHTML=="<i class=\"fa-solid fa-play\">"){
                iconBtn.innerHTML="<i class=\"fa-solid fa-pause\">";
            }
            else{
                iconBtn.innerHTML="<i class=\"fa-solid fa-play\">"
            }
        }
    };

    //song timings update for display
    song.ontimeupdate = () =>{
        let currentTime = song.currentTime;
        let elapsed = fakeDuration - currentTime;
        let seconds = Math.floor(elapsed % 60);
        let minutes = Math.floor(elapsed / 60);
        
        timeDisplay.textContent = `${minutes}:${seconds}`
        
        if(currentTime>=fakeDuration){
            song.pause();
            song.currentTime = 0;
            iconBtn.innerHTML="<i class=\"fa-solid fa-pause\">";
            backvideo.pause();

        }
    }

}


app();
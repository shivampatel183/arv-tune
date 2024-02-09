let songIndex = 1;
let audioElement = new Audio(`${songIndex}.mp3`);
let playsong = document.getElementById('play');
let playbar = document.getElementById('playbar');
let nextsong = document.getElementById('nextsong');
let pervioussong = document.getElementById('pervioussong');
let volume = document.getElementById('volu');
let mic = document.getElementById('mic');
let gif = document.getElementById('gif')
let sname = document.getElementById('snb');
let songItem = Array.from(document.getElementsByClassName('song'));

const listen ="equalizer";
const stop = "stop_circle";
const play = "play_circle";
const volplay = "volume_up";
const volpause = "volume_off";

let song = [
    { songname: "Besaram Rang-Pathaan", filepath: "1.mp3", },
    { songname: "doja-Fast X", filepath: "2.mp3", },
    { songname: " Ek Zindagi - Angrezi Medium", filepath: "3.mp3", },
    { songname: "Jai Shri Ram Adipurush", filepath: "4.mp3", },
    { songname: "Still Rollin-Subh", filepath: "5.mp3", },
    { songname: "Nachan Nu Jee Karda - Angrezi Medium", filepath: "6.mp3", },
    { songname: "Obsessed (PaglaSongs)", filepath: "7.mp3", },
    { songname: "Raataan Lambiyan", filepath: "8.mp3", },
    { songname: "Ram Siya Ram Adipurush", filepath: "9.mp3", },
    { songname: "Saanjah (SongsPK)", filepath: "10.mp3", },
    { songname: "Tere Vaaste (SongsPK)", filepath: "11.mp3", },
    { songname: "Yadav-Brand-2 (PaglaSongs)", filepath: "12.mp3", },
]

songItem.forEach((element, i) => {
    element.getElementsByClassName('sname')[0].innerText = song[i].songname;

})


playbar.addEventListener('change', () => {
    let dur = playbar.value * audioElement.duration / 100
    audioElement.currentTime = dur;
})


const allstop = () => {
    Array.from(document.getElementsByClassName('material-symbols-outlined')).forEach((element) => {
        element.innerHTML = play;
        document.getElementById("play").innerText = stop;
        gif.style.opacity = 0;
        document.getElementById("pervioussong").innerText = 'skip_previous';
        document.getElementById("nextsong").innerText = 'skip_next';
        document.getElementById('volu').innerHTML = volplay;
        document.getElementById('mic').innerText = 'mic';
    })
}

playsong.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        document.getElementById("play").innerHTML = stop;
        document.getElementById('volu').innerHTML = volplay;
        gif.style.opacity = 1;
        document.getElementById(`${songIndex}`).innerHTML=stop; 
    }
    else {
        audioElement.pause();
        allstop();
        document.getElementById("play").innerHTML = play;
        gif.style.opacity = 0;
    }
})
Array.from(document.getElementsByClassName('playsongs')).forEach((element) => {
    element.addEventListener('click', (e) => {
        songIndex = parseInt(e.target.id);
        allstop();
        audioElement.src = `${songIndex}.mp3`;
        sname.innerText = song[songIndex - 1].songname;
        document.getElementById("play").innerText = stop;
        e.target.innerHTML = stop;
    })
})


Array.from(document.getElementsByClassName('playsongs')).forEach((element) => {
    element.addEventListener('click', (e) => {
        if (audioElement.paused || audioElement.currentTime <= 0) {
            audioElement.play()    
            console.log("play");
            gif.style.opacity = 1;
        }
        else {
            audioElement.pause();
            console.log("stop")
            allstop();
        }
    })
})

nextsong.addEventListener('click', () => {
    if (songIndex < 12) {
        allstop();
        songIndex = songIndex + 1;
    }
    else {
        allstop();
        songIndex = 1;
    }
    document.getElementById(`${songIndex}`).innerHTML = stop;
    document.getElementById("play").innerText = stop;
    audioElement.src = `${songIndex}.mp3`;
    audioElement.currentTime = 0;
    sname.innerText = song[songIndex - 1].songname;
    audioElement.play()
    gif.style.opacity = 1;
})

pervioussong.addEventListener('click', () => {
    if (songIndex > 1) {
        allstop();
        songIndex = songIndex - 1;
    }
    else {
        allstop();
        songIndex = 12;
    }
    document.getElementById(`${songIndex}`).innerHTML = stop;
    document.getElementById("play").innerText = stop;
    audioElement.src = `${songIndex}.mp3`;
    sname.innerText = song[songIndex - 1].songname;
    audioElement.currentTime = 0;
    audioElement.play()
    gif.style.opacity = 1;
})

let vol = document.getElementById('vol')

function changevolume(amount) {
    vol.value = amount;
    audioElement.volume = amount;
    if (amount == 0) {
        volume.innerHTML = volpause;
    }
    else {
        volume.innerHTML = volplay;
    }
}

volume.addEventListener(('click'), () => {
    let volumevalue = audioElement.volumevalue
    console.log(volumevalue)
    if (audioElement.volume != 0) {
        volume.innerHTML = volpause;
        audioElement.volume = 0;
        vol.value = 0;
    }
    else {
        volume.innerHTML = volplay;
    }
})

mic.addEventListener(('click'), () => {
        mic.innerText = 'mic'
        voiceassi()
})

function plays(songIndex){
    audioElement.src = `${songIndex}.mp3`;
    sname.innerText = song[songIndex - 1].songname;
    document.getElementById(`${songIndex}`).innerHTML = stop;
    document.getElementById("play").innerText = stop;
    audioElement.play();
    gif.style.opacity = 1;
}

audioElement.addEventListener('timeupdate', () => {
    let per = parseInt((audioElement.currentTime / audioElement.duration) * 100)
    playbar.value = per;
    if(playbar.value == 100){
        songIndex=songIndex+1;
        allstop()
        plays(`${songIndex}`)
    }
})

const voiceassi = () => {
    mic.innerHTML=listen;
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.interimResult = true ;
    recognition.addEventListener('result',(e)=>{
        const text =Array.from(e.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join('');
            mic.innerText='mic'
        console.log(text)
        allstop();
        if(text.includes('Besharam')){
            songIndex = 1
            plays(songIndex)
        }
        else if(text.includes("fast")){
            songIndex = 2
            plays(songIndex)
        }
        else if(text.includes("Ek Zindagi")){
            songIndex = 3
            plays(songIndex)
        }
        else if(text.includes("Jay Shri Ram")){
            songIndex = 4
            plays(songIndex)
        }
        else if(text.includes("Steel")){
            songIndex = 5
            plays(songIndex)
        }
        else if(text.includes("jee Karda")){
            songIndex = 6
            plays(songIndex)
        }
        else if(text.includes("obsessed")){
            songIndex = 7
            plays(songIndex)
        }
        else if(text.includes("lambiya")){
            songIndex = 8
            plays(songIndex)
        }
        else if(text.includes("Ram Siya Ram")){
            songIndex = 9
            plays(songIndex)
        }
        else if(text.includes("sanjha")){
            songIndex = 10
            plays(songIndex)
        }
        else if(text.includes("Tere Vaste")){
            songIndex = 11
            plays(songIndex)
        }
        else if(text.includes("Yadav")){
            songIndex = 12
            plays(songIndex)
        }
    })
    recognition.start();
}
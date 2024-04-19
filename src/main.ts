import './style.css'
import { start,  stop, restart} from './game';

let isRunning = false;

window.onload = () => {
  document.querySelector<HTMLDivElement>('#app')!.innerHTML = 
  `
    <div class="container">
      <h1>Game of Life</h1>
      <section class="section-buttons">
        <button id="StartStop">Start</button>
        <button id="Restart">Restart</button>
        <button onclick="save()">Save</button>
      </section>
      <canvas id="screen"></canvas>
    </div>
  `;

  document.getElementById('StartStop')?.addEventListener('click', play);
  document.getElementById('Restart')?.addEventListener('click', Restart);
};

function toggleButton(): void {
  const button = document.querySelector<HTMLButtonElement>('#StartStop');
  if (button) {
    isRunning = !isRunning;
    button.textContent = isRunning ? 'Stop' : 'Start';
  }
}

function play(): void{
  if(!isRunning){
    start();
  }else{
    stop();
    console.log("Detener!!!")
  }
  toggleButton();
  
}

function Restart(): void{
  //Primero se debe parar el juego
  stop();
  restart();
  isRunning=false;
  toggleButton();
}

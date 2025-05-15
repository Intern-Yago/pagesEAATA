const slidesContainer = document.querySelector('.slides');
const slideItems = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

const slideCount = slideItems.length;
let index = 1;
let slideWidth = slidesContainer.clientWidth; // Inicializa com a largura atual

// Clonar slides
const firstClone = slideItems[0].cloneNode(true);
const lastClone = slideItems[slideCount - 1].cloneNode(true);

firstClone.classList.add('clone');
lastClone.classList.add('clone');

slidesContainer.appendChild(firstClone);
slidesContainer.insertBefore(lastClone, slideItems[0]);

// Configuração inicial
updateSlideWidth();
slidesContainer.style.transform = `translateX(-${slideWidth * index}px)`;

let interval = setInterval(moveToNextSlide, 4000);

// Função para atualizar a largura do slide
function updateSlideWidth() {
  slideWidth = slidesContainer.clientWidth;
  document.querySelectorAll('.slide').forEach(slide => {
    slide.style.width = `${slideWidth}px`;
  });
}

// Funções de navegação
function moveToNextSlide() {
  if (index >= slideCount + 1) return;
  index++;
  slidesContainer.style.transition = "transform 0.5s ease-in-out";
  slidesContainer.style.transform = `translateX(-${slideWidth * index}px)`;
}

function moveToPrevSlide() {
  if (index <= 0) return;
  index--;
  slidesContainer.style.transition = "transform 0.5s ease-in-out";
  slidesContainer.style.transform = `translateX(-${slideWidth * index}px)`;
}

// Evento de transição
slidesContainer.addEventListener('transitionend', () => {
  if (index === slideCount + 1) {
    slidesContainer.style.transition = "none";
    index = 1;
    slidesContainer.style.transform = `translateX(-${slideWidth * index}px)`;
  }
  if (index === 0) {
    slidesContainer.style.transition = "none";
    index = slideCount;
    slidesContainer.style.transform = `translateX(-${slideWidth * index}px)`;
  }
});

// Event listeners
nextBtn.addEventListener('click', () => {
  moveToNextSlide();
  resetAutoplay();
});

prevBtn.addEventListener('click', () => {
  moveToPrevSlide();
  resetAutoplay();
});

function resetAutoplay() {
  clearInterval(interval);
  interval = setInterval(moveToNextSlide, 4000);
}

// Responsividade - atualiza ao redimensionar
window.addEventListener('resize', () => {
  updateSlideWidth();
  slidesContainer.style.transition = "none";
  slidesContainer.style.transform = `translateX(-${slideWidth * index}px)`;
});

// Inicializa os slides
updateSlideWidth();
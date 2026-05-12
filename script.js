const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");
const contadores = document.querySelectorAll(".contador");
const form = document.getElementById("formContato");
const statusForm = document.getElementById("statusForm");

if (menuBtn && menu) {
  menuBtn.addEventListener("click", () => {
    menu.classList.toggle("ativo");
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => menu.classList.remove("ativo"));
  });
}

const animarContador = (elemento) => {
  const alvo = Number(elemento.dataset.target);
  const duracao = 1200;
  const inicio = performance.now();

  const atualizar = (tempoAtual) => {
    const progresso = Math.min((tempoAtual - inicio) / duracao, 1);
    elemento.textContent = Math.floor(progresso * alvo);

    if (progresso < 1) {
      requestAnimationFrame(atualizar);
    } else {
      elemento.textContent = alvo;
    }
  };

  requestAnimationFrame(atualizar);
};

if (contadores.length > 0) {
  const observer = new IntersectionObserver(
    (entradas, observador) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          animarContador(entrada.target);
          observador.unobserve(entrada.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  contadores.forEach((contador) => observer.observe(contador));
}

if (form && statusForm) {
  form.addEventListener("submit", (evento) => {
    evento.preventDefault();
    statusForm.textContent = "Mensagem enviada com sucesso. Obrigado pelo contato.";
    form.reset();
  });
}

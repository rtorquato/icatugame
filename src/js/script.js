
function buttonClick(event) {
    const option = event.target.getAttribute('data-option');
    const retornoDiv = document.getElementById('answers');

    if (option === 'sim') {
        retornoDiv.textContent = 'Obrigado por participar!';
    } else if (option === 'não') {
        retornoDiv.textContent = 'Não foi desta vez, agradecemos sua participação.';
    }
}

const btnAnswersList = document.querySelectorAll('.btn-answers');

btnAnswersList.forEach(btn => {
    btn.addEventListener('click', buttonClick);
});
document.addEventListener('DOMContentLoaded', () => {
    const winnerDiv = document.getElementById('candidates')
    fetch('https://form.temptestsites.online/.netlify/functions/candidates', {
        mode: 'cors',
        headers: new Headers({ 'Content-Type': 'application/json' })
    })
        .then(res => res.json())
        .catch(err => {
            document
                .getElementById('error')
                .appendChild(document.createTextNode(`Something has gone wrong: ${err}`))
        })
        .then(candidates => {
            candidates.forEach((candidate, idx) => {
                winnerDiv.innerHTML += `<p>
        <div class="line">
          <label for="candidate-${idx}" id="candidate-${idx}-label" class="label-container">${candidate.name}
            <input type="radio" id="candidate-${idx}" name="winner" value="${candidate.name}">
            <span class="checkmark"></span>
          </label>
          <div class="downArrow" data-index="${idx}"></div>
        </div>
        <div id="bio-${idx}" style="display:none">${candidate.bio}</div>
        </p>`
            })
            const arrows = document.querySelectorAll('.downArrow')
            arrows.forEach(arrow => {
                arrow.addEventListener('click', e => {
                    const idx = e.target.dataset.index
                    const bio = document.getElementById(`bio-${idx}`)
                    if (bio.style.display === 'none') {
                        bio.style.display = 'block'
                        e.target.classList.remove('downArrow')
                        e.target.classList.add('upArrow')
                    } else {
                        bio.style.display = 'none'
                        e.target.classList.remove('upArrow')
                        e.target.classList.add('downArrow')
                    }
                })
            })
        })
})


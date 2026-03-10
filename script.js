function generateInputs() {
    const count = parseInt(document.getElementById('quarters').value);
    const container = document.getElementById('inputs-container');
    const resultDiv = document.getElementById('result');
    
    resultDiv.style.display = 'none'; // Yangi tanlovda natijani yashirish
    container.innerHTML = ''; // Konteynerni tozalash
    
    for (let i = 1; i <= count; i++) {
        const div = document.createElement('div');
        div.className = 'input-group';
        div.style.marginTop = '10px';
        
        div.innerHTML = `
            <label>${i}-chorak imtihon bali:</label>
            <input type="number" class="score-input" placeholder="0-100" min="0" max="100">
        `;
        container.appendChild(div);
    }
}

function calculate() {
    const inputs = document.querySelectorAll('.score-input');
    const resultDiv = document.getElementById('result');
    
    let totalScore = 0;
    let hasEmpty = false;

    inputs.forEach(input => {
        if (input.value === "") hasEmpty = true;
        totalScore += Number(input.value) || 0;
    });

    if (hasEmpty) {
        alert("Iltimos, barcha chorak ballarini kiriting!");
        return;
    }

    const completedCount = inputs.length;
    const average = totalScore / completedCount;
    resultDiv.style.display = 'block';

    if (completedCount === 4) {
        // YAKUNIY NATIJA (4-chorak tugaganda)
        if (average >= 60) {
            resultDiv.innerHTML = `
                <div style="color: var(--success)">
                    <p class="highlight">O'rtacha: ${average.toFixed(1)}</p>
                    <p>Tabriklaymiz! Siz maktabda qolasiz. 🎉</p>
                </div>
            `;
        } else {
            resultDiv.innerHTML = `
                <div style="color: var(--danger)">
                    <p class="highlight">O'rtacha: ${average.toFixed(1)}</p>
                    <p>Afsuski, siz maktabdan haydalasiz. 🚫</p>
                </div>
            `;
        }
    } else {
        // BASHORAT (1-3 choraklar uchun)
        const remainingQuarters = 4 - completedCount;
        const remainingNeeded = 240 - totalScore;
        const avgNeeded = remainingNeeded / remainingQuarters;

        if (avgNeeded <= 0) {
            resultDiv.innerHTML = `<p class="highlight" style="color: var(--success)">Siz allaqachon xavfsizsiz! ✅</p>`;
        } else if (avgNeeded > 100) {
            resultDiv.innerHTML = `<p class="highlight" style="color: var(--danger)">Imkonsiz! ❌</p><p>Hatto 100 ball olsangiz ham yetmaydi.</p>`;
        } else {
            resultDiv.innerHTML = `
                <p>Hozirgi o'rtacha: <b>${average.toFixed(1)}</b></p>
                <p>Qolgan ${remainingQuarters} chorakda o'rtacha <span class="highlight" style="color: var(--accent)">${avgNeeded.toFixed(1)}</span> ball olishingiz kerak.</p>
            `;
        }
    }
}

// Sahifa yuklanganda avtomatik birinchi inputni chiqarish
window.onload = generateInputs;
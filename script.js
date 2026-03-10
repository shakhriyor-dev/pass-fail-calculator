/**
 * Dark/Light mode almashtirish
 */
function toggleTheme() {
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
}

/**
 * Dinamik input yaratish
 */
function generateInputs() {
    const count = parseInt(document.getElementById('quarters').value);
    const container = document.getElementById('inputs-container');
    const resultDiv = document.getElementById('result');
    const progContainer = document.getElementById('prog-container');
    
    resultDiv.style.display = 'none';
    progContainer.style.display = 'none';
    container.innerHTML = '';
    
    for (let i = 1; i <= count; i++) {
        container.innerHTML += `
            <div class="input-group" style="margin-top: 12px">
                <label>${i}-chorak bali:</label>
                <input type="number" class="score-input" placeholder="0-100" 
                       oninput="validateInput(this)">
            </div>`;
    }
}

/**
 * Validation: Faqat 0-100 oralig'i
 */
function validateInput(input) {
    const val = parseFloat(input.value);
    if (val < 0 || val > 100 || isNaN(val)) {
        input.classList.add('error');
    } else {
        input.classList.remove('error');
    }
}

/**
 * Progress Barni yangilash
 */
function updateProgress(avg) {
    const container = document.getElementById('prog-container');
    const bar = document.getElementById('prog-bar');
    const valText = document.getElementById('prog-value');
    
    container.style.display = 'block';
    bar.style.width = Math.min(avg, 100) + "%";
    valText.innerText = avg.toFixed(1);

    if (avg < 40) bar.style.backgroundColor = "#ef4444";
    else if (avg < 60) bar.style.backgroundColor = "#eab308";
    else bar.style.backgroundColor = "#22c55e";
}

/**
 * Hisoblash va Hukm chiqarish
 */
function calculate() {
    const inputs = document.querySelectorAll('.score-input');
    const resultDiv = document.getElementById('result');
    let total = 0, isValid = true, empty = false;

    inputs.forEach(input => {
        const v = input.value;
        if (v === "") empty = true;
        const n = parseFloat(v);
        if (n < 0 || n > 100 || isNaN(n)) isValid = false;
        total += n;
    });

    if (empty || !isValid) {
        alert("Iltimos, barcha kataklarni 0-100 oralig'ida to'ldiring!");
        return;
    }

    const count = inputs.length;
    const avg = total / count;
    updateProgress(avg);
    resultDiv.style.display = 'block';

    if (count === 4) {
        if (avg >= 60) {
            resultDiv.innerHTML = `<b style="color:var(--success)">TABRIKLAYMIZ! 🎉</b><br>O'rtacha ${avg.toFixed(1)} ball bilan maktabda qolasiz!`;
        } else {
            resultDiv.innerHTML = `<b style="color:var(--danger)">AFSUSA... 🚫</b><br>Ball yetmadi, maktabdan haydalasiz.`;
        }
    } else {
        const rem = 4 - count;
        const need = 240 - total;
        const avgNeed = need / rem;

        if (avgNeed <= 0) {
            resultDiv.innerHTML = `<span style="color:var(--success)">Siz allaqachon xavfsizsiz! ✅</span>`;
        } else if (avgNeed > 100) {
            resultDiv.innerHTML = `<span style="color:var(--danger)">Imkonsiz! ❌</span><br>Sizga yana ${need} ball kerak.`;
        } else {
            resultDiv.innerHTML = `Sizga yana <b style="color:var(--accent)">${need}</b> ball kerak.<br>Qolgan ${rem} chorakda o'rtacha <b>${avgNeed.toFixed(1)}</b> ball oling.`;
        }
    }
}

// Boshlang'ich sozlamalar
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('theme') === 'light') document.body.classList.add('light-mode');
    generateInputs();
});
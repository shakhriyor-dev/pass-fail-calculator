/**
 * Tanlangan choraklar soniga qarab dinamik inputlar yaratadi
 */
function generateInputs() {
    const count = parseInt(document.getElementById('quarters').value);
    const container = document.getElementById('inputs-container');
    const resultDiv = document.getElementById('result');
    
    // Har gal tanlov o'zgarganda natijani yashiramiz va konteynerni tozalaymiz
    resultDiv.style.display = 'none';
    container.innerHTML = '';
    
    for (let i = 1; i <= count; i++) {
        const div = document.createElement('div');
        div.className = 'input-group';
        div.style.marginTop = '15px';
        
        div.innerHTML = `
            <label>${i}-chorak imtihon bali (0-100):</label>
            <input type="number" class="score-input" 
                   placeholder="Ballni kiriting" 
                   oninput="validateInput(this)">
            <small class="error-msg" style="color: #ef4444; font-size: 0.75rem; display: none; margin-top: 5px;">
                Iltimos, 0 va 100 orasida son kiriting!
            </small>
        `;
        container.appendChild(div);
    }
}

/**
 * Real vaqtda inputni tekshirish (Validation)
 */
function validateInput(input) {
    const val = parseFloat(input.value);
    const errorMsg = input.nextElementSibling;

    // Agar son 0-100 oralig'ida bo'lmasa yoki harf bo'lsa xato beramiz
    if (input.value !== "" && (val < 0 || val > 100 || isNaN(val))) {
        input.classList.add('error'); // CSS-dagi titrash effekti uchun
        errorMsg.style.display = 'block';
    } else {
        input.classList.remove('error');
        errorMsg.style.display = 'none';
    }
}

/**
 * Asosiy hisoblash mantiqi
 */
function calculate() {
    const inputs = document.querySelectorAll('.score-input');
    const resultDiv = document.getElementById('result');
    
    let totalScore = 0;
    let isValid = true;
    let emptyFields = false;

    // Har bir maydonni tekshirib chiqamiz
    inputs.forEach(input => {
        const val = input.value;
        const numVal = parseFloat(val);

        if (val === "") {
            emptyFields = true;
            input.classList.add('error');
            isValid = false;
        } else if (numVal < 0 || numVal > 100 || isNaN(numVal)) {
            isValid = false;
        } else {
            totalScore += numVal;
            input.classList.remove('error');
        }
    });

    // Agar xatolik bo'lsa, hisoblamaymiz
    if (emptyFields) {
        alert("Barcha maydonlarni to'ldiring!");
        return;
    }
    if (!isValid) {
        alert("Ballar noto'g'ri kiritilgan. Iltimos, tekshiring!");
        return;
    }

    const completedCount = inputs.length;
    const average = totalScore / completedCount;
    resultDiv.style.display = 'block';

    if (completedCount === 4) {
        // 4-chorak: Yakuniy xulosa
        if (average >= 60) {
            resultDiv.innerHTML = `
                <p class="highlight" style="color: var(--success)">O'rtacha: ${average.toFixed(1)}</p>
                <p>Tabriklaymiz! Siz maktabda qolasiz. 🎉</p>
            `;
        } else {
            resultDiv.innerHTML = `
                <p class="highlight" style="color: var(--danger)">O'rtacha: ${average.toFixed(1)}</p>
                <p>Afsuski, siz maktabdan haydalasiz. 🚫</p>
            `;
        }
    } else {
        // 1-3 choraklar: Bashorat
        const remainingQuarters = 4 - completedCount;
        const remainingNeeded = 240 - totalScore; // 60 * 4 = 240
        const avgNeeded = remainingNeeded / remainingQuarters;

        if (avgNeeded <= 0) {
            resultDiv.innerHTML = `<p class="highlight" style="color: var(--success)">Siz allaqachon xavfsizsiz! ✅</p><p>Hatto keyingi imtihonlardan 0 olsangiz ham qolasiz.</p>`;
        } else if (avgNeeded > 100) {
            resultDiv.innerHTML = `<p class="highlight" style="color: var(--danger)">Vaziyat kritik! ❌</p><p>Qolgan imtihonlardan 100 ball olsangiz ham o'rtacha 60 chiqmaydi.</p>`;
        } else {
            resultDiv.innerHTML = `
                <p>Hozirgi o'rtacha: <b>${average.toFixed(1)}</b></p>
                <p>Maktabda qolish uchun qolgan ${remainingQuarters} ta chorakda o'rtacha <span class="highlight" style="color: var(--accent)">${avgNeeded.toFixed(1)}</span> ball olishingiz kerak.</p>
            `;
        }
    }
}

// Sahifa yuklanganda dastlabki holatni tayyorlash
document.addEventListener('DOMContentLoaded', generateInputs);
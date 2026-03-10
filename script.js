/**
 * Tanlangan choraklar soniga qarab input maydonlarini yaratadi
 */
function generateInputs() {
    const count = parseInt(document.getElementById('quarters').value);
    const container = document.getElementById('inputs-container');
    const resultDiv = document.getElementById('result');
    
    // Natijani yashirish
    resultDiv.style.display = 'none';
    
    // Konteynerni tozalash
    container.innerHTML = '';
    
    for (let i = 1; i <= count; i++) {
        // Yangi element yaratish
        const div = document.createElement('div');
        div.className = 'input-group';
        div.style.marginTop = '15px'; // Har bir guruh orasida masofa
        
        div.innerHTML = `
            <label>${i}-chorak imtihon natijasi:</label>
            <input type="number" class="score-input" placeholder="0-100" min="0" max="100">
        `;
        
        container.appendChild(div);
    }
}

/**
 * Maktabda qolish uchun zarur bo'lgan ballni hisoblaydi
 */
function calculate() {
    const inputs = document.querySelectorAll('.score-input');
    const resultDiv = document.getElementById('result');
    
    let totalScore = 0;
    let hasEmpty = false;

    // Ballarni yig'ish va tekshirish
    inputs.forEach(input => {
        if (input.value === "") {
            hasEmpty = true;
        }
        totalScore += Number(input.value) || 0;
    });

    if (hasEmpty) {
        alert("Iltimos, barcha chorak ballarini kiriting!");
        return;
    }

    const PASS_AVG = 60;
    const TOTAL_QUARTERS = 4;
    const GOAL_SCORE = PASS_AVG * TOTAL_QUARTERS; // 240
    
    const completedCount = inputs.length;
    const remainingCount = TOTAL_QUARTERS - completedCount;
    const neededScore = GOAL_SCORE - totalScore;
    const avgNeeded = neededScore / remainingCount;

    // Natijani ko'rsatish
    resultDiv.style.display = 'block';

    if (avgNeeded <= 0) {
        resultDiv.innerHTML = "🎉 <span class='highlight'>Tabriklaymiz!</span> Sizda allaqachon yetarli ball bor. Maktabda qolasiz!";
    } else if (avgNeeded > 100) {
        resultDiv.innerHTML = "⚠️ <span style='color: #ef4444;'>Afsuski</span>, qolgan choraklarda hatto 100 ball olsangiz ham yetmaydi.";
    } else {
        resultDiv.innerHTML = `
            Sizga yana jami <span class='highlight'>${neededScore}</span> ball kerak.<br>
            Qolgan ${remainingCount} chorakda o'rtacha <span class='highlight'>${avgNeeded.toFixed(1)}</span> ball olishingiz zarur.
        `;
    }
}

// Sahifa yuklanganda birinchi chorak inputini yaratish
document.addEventListener('DOMContentLoaded', generateInputs);
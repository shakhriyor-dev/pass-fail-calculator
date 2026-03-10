/**
 * Dinamik ravishda choraklar uchun input maydonlarini yaratadi
 */
function generateInputs() {
    const count = document.getElementById('quarters').value;
    const container = document.getElementById('inputs-container');
    container.innerHTML = '';
    
    // Yangi: Grid konteyner qo'shamiz
    const grid = document.createElement('div');
    grid.style.display = 'grid';
    grid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(120px, 1fr))';
    grid.style.gap = '10px';
    grid.style.marginTop = '15px';

    for(let i = 1; i <= count; i++) {
        grid.innerHTML += `
            <div class="input-group">
                <label>${i}-chorak:</label>
                <input type="number" class="score-input" placeholder="0-100" min="0" max="100">
            </div>
        `;
    }
    container.appendChild(grid);
}

/**
 * Maktabda qolish uchun kerakli ballni hisoblaydi
 */
function calculate() {
    const inputs = document.querySelectorAll('.score-input');
    const resultDiv = document.getElementById('result');
    let totalScore = 0;
    
    inputs.forEach(input => {
        totalScore += Number(input.value) || 0;
    });

    const PASS_MARK = 60;
    const TOTAL_QUARTERS = 4;
    const REQUIRED_SUM = PASS_MARK * TOTAL_QUARTERS; // 240
    
    const count = inputs.length;
    const remainingQuarters = TOTAL_QUARTERS - count;
    const remainingNeeded = REQUIRED_SUM - totalScore;
    const avgNeeded = remainingNeeded / remainingQuarters;

    resultDiv.style.display = 'block';

    if (avgNeeded <= 0) {
        resultDiv.innerHTML = "🎉 <span class='highlight'>Tabriklaymiz!</span> Siz allaqachon xavfsizsiz.";
    } else if (avgNeeded > 100) {
        resultDiv.innerHTML = "⚠️ <span style='color: #ef4444;'>Xavfli!</span> Hatto 100 balldan olsangiz ham o'ta olmaysiz.";
    } else {
        resultDiv.innerHTML = `Sizga yana <span class='highlight'>${remainingNeeded}</span> ball kerak.<br>
                               Qolgan choraklarda o'rtacha: <span class='highlight'>${avgNeeded.toFixed(1)}</span>`;
    }
}

// Dastlabki yuklanishda 1-chorak inputini ko'rsatish
window.onload = generateInputs;
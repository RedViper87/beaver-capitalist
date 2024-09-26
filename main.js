// main.js

// Resource counts
let wood = 0;
let stone = 0;
let metal = 0;
let damPower = 0;

// Production rates
let woodRate = 1; // Wood per second
let stoneRate = 0.5; // Stone per second
let metalRate = 0.2; // Metal per second
let damPowerRate = 0;

// Upgrade costs
let damUpgradeCost = 50;
let lumberjackUpgradeCost = 100;
let stoneminerUpgradeCost = 150;
let metalextractorUpgradeCost = 200;
let automatedDamUpgradeCost = 300;

// Upgrade levels
let lumberjackLevel = 0;
let stoneminerLevel = 0;
let metalextractorLevel = 0;
let automatedDamLevel = 0;

// Achievements
const achievements = {
    wood50: false,
    stone30: false,
    metal10: false,
    dam1: false,
    lumberjack1: false
};

// DOM Elements
const woodCountHeaderElem = document.getElementById('wood-count');
const stoneCountHeaderElem = document.getElementById('stone-count');
const metalCountHeaderElem = document.getElementById('metal-count');
const damPowerHeaderElem = document.getElementById('dam-power');

const woodCountDisplayElem = document.getElementById('wood-count-display');
const stoneCountDisplayElem = document.getElementById('stone-count-display');
const metalCountDisplayElem = document.getElementById('metal-count-display');
const damPowerDisplayElem = document.getElementById('dam-power-display');

const woodButton = document.getElementById('wood-button');
const stoneButton = document.getElementById('stone-button');
const metalButton = document.getElementById('metal-button');
const damButton = document.getElementById('dam-button');

const upgradeLumberjack = document.getElementById('upgrade-lumberjack');
const upgradeStoneminer = document.getElementById('upgrade-stoneminer');
const upgradeMetalextractor = document.getElementById('upgrade-metalextractor');
const upgradeAutomatedDams = document.getElementById('upgrade-automated-dams');

// Upgrade Count Elements
const upgradeCounts = document.querySelectorAll('.upgrade-count');

// Achievement Elements
const achWood50 = document.getElementById('ach-wood50');
const achStone30 = document.getElementById('ach-stone30');
const achMetal10 = document.getElementById('ach-metal10');
const achDam1 = document.getElementById('ach-dam1');
const achLumberjack1 = document.getElementById('ach-lumberjack1');

// Utility function to add clicked effect
function addClickedEffect(button) {
    button.classList.add('clicked');
    setTimeout(() => {
        button.classList.remove('clicked');
    }, 200);
}

// Event Listeners
woodButton.addEventListener('click', () => {
    wood += woodRate;
    addClickedEffect(woodButton);
    checkAchievements();
    updateDisplay();
});

stoneButton.addEventListener('click', () => {
    stone += stoneRate;
    addClickedEffect(stoneButton);
    checkAchievements();
    updateDisplay();
});

metalButton.addEventListener('click', () => {
    metal += metalRate;
    addClickedEffect(metalButton);
    checkAchievements();
    updateDisplay();
});

damButton.addEventListener('click', () => {
    if (wood >= damUpgradeCost) {
        wood -= damUpgradeCost;
        damPowerRate += 1;
        damPower += damPowerRate;
        damUpgradeCost = Math.floor(damUpgradeCost * 1.5);
        damButton.textContent = `Upgrade Dam (Cost: ${damUpgradeCost} Wood)`;
        addClickedEffect(damButton);
        checkAchievements();
        updateDisplay();
    }
});

upgradeLumberjack.addEventListener('click', () => {
    if (wood >= lumberjackUpgradeCost) {
        wood -= lumberjackUpgradeCost;
        lumberjackLevel += 1;
        woodRate += 5;
        lumberjackUpgradeCost = Math.floor(lumberjackUpgradeCost * 2);
        upgradeLumberjack.textContent = `Purchase (Cost: ${lumberjackUpgradeCost} Wood)`;
        addClickedEffect(upgradeLumberjack);
        checkAchievements();
        updateDisplay();
    }
});

upgradeStoneminer.addEventListener('click', () => {
    if (wood >= stoneminerUpgradeCost) {
        wood -= stoneminerUpgradeCost;
        stoneminerLevel += 1;
        stoneRate += 2;
        stoneminerUpgradeCost = Math.floor(stoneminerUpgradeCost * 2);
        upgradeStoneminer.textContent = `Purchase (Cost: ${stoneminerUpgradeCost} Wood)`;
        addClickedEffect(upgradeStoneminer);
        checkAchievements();
        updateDisplay();
    }
});

upgradeMetalextractor.addEventListener('click', () => {
    if (wood >= metalextractorUpgradeCost) {
        wood -= metalextractorUpgradeCost;
        metalextractorLevel += 1;
        metalRate += 1;
        metalextractorUpgradeCost = Math.floor(metalextractorUpgradeCost * 2);
        upgradeMetalextractor.textContent = `Purchase (Cost: ${metalextractorUpgradeCost} Wood)`;
        addClickedEffect(upgradeMetalextractor);
        checkAchievements();
        updateDisplay();
    }
});

upgradeAutomatedDams.addEventListener('click', () => {
    if (wood >= automatedDamUpgradeCost) {
        wood -= automatedDamUpgradeCost;
        automatedDamLevel += 1;
        damPowerRate += 10;
        automatedDamUpgradeCost = Math.floor(automatedDamUpgradeCost * 2.5);
        upgradeAutomatedDams.textContent = `Purchase (Cost: ${automatedDamUpgradeCost} Wood)`;
        addClickedEffect(upgradeAutomatedDams);
        checkAchievements();
        updateDisplay();
    }
});

// Update display
function updateDisplay() {
    // Update header counts
    woodCountHeaderElem.textContent = Math.floor(wood);
    stoneCountHeaderElem.textContent = Math.floor(stone);
    metalCountHeaderElem.textContent = Math.floor(metal);
    damPowerHeaderElem.textContent = Math.floor(damPower);

    // Update resource display counts
    woodCountDisplayElem.textContent = Math.floor(wood);
    stoneCountDisplayElem.textContent = Math.floor(stone);
    metalCountDisplayElem.textContent = Math.floor(metal);
    damPowerDisplayElem.textContent = Math.floor(damPower);

    // Update upgrade counts
    const upgradeCountElems = document.querySelectorAll('.upgrade-count');
    upgradeCountElems[0].textContent = `x${lumberjackLevel}`;
    upgradeCountElems[1].textContent = `x${stoneminerLevel}`;
    upgradeCountElems[2].textContent = `x${metalextractorLevel}`;
    upgradeCountElems[3].textContent = `x${automatedDamLevel}`;

    // Enable/Disable buttons based on wood
    damButton.disabled = wood < damUpgradeCost;
    upgradeLumberjack.disabled = wood < lumberjackUpgradeCost;
    upgradeStoneminer.disabled = wood < stoneminerUpgradeCost;
    upgradeMetalextractor.disabled = wood < metalextractorUpgradeCost;
    upgradeAutomatedDams.disabled = wood < automatedDamUpgradeCost;
}

// Achievements
function checkAchievements() {
    // Gathered 50 Wood
    if (!achievements.wood50 && wood >= 50) {
        achievements.wood50 = true;
        achWood50.classList.add('unlocked');
        alert('Achievement Unlocked: Gathered 50 Wood!');
    }

    // Mined 30 Stone
    if (!achievements.stone30 && stone >= 30) {
        achievements.stone30 = true;
        achStone30.classList.add('unlocked');
        alert('Achievement Unlocked: Mined 30 Stone!');
    }

    // Extracted 10 Metal
    if (!achievements.metal10 && metal >= 10) {
        achievements.metal10 = true;
        achMetal10.classList.add('unlocked');
        alert('Achievement Unlocked: Extracted 10 Metal!');
    }

    // Upgraded Dam Once
    if (!achievements.dam1 && damPowerRate >= 1) {
        achievements.dam1 = true;
        achDam1.classList.add('unlocked');
        alert('Achievement Unlocked: Upgraded Dam Once!');
    }

    // Purchased Beaver Lumberjacks
    if (!achievements.lumberjack1 && lumberjackLevel >= 1) {
        achievements.lumberjack1 = true;
        achLumberjack1.classList.add('unlocked');
        alert('Achievement Unlocked: Purchased Beaver Lumberjacks!');
    }
}

// Production loop
setInterval(() => {
    wood += woodRate;
    stone += stoneRate;
    metal += metalRate;
    damPower += damPowerRate;
    updateDisplay();
}, 1000);

// Save and Load
function saveGame() {
    const gameData = {
        wood,
        stone,
        metal,
        damPower,
        woodRate,
        stoneRate,
        metalRate,
        damPowerRate,
        damUpgradeCost,
        lumberjackUpgradeCost,
        stoneminerUpgradeCost,
        metalextractorUpgradeCost,
        automatedDamUpgradeCost,
        lumberjackLevel,
        stoneminerLevel,
        metalextractorLevel,
        automatedDamLevel,
        achievements
    };
    localStorage.setItem('beaverCapitalistSave', JSON.stringify(gameData));
}

function loadGame() {
    const savedData = JSON.parse(localStorage.getItem('beaverCapitalistSave'));
    if (savedData) {
        wood = savedData.wood;
        stone = savedData.stone;
        metal = savedData.metal;
        damPower = savedData.damPower;
        woodRate = savedData.woodRate;
        stoneRate = savedData.stoneRate;
        metalRate = savedData.metalRate;
        damPowerRate = savedData.damPowerRate;
        damUpgradeCost = savedData.damUpgradeCost;
        lumberjackUpgradeCost = savedData.lumberjackUpgradeCost;
        stoneminerUpgradeCost = savedData.stoneminerUpgradeCost;
        metalextractorUpgradeCost = savedData.metalextractorUpgradeCost;
        automatedDamUpgradeCost = savedData.automatedDamUpgradeCost;
        lumberjackLevel = savedData.lumberjackLevel;
        stoneminerLevel = savedData.stoneminerLevel;
        metalextractorLevel = savedData.metalextractorLevel;
        automatedDamLevel = savedData.automatedDamLevel;
        Object.assign(achievements, savedData.achievements);

        // Update achievements UI
        if (achievements.wood50) achWood50.classList.add('unlocked');
        if (achievements.stone30) achStone30.classList.add('unlocked');
        if (achievements.metal10) achMetal10.classList.add('unlocked');
        if (achievements.dam1) achDam1.classList.add('unlocked');
        if (achievements.lumberjack1) achLumberjack1.classList.add('unlocked');
    }
}

// Auto-save every 5 seconds
setInterval(saveGame, 5000);

// Load game on start
loadGame();

// Initial display
updateDisplay();

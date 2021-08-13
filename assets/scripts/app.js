const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 14;
const HEAL_VALUE = 20;

const LOG_EVENT_PLAYER_ATTACK = 'PLAYER_ATTACK';
const LOG_EVENT_PLAYER_STRONG_ATTACK = 'PLAYER_STRONG_ATTACK';
const LOG_EVENT_MONSTER_ATTACK = 'MONSTER_ATTACK';
const LOG_EVENT_PLAYER_HEAL = 'PLAYER_HEAL';
const LOG_EVENT_GAME_OVER = 'GAME_OVER';

const UserMaxHealth = prompt('Enter max health of characters', '100');

let chosenMaxLife = parseInt(UserMaxHealth);
let battleLog = [];

if (isNaN(chosenMaxLife) || chosenMaxLife <= 0) {
    chosenMaxLife = 100;
}

let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;

adjustHealthBars(chosenMaxLife);

function writeToLog(eve, val, monsterHealth, playerHealth) {
    let logEntry = {
        event: eve,
        value: val,
        finalMonsterHealth: monsterHealth,
        finalPlayerHealth: playerHealth
    };

    if (eve === LOG_EVENT_PLAYER_ATTACK) {
        logEntry.target = 'MONSTER';

    } else if (eve === LOG_EVENT_PLAYER_STRONG_ATTACK) {
        logEntry.target = 'MONSTER';

    } else if (eve === LOG_EVENT_MONSTER_ATTACK) {
        logEntry.target = 'PLAYER';

    } else if (eve === LOG_EVENT_PLAYER_HEAL) {

        //HOW THE REST OF THE LOGIC IS MADE
        logEntry = {
            event: eve,
            value: val,
            target: 'PLAYER',
            finalMonsterHealth: monsterHealth,
            finalPlayerHealth: playerHealth

        };
    } else if (eve === LOG_EVENT_GAME_OVER) { }
    battleLog.push(logEntry);
}

function reset() {
    currentMonsterHealth = chosenMaxLife;
    currentPlayerHealth = chosenMaxLife;
    resetGame(chosenMaxLife);
}

function endRound() {
    const initialPlayerHealth = currentPlayerHealth;
    const playerdamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealth -= playerdamage;
    writeToLog(LOG_EVENT_MONSTER_ATTACK, playerdamage, currentMonsterHealth, currentPlayerHealth);

    if (currentPlayerHealth <= 0 && hasBonusLife) {
        hasBonusLife = false;
        removeBonusLife()
        currentPlayerHealth = initialPlayerHealth;
        setPlayerHealth(initialPlayerHealth);
        alert('Bonus life used m8');
    }

    if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
        alert('You Win!');
        writeToLog(LOG_EVENT_GAME_OVER, "YOU WIN", currentMonsterHealth, currentPlayerHealth);
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
        alert('You Lost');
        writeToLog(LOG_EVENT_GAME_OVER, "YOU LOST", currentMonsterHealth, currentPlayerHealth);
    } else if (currentMonsterHealth <= 0 && currentPlayerHealth <= 0) {
        alert('Its a Draw');
        writeToLog(LOG_EVENT_GAME_OVER, "ITS A DRAW", currentMonsterHealth, currentPlayerHealth);
    }
    if (currentPlayerHealth <= 0 || currentMonsterHealth <= 0) {
        reset();
    }
}

function attackMonster(attackType) {
    let damage = attackType === ATTACK_VALUE ? dealMonsterDamage(ATTACK_VALUE) : dealMonsterDamage(STRONG_ATTACK_VALUE);
    let logEvent = attackType === ATTACK_VALUE ? LOG_EVENT_PLAYER_ATTACK : LOG_EVENT_PLAYER_STRONG_ATTACK;
    // if (attackType == ATTACK_VALUE) {
    //     damage = dealMonsterDamage(ATTACK_VALUE);
    //     currentMonsterHealth -= damage;
    //     writeToLog(LOG_EVENT_PLAYER_ATTACK, damage, currentMonsterHealth, currentPlayerHealth);
    // } else if (attackType == STRONG_ATTACK_VALUE) {
    //     damage = dealMonsterDamage(STRONG_ATTACK_VALUE), damage, currentMonsterHealth, currentPlayerHealth;
    //     currentMonsterHealth -= damage;
    //     writeToLog(LOG_EVENT_PLAYER_STRONG_ATTACK, damage, currentMonsterHealth, currentPlayerHealth);
    // }
    currentMonsterHealth -= damage;
    writeToLog(logEvent, damage, currentMonsterHealth, currentPlayerHealth);
    endRound();
}

function attackHandler() {
    attackMonster(ATTACK_VALUE);
}

function strongAttackHandler() {
    attackMonster(STRONG_ATTACK_VALUE);
}

function healPlayerHandler() {
    let healValue;
    if (currentPlayerHealth >= chosenMaxLife - HEAL_VALUE) {
        alert("Bruhhh can't heal more than max health");
        healValue = chosenMaxLife - currentPlayerHealth;
    } else {
        healValue = HEAL_VALUE;
    }
    increasePlayerHealth(healValue);
    currentPlayerHealth += healValue;
    writeToLog(LOG_EVENT_PLAYER_HEAL, healValue, currentMonsterHealth, currentPlayerHealth);
    endRound();
}

function printLogHandler() {
    console.log(battleLog);
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healPlayerHandler);
logBtn.addEventListener('click', printLogHandler);
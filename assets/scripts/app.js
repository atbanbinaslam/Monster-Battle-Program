const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 14;

let chosenMaxLife = 100;
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;

adjustHealthBars(chosenMaxLife);

function attackHandler() {
    const damage = dealMonsterDamage(ATTACK_VALUE);
    const playerdamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentMonsterHealth -= damage;
    currentPlayerHealth -= playerdamage;
    if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
        alert ('You Win!');
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
        alert('You Lost');
    } else if (currentMonsterHealth <= 0 && currentPlayerHealth <= 0) {
        alert ('Its a Draw');
    }
    console.log(currentMonsterHealth);
}

function strongAttackHandler () {
    const damage = dealMonsterDamage(STRONG_ATTACK_VALUE);
    const playerdamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentMonsterHealth -= damage;
    currentPlayerHealth -= playerdamage;
    if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
        alert ('You Win!');
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
        alert('You Lost');
    } else if (currentMonsterHealth <= 0 && currentPlayerHealth <= 0) {
        alert ('Its a Draw');
    }
    console.log(currentMonsterHealth);
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
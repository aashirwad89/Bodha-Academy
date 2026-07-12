// House Sorting and Destiny Generator Algorithm
function calculateDestiny(answers) {
  const { favElement, strength, favSubject, companion, weapon, aura } = answers;

  let scores = {
    Aetherion: 0,
    Ignisaur: 0,
    Terraflora: 0,
    Celestia: 0
  };

  // Element Scores
  if (favElement === 'Lightning' || favElement === 'Moon') scores.Aetherion += 3;
  if (favElement === 'Fire') scores.Ignisaur += 3;
  if (favElement === 'Nature' || favElement === 'Water') scores.Terraflora += 2;
  if (favElement === 'Ice' || favElement === 'Water') scores.Celestia += 2;

  // Strength Scores
  if (strength === 'Curious') scores.Aetherion += 3;
  if (strength === 'Leader') scores.Ignisaur += 3;
  if (strength === 'Patient') scores.Terraflora += 3;
  if (strength === 'Creative') scores.Celestia += 3;
  if (strength === 'Problem Solver') { scores.Terraflora += 2; scores.Aetherion += 1; }
  if (strength === 'Fast Learner') { scores.Ignisaur += 2; scores.Celestia += 1; }

  // Subject Scores
  if (favSubject === 'Ancient Runes') scores.Aetherion += 3;
  if (favSubject === 'Defense' || favSubject === 'Flying') scores.Ignisaur += 3;
  if (favSubject === 'Beast Care' || favSubject === 'Potion Making') scores.Terraflora += 3;
  if (favSubject === 'Spell Crafting') scores.Celestia += 3;

  // Companion Scores
  if (companion === 'Owl' || companion === 'Fox') scores.Aetherion += 2;
  if (companion === 'Dragon' || companion === 'Wolf') scores.Ignisaur += 2;
  if (companion === 'Unicorn') scores.Terraflora += 2;
  if (companion === 'Black Cat') scores.Celestia += 2;

  // Weapon Scores
  if (weapon === 'Crystal Staff' || weapon === 'Spell Book') scores.Aetherion += 2;
  if (weapon === 'Rune Sword') scores.Ignisaur += 2;
  if (weapon === 'Magic Orb' || weapon === 'Magic Wand') scores.Terraflora += 2;
  if (weapon === 'Spell Book' || weapon === 'Magic Orb') scores.Celestia += 2;

  // Aura Scores
  if (aura === 'Purple') scores.Aetherion += 3;
  if (aura === 'Red') scores.Ignisaur += 3;
  if (aura === 'Green') scores.Terraflora += 3;
  if (aura === 'Blue') scores.Celestia += 3;
  if (aura === 'Gold') { scores.Ignisaur += 1; scores.Terraflora += 1; scores.Celestia += 1; }

  // Find max scoring house
  let selectedHouse = 'Aetherion';
  let maxScore = -1;
  for (const house in scores) {
    if (scores[house] > maxScore) {
      maxScore = scores[house];
      selectedHouse = house;
    }
  }

  // Generate Stats dynamically based on house
  let stats = { leadership: 50, wisdom: 50, creativity: 50, bravery: 50 };

  if (selectedHouse === 'Ignisaur') {
    stats.bravery = Math.floor(Math.random() * 15) + 85;     // 85-99
    stats.leadership = Math.floor(Math.random() * 15) + 80;  // 80-94
    stats.wisdom = Math.floor(Math.random() * 20) + 60;      // 60-79
    stats.creativity = Math.floor(Math.random() * 20) + 55;  // 55-74
  } else if (selectedHouse === 'Aetherion') {
    stats.wisdom = Math.floor(Math.random() * 15) + 85;
    stats.creativity = Math.floor(Math.random() * 15) + 75;
    stats.bravery = Math.floor(Math.random() * 20) + 60;
    stats.leadership = Math.floor(Math.random() * 20) + 60;
  } else if (selectedHouse === 'Terraflora') {
    stats.wisdom = Math.floor(Math.random() * 15) + 80;
    stats.leadership = Math.floor(Math.random() * 20) + 60;
    stats.creativity = Math.floor(Math.random() * 15) + 70;
    stats.bravery = Math.floor(Math.random() * 15) + 75;
  } else { // Celestia
    stats.creativity = Math.floor(Math.random() * 15) + 85;
    stats.wisdom = Math.floor(Math.random() * 15) + 80;
    stats.bravery = Math.floor(Math.random() * 25) + 55;
    stats.leadership = Math.floor(Math.random() * 20) + 60;
  }

  // Modifiers based on strength selection
  if (strength === 'Leader') stats.leadership = Math.min(100, stats.leadership + 5);
  if (strength === 'Creative') stats.creativity = Math.min(100, stats.creativity + 5);
  if (strength === 'Curious') stats.wisdom = Math.min(100, stats.wisdom + 5);
  if (strength === 'Problem Solver') stats.wisdom = Math.min(100, stats.wisdom + 5);

  // Magic Power percentage calculation
  let avgStats = (stats.leadership + stats.wisdom + stats.creativity + stats.bravery) / 4;
  let magicPower = Math.min(99, Math.max(70, Math.floor(avgStats + Math.random() * 6 - 3)));

  return {
    house: selectedHouse,
    magicPower,
    stats
  };
}

module.exports = calculateDestiny;

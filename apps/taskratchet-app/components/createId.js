const history = [];

function getId() {
  return Math.floor(100000 + Math.random() * 900000);
}

export default function createId() {
  let num = getId();
  let attempts = 0;
  const maxAttempts = 10;

  while (history.includes(num) && attempts < maxAttempts) {
    num = getId();
    attempts++;
  }

  if (!history.includes(num)) {
    history.push(num);
    return num;
  } else {
    return 'Max attempts reached'; // Max attempts reached, return error or handle the situation accordingly
  }
}

function sockMerchant(n, ar) {
  if (ar.length !== n) {
    console.error(
      'Mismatch in the number of socks and the length of the colors array.',
    );
    return 0;
  }

  let colorCount = {};

  for (let i = 0; i < n; i++) {
    let color = ar[i];
    colorCount[color] = (colorCount[color] || 0) + 1;
  }

  let totalPairs = 0;

  for (let color in colorCount) {
    let pairsForColor = Math.floor(colorCount[color] / 2);
    totalPairs += pairsForColor;
  }

  return totalPairs;
}

function main() {
  // Sample Input
  let n = 9;
  // let ar = [10, 20, 20, 10, 10, 30, 50, 10, 20];
  let ar = [10, 10, 10, 10, 20, 20, 20, 30, 50];

  // Sample Output
  console.log(sockMerchant(n, ar)); // Output: 3
}

main();

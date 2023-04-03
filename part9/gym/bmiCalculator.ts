const calcBmi = (height: number, weight: number): string => {
  const h = height / 100; // Convert height to meters
  const b = weight / (h * h); // Calculate BMI using the correct formula

  if (b < 18.5) {
    return "Underweight";
  } else if (b >= 18.5 && b <= 24.9) {
    return "Normal weight";
  } else if (b >= 25 && b <= 29.9) {
    return "Overweight";
  } else {
    return "Obesity";
  }
};

//const height = Number(process.argv[3]);
//const weight = Number(process.argv[4]);

export default calcBmi;

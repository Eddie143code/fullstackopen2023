interface result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calcEx = (hoursExercise: number[], targetHours: number): result => {
  // Filter out non-numeric values from the input array
  const filteredHoursExercise = hoursExercise.filter((h) => !isNaN(h));

  const periodLength: number = filteredHoursExercise.length;
  const trainingDays = filteredHoursExercise.filter((hour) => hour > 0).length;
  const average =
    filteredHoursExercise.reduce((a, b) => a + b, 0) / periodLength;
  const success = average >= targetHours;
  const rating = success
    ? 1
    : Math.max(2, Math.floor((average - targetHours) / 0.5) + 2);
  const ratingDescription = success
    ? `Wow you succeeded, you have a rating of ${rating}`
    : `not too bad but could be better`;
  const target = targetHours;

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

/*
const input = process.argv.slice(2);
const hoursExercise: number[] = JSON.parse(input[0]);
const targetHours: number = parseFloat(input[1]);

console.log(calcEx(hoursExercise, targetHours)); */

export default calcEx;

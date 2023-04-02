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
  const periodLength: number = hoursExercise.length;
  const trainingDays = hoursExercise.filter((hour) => hour > 0).length;
  const average = hoursExercise.reduce((a, b) => a + b, 0) / periodLength;
  const success = average >= targetHours;
  const rating = success ? 1 : 0;
  const ratingDescription = success
    ? `Wow you succeeded, you have a rating of ${rating}`
    : `Unfortunately, you failed, you have a rating of ${rating}`;
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

console.log(calcEx([3, 0, 2, 4.5, 0, 3, 1], 2));

import dayjs from "dayjs";

export const getRemainingPeriodInMonths = (endDate: Date) => {
  let totalRemainingMonths;
  const currentDateMonth = dayjs().month() + 1;
  const endDateMonth = dayjs(endDate).month() + 1;
  const monthsEachYear = 12;
  const remainingMonthsOfCurrentYear = endDateMonth - currentDateMonth;
  const yearsDifference = dayjs(endDate).year() - dayjs().year();

  // Years that will have all 12 months available.
  const completeYearsAfterCurrentYear =
    endDateMonth === 12 ? yearsDifference : yearsDifference - 1;

  if (yearsDifference > 0 && endDateMonth === 12) {
    totalRemainingMonths =
      remainingMonthsOfCurrentYear +
      monthsEachYear * completeYearsAfterCurrentYear;
  } else if (yearsDifference > 0) {
    totalRemainingMonths =
      remainingMonthsOfCurrentYear +
      monthsEachYear * completeYearsAfterCurrentYear +
      endDateMonth;
  } else {
    totalRemainingMonths = remainingMonthsOfCurrentYear;
  }
  console.log("Months Remaining", totalRemainingMonths);
  return totalRemainingMonths;
};

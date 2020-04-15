const factoriser = (data) => {
  let getFactor;
  if (data.periodType === 'days') {
    getFactor = Math.trunc((data.timeToElapse * 1) / 3);
  } else if (data.periodType === 'weeks') {
    getFactor = Math.tr;
    Math.trunc((data.timeToElapse * 7) / 3);
  } else if (data.periodType === 'months') {
    getFactor = Math.trunc((data.timeToElapse * 30) / 3);
  } else {
    getFactor = 1;
  }
  return getFactor;
};

var impactHBByRT = (data) => {
  const availableBeds = 0.35 * data.totalHospitalBeds;
  const impactHBS = Math.trunc(
    availableBeds - 0.15 * data.reportedCases * 10 * 2 ** factoriser(data)
  );

  return impactHBS;
};

const severeImpactHBByRT = (data) => {
  const availableBeds = 0.35 * data.totalHospitalBeds;
  const severeImpactHBS = Math.trunc(
    availableBeds - 0.15 * data.reportedCases * 50 * 2 ** factoriser(data)
  );

  return severeImpactHBS;
};

const impactDollarsInFlight = (data) => {
  const iDI = Math.trunc(
    (data.reportedCases *
      10 *
      2 ** factoriser(data) *
      0.65 *
      data.region.avgDailyIncomeInUSD) /
      30
  );
  return iDI;
};
const severeImpactDollarsInFlight = (data) => {
  const sIDI = Math.trunc(
    (data.reportedCases *
      50 *
      2 ** factoriser(data) *
      0.65 *
      data.region.avgDailyIncomeInUSD) /
      30
  );
  return sIDI;
};
const covid19ImpactEstimator = (data) => ({
  data,
  impact: {
    currentlyInfected: data.reportedCases * 10,
    infectionsByRequestedTime: data.reportedCases * 10 * 2 ** factoriser(data),
    severeCasesByRequestedTime:
      0.15 * (data.reportedCases * 10 * 2 ** factoriser(data)),
    hospitalBedsByRequestedTime: impactHBByRT(data),
    casesForICUByRequestedTime:
      0.05 * (data.reportedCases * 10 * 2 ** factoriser(data)),
    casesForVentilatorsByRequestedTime:
      0.02 * (data.reportedCases * 10 * 2 ** factoriser(data)),
    dollarsInFlight: impactDollarsInFlight(data)
  },
  severeImpact: {
    currentlyInfected: data.reportedCases * 50,
    infectionsByRequestedTime: data.reportedCases * 50 * 2 ** factoriser(data),
    severeCasesByRequestedTime:
      0.15 * (data.reportedCases * 50 * 2 ** factoriser(data)),
    hospitalBedsByRequestedTime: severeImpactHBByRT(data),
    casesForICUByRequestedTime:
      0.05 * (data.reportedCases * 50 * 2 ** factoriser(data)),
    casesForVentilatorsByRequestedTime:
      0.02 * (data.reportedCases * 50 * 2 ** factoriser(data)),
    dollarsInFlight: severeImpactDollarsInFlight(data)
  }
});

export default covid19ImpactEstimator;

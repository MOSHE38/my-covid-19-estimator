const covid19ImpactEstimator = (data) => {

    const factoriser = (data) => {
        let getFactor;
        if (data.periodType === 'days') {
          getFactor = Math.trunc((data.timeToElapse * 1) / 3);
        } else if (data.periodType === 'weeks') {
          getFactor = Math.trunc((data.timeToElapse * 7) / 3);
        } else if (data.periodType === 'months') {
          getFactor = Math.trunc((data.timeToElapse * 30) / 3);
        } else {
          getFactor = 1;
        }
        return getFactor;
      };
    }; 

export default covid19ImpactEstimator;

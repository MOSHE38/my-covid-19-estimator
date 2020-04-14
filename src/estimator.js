const covid19ImpactEstimator = (data) => {

   const impact = {};
   const severeImpact = {};
   let days;
   if (data.periodType === "days") {
       days = data.timeToElapse;
   } else if (data.periodType === "weeks") {
       days = data.timeToElapse * 7;
   } else  {
       days = data.timeToElapse * 30; 
    };
    return {
        data: input,
        impact:{},
        severeImpact: {}
    }; 
   };


   impact.currentlyInfected = data.reportedCases * 10;
   severeImpact.currentlyInfected = data.reportedCases * 50;
   const value = Math.trunc(2**(days / 3));

   impact.infectionsByRequestedTime = Math.trunc(
       impact.currentlyInfected * 2 ** value
   );
   severeImpact.infectionsByRequestedTime = Math.trunc(
       severeImpact.currentlyInfected * 2 ** value
   );

  

export default covid19ImpactEstimator;

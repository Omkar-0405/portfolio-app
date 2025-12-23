export function getMonthlyReturns(navData) {
  const monthMap = {};

  // Step 1: Get last NAV of each month
  navData.forEach((d) => {
    const year = d.date.getFullYear();
    const month = d.date.getMonth(); // 0-11
    const key = `${year}-${month}`;

    if (!monthMap[key] || d.date > monthMap[key].date) {
      monthMap[key] = d;
    }
  });

  // Step 2: Sort months chronologically
  const monthlyNavs = Object.values(monthMap).sort((a, b) => a.date - b.date);

  // Step 3: Calculate month-on-month returns
  const monthlyReturns = monthlyNavs.map((d, i) => {
    if (i === 0) {
      return { ...d, returnPct: 0 };
    }

    const prev = monthlyNavs[i - 1];
    return {
      ...d,
      returnPct: ((d.nav - prev.nav) / prev.nav) * 100,
    };
  });

  return monthlyReturns;
}

export function groupReturnsByYear(monthlyReturns) {
  const result = {};

  monthlyReturns.forEach((d) => {
    const year = d.date.getFullYear();
    const month = d.date.toLocaleString("default", { month: "short" });

    if (!result[year]) result[year] = {};
    result[year][month] = d.returnPct;
  });

  return result;
}

export function calculateYearlyReturns(monthlyReturns) {
  const yearlyMap = {};

  monthlyReturns.forEach((d) => {
    const year = d.date.getFullYear();

    if (!yearlyMap[year]) {
      yearlyMap[year] = {
        firstNav: d.nav,
        lastNav: d.nav,
      };
    } else {
      yearlyMap[year].lastNav = d.nav;
    }
  });

  const yearlyReturns = {};

  Object.keys(yearlyMap).forEach((year) => {
    const { firstNav, lastNav } = yearlyMap[year];
    yearlyReturns[year] = ((lastNav - firstNav) / firstNav) * 100;
  });

  return yearlyReturns;
}

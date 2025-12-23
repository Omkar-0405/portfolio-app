const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default function MonthlyYearlyReturnsTable({ data }) {
  const { grouped, yearlyReturns } = data;

  return (
    <div className="mt-10">
      <h3 className="py-4 font-semibold text-gray-800">Month-on-Month Returns (%)</h3>

      <div className="bg-white rounded-xl border border-gray-200 overflow-x-auto">
        <table className="min-w-[900px] w-full text-sm border-collapse">
          {/* Table Head */}
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="sticky left-0 z-10 bg-gray-50 px-4 py-3 text-left font-semibold text-gray-600">
                Year
              </th>

              {months.map((m) => (
                <th
                  key={m}
                  className="px-4 py-3 text-left font-semibold text-gray-600 whitespace-nowrap"
                >
                  {m}
                </th>
              ))}

              <th className="px-4 py-3 text-left font-semibold text-gray-600 whitespace-nowrap">
                Total %
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {grouped &&
              Object.keys(grouped)
                .sort()
                .map((year) => (
                  <tr
                    key={year}
                    className="border-b last:border-none hover:bg-gray-50"
                  >
                    {/* Sticky Year Column */}
                    <td className="sticky left-0 bg-white px-4 py-3 font-medium">
                      {year}
                    </td>

                    {months.map((m) => {
                      const value = grouped[year][m];
                      return (
                        <td
                          key={m}
                          className={`px-4 py-3 whitespace-nowrap ${
                            value < 0 ? "text-red-600" : "text-gray-900"
                          }`}
                        >
                          {value !== undefined ? value.toFixed(2) : "-"}
                        </td>
                      );
                    })}

                    <td
                      className={`px-4 py-3 whitespace-nowrap font-medium ${
                        yearlyReturns?.[year] < 0
                          ? "text-red-600"
                          : "text-gray-900"
                      }`}
                    >
                      {yearlyReturns?.[year] !== undefined
                        ? yearlyReturns[year].toFixed(2) + "%"
                        : "-"}
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

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

export default function MonthlyReturnsTable({ data }) {
  const { grouped, yearlyReturns } = data;

  return (
    <div style={{ marginTop: 40 }}>
      <h3 className="p-4"> Monthly Returns (%)</h3>
      <div className="bg-white rounded-xl border border-gray-200 overflow-x-auto">
        <table
          className="min-w-full text-sm"
          border="1"
          cellPadding="6"
          style={{ borderCollapse: "collapse" }}
        >
          <thead className="bg-gray-50 border-b">
            <tr>
              <th
                className={`px-4 py-3 text-left font-semibold text-gray-600 `}
              >
                Year
              </th>
              {months.map((m) => (
                <th
                  className={`px-4 py-3 text-left font-semibold text-gray-600 `}
                  key={m}
                >
                  {m}
                </th>
              ))}
              <th>Total %</th>
            </tr>
          </thead>

          <tbody>
            {grouped &&
              Object.keys(grouped)
                .sort()
                .map((year) => (
                  <tr
                    key={year}
                    className="border-b last:border-none hover:bg-gray-50"
                  >
                    <td className={`px-4 py-3`}>{year}</td>
                    {months.map((m) => (
                      <td key={m}>
                        {grouped[year][m] !== undefined
                          ? grouped[year][m].toFixed(2)
                          : "-"}
                      </td>
                    ))}

                    <td className={`px-4 py-3`}>
                      {yearlyReturns[year]
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

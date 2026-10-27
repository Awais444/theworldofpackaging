/** Two-column specification table with zebra rows (CLAUDE.md §4.4). */
export function SpecTable({ rows, caption }: { rows: Array<{ label: string; value: string }>; caption: string }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-silver-300">
      <table className="w-full border-collapse text-left">
        <caption className="sr-only">{caption}</caption>
        <tbody>
          {rows.map((r) => (
            <tr key={r.label} className="odd:bg-silver-50">
              <th scope="row" className="w-2/5 px-5 py-3.5 align-top text-[15px] font-semibold">
                {r.label}
              </th>
              <td className="px-5 py-3.5 text-[15px] text-ink-500">{r.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

import type { RecordItem } from "../types"

type RecordTableProps = {
  records: RecordItem[]
  selectedId: number | null
  onSelect: (id: number) => void
}

export function RecordTable({ records, selectedId, onSelect }: RecordTableProps) {
  return (
    <section className="rounded border border-slate-300 bg-white p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold">Records</h2>
      </div>

      <div className="max-h-[480px] overflow-auto rounded border border-slate-200">
        <table className="min-w-full border-collapse text-left text-sm">
          <thead className="sticky top-0 bg-slate-100 text-slate-600">
            <tr>
              <th className="border-b border-slate-200 px-3 py-2 font-medium">ID</th>
              <th className="border-b border-slate-200 px-3 py-2 font-medium">Name</th>
              <th className="border-b border-slate-200 px-3 py-2 font-medium">Category</th>
              <th className="border-b border-slate-200 px-3 py-2 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr
                key={record.id}
                className={
                  record.id === selectedId
                    ? "cursor-pointer bg-slate-200"
                    : "cursor-pointer bg-white hover:bg-slate-50"
                }
                onClick={() => onSelect(record.id)}
              >
                <td className="border-b border-slate-200 px-3 py-2">{record.id}</td>
                <td className="border-b border-slate-200 px-3 py-2">{record.name}</td>
                <td className="border-b border-slate-200 px-3 py-2">{record.category}</td>
                <td className="border-b border-slate-200 px-3 py-2">{record.status}</td>
              </tr>
            ))}
            {records.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-3 py-6 text-center text-slate-500">
                  No records available.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </section>
  )
}

import type { RecordInput } from "../types"

type NewRecordPanelProps = {
  draft: RecordInput
  onChange: (field: keyof RecordInput, value: string) => void
  onCreate: () => void
  isSaving: boolean
}

export function NewRecordPanel({ draft, onChange, onCreate, isSaving }: NewRecordPanelProps) {
  return (
    <section className="flex flex-col gap-4 rounded border border-slate-300 bg-white p-4">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold">New Record</h2>
      </div>

      <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
        Name
        <input
          className="rounded border border-slate-300 px-3 py-2 text-sm font-normal text-slate-900 outline-none"
          value={draft.name}
          onChange={(event) => onChange("name", event.target.value)}
        />
      </label>

      <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
        Category
        <input
          className="rounded border border-slate-300 px-3 py-2 text-sm font-normal text-slate-900 outline-none"
          value={draft.category}
          onChange={(event) => onChange("category", event.target.value)}
        />
      </label>

      <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
        Status
        <input
          className="rounded border border-slate-300 px-3 py-2 text-sm font-normal text-slate-900 outline-none"
          value={draft.status}
          onChange={(event) => onChange("status", event.target.value)}
        />
      </label>

      <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
        Description
        <textarea
          className="min-h-32 rounded border border-slate-300 px-3 py-2 text-sm font-normal text-slate-900 outline-none"
          value={draft.description}
          onChange={(event) => onChange("description", event.target.value)}
          rows={5}
        />
      </label>

      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onCreate}
          disabled={isSaving}
          className="rounded border border-slate-300 bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          Create
        </button>
      </div>
    </section>
  )
}

import type { RecordInput, RecordItem } from "../types"

type EditRecordPanelProps = {
  record: RecordItem | null
  onChange: (field: keyof RecordInput, value: string) => void
  onSave: () => void
  onDelete: () => void
  isSaving: boolean
}

export function EditRecordPanel({
  record,
  onChange,
  onSave,
  onDelete,
  isSaving,
}: EditRecordPanelProps) {
  if (!record) {
    return (
      <section className="flex flex-col gap-4 rounded border border-slate-300 bg-white p-4">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-lg font-semibold">Record Details</h2>
        </div>
        <p className="text-sm text-slate-600">Select a record to view and edit its details.</p>
      </section>
    )
  }

  return (
    <section className="flex flex-col gap-4 rounded border border-slate-300 bg-white p-4">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold">Edit Record</h2>
        <span className="text-sm text-slate-500">Record #{record.id}</span>
      </div>

      <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
        Name
        <input
          className="rounded border border-slate-300 px-3 py-2 text-sm font-normal text-slate-900 outline-none"
          value={record.name}
          onChange={(event) => onChange("name", event.target.value)}
        />
      </label>

      <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
        Category
        <input
          className="rounded border border-slate-300 px-3 py-2 text-sm font-normal text-slate-900 outline-none"
          value={record.category}
          onChange={(event) => onChange("category", event.target.value)}
        />
      </label>

      <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
        Status
        <input
          className="rounded border border-slate-300 px-3 py-2 text-sm font-normal text-slate-900 outline-none"
          value={record.status}
          onChange={(event) => onChange("status", event.target.value)}
        />
      </label>

      <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
        Description
        <textarea
          className="min-h-32 rounded border border-slate-300 px-3 py-2 text-sm font-normal text-slate-900 outline-none"
          value={record.description}
          onChange={(event) => onChange("description", event.target.value)}
          rows={5}
        />
      </label>

      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onSave}
          disabled={isSaving}
          className="rounded border border-slate-300 bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          Save
        </button>
        <button
          type="button"
          onClick={onDelete}
          disabled={isSaving}
          className="rounded border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-900 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Delete
        </button>
      </div>
    </section>
  )
}

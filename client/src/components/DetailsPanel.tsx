import type { RecordItem } from "../types"

type DetailsPanelProps = {
  record: RecordItem | null
  onEdit: () => void
  onDelete: () => void
  isSaving: boolean
}

export function DetailsPanel({ record, onEdit, onDelete, isSaving }: DetailsPanelProps) {
  if (!record) {
    return (
      <section className="flex min-h-64 flex-col gap-3 rounded border border-slate-300 bg-white p-4">
        <div>
          <h2 className="text-lg font-semibold">Details</h2>
          <p className="mt-1 text-sm text-slate-600">
            Select a record to view its details, or click New Record to create one.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="flex flex-col gap-4 rounded border border-slate-300 bg-white p-4">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold">Details</h2>
        <span className="text-sm text-slate-500">Record #{record.id}</span>
      </div>

      <div className="grid gap-3 text-sm sm:grid-cols-2">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Name</p>
          <p className="mt-1">{record.name}</p>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Category</p>
          <p className="mt-1">{record.category}</p>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Status</p>
          <p className="mt-1">{record.status}</p>
        </div>
      </div>

      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Description</p>
        <p className="mt-1 whitespace-pre-wrap text-sm">{record.description || "No description"}</p>
      </div>

      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onEdit}
          disabled={isSaving}
          className="rounded border border-slate-300 bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          Edit
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

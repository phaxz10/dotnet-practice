import { useEffect, useMemo, useState } from "react"
import { DetailsPanel } from "./components/DetailsPanel"
import { EditRecordPanel } from "./components/EditRecordPanel"
import { NewRecordPanel } from "./components/NewRecordPanel"
import { RecordTable } from "./components/RecordTable"
import type { RecordInput, RecordItem } from "./types"

const apiUrl = "http://localhost:4000"

const emptyRecord: RecordInput = {
  name: "",
  category: "",
  status: "",
  description: "",
}

type ApiRecord = Omit<RecordItem, "description"> & {
  description: string | null
}

const normalizeRecord = (record: ApiRecord): RecordItem => ({
  ...record,
  description: record.description ?? "",
})

function App() {
  const [records, setRecords] = useState<RecordItem[]>([])
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [editDraft, setEditDraft] = useState<RecordItem | null>(null)
  const [newDraft, setNewDraft] = useState<RecordInput | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  const selectedRecord = useMemo(
    () => records.find((record) => record.id === selectedId) ?? null,
    [records, selectedId],
  )

  useEffect(() => {
    const loadRecords = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch(`${apiUrl}/items`)

        if (!response.ok) {
          throw new Error("Failed to load records.")
        }

        const data = (await response.json()) as ApiRecord[]
        const normalizedRecords = data.map(normalizeRecord)

        setRecords(normalizedRecords)
        setSelectedId((current) => current ?? normalizedRecords[0]?.id ?? null)
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : "Failed to load records.")
      } finally {
        setLoading(false)
      }
    }

    loadRecords()
  }, [])

  const handleSelect = (id: number) => {
    setSelectedId(id)
    setEditDraft(null)
    setNewDraft(null)
  }

  const handleStartNew = () => {
    setEditDraft(null)
    setNewDraft({ ...emptyRecord })
  }

  const handleStartEdit = () => {
    if (!selectedRecord) {
      return
    }

    setNewDraft(null)
    setEditDraft({ ...selectedRecord })
  }

  const handleCancel = () => {
    setEditDraft(null)
    setNewDraft(null)
  }

  const handleEditChange = (field: keyof RecordInput, value: string) => {
    setEditDraft((current) => {
      if (!current) {
        return current
      }

      return {
        ...current,
        [field]: value,
      }
    })
  }

  const handleNewChange = (field: keyof RecordInput, value: string) => {
    setNewDraft((current) => (current ? { ...current, [field]: value } : current))
  }

  const handleSave = async () => {
    if (!editDraft) {
      return
    }

    try {
      setIsSaving(true)
      setError(null)

      const response = await fetch(`${apiUrl}/items/${editDraft.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(editDraft),
      })

      if (!response.ok) {
        throw new Error("Failed to save record.")
      }

      const updatedRecord = normalizeRecord((await response.json()) as ApiRecord)

      setRecords((current) =>
        current.map((record) => (record.id === updatedRecord.id ? updatedRecord : record)),
      )
      setSelectedId(updatedRecord.id)
      setEditDraft(null)
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Failed to save record.")
    } finally {
      setIsSaving(false)
    }
  }

  const handleCreate = async () => {
    if (!newDraft) {
      return
    }

    try {
      setIsSaving(true)
      setError(null)

      const response = await fetch(`${apiUrl}/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(newDraft),
      })

      if (!response.ok) {
        throw new Error("Failed to create record.")
      }

      const createdRecord = normalizeRecord((await response.json()) as ApiRecord)

      setRecords((current) => [...current, createdRecord])
      setSelectedId(createdRecord.id)
      setNewDraft(null)
    } catch (createError) {
      setError(createError instanceof Error ? createError.message : "Failed to create record.")
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!selectedRecord) {
      return
    }

    const confirmed = window.confirm(`Delete ${selectedRecord.name}?`)

    if (!confirmed) {
      return
    }

    try {
      setIsSaving(true)
      setError(null)

      const response = await fetch(`${apiUrl}/items/${selectedRecord.id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete record.")
      }

      setRecords((current) => {
        const nextRecords = current.filter((record) => record.id !== selectedRecord.id)
        setSelectedId(nextRecords[0]?.id ?? null)
        setEditDraft(null)
        setNewDraft(null)

        return nextRecords
      })
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : "Failed to delete record.")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <header className="mb-4 flex flex-col gap-3 rounded border border-slate-300 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Record Manager</h1>
            <p className="mt-1 text-sm text-slate-600">Simple React + C# in-memory record manager.</p>
          </div>
          <button
            type="button"
            onClick={handleStartNew}
            className="rounded border border-slate-300 bg-slate-900 px-4 py-2 text-sm font-medium text-white"
          >
            New Record
          </button>
        </header>

        {error ? (
          <p className="mb-4 rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
        ) : null}
        {loading ? (
          <p className="mb-4 rounded border border-slate-300 bg-white px-3 py-2 text-sm text-slate-600">Loading records...</p>
        ) : null}

        <div className="grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(320px,1fr)]">
          <RecordTable
            records={records}
            selectedId={selectedId}
            onSelect={handleSelect}
          />

          {newDraft ? (
            <NewRecordPanel
              draft={newDraft}
              onChange={handleNewChange}
              onCreate={handleCreate}
              onCancel={handleCancel}
              isSaving={isSaving}
            />
          ) : editDraft ? (
            <EditRecordPanel
              record={editDraft}
              onChange={handleEditChange}
              onSave={handleSave}
              onCancel={handleCancel}
              isSaving={isSaving}
            />
          ) : (
            <DetailsPanel
              record={selectedRecord}
              onEdit={handleStartEdit}
              onDelete={handleDelete}
              isSaving={isSaving}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default App

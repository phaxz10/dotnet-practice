export type RecordItem = {
  id: number
  name: string
  category: string
  status: string
  description: string
}

export type RecordInput = Omit<RecordItem, "id">

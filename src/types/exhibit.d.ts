export interface Exhibit {
  id: string
  name: string
  modelPath: string
  description: string
  thumbnail: string
  yearCreated: string
  creator: string
  details: string[]
  favorite?: boolean
}

export interface ExhibitState {
  exhibits: Exhibit[]
  currentExhibit: Exhibit | null
  loading: boolean
  error: string | null
} 
export type ModelOption = 'grok-4-fast-reasoning'

export const DEFAULT_MODEL: ModelOption = 'grok-4-fast-reasoning'

export const DEFAULT_MODEL: ModelOption = 'gpt-4o-mini'

export const MODEL_OPTIONS: { value: ModelOption; label: string; description: string }[] = [
  {
    value: 'grok-4-fast-reasoning',
    label: 'Grok 4.1 Fast',
    description: "xAI's fast reasoning model",
  },
]

export type ModelOption =
  | 'grok-4-fast'
  | 'grok-4-fast-reasoning'
  | 'grok-4-fast-non-reasoning'
  | 'gpt-4o'
  | 'gpt-4o-mini'

export const MODEL_OPTIONS: { value: ModelOption; label: string; description: string }[] = [
  {
    value: 'gpt-4o',
    label: 'GPT-4o',
    description: "OpenAI's flagship multimodal model",
  },
  {
    value: 'gpt-4o-mini',
    label: 'GPT-4o Mini',
    description: 'Fast & cost-efficient',
  },
  {
    value: 'grok-4-fast',
    label: 'Grok 4 Fast',
    description: 'Latest Grok model - fast & capable',
  },
  {
    value: 'grok-4-fast-reasoning',
    label: 'Grok 4 Reasoning',
    description: 'Deep reasoning & complex problem-solving',
  },
  {
    value: 'grok-4-fast-non-reasoning',
    label: 'Grok 4 Speed',
    description: 'Optimized for speed & straightforward queries',
  },
]

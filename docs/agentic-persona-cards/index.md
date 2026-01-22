# Agentic Persona Cards

The Flow App uses a specialized structure for defining AI agent personalities, based on the `chara_card_v2` specification. This allows for rich, nuanced interactions and consistent behavior across different models.

## 📇 Data Structure

Each agent card contains a `characterCard` object that follows the `chara_card_v2` standard with custom extensions for the Flow platform (`2_v_dc`).

### Core Fields

| Field | Description |
|-------|-------------|
| `name` | The persona's name. |
| `description` | A high-level summary of who the agent is. |
| `persona` | Deep psychological and background traits. |
| `scenario` | The specific context or setting the agent exists in. |
| `first_mes` | The opening message the agent sends to start a chat. |
| `mes_example` | Examples of how the agent speaks and reacts. |
| `system_prompt` | The primary instruction set sent to the LLM. |
| `creator_notes`| Additional implementation details or tips for the user. |

### Extensions (`2_v_dc`)

Flow-specific additions include:
- **`gender`**: Explicit gender identity for better model alignment.
- **`hook`**: A catchy "one-liner" shown on the card preview.
- **`instructions`**: Simplified system instructions for specific tools.
- **`langTranslation`**: Support for multi-language persona definitions.

## 🎨 UI Implementation

The **Master-Detail View** in the `/agents` page is designed to showcase these fields in a clean, glassmorphic layout.

1. **Selection**: Clicking an agent card triggers a layout transition.
2. **Compact List**: The agent list slides to the left into a single-column "Master" view.
3. **Details Pane**: A rich, scrollable "Detail" pane appears on the right, rendering the persona data.
4. **Copy to Clipboard**: Quick actions allow developers to copy prompts and messages for testing.

## 🛠️ Service Integration

Persona data is managed via the `agent-service.ts` which communicates with a MongoDB backend using a flexible operation wrapper.

```typescript
// Fetching a specific agent with its persona data
const agent = await fetchAgentCardById(id);
```

---

> [!TIP]
> When creating new agents, focus on the `mes_example` and `system_prompt` to ensure the most consistent "character" experience.

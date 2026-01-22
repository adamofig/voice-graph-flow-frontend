import { IAgentCard } from "@/types/agent";

const API_URL = "https://template-node.dataclouder.dev/api/agent-cards/operation";

// OPERATION is a mongo wrapper to make every call to the database through a single endpoint.
//   Allows executing a variety of database operations through a single endpoint.
//   Supported actions: 'findOne', 'find', 'create', 'updateOne', 'updateMany', 'deleteOne', 'deleteMany', 'aggregate'.
//   - For 'find' and 'findOne', use 'query', 'projection', and 'options'.
//   - For 'create', use 'payload'.
//   - For 'update' and 'delete', use 'query' and 'payload' (for updates).
//   - For 'aggregate', use 'payload' for the aggregation pipeline array.
// Example: 
// {
//   "action": "updateOne",
//   "query": {
//     "phoneNumber": "123-456-7890"
//   },
//   "payload": {
//     "$set": {
//       "status": "inactive"
//     }
//   },
//   "projection": {
//     "name": 1,
//     "email": 1
//   },
//   "options": {
//     "limit": 10,
//     "sort": {
//       "createdAt": -1
//     }
//   }
// }

export async function fetchAgentCards(): Promise<IAgentCard[]> {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                action: "find",
                query: {},
                options: {
                    limit: 20,
                    sort: { createdAt: -1 }
                }
            }),
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch agent cards: ${response.statusText}`);
        }

        const data = await response.json();
        // Assuming the structure returns the list directly or in a results field.
        // Based on common mongo wrappers, it might be in 'data' or the root.
        return data;
    } catch (error) {
        console.error("Error fetching agent cards:", error);
        return [];
    }
}
export async function updateAgentCard(id: string, payload: Partial<IAgentCard>): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                action: "updateOne",
                query: { _id: id },
                payload: {
                    "$set": payload
                }
            }),
        });

        if (!response.ok) {
            throw new Error(`Failed to update agent card: ${response.statusText}`);
        }

        const data = await response.json();
        return { success: true, data };
    } catch (error) {
        console.error("Error updating agent card:", error);
        return { success: false, error: error instanceof Error ? error.message : String(error) };
    }
}

export async function fetchAgentCardById(id: string): Promise<IAgentCard | null> {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                action: "findOne",
                query: { _id: id }
            }),
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch agent card: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching agent card:", error);
        return null;
    }
}

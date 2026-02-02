import clientPromise from './mongodb';

export interface VectorDataItem {
    id: string;
    text: string;
}

export async function getVectorData(): Promise<VectorDataItem[]> {
    try {
        const client = await clientPromise;
        const db = client.db('voice_graph_flow');

        const data = await db
            .collection('vectorData')
            .find({})
            .project({ _id: 1, text: 1, id: 1 }) // Projecting id if it exists, and _id
            .toArray();

        return data.map((item) => ({
            id: item.id || item._id.toString(),
            text: item.text || '',
        }));
    } catch (error) {
        console.error('Error fetching vector data from MongoDB:', error);
        throw error;
    }
}
export interface UniqueFile {
    filename: string;
    mimetype: string;
    binaryHash: string;
    chunkCount: number;
}

export async function getUniqueFiles(): Promise<UniqueFile[]> {
    try {
        const client = await clientPromise;
        const db = client.db('voice_graph_flow');

        // Aggregation to find unique origins
        const pipeline = [
            {
                $group: {
                    _id: {
                        binary_hash: "$metadata.origin.binary_hash",
                        filename: "$metadata.origin.filename"
                    },
                    mimetype: { $first: "$metadata.origin.mimetype" },
                    chunkCount: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    filename: "$_id.filename",
                    binaryHash: { $toString: "$_id.binary_hash" },
                    mimetype: 1,
                    chunkCount: 1
                }
            },
            { $sort: { filename: 1 } }
        ];

        const files = await db
            .collection('vectorData')
            .aggregate(pipeline)
            .toArray();

        return files as UniqueFile[];
    } catch (error) {
        console.error('Error fetching unique files from MongoDB:', error);
        throw error;
    }
}

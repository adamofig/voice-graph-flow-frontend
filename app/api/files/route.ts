import { route, routeOperation, TypedNextResponse } from 'next-rest-framework';
import { z } from 'zod';
import { getUniqueFiles } from '@/lib/vector-service';

const uniqueFileSchema = z.object({
    filename: z.string(),
    mimetype: z.string(),
    binaryHash: z.string(),
    chunkCount: z.number()
});

export const { GET } = route({
    getUniqueFiles: routeOperation({
        method: 'GET'
    })
        .outputs([
            {
                status: 200,
                contentType: 'application/json',
                body: z.object({
                    success: z.boolean(),
                    count: z.number(),
                    data: z.array(uniqueFileSchema)
                }),
                bodySchema: {
                    type: 'object',
                    properties: {
                        success: { type: 'boolean' },
                        count: { type: 'number' },
                        data: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    filename: { type: 'string' },
                                    mimetype: { type: 'string' },
                                    binaryHash: { type: 'string' },
                                    chunkCount: { type: 'number' }
                                },
                                required: ['filename', 'mimetype', 'binaryHash', 'chunkCount']
                            }
                        }
                    },
                    required: ['success', 'count', 'data']
                }
            },
            {
                status: 500,
                contentType: 'application/json',
                body: z.object({
                    success: z.boolean(),
                    error: z.string()
                }),
                bodySchema: {
                    type: 'object',
                    properties: {
                        success: { type: 'boolean' },
                        error: { type: 'string' }
                    },
                    required: ['success', 'error']
                }
            }
        ])
        .handler(async () => {
            try {
                const data = await getUniqueFiles();
                return TypedNextResponse.json({
                    success: true,
                    count: data.length,
                    data: data
                }, { status: 200 });
            } catch (error: any) {
                return TypedNextResponse.json({
                    success: false,
                    error: error.message
                }, { status: 500 });
            }
        })
});

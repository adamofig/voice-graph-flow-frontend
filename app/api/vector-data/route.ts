import { route, routeOperation, TypedNextResponse } from 'next-rest-framework';
import { z } from 'zod';
import { getVectorData } from '@/lib/vector-service';

const vectorDataItemSchema = z.object({
    id: z.string(),
    text: z.string()
});

export const { GET } = route({
    getVectorData: routeOperation({
        method: 'GET'
    })
        .outputs([
            {
                status: 200,
                contentType: 'application/json',
                body: z.object({
                    success: z.boolean(),
                    count: z.number(),
                    data: z.array(vectorDataItemSchema)
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
                                    id: { type: 'string' },
                                    text: { type: 'string' }
                                },
                                required: ['id', 'text']
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
                const data = await getVectorData();
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


import { docsRoute } from 'next-rest-framework';

export const { GET } = docsRoute({
    deniedPaths: [
        '/api/chat',
        '/api/posts',
        '/api/upload'
    ],
    openApiObject: {
        info: {
            title: 'Voice Graph Flow API',
            version: '1.0.0',
            description: 'API documentation for Voice Graph Flow project.'
        }
    },
    docsConfig: {
        provider: 'swagger-ui',
        title: 'Voice Graph Flow API Docs'
    }
});

export interface UserData {
    _id: string;
    id: string;
    email: string;
    urlPicture: string;
    authStrategy: string;
    personalData: {
        firstname: string;
    };
    claims: {
        plan: {
            type: "premium" | "free" | string;
            exp: number | null;
        };
        permissions: Record<string, any>;
        roles: {
            admin: boolean | null;
        };
    };
    settings: {
        conversation: {
            assistantMessageTask: boolean;
            autoTranslate: boolean;
            fixGrammar: boolean;
            highlightWords: boolean;
            model: {
                id: string;
                modelName: string;
                provider: string;
                quality: string;
            };
            realTime: boolean;
            repeatRecording: boolean;
            speed: string;
            superHearing: boolean;
            synthVoice: boolean;
            userMessageTask: boolean;
            voice: string;
        };
    };
    __v: number;
}

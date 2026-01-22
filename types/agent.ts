export interface IAIModel {
    name: string;
    provider: string;
}

export interface IConversationSettings {
    temperature?: number;
    maxTokens?: number;
}

export interface IAccounts {
    provider: string;
    accountId: string;
}

export interface IConversationFlow {
    steps?: any[];
}

export interface VoiceCloning {
    provider: string;
    voiceId: string;
}

export interface IExtensionable {
    [key: string]: any;
}

export interface BasicStorage {
    url: string;
}
export interface FileStorageData extends BasicStorage {
    name?: string; // File name in storage, e.g., 'report.pdf'
    type?: string; // MIME type, e.g., 'application/pdf'
    size?: number; // File size in bytes
    metadata?: any;
}

export interface IAssetable {
    image?: BasicStorage;
    banner?: BasicStorage;
    motion?: FileStorageData;
    stickers?: FileStorageData[];
    motions?: FileStorageData[];
}
export interface ILearnable {
    [key: string]: any;
}

export interface IAuditable {
    [key: string]: any;
}

export interface IManageable {
    [key: string]: any;
}

export interface IReactable {
    [key: string]: any;
}

export interface IDataTranslation {
    [key: string]: any;
}

export interface MultiLanguage {
    [key: string]: string;
}

export interface Persona {
    description?: string;
}

export interface CharacterCardData {
    name: string;
    description: string;
    appearance?: string;
    scenario?: string;
    first_mes?: string;
    mes_example?: string;
    creator_notes?: string;
    tags?: string[];
    system_prompt?: string;
    post_history_instructions?: string;
    character_version?: string;
    extensions?: Record<string, any>;
    greetings?: string[];
    gender: string;
    hook: string;
    instructions: string;
    langTranslation?: MultiLanguage;
    persona?: Persona;
}

export interface ICharacterCardDC {
    spec: 'chara_card_v2';
    spec_version: '2_v_dc';
    data: CharacterCardData;
}

export interface IAgentCard {
    version: string;
    _id?: string;
    id?: string;
    title?: string;
    name?: string;
    description?: string;
    agentType?: string;
    lang?: string;
    model?: IAIModel;
    characterCard?: ICharacterCardDC;
    conversationSettings?: IConversationSettings;
    accounts?: Array<IAccounts>;
    conversationFlow?: IConversationFlow;
    voiceCloning?: VoiceCloning;
    extensions: IExtensionable;
    assets: IAssetable;
    learnable: ILearnable;
    auditable: IAuditable;
    manageable: IManageable;
    reactions: IReactable;
    langTranslation: IDataTranslation;
}

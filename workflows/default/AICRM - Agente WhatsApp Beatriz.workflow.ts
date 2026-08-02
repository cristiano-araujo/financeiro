import { workflow, node, links } from '@n8n-as-code/transformer';

// <workflow-map>
// Workflow : AICRM - Agente WhatsApp Beatriz
// Nodes   : 9  |  Connections: 6
//
// NODE INDEX
// ──────────────────────────────────────────────────────────────────
// Property name                    Node type (short)         Flags
// WahaWebhook                        webhook
// IgnoreGroups                       if
// GetAiPersonality                   supabase                   [creds]
// AiAgent                            agent                      [AI]
// GroqModel                          lmChatGroq                 [creds] [ai_languageModel]
// Memory                             memoryBufferWindow         [ai_memory]
// SendWahaMessage                    httpRequest
// SaveClient                         supabase                   [creds]
// SaveConversation                   supabase                   [creds]
//
// ROUTING MAP
// ──────────────────────────────────────────────────────────────────
// WahaWebhook
//    → IgnoreGroups
//      → GetAiPersonality
//        → AiAgent
//          → SaveClient
//            → SaveConversation
//              → SendWahaMessage
//
// AI CONNECTIONS
// AiAgent.uses({ ai_languageModel: GroqModel, ai_memory: Memory })
// </workflow-map>

// =====================================================================
// METADATA DU WORKFLOW
// =====================================================================

@workflow({
    id: 'Z1cUWl0tQKvf3kSh',
    name: 'AICRM - Agente WhatsApp Beatriz',
    active: true,
    isArchived: false,
    projectId: '843sb0dwljbzp3e5',
    settings: { executionOrder: 'v1', binaryMode: 'separate' },
})
export class AicrmAgenteWhatsappBeatrizWorkflow {
    // =====================================================================
    // CONFIGURATION DES NOEUDS
    // =====================================================================

    @node({
        id: '3577f849-456a-4058-9d9f-6d74124609be',
        webhookId: 'b5b155f6-88ed-45db-86ea-852d13ad9744',
        name: 'Waha Webhook',
        type: 'n8n-nodes-base.webhook',
        version: 1,
        position: [-240, -96],
    })
    WahaWebhook = {
        httpMethod: 'POST',
        path: 'aicrm-waha-webhook',
        responseMode: 'lastNode',
        options: {},
    };

    @node({
        id: 'ae97ad16-7e5c-454a-b8b8-ea104bd03a7c',
        name: 'Ignore Groups',
        type: 'n8n-nodes-base.if',
        version: 2.2,
        position: [32, -80],
    })
    IgnoreGroups = {
        conditions: {
            options: {
                caseSensitive: true,
                leftValue: '',
                typeValidation: 'strict',
                version: 2,
            },
            conditions: [
                {
                    id: '50849e0d-da30-4d02-b404-363bb8a6ac1b',
                    leftValue: '={{ $json.body.event }}',
                    rightValue: 'message',
                    operator: {
                        type: 'string',
                        operation: 'equals',
                    },
                },
                {
                    id: 'ac7dace3-d009-460e-bd12-8839e07b7190',
                    leftValue: '={{ $json.body.payload.from }}',
                    rightValue: '@g.us',
                    operator: {
                        type: 'string',
                        operation: 'notEndsWith',
                    },
                },
            ],
            combinator: 'and',
        },
        options: {},
    };

    @node({
        id: 'fd4e3052-ef8e-4d4d-87b8-b0ddd8b6b588',
        name: 'Get AI Personality',
        type: 'n8n-nodes-base.supabase',
        version: 1,
        position: [304, -80],
        credentials: { supabaseApi: { id: 'JGCNengbH2tUqr5r', name: 'Supabase account' } },
    })
    GetAiPersonality = {
        operation: 'get',
        tableId: 'businesses',
        filters: {
            conditions: [
                {
                    keyName: 'id',
                    keyValue: '74888888-4444-4444-4444-888888888888',
                },
            ],
        },
    };

    @node({
        id: '45fc3b04-9102-4653-9e23-179345ad1cdf',
        name: 'AI Agent',
        type: '@n8n/n8n-nodes-langchain.agent',
        version: 1.7,
        position: [512, -80],
    })
    AiAgent = {
        promptType: 'define',
        text: '={{ $("Waha Webhook").item.json.body.payload.body }}',
        options: {
            systemMessage: '={{ $node["Get AI Personality"].json.ai_personality }}',
        },
    };

    @node({
        id: '483c440a-1786-409b-834d-6cef248241e3',
        name: 'Groq Model',
        type: '@n8n/n8n-nodes-langchain.lmChatGroq',
        version: 1,
        position: [416, 128],
        credentials: { groqApi: { id: '4XklXkiOFw8srNtT', name: 'Groq account' } },
    })
    GroqModel = {
        model: 'llama-3.1-8b-instant',
        options: {},
    };

    @node({
        id: 'bad80657-960d-4ca6-91a2-b4d149922bfd',
        name: 'Memory',
        type: '@n8n/n8n-nodes-langchain.memoryBufferWindow',
        version: 1.2,
        position: [560, 144],
    })
    Memory = {
        sessionIdType: 'customKey',
        sessionKey: '={{ $("Waha Webhook").item.json.body.payload.from }}',
        contextWindowLength: 10,
    };

    @node({
        id: 'b7766c26-12f5-4026-9a11-6abe3c462a31',
        name: 'Send WAHA Message',
        type: 'n8n-nodes-base.httpRequest',
        version: 4.2,
        position: [1200, -80],
    })
    SendWahaMessage = {
        method: 'POST',
        url: 'http://147.15.71.9:3000/api/sendText',
        sendHeaders: true,
        headerParameters: {
            parameters: [
                {
                    name: 'X-Api-Key',
                    value: 'dqPHaBVLjzjJtSzL6owWTcPZm8NpG2qnlQ1seHLqnEVlrwXd',
                },
            ],
        },
        sendBody: true,
        specifyBody: 'json',
        jsonBody: `={
  "chatId": "{{ $('Waha Webhook').item.json.body.payload.from }}",
  "text": "{{ $json.output.replace(/\\n/g, '\\\\n').replace(/"/g, '\\\\"') }}",
  "session": "default"
}`,
        options: {},
    };

    @node({
        id: 'aec38a43-4a00-4a89-b0c9-103d9395bd1a',
        name: 'Save Client',
        type: 'n8n-nodes-base.supabase',
        version: 1,
        position: [816, -80],
        credentials: { supabaseApi: { id: 'w2l96OMtbI5wv2n2', name: 'Supabase account 2' } },
    })
    SaveClient = {
        useCustomSchema: true,
        tableId: 'clients',
        fieldsUi: {
            fieldValues: [
                {
                    fieldId: 'business_id',
                    fieldValue: '74888888-4444-4444-4444-888888888888',
                },
                {
                    fieldId: 'phone',
                    fieldValue: "={{ $('Waha Webhook').item.json.body.payload.from }}",
                },
                {
                    fieldId: 'name',
                    fieldValue: "={{ $('Waha Webhook').item.json.body.payload.pushName ?? 'Cliente WhatsApp' }}",
                },
            ],
        },
    };

    @node({
        id: '77152e7e-a559-4338-8534-06a5e2d339a4',
        name: 'Save Conversation',
        type: 'n8n-nodes-base.supabase',
        version: 1,
        position: [992, -80],
        credentials: { supabaseApi: { id: 'w2l96OMtbI5wv2n2', name: 'Supabase account 2' } },
    })
    SaveConversation = {
        tableId: 'conversations',
        fieldsUi: {
            fieldValues: [
                {
                    fieldId: 'business_id',
                    fieldValue: '74888888-4444-4444-4444-888888888888',
                },
                {
                    fieldId: 'phone',
                    fieldValue: "={{ $('Waha Webhook').item.json.body.payload.from }}",
                },
                {
                    fieldId: 'message',
                    fieldValue: "={{ $('Waha Webhook').item.json.body.payload.body }}",
                },
                {
                    fieldId: 'response',
                    fieldValue: "={{ $('AI Agent').item.json.output }}",
                },
                {
                    fieldId: 'status',
                    fieldValue: 'active',
                },
            ],
        },
    };

    // =====================================================================
    // ROUTAGE ET CONNEXIONS
    // =====================================================================

    @links()
    defineRouting() {
        this.IgnoreGroups.out(0).to(this.GetAiPersonality.in(0));
        this.GetAiPersonality.out(0).to(this.AiAgent.in(0));
        this.AiAgent.out(0).to(this.SaveClient.in(0));
        this.WahaWebhook.out(0).to(this.IgnoreGroups.in(0));
        this.SaveClient.out(0).to(this.SaveConversation.in(0));
        this.SaveConversation.out(0).to(this.SendWahaMessage.in(0));

        this.AiAgent.uses({
            ai_languageModel: this.GroqModel.output,
            ai_memory: this.Memory.output,
        });
    }
}

import { workflow, node, links } from '@n8n-as-code/transformer';

// <workflow-map>
// Workflow : AICRM - Agente WhatsApp Beatriz
// Nodes   : 7  |  Connections: 4
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
//
// ROUTING MAP
// ──────────────────────────────────────────────────────────────────
// WahaWebhook
//    → IgnoreGroups
//      → GetAiPersonality
//        → AiAgent
//          → SendWahaMessage
//
// AI CONNECTIONS
// AiAgent.uses({ ai_languageModel: GroqModel, ai_memory: Memory })
// </workflow-map>

// =====================================================================
// METADATA DU WORKFLOW
// =====================================================================

@workflow({
    id: 'JgIFKMvBCUdYGiYn',
    name: 'AICRM - Agente WhatsApp Beatriz',
    active: true,
    isArchived: false,
    settings: {
        saveManualExecutions: true,
        saveExecutionProgress: true,
        callerPolicy: 'workflowsFromSameOwner',
        executionOrder: 'v1',
        binaryMode: 'separate',
    },
})
export class AicrmAgenteWhatsappBeatrizWorkflow {
    // =====================================================================
    // CONFIGURATION DES NOEUDS
    // =====================================================================

    @node({
        id: 'bc88f3ea-227c-409b-9c57-4b6f0a6a0f9c',
        webhookId: 'b5b155f6-88ed-45db-86ea-852d13ad9744',
        name: 'Waha Webhook',
        type: 'n8n-nodes-base.webhook',
        version: 1,
        position: [0, 0],
    })
    WahaWebhook = {
        httpMethod: 'POST',
        path: 'aicrm-waha-webhook',
        options: {},
    };

    @node({
        id: 'new-ignore-groups-node',
        name: 'Ignore Groups',
        type: 'n8n-nodes-base.if',
        version: 1,
        position: [200, 0],
    })
    IgnoreGroups = {
        conditions: {
            string: [
                {
                    value1: '={{ $json.body.event }}',
                    operation: 'equal',
                    value2: 'message',
                },
                {
                    value1: "={{ $json.body.payload?.from || '' }}",
                    operation: 'notEndsWith',
                    value2: '@g.us',
                },
            ],
        },
    };

    @node({
        id: 'cc1151ea-f843-4929-a227-9a23e5b42013',
        name: 'Get AI Personality',
        type: 'n8n-nodes-base.supabase',
        version: 1,
        position: [400, 0],
        credentials: { supabaseApi: { id: 'tDU4ywoMnLLa7Vfq', name: 'Supabase account' } },
    })
    GetAiPersonality = {
        operation: 'get',
        tableId: 'businesses',
        filterType: 'manual',
        matchType: 'allFilters',
        filters: {
            conditions: [
                {
                    keyName: 'id',
                    condition: 'eq',
                    keyValue: '74888888-4444-4444-4444-888888888888',
                },
            ],
        },
    };

    @node({
        id: '377b6557-9468-4d4a-8363-c8f0d9db1f60',
        name: 'AI Agent',
        type: '@n8n/n8n-nodes-langchain.agent',
        version: 1.7,
        position: [600, 0],
    })
    AiAgent = {
        promptType: 'define',
        text: '={{ $("Waha Webhook").item.json.body.payload.body }}',
        options: {
            systemMessage: '={{ $node["Get AI Personality"].json.ai_personality }}',
        },
    };

    @node({
        id: '41b51937-7f93-40cb-a29e-f28ef136d1e0',
        name: 'Groq Model',
        type: '@n8n/n8n-nodes-langchain.lmChatGroq',
        version: 1,
        position: [500, 208],
        credentials: { groqApi: { id: 'WIyQB5s7X3ECnHX6', name: 'Groq account 2' } },
    })
    GroqModel = {
        model: 'llama-3.3-70b-versatile',
        options: {},
    };

    @node({
        id: 'b7c089d1-2e9f-4dfd-9942-e879317cd32a',
        name: 'Memory',
        type: '@n8n/n8n-nodes-langchain.memoryBufferWindow',
        version: 1.2,
        position: [650, 224],
    })
    Memory = {
        sessionIdType: 'customKey',
        sessionKey: '={{ $("Waha Webhook").item.json.body.payload.from }}',
        contextWindowLength: 10,
    };

    @node({
        id: 'f2cb577d-7eb9-440b-81c5-f46213f14c45',
        name: 'Send WAHA Message',
        type: 'n8n-nodes-base.httpRequest',
        version: 4.2,
        position: [850, 0],
    })
    SendWahaMessage = {
        method: 'POST',
        url: 'http://waha:3000/api/sendText',
        sendBody: true,
        contentType: 'json',
        bodyParameters: {
            parameters: [
                {
                    name: 'chatId',
                    value: "={{ $('Waha Webhook').item.json.body.payload.from }}",
                },
                {
                    name: 'text',
                    value: '={{ $json.output }}',
                },
                {
                    name: 'session',
                    value: 'default',
                },
            ],
        },
        options: {},
    };

    // =====================================================================
    // ROUTAGE ET CONNEXIONS
    // =====================================================================

    @links()
    defineRouting() {
        this.WahaWebhook.out(0).to(this.IgnoreGroups.in(0));
        this.IgnoreGroups.out(0).to(this.GetAiPersonality.in(0));
        this.GetAiPersonality.out(0).to(this.AiAgent.in(0));
        this.AiAgent.out(0).to(this.SendWahaMessage.in(0));

        this.AiAgent.uses({
            ai_languageModel: this.GroqModel.output,
            ai_memory: this.Memory.output,
        });
    }
}

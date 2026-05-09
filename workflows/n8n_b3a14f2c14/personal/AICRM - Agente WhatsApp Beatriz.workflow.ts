import { workflow, node, links } from '@n8n-as-code/transformer';

// <workflow-map>
// Workflow : AICRM - Agente WhatsApp Beatriz
// Nodes   : 7  |  Connections: 3
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
// IgnoreGroups
//    → GetAiPersonality
//      → AiAgent
//        → SendWahaMessage
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
                version: 2,
                leftValue: '',
                caseSensitive: true,
                typeValidation: 'loose',
            },
            combinator: 'and',
            string: [
                {
                    value1: '={{ $json.body.event }}',
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
        position: [816, -80],
    })
    SendWahaMessage = {
        method: 'POST',
        url: 'https://r2csolution.duckdns.org/webhook/aicrm-waha-webhook',
        sendBody: true,
        specifyBody: 'json',
        jsonBody: `{
  "chatId": "{{ $('Waha Webhook').item.json.body.payload.from }}",
  "text": "{{ $json.output }}",
  "session": "default"
}`,
        options: {},
    };

    // =====================================================================
    // ROUTAGE ET CONNEXIONS
    // =====================================================================

    @links()
    defineRouting() {
        this.IgnoreGroups.out(0).to(this.GetAiPersonality.in(0));
        this.GetAiPersonality.out(0).to(this.AiAgent.in(0));
        this.AiAgent.out(0).to(this.SendWahaMessage.in(0));

        this.AiAgent.uses({
            ai_languageModel: this.GroqModel.output,
            ai_memory: this.Memory.output,
        });
    }
}

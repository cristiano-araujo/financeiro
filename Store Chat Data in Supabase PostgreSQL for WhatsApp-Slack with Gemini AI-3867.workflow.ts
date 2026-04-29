import { workflow, node, links } from '@n8n-as-code/transformer';

// <workflow-map>
// Workflow : Supabase Setup Postgres
// Nodes   : 6  |  Connections: 3
//
// NODE INDEX
// ──────────────────────────────────────────────────────────────────
// Property name                    Node type (short)         Flags
// WhenClickingTestWorkflow           manualTrigger
// SetSampleInputVariables            set
// Geminiflash20                      lmChatGoogleGemini         [creds] [ai_languageModel]
// SupabasePostgresDatabase           memoryPostgresChat         [creds] [ai_memory]
// UpdateAdditonalValuesEGNameAddress supabase                   [creds]
// SampleAgent                        agent                      [AI]
//
// ROUTING MAP
// ──────────────────────────────────────────────────────────────────
// WhenClickingTestWorkflow
//    → SetSampleInputVariables
//      → SampleAgent
//        → UpdateAdditonalValuesEGNameAddress
//
// AI CONNECTIONS
// SampleAgent.uses({ ai_languageModel: Geminiflash20, ai_memory: SupabasePostgresDatabase })
// </workflow-map>

// =====================================================================
// METADATA DU WORKFLOW
// =====================================================================

@workflow({
    id: 'gUx6hY0bOoReluxE',
    name: 'Supabase Setup Postgres',
    active: false,
    tags: ['Templates'],
    settings: { executionOrder: 'v1' },
})
export class SupabaseSetupPostgresWorkflow {
    // =====================================================================
    // CONFIGURATION DES NOEUDS
    // =====================================================================

    @node({
        id: 'c2c95cc1-d10e-40c9-9663-625e8a2ab30b',
        name: 'When clicking ‘Test workflow’',
        type: 'n8n-nodes-base.manualTrigger',
        version: 1,
        position: [340, -80],
    })
    WhenClickingTestWorkflow = {};

    @node({
        id: '30a4ae0f-c7ae-4b00-b826-a0a2759f2dd5',
        name: 'Set sample Input Variables',
        type: 'n8n-nodes-base.set',
        version: 3.4,
        position: [600, -80],
    })
    SetSampleInputVariables = {
        options: {},
        assignments: {
            assignments: [
                {
                    id: 'ed7bc826-fd48-4c9e-8ba7-11e4e7bb73ac',
                    name: 'session_id',
                    type: 'string',
                    value: '=491634502879',
                },
                {
                    id: 'd381c930-a92f-404f-ac91-ad6437d6b0c9',
                    name: 'name',
                    type: 'string',
                    value: '=Genn Sverster',
                },
                {
                    id: '4ead1fb5-098b-4cbc-bc78-d65b188ca5b0',
                    name: 'chatInput',
                    type: 'string',
                    value: '=wie gehts dir?',
                },
            ],
        },
    };

    @node({
        id: 'f56b629c-5374-43ce-b55b-efd7f14f1231',
        name: 'GeminiFlash2.0',
        type: '@n8n/n8n-nodes-langchain.lmChatGoogleGemini',
        version: 1,
        position: [840, 140],
        credentials: { googlePalmApi: { id: 'clmB8ZYJMHaHmnsu', name: 'Stardawn#1' } },
    })
    Geminiflash20 = {
        options: {},
        modelName: 'models/gemini-2.0-flash',
    };

    @node({
        id: '1da22e93-504e-4616-bac3-dabd9a4b145a',
        name: 'Supabase Postgres Database',
        type: '@n8n/n8n-nodes-langchain.memoryPostgresChat',
        version: 1.3,
        position: [1100, 140],
        credentials: { postgres: { id: 'B2m18ScvYBKPNF9s', name: 'Supabase SD - N8N Demo Chatbot' } },
    })
    SupabasePostgresDatabase = {
        tableName: 'whatsapp_messages3',
        sessionKey: '={{ $json.session_id }}',
        sessionIdType: 'customKey',
        contextWindowLength: 20,
    };

    @node({
        id: '29a7eb84-2244-41e1-99c0-5daaeb80cf6e',
        name: 'Update additonal Values e.g. Name, Address ...',
        type: 'n8n-nodes-base.supabase',
        version: 1,
        position: [1300, -80],
        credentials: { supabaseApi: { id: 'GHuUG6pmPATBHgob', name: 'N8N Chatbot' } },
    })
    UpdateAdditonalValuesEGNameAddress = {
        filters: {
            conditions: [
                {
                    keyName: 'session_id',
                    keyValue: "={{ $('Set sample Input Variables').item.json.session_id }}",
                    condition: 'eq',
                },
                {
                    keyName: 'name',
                    keyValue: 'NULL',
                    condition: 'is',
                },
            ],
        },
        tableId: 'whatsapp_messages3',
        fieldsUi: {
            fieldValues: [
                {
                    fieldId: 'name',
                    fieldValue: "={{ $('Set sample Input Variables').item.json.name }}",
                },
            ],
        },
        matchType: 'allFilters',
        operation: 'update',
    };

    @node({
        id: '8094fdd7-f238-47dc-94f9-5e962d5f0c2f',
        name: 'Sample Agent ',
        type: '@n8n/n8n-nodes-langchain.agent',
        version: 1.7,
        position: [960, -80],
    })
    SampleAgent = {
        text: '={{ $json.chatInput }}',
        options: {
            systemMessage: 'You are a helpful assistant',
        },
        promptType: 'define',
    };

    // =====================================================================
    // ROUTAGE ET CONNEXIONS
    // =====================================================================

    @links()
    defineRouting() {
        this.SampleAgent.out(0).to(this.UpdateAdditonalValuesEGNameAddress.in(0));
        this.SetSampleInputVariables.out(0).to(this.SampleAgent.in(0));
        this.WhenClickingTestWorkflow.out(0).to(this.SetSampleInputVariables.in(0));

        this.SampleAgent.uses({
            ai_languageModel: this.Geminiflash20.output,
            ai_memory: this.SupabasePostgresDatabase.output,
        });
    }
}

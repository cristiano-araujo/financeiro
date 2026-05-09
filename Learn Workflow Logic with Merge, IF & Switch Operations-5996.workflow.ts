import { workflow, node, links } from '@n8n-as-code/transformer';

// <workflow-map>
// Workflow : undefined
// Nodes   : 22  |  Connections: 20
//
// NODE INDEX
// ──────────────────────────────────────────────────────────────────
// Property name                    Node type (short)         Flags
// StartSorting                       manualTrigger
// StickyNote                         stickyNote
// StickyNote1                        stickyNote
// StickyNote2                        stickyNote
// AddFragileHandling                 set
// AddStandardHandling                set
// StickyNote3                        stickyNote
// StickyNote4                        stickyNote
// SendToLondonBin                    set
// SendToNewYorkBin                   set
// SendToTokyoBin                     set
// DefaultBin                         set
// FinalSortedPackages                noOp
// StickyNote5                        stickyNote
// _3SwitchNode                       switch
// CreateLetter                       set
// _1MergeNode                        merge
// _2IfNode                           if
// ReGroupAllPackages                 merge
// Create2ndLetter                    set
// CreateParcel                       set
// StickyNote10                       stickyNote
//
// ROUTING MAP
// ──────────────────────────────────────────────────────────────────
// StartSorting
//    → CreateParcel
//      → _1MergeNode.in(2)
//        → _2IfNode
//          → AddFragileHandling
//            → ReGroupAllPackages
//              → _3SwitchNode
//                → SendToLondonBin
//                  → FinalSortedPackages
//               .out(1) → SendToNewYorkBin
//                  → FinalSortedPackages (↩ loop)
//               .out(2) → SendToTokyoBin
//                  → FinalSortedPackages (↩ loop)
//               .out(3) → DefaultBin
//                  → FinalSortedPackages (↩ loop)
//         .out(1) → AddStandardHandling
//            → ReGroupAllPackages.in(1) (↩ loop)
//    → Create2ndLetter
//      → _1MergeNode.in(1) (↩ loop)
//    → CreateLetter
//      → _1MergeNode (↩ loop)
// </workflow-map>

// =====================================================================
// METADATA DU WORKFLOW
// =====================================================================

@workflow({
    id: undefined,
    name: undefined,
    active: undefined,
})
export class NodeWorkflow {
    // =====================================================================
    // CONFIGURATION DES NOEUDS
    // =====================================================================

    @node({
        id: 'd6cf9b3d-66b8-4022-8c9d-698e89cd22fd',
        name: 'Start Sorting',
        type: 'n8n-nodes-base.manualTrigger',
        version: 1,
        position: [-880, 608],
    })
    StartSorting = {};

    @node({
        id: 'b8c72a1e-0268-4d99-8141-ca14e35cbd6a',
        name: 'Sticky Note',
        type: 'n8n-nodes-base.stickyNote',
        version: 1,
        position: [-1264, 192],
    })
    StickyNote = {
        width: 624,
        height: 596,
        content: `### Tutorial: The Logic Trio (Merge, IF, Switch)

Welcome! This workflow will teach you the three most important nodes for controlling the flow of your data.

**The Analogy: A Package Sorting Center**
- **Data Items:** Think of these as packages moving on a conveyor belt.
- **Merge Node:** A point where multiple conveyor belts combine into one.
- **IF Node:** A simple sorting gate with two paths (e.g., "Fragile" or "Not Fragile").
- **Switch Node:** An advanced sorting machine with many paths (e.g., sorting by destination city).


**How to use this tutorial:**
1.  Click **"Execute Workflow"**.
2.  Follow the flow from left to right, clicking on each node to see its output.
3.  Read the sticky notes to understand what each node does.`,
    };

    @node({
        id: '81532695-73c0-4357-a957-3d0ef580578f',
        name: 'Sticky Note1',
        type: 'n8n-nodes-base.stickyNote',
        version: 1,
        position: [-272, 192],
    })
    StickyNote1 = {
        color: 4,
        width: 384,
        height: 604,
        content: `### 1. The Merge Node

**Analogy:** A conveyor belt where packages from different loading docks (the \`Set\` nodes) come together.

**What it does:** The Merge node combines multiple streams of data into a single stream.

Here, it's set to **Append** mode, which is the most common. It waits for all incoming data and then passes it all through together.

**➡️ Look at the output. We now have both the letter and the parcel in one list, ready for the next step!**`,
    };

    @node({
        id: 'dadbac54-6b31-4a0f-8d5e-b6121467e90e',
        name: 'Sticky Note2',
        type: 'n8n-nodes-base.stickyNote',
        version: 1,
        position: [144, 192],
    })
    StickyNote2 = {
        color: 4,
        width: 384,
        height: 596,
        content: `### 2. The IF Node

**Analogy:** A simple sorting gate with two paths: a "true" path and a "false" path.

**What it does:** The IF node checks if a condition is met. If it's true, the data goes down the top output. If it's false, it goes down the bottom output.

Here, we're asking a simple question: **"Does this package have an \`is_fragile\` property?"**

**➡️ The parcel will go down the 'true' path, and the letters (which don't have that property) will go down the 'false' path.**`,
    };

    @node({
        id: '0c330031-eab5-4ee3-8b11-91aee526952a',
        name: "Add 'Fragile' Handling",
        type: 'n8n-nodes-base.set',
        version: 3.4,
        position: [624, 512],
    })
    AddFragileHandling = {
        options: {},
        assignments: {
            assignments: [
                {
                    id: '12345',
                    name: 'handling_instructions',
                    type: 'string',
                    value: 'Handle with care!',
                },
            ],
        },
        includeOtherFields: true,
    };

    @node({
        id: 'd14c0e68-3823-4f15-98eb-58a0d4983861',
        name: "Add 'Standard' Handling",
        type: 'n8n-nodes-base.set',
        version: 3.4,
        position: [624, 704],
    })
    AddStandardHandling = {
        options: {},
        assignments: {
            assignments: [
                {
                    id: '12345',
                    name: 'handling_instructions',
                    type: 'string',
                    value: 'Standard handling',
                },
            ],
        },
        includeOtherFields: true,
    };

    @node({
        id: '2ebde854-aa6b-48de-83b1-33950a1486e0',
        name: 'Sticky Note3',
        type: 'n8n-nodes-base.stickyNote',
        version: 1,
        position: [816, 272],
    })
    StickyNote3 = {
        color: 5,
        width: 384,
        height: 552,
        content: `### Merge Again?

**Why do we need another Merge node here?**

After the IF node, our data was split into two different paths. Before we can perform the *next* sorting step on all packages, we need to get them back onto the same conveyor belt.

This is a very common and important pattern in n8n: 
**Split -> Process -> Merge.**`,
    };

    @node({
        id: '66ca4ac5-aceb-426e-ab22-50c012602a85',
        name: 'Sticky Note4',
        type: 'n8n-nodes-base.stickyNote',
        version: 1,
        position: [1232, 176],
    })
    StickyNote4 = {
        color: 4,
        width: 400,
        height: 648,
        content: `### 3. The Switch Node

**Analogy:** An advanced sorting machine that can send packages to many different destinations.

**What it does:** The Switch node is like an IF node with multiple doors. It checks the value of a single field (\`destination\` in this case) and sends the data down the path that matches the value.

- If the destination is "London", it goes to output 0.
- If it's "New York", it goes to output 1.
- If it's something else, it goes to the **default** output.


**➡️ This is much cleaner than using many IF nodes chained together!**`,
    };

    @node({
        id: '10f56a78-85cd-4c8b-88e0-b6b3f0346e89',
        name: 'Send to London Bin',
        type: 'n8n-nodes-base.set',
        version: 3.4,
        position: [1776, 320],
    })
    SendToLondonBin = {
        options: {},
        assignments: {
            assignments: [
                {
                    id: '12345',
                    name: 'sorting_bin',
                    type: 'string',
                    value: 'A1 (London)',
                },
            ],
        },
        includeOtherFields: true,
    };

    @node({
        id: '2cba95bd-2c9b-42d1-90cb-74c2edf97ec7',
        name: 'Send to New York Bin',
        type: 'n8n-nodes-base.set',
        version: 3.4,
        position: [1776, 512],
    })
    SendToNewYorkBin = {
        options: {},
        assignments: {
            assignments: [
                {
                    id: '12345',
                    name: 'sorting_bin',
                    type: 'string',
                    value: 'B2 (New York)',
                },
            ],
        },
        includeOtherFields: true,
    };

    @node({
        id: '1531b4e3-eece-4c89-98bd-e9633fdd77f6',
        name: 'Send to Tokyo Bin',
        type: 'n8n-nodes-base.set',
        version: 3.4,
        position: [1776, 704],
    })
    SendToTokyoBin = {
        options: {},
        assignments: {
            assignments: [
                {
                    id: '12345',
                    name: 'sorting_bin',
                    type: 'string',
                    value: 'C3 (Tokyo)',
                },
            ],
        },
        includeOtherFields: true,
    };

    @node({
        id: 'd46604a8-663e-42bd-a175-a34edb8953fb',
        name: 'Default Bin',
        type: 'n8n-nodes-base.set',
        version: 3.4,
        position: [1776, 896],
    })
    DefaultBin = {
        options: {},
        assignments: {
            assignments: [
                {
                    id: '12345',
                    name: 'sorting_bin',
                    type: 'string',
                    value: 'Return to Sender',
                },
            ],
        },
        includeOtherFields: true,
    };

    @node({
        id: '570040aa-3f8d-4f59-904a-ee3deb36a9df',
        name: 'Final Sorted Packages',
        type: 'n8n-nodes-base.noOp',
        version: 1,
        position: [2160, 624],
    })
    FinalSortedPackages = {};

    @node({
        id: '756313e7-d2f3-45cc-a4f5-f91e7a8f778a',
        name: 'Sticky Note5',
        type: 'n8n-nodes-base.stickyNote',
        version: 1,
        position: [2032, 272],
    })
    StickyNote5 = {
        color: 6,
        width: 368,
        height: 560,
        content: `### All Packages Sorted!

Congratulations! You've successfully used the three logic nodes to sort your packages.

**You learned how to:**
- **Merge** data from different sources.
- Use **IF** for simple true/false decisions.
- Use **Switch** for complex, multi-path routing.


Mastering these three nodes is the key to building powerful and intelligent workflows in n8n.`,
    };

    @node({
        id: '4466652f-cc2b-47b1-bf4f-98d89753881f',
        name: '3. Switch Node',
        type: 'n8n-nodes-base.switch',
        version: 3.2,
        position: [1392, 576],
    })
    _3SwitchNode = {
        rules: {
            values: [
                {
                    outputKey: 'London',
                    conditions: {
                        options: {
                            version: 2,
                            leftValue: '',
                            caseSensitive: true,
                            typeValidation: 'strict',
                        },
                        combinator: 'and',
                        conditions: [
                            {
                                id: '8d43cde4-027a-4ca7-a24c-6f74f12d6238',
                                operator: {
                                    type: 'string',
                                    operation: 'equals',
                                },
                                leftValue: '={{ $json.destination }}',
                                rightValue: 'London',
                            },
                        ],
                    },
                    renameOutput: true,
                },
                {
                    outputKey: 'New York',
                    conditions: {
                        options: {
                            version: 2,
                            leftValue: '',
                            caseSensitive: true,
                            typeValidation: 'strict',
                        },
                        combinator: 'and',
                        conditions: [
                            {
                                id: '399a0fbd-6be5-48e9-9f66-04cf385cb418',
                                operator: {
                                    name: 'filter.operator.equals',
                                    type: 'string',
                                    operation: 'equals',
                                },
                                leftValue: '={{ $json.destination }}',
                                rightValue: 'New York',
                            },
                        ],
                    },
                    renameOutput: true,
                },
                {
                    outputKey: 'Tokyo',
                    conditions: {
                        options: {
                            version: 2,
                            leftValue: '',
                            caseSensitive: true,
                            typeValidation: 'strict',
                        },
                        combinator: 'and',
                        conditions: [
                            {
                                id: 'a69d387d-a174-42b3-bc5f-c8b46b7c2375',
                                operator: {
                                    name: 'filter.operator.equals',
                                    type: 'string',
                                    operation: 'equals',
                                },
                                leftValue: '={{ $json.destination }}',
                                rightValue: 'Tokyo',
                            },
                        ],
                    },
                    renameOutput: true,
                },
            ],
        },
        options: {
            fallbackOutput: 'extra',
            renameFallbackOutput: 'Default',
        },
    };

    @node({
        id: 'add68013-30a7-43db-93d4-5af691764684',
        name: 'Create Letter',
        type: 'n8n-nodes-base.set',
        version: 3.4,
        position: [-496, 416],
    })
    CreateLetter = {
        options: {},
        assignments: {
            assignments: [
                {
                    id: '12345',
                    name: 'package_id',
                    type: 'string',
                    value: 'L-001',
                },
                {
                    id: '67890',
                    name: 'type',
                    type: 'string',
                    value: 'letter',
                },
                {
                    id: 'abcde',
                    name: 'destination',
                    type: 'string',
                    value: 'London',
                },
            ],
        },
    };

    @node({
        id: '5af75a45-b912-41c6-b073-03188ae914ef',
        name: '1. Merge Node',
        type: 'n8n-nodes-base.merge',
        version: 3.2,
        position: [-128, 592],
    })
    _1MergeNode = {
        numberInputs: 3,
    };

    @node({
        id: '11627c3b-465a-4a4a-bfe9-95c08d502f2f',
        name: '2. IF Node',
        type: 'n8n-nodes-base.if',
        version: 2.2,
        position: [272, 608],
    })
    _2IfNode = {
        options: {},
        conditions: {
            options: {
                version: 2,
                leftValue: '',
                caseSensitive: true,
                typeValidation: 'loose',
            },
            combinator: 'and',
            conditions: [
                {
                    id: 'a68aad83-1d09-4ebe-9732-aaedc407bb4b',
                    operator: {
                        type: 'boolean',
                        operation: 'true',
                        singleValue: true,
                    },
                    leftValue: '={{ $json.is_fragile }}',
                    rightValue: '',
                },
            ],
        },
        looseTypeValidation: true,
    };

    @node({
        id: '4b5b5ba4-25e1-4ef0-93d8-50670dbc1ce0',
        name: 'Re-group All Packages',
        type: 'n8n-nodes-base.merge',
        version: 3.2,
        position: [960, 608],
    })
    ReGroupAllPackages = {};

    @node({
        id: '21d270c4-c19c-42ed-a6e3-67ecedd1c0c9',
        name: 'Create 2nd Letter',
        type: 'n8n-nodes-base.set',
        version: 3.4,
        position: [-496, 608],
    })
    Create2ndLetter = {
        options: {},
        assignments: {
            assignments: [
                {
                    id: '12345',
                    name: 'package_id',
                    type: 'string',
                    value: 'L-002',
                },
                {
                    id: '67890',
                    name: 'type',
                    type: 'string',
                    value: 'letter',
                },
                {
                    id: 'abcde',
                    name: 'destination',
                    type: 'string',
                    value: 'Tokyo',
                },
            ],
        },
    };

    @node({
        id: '8a295323-9515-410c-9ac1-fb431d08cea2',
        name: 'Create Parcel',
        type: 'n8n-nodes-base.set',
        version: 3.4,
        position: [-496, 800],
    })
    CreateParcel = {
        options: {},
        assignments: {
            assignments: [
                {
                    id: '12345',
                    name: 'package_id',
                    type: 'string',
                    value: 'P-001',
                },
                {
                    id: '67890',
                    name: 'type',
                    type: 'string',
                    value: 'parcel',
                },
                {
                    id: 'abcde',
                    name: 'destination',
                    type: 'string',
                    value: 'New York',
                },
                {
                    id: 'fghij',
                    name: 'is_fragile',
                    type: 'boolean',
                    value: true,
                },
            ],
        },
    };

    @node({
        id: 'c06a0f40-cc18-4710-8b07-9d396e89a83d',
        name: 'Sticky Note10',
        type: 'n8n-nodes-base.stickyNote',
        version: 1,
        position: [2432, 32],
    })
    StickyNote10 = {
        color: 3,
        width: 540,
        height: 800,
        content: `## Was this helpful? Let me know!

I really hope this template helped you understand how Logical Operation Nodes work here in n8n. Your feedback is incredibly valuable and helps me create better resources for the n8n community.

### **Share Your Thoughts & Ideas**

Whether you have a suggestion, found a typo, or just want to say thanks, I'd love to hear from you!
Here's a simple n8n form built for this purpose:

#### ➡️ **[Click here to give feedback](https://api.ia2s.app/form/templates/feedback?template=Merge%20If%20Switch)**

### **Ready to Build Something Great?**

If you're looking to take your n8n skills or business automation to the next level, I can help.

**🎓 n8n Coaching:** Want to become an n8n pro? I offer one-on-one coaching sessions to help you master workflows, tackle specific problems, and build with confidence.
#### ➡️ **[Book a Coaching Session](https://api.ia2s.app/form/templates/coaching?template=Merge%20If%20Switch)**

**💼 n8n Consulting:** Have a complex project, an integration challenge, or need a custom workflow built for your business? Let's work together to create a powerful automation solution.
#### ➡️ **[Inquire About Consulting Services](https://api.ia2s.app/form/templates/consulting?template=Merge%20If%20Switch)**

---

Happy Automating!
Lucas Peyrin`,
    };

    // =====================================================================
    // ROUTAGE ET CONNEXIONS
    // =====================================================================

    @links()
    defineRouting() {
        this._2IfNode.out(0).to(this.AddFragileHandling.in(0));
        this._2IfNode.out(1).to(this.AddStandardHandling.in(0));
        this.DefaultBin.out(0).to(this.FinalSortedPackages.in(0));
        this._1MergeNode.out(0).to(this._2IfNode.in(0));
        this.CreateLetter.out(0).to(this._1MergeNode.in(0));
        this.CreateParcel.out(0).to(this._1MergeNode.in(2));
        this.StartSorting.out(0).to(this.CreateParcel.in(0));
        this.StartSorting.out(0).to(this.Create2ndLetter.in(0));
        this.StartSorting.out(0).to(this.CreateLetter.in(0));
        this._3SwitchNode.out(0).to(this.SendToLondonBin.in(0));
        this._3SwitchNode.out(1).to(this.SendToNewYorkBin.in(0));
        this._3SwitchNode.out(2).to(this.SendToTokyoBin.in(0));
        this._3SwitchNode.out(3).to(this.DefaultBin.in(0));
        this.Create2ndLetter.out(0).to(this._1MergeNode.in(1));
        this.SendToTokyoBin.out(0).to(this.FinalSortedPackages.in(0));
        this.SendToLondonBin.out(0).to(this.FinalSortedPackages.in(0));
        this.SendToNewYorkBin.out(0).to(this.FinalSortedPackages.in(0));
        this.ReGroupAllPackages.out(0).to(this._3SwitchNode.in(0));
        this.AddFragileHandling.out(0).to(this.ReGroupAllPackages.in(0));
        this.AddStandardHandling.out(0).to(this.ReGroupAllPackages.in(1));
    }
}

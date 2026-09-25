import { cert, getApps, initializeApp } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

const required = ['FIREBASE_PROJECT_ID', 'FIREBASE_CLIENT_EMAIL', 'FIREBASE_PRIVATE_KEY']
const missing = required.filter((name) => !process.env[name])
if (missing.length) throw new Error(`Missing environment variables: ${missing.join(', ')}`)

const privateKey = process.env.FIREBASE_PRIVATE_KEY.replace(/\\r/g, '').replace(/\\n/g, '\n')
const app = getApps()[0] || initializeApp({
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey,
  }),
})
const database = getFirestore(app)

const posts = [
  {
    slug: 'managed-ai-agents-are-becoming-a-platform-layer',
    title: 'Managed AI Agents Are Becoming a Platform Layer',
    description: 'Why agent infrastructure is moving beyond model calls toward managed runtimes, tools, state, sandboxes, and observable execution.',
    tags: ['AI agents', 'software engineering', 'OpenAI', 'Gemini'],
    publishedAt: '2026-09-20T09:00:00.000Z',
    body: `A useful AI agent is more than a model inside a loop. It needs tools, state, a place to execute code, rules around network access, and a reliable way to resume work after something fails. In 2026, the clearest AI platform trend is that these supporting pieces are becoming products of their own.

OpenAI's recently introduced Agents API describes a managed environment built for long-running work. It combines the Codex harness with hosted sandboxes, file handling, tools, and support for coordinating subagents. Google's managed agents follow a similar direction: a single request can provision an isolated Linux environment in which an agent can reason, browse, execute code, and manage files.

That changes the architectural question for builders. The first question used to be, “Which model should I call?” Increasingly, it is, “What environment should this model be allowed to operate inside?”

## The harness matters as much as the model

A capable model can plan and generate code, but the harness determines whether that ability becomes dependable software. The harness decides which tools are available, how intermediate results are stored, how retries work, what context survives, and where human approval is required.

This is why two products using the same underlying model can behave very differently. One may lose track of a task after a few steps. Another may keep a structured plan, inspect its own output, run tests, and recover from a failed command.

For engineering teams, this suggests a practical separation:

- Treat the model as a reasoning dependency that can be replaced.
- Treat tools as narrow interfaces with explicit inputs and outputs.
- Treat the agent runtime as production infrastructure with logs, limits, and failure handling.
- Treat every external action as a permission decision.

## Parallel agents need coordination

Subagents are another visible part of the trend. Independent tasks such as researching several APIs, checking separate modules, or comparing implementation options can run in parallel. The benefit is throughput, but parallelism also creates coordination work.

A main agent must give each worker enough context, avoid duplicated effort, and combine results without losing contradictions. That resembles ordinary distributed systems: concurrency is valuable only when ownership and reconciliation are clear.

The simplest useful pattern is to split work by artifact or question, keep each assignment bounded, and require evidence in the result. More agents do not automatically produce a better answer.

## Security moves into product design

Google's agent documentation recommends trusted tools, minimum permissions, managed secrets, network allowlists, and human verification for sensitive changes. Those are application requirements, not optional deployment polish.

An agent with a browser, shell, credentials, and write access has meaningful power. Good agent products therefore make boundaries visible: which data can be read, which systems can be changed, and when a person must approve the next step.

The current platform shift makes agents easier to build. It also makes disciplined system design more important. The teams that do well will measure agent quality by completed, verifiable work rather than impressive conversation.

## Sources

- [OpenAI: Introducing the Agents API](https://openai.com/index/introducing-the-agents-api/)
- [Google AI: Managed agents overview](https://ai.google.dev/gemini-api/docs/agents)
- [Google AI: Using tools with the Gemini API](https://ai.google.dev/gemini-api/docs/tools)
`,
  },
  {
    slug: 'coding-agents-change-the-developers-job',
    title: "Coding Agents Are Changing the Developer's Job",
    description: 'Coding tools are moving from autocomplete to delegated workflows. The valuable engineering skills now include specification, supervision, and verification.',
    tags: ['coding agents', 'developer tools', 'AI safety', 'engineering'],
    publishedAt: '2026-09-18T09:00:00.000Z',
    body: `AI coding began as autocomplete: suggest the next line, accept it, and continue. The newest tools operate at a different level. They inspect repositories, edit several files, run commands, test their work, and continue for much longer than a single chat response.

OpenAI describes the Codex app as a place to supervise multiple agents working in parallel across the software lifecycle. Anthropic describes newer Claude models as better at sustained work in large codebases, code review, and debugging. The common direction is delegation rather than completion.

That does not remove the developer. It changes where the developer spends attention.

## From writing steps to defining outcomes

A good task for an agent has a concrete goal, relevant constraints, and a way to verify success. “Improve this service” leaves too much undefined. “Add idempotency to this endpoint, preserve the response contract, and pass these integration tests” gives the agent a target it can work toward.

This makes specification a core engineering skill. Before delegating, a developer needs to understand the system well enough to state what must remain true. That includes behavior, security boundaries, performance expectations, and acceptable tradeoffs.

## Verification becomes the bottleneck

When generating code becomes cheaper, reviewing it becomes more important. An agent can produce a large patch quickly, but volume is not correctness. Tests help, yet tests only prove the cases they cover.

A strong review loop asks:

1. Does the implementation solve the stated problem?
2. Are there meaningful tests for the risky behavior?
3. Did permissions, data handling, or external calls change?
4. Is the design understandable enough to maintain?
5. Can we explain why the result is safe to ship?

OpenAI's account of running Codex safely emphasizes access controls, approval points, system boundaries, and telemetry. These controls are useful beyond coding agents. Any system that takes actions should make its behavior observable and keep risky operations explicit.

## Parallel work changes team habits

Running several agents at once can shorten elapsed time, especially when the work separates cleanly. One agent might investigate a bug, another review the relevant tests, and another examine documentation. The developer becomes the coordinator who frames tasks and resolves differences.

The failure mode is easy to imagine: several plausible patches, inconsistent assumptions, and no clear owner for integration. Parallel agent work needs the same habits as parallel human work—bounded scope, shared contracts, and one accountable integrator.

## Fundamentals still compound

Agents reward developers who understand systems. Knowledge of databases, networks, testing, security, and product behavior makes it easier to detect a confident but flawed change. The tool increases the amount of work one person can attempt; judgment determines how much of that work is valuable.

The emerging workflow is not “prompt and hope.” It is define, delegate, observe, verify, and refine. Developers who learn that loop can spend less time on mechanical edits and more time deciding what deserves to exist.

## Sources

- [OpenAI: Introducing the Codex app](https://openai.com/index/introducing-the-codex-app/)
- [OpenAI: Running Codex safely](https://openai.com/index/running-codex-safely/)
- [Anthropic: Claude Opus 4.6](https://www.anthropic.com/news/claude-opus-4-6)
`,
  },
  {
    slug: 'the-next-ai-advantage-is-efficient-context',
    title: 'The Next AI Advantage Is Efficient Context',
    description: 'Long context is useful, but production AI systems win by managing repeated information, latency, cost, and execution location deliberately.',
    tags: ['context caching', 'AI infrastructure', 'on-device AI', 'performance'],
    publishedAt: '2026-09-15T09:00:00.000Z',
    body: `Model intelligence gets most of the attention, but production AI products often succeed or fail on a less glamorous concern: how efficiently they move and reuse context.

Large context windows let a model inspect substantial codebases, document collections, audio, and video. That is useful, but repeatedly sending the same material increases cost and latency. The emerging engineering response combines context caching, stateful interactions, selective retrieval, and local inference.

## More context is not always better context

A million-token window can simplify prototypes because developers do not need to build a retrieval pipeline immediately. Yet every extra token still has operational consequences. Longer requests generally take longer to process, and irrelevant material can make the model's job harder.

The better question is not “How much can the model read?” It is “What information does this task need, and which parts will be reused?”

Google's Gemini documentation recommends context caching when a large shared prefix appears across repeated requests. Examples include extensive system instructions, recurring analysis of a document collection, and repeated work over a code repository. The system can reuse that common context instead of processing it as entirely new input every time.

## Stateful APIs reduce application plumbing

The Gemini Interactions API represents another shift. It offers server-managed conversation state, background execution, observable steps, tool orchestration, and access to both models and agents through one interface. For multi-turn systems, state management can also improve cache reuse.

This reduces some infrastructure work, but it introduces a design decision: who owns the state? Server-managed state can simplify an application, while stateless requests offer more explicit control over storage and replay. The right choice depends on privacy requirements, debugging needs, and how long the interaction should live.

## Some inference is moving closer to the user

A related trend is on-device AI. Meta describes ExecuTorch as a lightweight runtime used across devices such as VR headsets and AI glasses. Running a suitable model locally can reduce network latency, keep some data on the device, and allow features to work with limited connectivity.

Cloud and local inference are complementary. Large reasoning workloads may belong in managed environments, while immediate perception, classification, or personalization may benefit from local execution. Mature products will route work according to capability, privacy, cost, and latency rather than forcing everything through one model endpoint.

## A practical architecture

For a production AI feature, I would start with four questions:

- Which context is stable enough to cache?
- Which information should be retrieved only when relevant?
- Which state must the application own for auditability?
- Which operations need the cloud, and which can happen near the user?

This approach treats tokens, time, and data movement as engineering resources. Model quality matters, but a slightly smaller model with clean context and the right tools can outperform a larger model buried under irrelevant input.

The next wave of AI products will be shaped by this operational discipline. Better context systems make applications faster, cheaper, easier to inspect, and more trustworthy.

## Sources

- [Google AI: Interactions API](https://ai.google.dev/gemini-api/docs/interactions-overview)
- [Google AI: Context caching](https://ai.google.dev/gemini-api/docs/caching)
- [Google AI: Long context](https://ai.google.dev/gemini-api/docs/long-context)
- [Meta AI: ExecuTorch and on-device AI](https://ai.meta.com/blog/executorch-reality-labs-on-device-ai/)
`,
  },
]

const batch = database.batch()
const now = new Date().toISOString()
for (const post of posts) {
  batch.set(database.collection('posts').doc(post.slug), {
    ...post,
    status: 'published',
    createdAt: post.publishedAt,
    updatedAt: now,
  })
}
await batch.commit()
console.log(`Seeded ${posts.length} published blog posts.`)
for (const post of posts) console.log(`- /blog/${post.slug}`)

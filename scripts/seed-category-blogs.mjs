import { cert, getApps, initializeApp } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

const required = ['FIREBASE_PROJECT_ID', 'FIREBASE_CLIENT_EMAIL', 'FIREBASE_PRIVATE_KEY']
const missing = required.filter((name) => !process.env[name])
if (missing.length) throw new Error(`Missing environment variables: ${missing.join(', ')}`)

const privateKey = process.env.FIREBASE_PRIVATE_KEY.replace(/\\r/g, '').replace(/\\n/g, '\n')
const app = getApps()[0] || initializeApp({ credential: cert({ projectId: process.env.FIREBASE_PROJECT_ID, clientEmail: process.env.FIREBASE_CLIENT_EMAIL, privateKey }) })
const database = getFirestore(app)
const image = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=82`

function article({ intro, problem, practice, code, language = 'typescript', takeaway }) {
  return `${intro}

This guide focuses on the decisions that survive contact with production: clear boundaries, observable behavior, and a feedback loop that reveals when an assumption is wrong.

## The problem worth solving

${problem}

The useful move is to make the hidden constraint explicit. Write down what must stay correct, what can be delayed, and how the system should behave when a dependency fails. That turns a vague idea into something a team can test.

## A practical implementation

${practice}

~~~${language}
${code}
~~~

The example is intentionally small. In a real project, add structured logs, metrics around the failure path, and tests for retries or partial results. Keep the interface narrow so the implementation can change without forcing every caller to change too.

## What to measure

Measure the outcome rather than activity. For software, that may be latency, error rate, queue depth, or recovery time. For product work, it may be activation, retention, or the number of useful conversations. Review the signal on a regular cadence and record what changed.

## Takeaway

${takeaway}

Start with the smallest version that can teach you something, make its behavior visible, and improve it from evidence. That rhythm is more dependable than trying to design the final answer in one pass.`
}

const posts = [
  {
    slug: 'designing-idempotent-event-consumers',
    title: 'Designing Idempotent Event Consumers',
    description: 'A practical pattern for processing duplicate events safely with idempotency keys, atomic writes, retries, and observable failure handling.',
    category: 'Systems', tags: ['distributed systems', 'events', 'idempotency', 'reliability'],
    coverImage: image('photo-1558494949-ef010cbdcc31'), coverImageAlt: 'Rows of illuminated servers in a data center',
    publishedAt: '2026-09-30T09:00:00.000Z', featured: true, trending: true,
    body: article({ intro: 'Message brokers usually promise at-least-once delivery. That is a useful guarantee, but it means the same event can reach a consumer more than once. A payment, email, or inventory update must therefore be safe to repeat.', problem: 'Duplicates appear after timeouts, consumer restarts, visibility-window expiry, and producer retries. Checking an in-memory set is not enough because the process can crash between the business write and the acknowledgement.', practice: 'Store an event identifier in the same transaction as the business change. A unique constraint turns the second delivery into a harmless no-op. Acknowledge the message only after the transaction commits.', code: `async function handle(event: OrderPaid, db: Database) {
  await db.transaction(async (tx) => {
    const inserted = await tx.processedEvents.insertOnce(event.id)
    if (!inserted) return
    await tx.orders.markPaid(event.orderId, event.paidAt)
  })
}`, takeaway: 'Assume delivery can repeat. Put the deduplication record beside the state change, and let the database enforce the invariant.' }),
  },
  {
    slug: 'backpressure-keeps-services-alive',
    title: 'Backpressure Keeps Busy Services Alive',
    description: 'How bounded concurrency, queues, deadlines, and load shedding prevent a traffic spike from turning into a cascading outage.',
    category: 'Systems', tags: ['backpressure', 'queues', 'performance', 'resilience'],
    coverImage: image('photo-1451187580459-43490279c0fa'), coverImageAlt: 'Glowing global network connections over the earth',
    publishedAt: '2026-09-29T09:00:00.000Z', trending: true,
    body: article({ intro: 'A service rarely fails because one request is too difficult. It fails when accepted work grows faster than the service can finish it. Backpressure gives the system a controlled way to say “not yet” before memory and latency collapse.', problem: 'Unbounded Promise.all calls, connection pools, and queues hide overload until every request becomes slow. The slowdown causes retries, retries add more load, and the failure spreads to dependencies.', practice: 'Set a concurrency budget from measured capacity. Queue only a bounded amount of work, attach deadlines, and reject excess requests with a response clients can handle. Track saturation as carefully as errors.', code: `import pLimit from 'p-limit'

const run = pLimit(20)
export async function fetchProfiles(ids: string[]) {
  return Promise.all(ids.map((id) => run(() => fetchProfile(id))))
}`, takeaway: 'Capacity is a product constraint. Bound the work, expose saturation, and fail quickly enough for the rest of the system to recover.' }),
  },
  {
    slug: 'rag-evaluation-before-prompt-tuning',
    title: 'Evaluate RAG Before Tuning the Prompt',
    description: 'Build a small retrieval evaluation set and measure context quality before spending days rewriting prompts or changing models.',
    category: 'AI & LLMs', tags: ['RAG', 'evaluation', 'embeddings', 'LLMs'],
    coverImage: image('photo-1677442136019-21780ecad995'), coverImageAlt: 'Abstract artificial intelligence face with glowing circuitry',
    publishedAt: '2026-09-28T09:00:00.000Z', featured: true,
    body: article({ intro: 'When a retrieval-augmented assistant gives a weak answer, teams often edit the prompt first. The model cannot answer from evidence it never received, so retrieval quality should be measured before generation style.', problem: 'A demo can look convincing while failing common queries. Without labeled questions and expected source documents, changes to chunk size, embeddings, reranking, or prompts become guesswork.', practice: 'Collect real questions, label the documents that contain the answer, and calculate recall at a small cutoff. Log retrieved document IDs alongside the final response so failures can be separated into retrieval and generation errors.', code: `function recallAtK(expected: Set<string>, actual: string[], k = 5) {
  const hits = actual.slice(0, k).filter((id) => expected.has(id))
  return expected.size === 0 ? 1 : hits.length / expected.size
}`, takeaway: 'Treat retrieval as its own product surface. A small, representative evaluation set creates a faster improvement loop than prompt changes made by feel.' }),
  },
  {
    slug: 'tool-contracts-for-reliable-ai-agents',
    title: 'Tool Contracts for Reliable AI Agents',
    description: 'Design narrow, typed, permission-aware tools that make agent actions easier to validate, observe, retry, and audit.',
    category: 'AI & LLMs', tags: ['AI agents', 'tool calling', 'TypeScript', 'safety'],
    coverImage: image('photo-1644088379091-d574269d422f'), coverImageAlt: 'Abstract blue network of connected data points',
    publishedAt: '2026-09-27T09:00:00.000Z', trending: true,
    body: article({ intro: 'An agent becomes useful when it can act, and dangerous when those actions are vague. A good tool contract limits what can happen and gives the runtime enough structure to validate every request.', problem: 'Tools that accept arbitrary commands or large untyped objects move policy into the prompt. Prompts are guidance; authorization and validation belong in code at the tool boundary.', practice: 'Give each tool one verb, validate inputs, return structured errors, and separate read operations from writes. Require an idempotency key for repeatable writes and attach the authenticated actor on the server.', code: `const CreateIssue = z.object({
  title: z.string().min(5).max(120),
  projectId: z.string().uuid(),
  idempotencyKey: z.string().uuid(),
})

async function createIssue(input: unknown, actor: Actor) {
  return issues.create(CreateIssue.parse(input), actor)
}`, takeaway: 'Agent reliability begins at the interface. Narrow tools produce clearer plans, safer permissions, and failures a human can understand.' }),
  },
  {
    slug: 'activation-metrics-that-guide-product-work',
    title: 'Activation Metrics That Guide Product Work',
    description: 'Choose an activation event tied to user value, instrument it cleanly, and use cohorts to improve onboarding without vanity metrics.',
    category: 'Product & Growth', tags: ['activation', 'analytics', 'onboarding', 'product'],
    coverImage: image('photo-1551288049-bebda4e38f71'), coverImageAlt: 'Analytics dashboard displayed on a laptop',
    publishedAt: '2026-09-26T09:00:00.000Z',
    body: article({ intro: 'Sign-ups count intent, not value. Activation is the first observable moment when a user experiences the reason the product exists. Defining that moment makes onboarding work much more concrete.', problem: 'Teams often optimize page completion because it is easy to measure. A shorter form can raise completion while doing nothing for retention. The metric needs a demonstrated relationship with later value.', practice: 'Start with a behavioral hypothesis, instrument one stable event, and compare retention for users who reach it. Segment by acquisition source and first-use path before changing the interface.', code: `type Activation = {
  userId: string
  event: 'first_project_shared'
  occurredAt: string
  source: string
}

analytics.track<Activation>('activation', payload)`, takeaway: 'A useful activation metric describes value received. Connect it to retention, keep the event definition stable, and let cohorts reveal where onboarding needs work.' }),
  },
  {
    slug: 'small-growth-experiments-with-clean-signals',
    title: 'Small Growth Experiments With Clean Signals',
    description: 'Run focused product experiments with explicit hypotheses, guardrails, event contracts, and decisions made before results arrive.',
    category: 'Product & Growth', tags: ['growth', 'experiments', 'analytics', 'product strategy'],
    coverImage: image('photo-1521737711867-e3b97375f902'), coverImageAlt: 'Product team collaborating around a table',
    publishedAt: '2026-09-25T09:00:00.000Z',
    body: article({ intro: 'A growth experiment should reduce uncertainty about a product decision. Shipping several changes at once may move a chart, but it rarely teaches the team which mechanism mattered.', problem: 'Experiments become stories after the fact when the hypothesis, primary metric, and stopping rule are undefined. Teams then select the most flattering slice and repeat noisy results.', practice: 'Write a one-sentence causal hypothesis, choose one primary metric, add guardrails, and define the decision threshold before launch. Store assignment once so users see a consistent experience.', code: `function variant(userId: string): 'control' | 'invite_prompt' {
  const bucket = stableHash(userId) % 100
  return bucket < 50 ? 'control' : 'invite_prompt'
}`, takeaway: 'Small experiments compound when each produces a clean signal. Decide what evidence will change your mind before looking at the dashboard.' }),
  },
  {
    slug: 'a-weekly-building-in-public-system',
    title: 'A Weekly System for Building in Public',
    description: 'Turn product work into useful public notes with a lightweight capture, synthesis, publishing, and feedback routine.',
    category: 'Building in Public', tags: ['building in public', 'writing', 'feedback', 'consistency'],
    coverImage: image('photo-1455390582262-044cdead277a'), coverImageAlt: 'Open notebook and pen on a writer desk',
    publishedAt: '2026-09-24T09:00:00.000Z',
    body: article({ intro: 'Building in public works best as a learning system, not a performance. The raw material already exists in decisions, bugs, customer conversations, and tradeoffs from the week.', problem: 'Waiting for a launch creates long silent periods and polished posts with little specificity. Sharing every detail creates noise and can expose customer or company information.', practice: 'Capture one sentence after meaningful work, select the most reusable lesson on Friday, remove private details, and publish the decision plus evidence. Track replies that change the roadmap.', language: 'javascript', code: `const note = {
  decision: 'Reduced onboarding to one required step',
  evidence: 'Five users stalled before creating a project',
  lesson: 'Ask for information only when it becomes useful',
  next: 'Measure first-project completion for two weeks',
}`, takeaway: 'Consistency comes from capturing work while it happens. Publish specific lessons, protect private context, and treat thoughtful replies as product research.' }),
  },
  {
    slug: 'sharing-progress-without-sharing-noise',
    title: 'Share Progress Without Sharing Noise',
    description: 'A framework for choosing updates that teach something, protect sensitive context, and invite useful feedback from the right audience.',
    category: 'Building in Public', tags: ['communication', 'audience', 'feedback', 'writing'],
    coverImage: image('photo-1499750310107-5fef28a66643'), coverImageAlt: 'Laptop, notebook, and coffee arranged on a desk',
    publishedAt: '2026-09-23T09:00:00.000Z',
    body: article({ intro: 'Frequent updates are not automatically useful. The strongest public notes compress experience into a decision another builder can inspect, question, or reuse.', problem: 'Vanity updates list tasks completed but hide the reasoning. Readers cannot tell what changed, why it mattered, or whether the lesson applies to them.', practice: 'Structure an update around context, constraint, decision, evidence, and next step. Remove customer identifiers and credentials, and delay details that could weaken security or an active negotiation.', language: 'typescript', code: `type PublicUpdate = {
  context: string
  constraint: string
  decision: string
  evidence: string
  nextStep: string
}

const publishable = (draft: PublicUpdate) => redactSecrets(draft)`, takeaway: 'Share decisions and evidence rather than a stream of activity. A smaller number of precise updates builds more trust than constant noise.' }),
  },
  {
    slug: 'debugging-with-a-hypothesis-loop',
    title: 'Debugging With a Hypothesis Loop',
    description: 'Use reproduction, instrumentation, controlled changes, and explicit hypotheses to resolve difficult bugs without random edits.',
    category: 'Engineering', tags: ['debugging', 'observability', 'testing', 'engineering'],
    coverImage: image('photo-1555066931-4365d14bab8c'), coverImageAlt: 'Source code displayed in a development editor',
    publishedAt: '2026-09-22T09:00:00.000Z', trending: true,
    body: article({ intro: 'Fast debugging looks less like inspiration and more like a tight scientific loop. Reproduce the behavior, state a falsifiable hypothesis, collect one discriminating signal, and update the model.', problem: 'Changing several things at once destroys information. If the bug disappears, the team still does not know which assumption was wrong, and the same class of failure returns.', practice: 'Write the expected and observed behavior, reduce the input, and add logs at boundaries where state changes form. Give every request a correlation ID so one execution can be followed across services.', code: `export async function timed<T>(name: string, work: () => Promise<T>) {
  const started = performance.now()
  try { return await work() }
  finally { logger.info({ name, durationMs: performance.now() - started }) }
}`, takeaway: 'Every debugging step should eliminate a possible cause. Preserve the evidence in a regression test or durable instrumentation once the fault is understood.' }),
  },
  {
    slug: 'api-boundaries-that-age-well',
    title: 'API Boundaries That Age Well',
    description: 'Design stable service contracts with explicit ownership, additive evolution, validation, and errors clients can act on.',
    category: 'Engineering', tags: ['API design', 'TypeScript', 'architecture', 'validation'],
    coverImage: image('photo-1461749280684-dccba630e2f6'), coverImageAlt: 'Developer code shown on a desktop monitor',
    publishedAt: '2026-09-21T09:00:00.000Z',
    body: article({ intro: 'An API is a promise between teams and time periods. Good boundaries make the common path simple while keeping implementation details free to evolve.', problem: 'Leaking database rows into responses couples every client to storage choices. Generic errors force clients to parse messages, and silent field changes turn routine deployments into coordination events.', practice: 'Define request and response schemas at the boundary, return stable machine-readable error codes, and prefer additive changes. Translate internal models into public resources instead of serializing them directly.', code: `const ProjectResponse = z.object({
  id: z.string().uuid(),
  name: z.string(),
  createdAt: z.string().datetime(),
})

return ProjectResponse.parse(toPublicProject(project))`, takeaway: 'A durable API exposes product concepts rather than storage details. Validate both directions and make failures specific enough for clients to recover.' }),
  },
  {
    slug: 'protecting-deep-work-with-small-boundaries',
    title: 'Protecting Deep Work With Small Boundaries',
    description: 'Use a few realistic defaults for attention, communication, and shutdown so focused work can coexist with a responsive team.',
    category: 'Life', tags: ['focus', 'work habits', 'attention', 'sustainable pace'],
    coverImage: image('photo-1500530855697-b586d89ba3ee'), coverImageAlt: 'Quiet landscape suggesting space and reflection',
    publishedAt: '2026-09-20T08:00:00.000Z',
    body: article({ intro: 'Deep work does not require a perfect calendar. It requires small boundaries that make the next hour predictable enough to hold one difficult problem in mind.', problem: 'Constant availability fragments attention while giving the appearance of productivity. Large time-blocking systems often fail because they ignore support duties, meetings, and natural variations in energy.', practice: 'Choose one protected block, publish when messages will be checked, and write the exact next action before starting. End with a short shutdown note so the task is easier to resume.', language: 'javascript', code: `const focusBlock = {
  outcome: 'Draft the migration decision record',
  startsAt: '09:30',
  durationMinutes: 75,
  notifications: 'off',
  nextMessageCheck: '10:45',
}`, takeaway: 'Protect attention with defaults small enough to keep. Reliable focus comes from clear expectations and easy restarts, not heroic isolation.' }),
  },
  {
    slug: 'a-personal-retrospective-that-changes-behavior',
    title: 'A Personal Retrospective That Changes Behavior',
    description: 'Review energy, commitments, learning, and relationships with a short weekly process that ends in one concrete adjustment.',
    category: 'Life', tags: ['reflection', 'learning', 'habits', 'career'],
    coverImage: image('photo-1500534314209-a25ddb2bd429'), coverImageAlt: 'Open road through a broad mountain landscape',
    publishedAt: '2026-09-19T08:00:00.000Z',
    body: article({ intro: 'Reflection is useful only when it changes a future choice. A weekly retrospective creates enough distance to notice patterns without turning life into a dashboard.', problem: 'Long journal prompts become another obligation. Pure memory overweights the most recent or emotional event, while tracking too many metrics creates analysis without action.', practice: 'Review the calendar and task history, name one source of energy and one source of drag, then choose a single adjustment for next week. Keep previous adjustments visible long enough to evaluate them.', language: 'typescript', code: `type WeeklyReview = {
  gaveEnergy: string
  createdDrag: string
  lesson: string
  oneAdjustment: string
  reviewOn: string
}`, takeaway: 'A retrospective should produce one testable change. Keep the process short, use evidence from the week, and allow patterns to emerge over time.' }),
  },
]

const existingCategories = {
  'managed-ai-agents-are-becoming-a-platform-layer': 'AI & LLMs',
  'coding-agents-change-the-developers-job': 'Engineering',
  'the-next-ai-advantage-is-efficient-context': 'AI & LLMs',
}

const batch = database.batch()
const now = new Date().toISOString()
for (const post of posts) {
  batch.set(database.collection('posts').doc(post.slug), { ...post, status: 'published', createdAt: post.publishedAt, updatedAt: now })
}
for (const [slug, category] of Object.entries(existingCategories)) {
  batch.set(database.collection('posts').doc(slug), { category }, { merge: true })
}
await batch.commit()
console.log(`Seeded ${posts.length} category articles and categorized ${Object.keys(existingCategories).length} existing articles.`)
for (const category of [...new Set(posts.map((post) => post.category))]) console.log(`- ${category}: ${posts.filter((post) => post.category === category).length} new`)

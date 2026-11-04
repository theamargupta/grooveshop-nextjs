Subject: Agentic conversion assignment — approach & scope (GrooveShop → Next.js)

Hi Dishant,

Thank you for the detailed walkthrough today, and for the assignment. This email sets out the repository, my approach, and the expectations we discussed, before I start.

Source repository: https://github.com/vasilistotskas/grooveshop-storefront-ui-node-nuxt (live demo at https://demo.grooveshop.space). It is a Nuxt 4, multi-tenant, server-rendered storefront whose data comes from a separate Django API, with around 613 Vue components and 82 routes.

Given the size, and your point that the agentic journey matters more than a pixel-perfect 1:1 port, I will convert a complete, production-quality vertical slice of the storefront to Next.js: the core commerce flow — home, product listing, product detail, cart, and checkout — with internationalisation, responsive layouts, and proper loading, empty, and error states throughout. The parts I am deliberately leaving out of this slice — multi-tenant host resolution, the Redis SSR cache, maps, loyalty, gift cards, and the blog — will be called out openly in the README, along with the reasoning, so the scope is a clear decision rather than a gap. Since the real Django backend is not part of the repo, I will build a typed mock data layer generated from the project's own OpenAPI schema, so the types stay honest.

Stack: Next.js (App Router) with TypeScript and Tailwind CSS v4, Vitest with Testing Library for unit tests, and Playwright for end-to-end tests.

Deliverables, as discussed: the Next.js application; unit tests with a code-coverage report; Playwright integration tests with a video recording of the run; a security audit report; a full, living log of every prompt and the process I followed; a 15–20 minute screen recording narrating the agentic journey; and a public GitHub repository containing the app and all of the above reports.

On the process itself, I will run my own agentic build pipeline end to end — planning the work in phases, splitting independent parts into parallel lanes, and using the right model for each job (planning and review on the strongest model, code generation delegated) — all of which I will document and narrate in the recording. I will use only this open-source repository and my own personal tooling; no code, data, or material from any previous employer will appear anywhere in the work.

On timeline, I am targeting completion within the next couple of days, well before the Diwali break, and I will share the public repository URL as soon as it is ready.

Please let me know if you would like me to adjust the scope or the stack. Otherwise I will begin right away.

Best regards,
Amar Gupta

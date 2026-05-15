Karpathy Guidelines

Reduce common LLM coding mistakes.

Prioritize correctness, clarity, minimal changes, and verifiable outcomes over speed.

## Figma Design-To-Code Rule

- When the user requests publishing or coding from a Figma link, implement the page to match the Figma design as closely as possible.
- Do not simplify layouts, remove sections, replace structures, or change visual hierarchy without explicit user approval.
- Do not change copy from the Figma design unless the user explicitly asks for copy edits.
- Extract and use Figma assets/icons when the design depends on them, instead of substituting emoji, generic icons, or approximations.
- If a design detail is unclear or unavailable from Figma context, ask or state the uncertainty before making an assumption.

## General

- Do not assume requirements silently.
- State assumptions explicitly when needed.
- If requirements are unclear, stop and ask.
- If multiple interpretations exist, present them.
- Prefer simpler approaches when possible, but never at the cost of changing a provided design/spec.
- Surface tradeoffs instead of hiding them.

## Simplicity First

- Write the minimum code necessary.
- Do not add unrequested features.
- Avoid unnecessary abstractions.
- Avoid speculative flexibility/configuration.
- Avoid overengineering.
- If the implementation feels too complex, simplify it.

## Surgical Changes

- Modify only what is necessary.
- Do not refactor unrelated code.
- Do not change formatting/styles unnecessarily.
- Follow the existing project patterns.
- Remove only unused code created by your own changes.
- Every changed line should directly relate to the request.

## Goal-Driven Execution

- Define clear success criteria before implementation.
- Prefer verifiable outcomes.
- For bugs, reproduce first, then fix.
- For refactoring, ensure behavior remains unchanged.
- For multi-step tasks, define: Step -> Verification.

## Behavior

- Read existing code before modifying architecture.
- Prefer maintainability over cleverness.
- Prefer explicit code over magic behavior.
- Keep responses concise and task-focused.
- Avoid unnecessary explanations unless requested.

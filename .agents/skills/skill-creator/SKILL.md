---
name: skill-creator
description: >
  Create, modify, evaluate, and improve AI agent skills (SKILL.md format).
  Guides skill creation from intent capture through drafting, testing,
  benchmarking, and iterative refinement. Use this whenever you need to
  create a new skill, improve an existing one, or run evaluations.
compatibility: opencode, claude, generic
---

# Skill Creator

A skill for creating new skills and iteratively improving them.

At a high level, the process of creating a skill goes like this:

- Decide what the skill should do and roughly how it should do it
- Write a draft of the skill
- Create a few test prompts and run the agent-with-access-to-the-skill on them
- Help the user evaluate the results both qualitatively and quantitatively
- Rewrite the skill based on feedback
- Repeat until satisfied
- Expand the test set and try again at larger scale

Your job when using this skill is to figure out where the user is in this process and jump in to help them progress. If they say "I want to make a skill for X", help narrow the scope, write a draft, create test cases, and run the eval loop. If they already have a draft, go straight to eval/iterate.

## Communicating with the user

Users have varying levels of technical familiarity. Adjust your communication accordingly:

- "evaluation" and "benchmark" are generally OK
- For "JSON" and "assertion", make sure the user is comfortable before using without explanation

It's OK to briefly explain terms if unsure, and clarify terms with a short definition.

---

## Creating a skill

### Capture Intent

Understand what the user wants. If the conversation already contains a workflow they want to capture, extract the tools used, sequence of steps, corrections made, and I/O formats. The user may need to fill gaps.

1. What should this skill enable the agent to do?
2. When should this skill trigger? (what user phrases/contexts)
3. What's the expected output format?
4. Should we create test cases? Skills with objectively verifiable outputs (file transforms, data extraction, code generation, fixed workflows) benefit from tests. Subjective skills (writing style, art) often don't.

### Research

Ask about edge cases, I/O formats, example files, success criteria, dependencies. For complex domains, search documentation, look up similar skills, and research best practices in parallel to reduce burden on the user.

### Write the SKILL.md

Based on the interview, create the skill:

- **name**: Skill identifier (must match directory name, kebab-case)
- **description**: When to trigger and what it does. The description is the primary triggering mechanism. Include both what the skill does AND specific contexts for when to use it. Make descriptions slightly "pushy" to overcome undertriggering — include example user phrasings that should trigger it.
- **compatibility**: List compatible agent platforms (optional)
- **Body**: The instructions the agent will follow when the skill is loaded

### Skill Anatomy

```
skill-name/
├── SKILL.md (required)
│   ├── YAML frontmatter (name, description required)
│   └── Markdown instructions
└── Resources (optional)
    ├── scripts/    - Executable code for deterministic/repetitive tasks
    ├── references/ - Documentation loaded into context as needed
    └── assets/     - Templates, images, data files
```

### Progressive Disclosure

The Agent Skills standard uses a three-level loading system:
1. **Metadata** (name + description) — Always available to the agent (~100 words)
2. **SKILL.md body** — Loaded when the skill is activated (<500 lines ideal)
3. **Resources** (references/, scripts/, assets/) — Loaded on demand, unlimited

**Key patterns:**
- Keep SKILL.md under 500 lines; if approaching the limit, add hierarchy with clear pointers
- Reference files from SKILL.md with guidance on when to read them
- For large reference files (>300 lines), include a table of contents

### Writing Style

Explain *why* things are important instead of heavy-handed MUSTs. Use theory of mind — help the agent understand the reasoning so it can generalize. Prefer imperative form in instructions.

Define output formats with templates:

```markdown
## Report structure
ALWAYS use this exact template:
# [Title]
## Executive summary
## Key findings
## Recommendations
```

Include examples when useful:

```markdown
## Commit message format
**Example 1:**
Input: Added user authentication with JWT tokens
Output: feat(auth): implement JWT-based authentication
```

### Test Cases

After writing the draft, create 2-3 realistic test prompts. Share them with the user: "Here are a few test cases I'd like to try. Do these look right, or do you want to add more?"

Save test cases to `evals/evals.json`. Don't write assertions yet — just the prompts.

```json
{
  "skill_name": "example-skill",
  "evals": [
    {
      "id": 1,
      "prompt": "User's task prompt",
      "expected_output": "Description of expected result",
      "files": []
    }
  ]
}
```

See `references/schemas.md` for the full schema (including `assertions` field added later).

## Running and evaluating test cases

This section is one continuous sequence — don't stop partway through. Do NOT use `/skill-test` or any other testing skill.

Put results in `<skill-name>-workspace/` as a sibling to the skill directory. Organize results by iteration (`iteration-1/`, `iteration-2/`, etc.) and within that, each test case gets a directory (`eval-0/`, `eval-1/`, etc.).

### Step 1: Spawn all runs (with-skill AND baseline) in the same turn

For each test case, spawn two tasks in the same turn — one with the skill, one without. Launch everything at once so it finishes around the same time.

**With-skill run:**
```
Execute this task:
- Skill path: <path-to-skill>
- Task: <eval prompt>
- Input files: <eval files if any, or "none">
- Save outputs to: <workspace>/iteration-<N>/eval-<ID>/with_skill/outputs/
- Outputs to save: <what the user cares about>
```

**Baseline run** (same prompt, baseline depends on context):
- **Creating a new skill**: no skill at all. Same prompt, no skill path, save to `without_skill/outputs/`.
- **Improving an existing skill**: the old version. Snapshot the skill first, then point the baseline at the snapshot.

Write an `eval_metadata.json` for each test case (assertions can be empty for now):

```json
{
  "eval_id": 0,
  "eval_name": "descriptive-name-here",
  "prompt": "The user's task prompt",
  "assertions": []
}
```

### Step 2: While runs are in progress, draft assertions

Don't wait for runs to finish. Draft quantitative assertions for each test case and explain them to the user. If assertions already exist, review and explain what they check.

Good assertions are objectively verifiable and have descriptive names. Subjective skills are better evaluated qualitatively.

Update `eval_metadata.json` and `evals/evals.json` with assertions once drafted.

### Step 3: As runs complete, capture timing data

When each task completes, capture `total_tokens` and `duration_ms`. Save immediately to `timing.json`:

```json
{
  "total_tokens": 84852,
  "duration_ms": 23332,
  "total_duration_seconds": 23.3
}
```

This data comes through the task completion notification and isn't persisted elsewhere.

### Step 4: Grade, aggregate, and launch the viewer

Once all runs are done:

1. **Grade each run** — evaluate each assertion against the outputs. Save results to `grading.json`. For assertions that can be checked programmatically, write and run a script.

2. **Aggregate into benchmark** — run the aggregation script:
   ```bash
   python -m scripts.aggregate_benchmark <workspace>/iteration-N --skill-name <name>
   ```
   This produces `benchmark.json` and `benchmark.md`.

3. **Analyze results** — surface patterns the aggregate stats might hide: non-discriminating assertions, high-variance evals, time/token tradeoffs.

4. **Launch the viewer** for qualitative review:
   ```bash
   nohup python <skill-creator-path>/eval-viewer/generate_review.py \
     <workspace>/iteration-N \
     --skill-name "my-skill" \
     --benchmark <workspace>/iteration-N/benchmark.json \
     > /dev/null 2>&1 &
   VIEWER_PID=$!
   ```
   For iteration 2+, also pass `--previous-workspace <workspace>/iteration-<N-1>`.

   **Headless environments**: If there's no display, use `--static <output_path>` to write a standalone HTML file instead of starting a server.

5. **Tell the user** something like: "I've opened the results. There are two tabs — 'Outputs' lets you click through each test case and leave feedback, 'Benchmark' shows the quantitative comparison."

### What the user sees in the viewer

The "Outputs" tab shows one test case at a time: prompt, output files (rendered inline), previous iteration's output (collapsed), assertion pass/fail (collapsed), and a feedback textbox.

The "Benchmark" tab shows pass rates, timing, and token usage per configuration with per-eval breakdowns and analyst observations.

### Step 5: Read the feedback

When the user says they're done, read `feedback.json`. Empty feedback means it was fine. Focus improvements on test cases with specific complaints. Kill the viewer when done.

```bash
kill $VIEWER_PID 2>/dev/null
```

---

## Improving the skill

### How to think about improvements

1. **Generalize from feedback.** Skills will be used across many different prompts. Don't overfit to a few examples. If there's a stubborn issue, try branching out with different metaphors or patterns rather than adding oppressively constrictive rules.

2. **Keep the prompt lean.** Remove things that aren't pulling their weight. Read transcripts, not just final outputs — if the agent wastes time on unproductive steps, remove those instructions.

3. **Explain the why.** Help the agent understand *why* something matters. If you find yourself writing "ALWAYS" or "NEVER" in all caps, reframe and explain the reasoning instead.

4. **Look for repeated work.** If all test cases resulted in the agent writing similar helper scripts, bundle that script in `scripts/`. Write it once, put it in the skill, and tell the agent to use it.

### The iteration loop

1. Apply improvements to the skill
2. Rerun all test cases into a new `iteration-<N+1>/` directory, including baseline runs
3. Launch the viewer with `--previous-workspace`
4. Wait for the user to review
5. Read feedback, improve again, repeat

Keep going until:
- The user says they're happy
- All feedback is empty
- You're not making meaningful progress

---

## Advanced: Blind comparison

For rigorous comparison between two skill versions, an optional blind comparison is available. Give two outputs to an independent agent without revealing which is which, and let it judge quality. This requires parallel task execution and is usually unnecessary — the human review loop is sufficient.

---

## Description Optimization

The description field in SKILL.md frontmatter is the primary mechanism for triggering. After creating or improving a skill, offer to optimize the description.

### Step 1: Generate trigger eval queries

Create 20 eval queries — a mix of should-trigger and should-not-trigger:

```json
[
  {"query": "the user prompt", "should_trigger": true},
  {"query": "another prompt", "should_trigger": false}
]
```

Queries must be realistic — what a real user would actually type. Include file paths, personal context, specific details. Mix lengths and formality. Focus on edge cases.

For **should-trigger** (8-10): different phrasings of the same intent, casual and formal, cases where the user doesn't explicitly name the domain but clearly needs it.

For **should-not-trigger** (8-10): near-misses that share keywords but need a different skill or no skill at all.

### Step 2: Review with user

Present the eval set for review using the HTML template in `assets/eval_review.html`. Open it for the user to edit, toggle, add/remove entries, and export.

### Step 3: Run the optimization loop

```bash
python -m scripts.run_loop \
  --eval-set <path-to-trigger-eval.json> \
  --skill-path <path-to-skill> \
  --model <model-id> \
  --model-cmd "claude -p" \
  --max-iterations 5 \
  --verbose
```

The `--model-cmd` flag specifies the CLI command to invoke the agent model (e.g., `"claude -p"`, `"opencode -p"`). This makes the script compatible with any agent platform.

This handles the full optimization loop: splits eval set into 60% train / 40% test, evaluates the current description (3 runs per query), calls the model to propose improvements based on failures, iterates up to 5 times, and returns JSON with `best_description`.

### Step 4: Apply the result

Update the skill's SKILL.md frontmatter with `best_description`. Show the user before/after and report scores.

---

## Platform-Specific Notes

### Browser environments
The viewer opens in the browser via `generate_review.py`. If a display is available, use `webbrowser.open()`. In headless/remote environments, use `--static <output_path>` to produce a standalone HTML file and provide a way to access it.

### Description optimization (run_loop.py)
The `--model-cmd` flag lets you configure how the model is invoked. Default is `"claude -p"` (Claude Code CLI). For other platforms, set the appropriate command:
- Claude Code: `--model-cmd "claude -p"`
- OpenCode CLI: `--model-cmd "opencode -p"`
- Other: any CLI that accepts `-p <prompt>` and returns output

### Parallel task execution
Subagent/parallel task spawning depends on the agent platform. Use the platform's native parallel execution mechanism. If parallel execution is unavailable, run tasks sequentially.

### Packaging
The `package_skill.py` script works anywhere with Python to create a `.skill` zip file. No agent-specific dependencies.

---

## Reference files

- `agents/grader.md` — How to evaluate assertions against outputs
- `agents/comparator.md` — How to do blind A/B comparison
- `agents/analyzer.md` — How to analyze benchmark results
- `references/schemas.md` — JSON structures for evals, grading, benchmark, etc.

---

## Core loop (summary)

- Figure out what the skill is about
- Draft or edit the skill
- Run the agent-with-access-to-the-skill on test prompts
- With the user, evaluate the outputs (use the viewer + quantitative evals)
- Repeat until satisfied
- Package the final skill

Good luck!

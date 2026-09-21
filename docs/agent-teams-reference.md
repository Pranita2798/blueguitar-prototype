# Agent Teams: Master Reference

Source: https://code.claude.com/docs/en/agent-teams (describes agent teams as of Claude Code v2.1.178+; retrieved 2026-09-18).
Agent teams are **experimental**. Re-check the source page when behavior here doesn't match what you observe.

This project enables them in [.claude/settings.local.json](../.claude/settings.local.json) via `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`.

---

## 1. What an agent team is

One Claude Code session is the **team lead**. It spawns **teammates**: separate, full Claude Code instances, each with its own context window. Teammates message each other directly, share a task list, and can be messaged by the user without going through the lead.

| Component | Role |
| :-- | :-- |
| Team lead | The main session. Spawns teammates, assigns work, synthesizes results. Fixed for the session's lifetime. |
| Teammates | Independent Claude Code instances working on assigned tasks. |
| Task list | Shared work items that teammates claim and complete (pending → in progress → completed, with dependencies). |
| Mailbox | Per-agent message inbox used by `SendMessage`. |

## 2. Decide first: team, subagents, or a single session

Check the lighter options before forming a team. Teams cost significantly more tokens and add coordination overhead.

| | Subagents | Agent teams |
| :-- | :-- | :-- |
| Context | Own window; result returns to caller | Own window; fully independent |
| Communication | Return a result to the caller (named subagents can also message each other) | Teammates message each other directly |
| Coordination | Main agent manages all work | Self-coordination via messages + shared task list |
| Best for | Focused tasks where only the result matters | Work that needs discussion, challenge, and collaboration |
| Token cost | Lower | Higher: every teammate is a separate Claude instance |

**Use a team when** teammates can work independently *and* benefit from talking to each other:

- Research and review from several angles at once, with findings shared and challenged
- New modules or features where each teammate owns a separate piece
- Debugging with competing hypotheses tested in parallel
- Cross-layer changes (frontend / backend / tests), one owner per layer

**Do not use a team for** sequential tasks, edits to the same files, work with many dependencies, or routine tasks. Use a single session or subagents.

Rule of thumb: *quick, focused workers that report back → subagents. Workers that need to share findings, challenge each other, and coordinate on their own → team.*

Other alternatives: cross-session messaging (pass findings between sessions the user runs), git worktrees (manual parallel sessions).

## 3. Preconditions and how a team actually forms

- `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` must be set (shell env or any settings.json `env` block). Without it, nothing team-related happens.
- **Interactive session required.** In non-interactive mode (`-p`), including Agent SDK sessions, Claude does not spawn teammates; a named subagent runs as an ordinary subagent even with teams enabled.
- There is no setup step. A teammate launches when the lead calls the **Agent tool with a `name`** while teams are enabled. Exceptions: the call is a fork, or passes `isolation` on the call itself. No confirmation prompt is shown to the user.
- Side effect: Claude sometimes names ordinary subagents so it can message them later. With teams enabled, those become teammates, so a team can form without anyone asking for one. If subagents are what you want, leave the `name` off or turn teams off (section 11).
- `TeamCreate` / `TeamDelete` no longer exist. `team_name` on the Agent tool is accepted but ignored.
- Subagents and teammates share the same agent panel, so the panel alone doesn't prove a team formed. If subagents were spawned instead, ask again and explicitly request an agent team.
- Cleanup is automatic when the session exits.

## 4. Designing the team

### Size

- No hard limit, but token cost scales linearly and coordination overhead grows with each teammate.
- **Start with 3–5 teammates.** For 15 independent tasks, 3 teammates is a good start.
- Three focused teammates often beat five scattered ones. Scale up only when simultaneous work genuinely helps.

### Roles

- Give each teammate a **distinct lens or ownership area** so they don't overlap (security / performance / test coverage; UX / architecture / devil's advocate).
- For investigation, make roles **adversarial**: each teammate pursues its own theory *and* tries to disprove the others. This counters anchoring, where a single investigator stops at the first plausible explanation.
- **Name every teammate** in the spawn instruction. Names are the address for messaging and for later prompts ("ask the researcher to shut down").

### Task sizing

- Too small: coordination overhead exceeds the benefit.
- Too large: teammates run too long without check-ins, risking wasted effort.
- Right: a self-contained unit with a clear deliverable (a function, a test file, a review).
- Aim for **5–6 tasks per teammate** so everyone stays productive and work can be reassigned if someone gets stuck.
- Declare dependencies. A pending task with unresolved dependencies can't be claimed; completing a task automatically unblocks its dependents.

### File ownership

Two teammates editing the same file leads to overwrites. Partition work so **each teammate owns a different set of files**.

### First teams

Start with research and review (reviewing a PR, researching a library, investigating a bug). These show the value of parallel exploration without the coordination problems of parallel implementation.

## 5. Writing spawn prompts

A teammate loads the project context a normal session would (CLAUDE.md, MCP servers, skills) plus the spawn prompt. **The lead's conversation history does not carry over.** Anything the teammate needs from the conversation has to be in the spawn prompt.

Include:

1. The goal and why it matters
2. Exact scope: paths, modules, PR number
3. Relevant facts already established (architecture, constraints, what has been ruled out)
4. What to focus on and what to leave alone (file ownership boundaries)
5. The deliverable and its format (e.g. findings with severity ratings)
6. Who else is on the team and when to message them

Example from the docs:

```text
Spawn a security reviewer teammate with the prompt: "Review the authentication module
at src/auth/ for security vulnerabilities. Focus on token handling, session
management, and input validation. The app uses JWT tokens stored in
httpOnly cookies. Report any issues with severity ratings."
```

### Prompt patterns

Parallel review, one lens per teammate:

```text
Spawn three teammates to review PR #142:
- One focused on security implications
- One checking performance impact
- One validating test coverage
Have them each review and report findings.
```

Competing hypotheses, debate structure:

```text
Users report the app exits after one message instead of staying connected.
Spawn 5 agent teammates to investigate different hypotheses. Have them talk to
each other to try to disprove each other's theories, like a scientific
debate. Update the findings doc with whatever consensus emerges.
```

Multi-angle design exploration:

```text
I'm designing a CLI tool that helps developers track TODO comments across
their codebase. Spawn three teammates to explore this from different angles:
one on UX, one on technical architecture, one playing devil's advocate.
```

Parallel implementation with a model choice:

```text
Spawn 4 teammates to refactor these modules in parallel. Use Sonnet for
each teammate.
```

## 6. Models, effort, and reusable roles

### Model selection order

First match wins:

1. The model the spawn prompt names for that teammate
2. The `model` in the subagent definition the teammate was spawned from (`inherit` = lead's model)
3. `CLAUDE_CODE_SUBAGENT_MODEL`, when set to anything other than `inherit`
4. The lead's current model

Notes:

- `CLAUDE_CODE_SUBAGENT_MODEL_FORCE=1` (v2.1.257+) skips sources 1 and 2.
- Before v2.1.251, `CLAUDE_CODE_SUBAGENT_MODEL` came first in this order.
- `teammateDefaultModel` was removed in v2.1.234; name the model in the prompt instead.
- An org `availableModels` allowlist can substitute a blocked model: a family alias resolves to the newest permitted version; anything else falls back to the lead's model.
- A teammate's model and fast mode are **fixed at spawn**. `/model` and `/fast` only change the lead.
- Teammates inherit the lead's effort level. `/effort` applies to a viewed teammate's later turns.

### Subagent definitions as teammate roles

Define a role once (e.g. `security-reviewer`, `test-runner`) in project, user, or managed subagent scope and reuse it as both a subagent and a teammate:

```text
Spawn a teammate using the security-reviewer agent type to audit the auth module.
```

What carries over from the definition:

| Field | In-process teammate | Split-pane teammate |
| :-- | :-- | :-- |
| `tools` | Limited to the list, plus `SendMessage` and (where Task tools exist) `TaskCreate`/`TaskGet`/`TaskList`/`TaskUpdate` | Limited to the list |
| `model` | Used when the spawn prompt names none | Same |
| Body | **Appended** to the default system prompt | **Replaces** the default system prompt |
| `skills` | Not applied; skills load from project/user settings | Same |
| `mcpServers` | Ignored; MCP loads from project/user settings | Applied |

The body difference matters when writing a role: a definition used in split-pane mode must stand alone as a complete system prompt, while in-process it only adds to the default one.

Do not pre-author or hand-edit team config. `~/.claude/teams/{team-name}/config.json` is runtime state and gets overwritten. There is no project-level team config; a file like `.claude/teams/teams.json` is not recognized. Reusable roles go in subagent definitions.

## 7. Running the team

### Task list

- The lead creates tasks; teammates work through them.
- Assignment is either explicit (lead assigns task to teammate) or **self-claim** (a teammate picks the next unassigned, unblocked task after finishing). File locking prevents double claims.
- Agents without the Task tools coordinate through messages instead.

### Communication

- Messages are delivered automatically; the lead does not poll.
- When a teammate finishes and stops, it notifies the lead with its final answer. A teammate that ends on an API error reports the failure and the error text.
- Message one teammate by name. To reach everyone, send one message per recipient.
- Messaging a stopped in-process teammate brings it back in the same session with its saved conversation and the message as its next prompt (not after `/resume`).
- A message wakes an in-process teammate that is waiting to retry a failed API request.

### Plan-first teammates

For complex or risky work, put the **lead in plan mode first**, then spawn the teammate. It works read-only until its plan is ready, then sends a plan approval request. Claude Code approves the plan in the lead's session automatically, without review. The teammate's later edits and commands still go through normal permission prompts.

### Lead discipline

- The lead sometimes starts implementing tasks itself. Wait for teammates to finish before proceeding.
- The lead can also decide the team is done before all tasks are complete. Verify the task list before wrapping up.
- Check in on progress, redirect approaches that aren't working, and synthesize findings as they arrive. Long unattended runs raise the risk of wasted effort.

### Shutdown

Ask by name: `Ask the researcher teammate to shut down`. The lead sends a shutdown request; the teammate approves (exits gracefully) or rejects with an explanation. Shutdown can be slow because the teammate finishes its current request or tool call first.

### User controls (in-process mode)

- Up/Down: select a teammate in the agent panel. Enter: open its transcript and message it. Escape: clear selection, or interrupt the teammate's turn while viewing it.
- `x` on a selected teammate stops it. Ctrl+T toggles the task list.
- While viewing a teammate, plain text and skills go to that teammate; built-in commands still run in the lead.
- Idle rows hide 30 seconds after the *whole panel* goes idle and reappear on the teammate's next turn. More than three idle teammates collapse into an `N idle agents` row. Hidden does not mean stopped.

## 8. Permissions and trust

- Teammates start with the lead's permission mode, except `dontAsk`, which is not inherited. `--dangerously-skip-permissions` on the lead applies to all teammates.
- Per-teammate permission modes can be changed after spawn, not at spawn time.
- Teammate permission prompts **appear in the lead session**. Pre-approve common operations in permission settings before spawning to cut interruptions.
- A message from another agent is marked as coming from another Claude session, not the user. A teammate cannot approve a permission prompt, supply consent on the user's behalf, or relay a denied action to another teammate to get around the check.
- In auto mode, the classifier treats relayed approval claims as untrusted and reviews every inter-agent message before delivery; blocked messages never arrive.
- A revived teammate only gets its project-level agent definition re-applied if the folder containing the agent file is trusted (a trusted parent folder doesn't count).

## 9. Quality gates with hooks

| Hook | Fires when | Exit code 2 |
| :-- | :-- | :-- |
| `TeammateIdle` | A teammate is about to go idle | Sends feedback and keeps the teammate working |
| `TaskCreated` | A task is being created | Prevents creation and sends feedback |
| `TaskCompleted` | A task is being marked complete | Prevents completion and sends feedback |

The `team_name` field in these hook payloads is deprecated.

## 10. Storage, display modes, and cost

### Storage

- Team name is session-derived: `session-` + first eight characters of the session ID.
- Team config: `~/.claude/teams/{team-name}/config.json` (removed when the session ends). Holds a `members` array with each member's name, agent ID, and agent type; the lead's type is always `team-lead`. Teammates can read it to discover each other.
- Mailboxes: `~/.claude/teams/{team-name}/inboxes/{agent-name}.json`. Malformed entries are reported and removed; valid messages still deliver. A send only counts as sent when the write succeeds.
- Task list: `~/.claude/tasks/{team-name}/`. Persists locally (never uploaded) so resumed sessions keep tasks; retention follows `cleanupPeriodDays`.

### Display modes

Set `teammateMode` in `~/.claude/settings.json`, or pass `claude --teammate-mode <mode>` for one session (the flag is experimental and absent from `claude --help`).

| Mode | Behavior |
| :-- | :-- |
| `in-process` (default) | All teammates in the main terminal. Works anywhere. |
| `auto` | Split panes when already inside tmux, or in iTerm2 with the `it2` CLI; otherwise in-process. |
| `tmux` | Split panes; auto-detects tmux vs iTerm2. |
| `iterm2` (v2.1.186+) | Native iTerm2 panes; requires the `it2` CLI and the iTerm2 Python API. |

Split panes are **not supported** in VS Code's integrated terminal, Windows Terminal, or Ghostty. The docs also note tmux "traditionally works best on macOS".

### Cost

- Tokens scale with the number of active teammates. Worth it for research, review, and new feature work; not for routine tasks.
- An in-process teammate's prompt cache holds for five minutes by default. Set `subagentPromptCacheTtl` to `1h` to extend it (1-hour cache writes are billed at a higher rate).

## 11. Limitations and troubleshooting

### Known limitations

- **No resume for in-process teammates.** `/resume` and `/rewind` don't restore them; the lead may message teammates that no longer exist. Spawn new ones.
- **Task status can lag.** Teammates sometimes fail to mark tasks complete, blocking dependents. Check whether the work is done, then update the status or nudge the teammate.
- **One team per session.** No extra named teams, no sharing a team across sessions.
- **No nested teams.** Only the lead spawns teammates.
- **No background subagents from in-process teammates.** Their subagents run in the foreground; `background: true` definitions error, and `run_in_background: true` either errors or silently runs in the foreground.
- **Lead is fixed.** No promotion or transfer of leadership.
- **Slow shutdown**, and permission modes can't be set per teammate at spawn.

### Troubleshooting

| Symptom | Fix |
| :-- | :-- |
| Teammates not appearing | Look in the agent panel; an idle row may be hidden or collapsed, so message the teammate by name. Check the task was complex enough to warrant a team. For split panes, confirm `tmux` is on PATH or `it2` is installed with the Python API enabled. |
| Subagents spawned instead of a team | Ask again and explicitly request an agent team. |
| Teammates spawned instead of subagents | Set `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS` to `0`. Takes effect on save, no restart needed. Project, local, `--settings`, and managed settings override user settings, so a `1` in any of them wins. |
| Too many permission prompts | Pre-approve common operations in permission settings before spawning. |
| Teammate stopped early after an error | Open its transcript, then give it further instructions or spawn a replacement. |
| Lead finished too early | Tell it to keep going. |
| Lead doing the work itself | Tell it to wait for teammates to complete their tasks. |
| Orphaned tmux session | `tmux ls`, then `tmux kill-session -t <session-name>`. |

## 12. This project's environment (BlueGuitar, Windows 11)

Not from the docs; recorded from setting this machine up on 2026-09-18.

- **Permissions teammates inherit.** [.claude/settings.local.json](../.claude/settings.local.json) sets `defaultMode: acceptEdits`, allows Read/Write/Edit/Glob/Grep and `npm`, `npx`, `node`, `mkdir`, `cp`, `ls`, `cat`, `file`, `git`; denies `rm -rf`, `sudo`, `curl`, `wget`, `ssh`; asks for `git push` and `npm publish`. Plan teammate work around the deny list: a teammate cannot download anything with `curl`/`wget`.
- **Where teams can form.** Only in an interactive `claude` session. Sessions run through the Agent SDK or `-p` fall back to ordinary subagents.
- **Live split-pane view.** tmux doesn't run natively on Windows, so it lives in WSL: Ubuntu (WSL 2) with tmux 3.6. Launch from the Ubuntu window, not the VS Code terminal:
  ```bash
  cd /mnt/d/WebDev/BlueGuitar
  tmux new -s blueguitar
  claude --teammate-mode tmux
  ```
- **Gotcha: the wrong `claude` inside WSL.** WSL inherits the Windows PATH, so `claude` can resolve to `/mnt/c/nvm4w/nodejs/claude`, a shim that launches the Windows `claude.exe`. A Windows process can't drive tmux, so no panes appear. `which claude` inside Ubuntu must print a Linux path (e.g. `~/.local/bin/claude`) from the native installer. The Linux install has its own login.
- **Unverified.** Split panes under WSL tmux have not yet been confirmed working on this machine. If they fail, in-process mode (the default) works in any terminal.
- **Performance.** File access through `/mnt/d` is slower than the Linux filesystem; fine for watching agents, slow for heavy builds.

## 13. Pre-spawn checklist

1. Is parallel, communicating work actually needed, or would subagents or a single session do?
2. Is the session interactive, with teams enabled?
3. 3–5 teammates, each with a distinct lens or file ownership, each given a name?
4. Does every spawn prompt stand alone (goal, scope, known facts, boundaries, deliverable)?
5. Tasks sized as self-contained deliverables, about 5–6 per teammate, dependencies declared?
6. No two teammates editing the same file?
7. Model chosen per teammate where cost matters?
8. Common operations pre-approved so prompts don't pile up in the lead, and nothing the team needs sits on the deny list?
9. Plan mode on the lead first, if the work is risky?
10. A plan for synthesis: who collects findings, and what the final output is?
11. Shut teammates down by name when the work is verified complete.

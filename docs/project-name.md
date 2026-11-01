# Project name

> Why the project is called **Rabid Printer**, what it was called before, and
> the names that were considered and rejected.

## Decision

The project is named **Rabid Printer**.

It is a literal translation of the Russian joke «Бешеный принтер». In Russian
politics «бешеный принтер» describes a politician who, when getting angry,
issues tons of meaningless laws and regulations — like a printer that has run
out of control and keeps spitting out paper. A photographer or cameraman who
shoots far too many frames (say, 7 000 shots from a short vacation) is the same
thing: too many photos that are hard to manage — exactly what this tool exists
to handle.

The word «бешеный» maps to the English *rabid* in a way the alternatives do
not, because *rabid* carries both senses at once:

- **medical** — affected by rabies («бешеная собака» = a rabid dog);
- **figurative** — fanatical, extreme, out of control (a "rabid fan").

That double meaning is the whole joke, so *rabid* (not "mad", "crazy", "insane"
or "crazed") is the right translation. *Printer* is kept as-is: «принтер» is the
English loanword for the device, and in both languages "printer" also works as a
person who churns out documents.

## Derived identifiers

The rename touched these identifiers across the repo:

| What | Old | New |
| --- | --- | --- |
| Product name (README / UI title) | App Photo Assistant | Rabid Printer |
| CSS brand token | `apph-` / `--apph-` | `apprinter-` / `--apprinter-` |
| Frontend package name | `apphotoassistant-frontend` | `rabid-printer-frontend` |
| Backend env var | `APP_PHOTO_ASSISTANT_LIBRARY` | `RABID_PRINTER_LIBRARY` |
| Backend data dir | `~/.apphotoassistant` | `~/.rabid-printer` |
| Git repo | `AP-Photos-Manage` | unchanged (for now) |
| Local directory | `apphotoassistant` | unchanged (for now) |

The CSS token uses the author's initials (`ap`) plus "printer" — `apprinter-` —
rather than a bare `rabid-`, per the author's preference.

The GitHub repo (`AP-Photos-Manage`) and the local directory
(`apphotoassistant`) are intentionally kept under their old names for now — no
rename is planned for them.

## Names used before the rename

- Git repo: `AP-Photos-Manage`
- Local directory & frontend package: `apphotoassistant` /
  `apphotoassistant-frontend`
- README & UI title: "App Photo Assistant"
- Backend: `app_name = "App Photo Assistant"`, env var
  `APP_PHOTO_ASSISTANT_LIBRARY`, default data dir `~/.apphotoassistant`

## Rejected suggestions

### Initial AI suggestions

- **Cull** — "Cull the shoot, keep the story."
- **Keepr / Keeper** — "Find your keepers."
- **Curio** — "A cabinet for your best shots."
- **Sift** — "Sift the shoot."
- **Librarian** — "A librarian for your photo library."
- **Steward** — the dignified alternative to "manager."

### AI suggestions after the "crazy printer" idea

- **Mad Printer** — Short, memorable, slightly eccentric. Sounds like a character or nickname.
- **Crazy Printer** — Direct, understandable, playful. A little childish, perhaps.
- **Raving Printer** — A printer that is going berserk. Unusual, humorous.
- **Rabid Printer** — Very close to the rabies association. Aggressive, absurd, memorable.
- **Frenzied Printer** — Captures the uncontrolled, frantic activity. More literary.
- **Insane Printer** — Emphasizes madness, but sounds somewhat unnatural as a product name.
- **Runaway Printer** — A machine that has gotten out of control. Good metaphor, but loses the madness.

### Further machine-generated suggestions

- **Shutterstorm** — an uncontrollable storm of shutter releases.
- **Photo Frenzy** — a frenzy of photography.
- **Frame Factory** — a machine producing endless frames.
- **Shotstorm** — an avalanche of photographs.
- **Trigger Happy** — an expression for someone who shoots too readily. Has a nice double meaning with cameras.
- **The Shot Machine** — a machine that just keeps shooting.

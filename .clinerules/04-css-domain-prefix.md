# CSS — domain-prefix model

The idea to keep: **a class prefix expresses a domain.** Every class belongs to a
domain, and that domain is encoded as the class prefix. Two classes sharing a
prefix are the same thing and should be styled together.

- A class name is a chain read left to right, each part narrowing the domain:
  brand → role → element/modifier.

  ```
  apprinter                brand (Rabid Printer)
  apprinter-btn            role: buttons
  apprinter-btn-primary    role + modifier
  apprinter-dialog         component
  apprinter-dialog-header  component + part
  ```

- **Brand token.** `apprinter-` namespaces the whole system so it stays unique and
  portable (no collision with other libraries or projects). Keep the same token
  everywhere.
- **Roles, not locations.** Prefix by *what a thing is*, never *where it sits*.
  A date picker is `apprinter-date-picker`, not `apprinter-sidebar-date-picker`.
- **Shared roles share a prefix.** All form controls share `apprinter-form-`, all
  buttons `apprinter-btn-`, utilities `apprinter-u-`.

Naming specifics (hyphen style, element/modifier syntax) and the rest of CSS
style are intentionally left open for now.

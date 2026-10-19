# CSS — domain-prefix model

The idea to keep: **a class prefix expresses a domain.** Every class belongs to a
domain, and that domain is encoded as the class prefix. Two classes sharing a
prefix are the same thing and should be styled together.

- A class name is a chain read left to right, each part narrowing the domain:
  brand → role → element/modifier.

  ```
  apph                brand (App Photo Assistant)
  apph-btn            role: buttons
  apph-btn-primary    role + modifier
  apph-dialog         component
  apph-dialog-header  component + part
  ```

- **Brand token.** `apph-` namespaces the whole system so it stays unique and
  portable (no collision with other libraries or projects). Keep the same token
  everywhere.
- **Roles, not locations.** Prefix by *what a thing is*, never *where it sits*.
  A date picker is `apph-date-picker`, not `apph-sidebar-date-picker`.
- **Shared roles share a prefix.** All form controls share `apph-form-`, all
  buttons `apph-btn-`, utilities `apph-u-`.

Naming specifics (hyphen style, element/modifier syntax) and the rest of CSS
style are intentionally left open for now.

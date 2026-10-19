# Architecture & imports

- **Relative imports only.** Import neighbours via `./` / `../` (frontend) or
  `from .` / `from ..` (backend Python). Never import through an app-root path,
  so each module stays self-contained and can be relocated without breaking
  callers.
- **Independent, reusable modules.** A module can be moved or extracted into a
  submodule on its own. Keep its public surface explicit and its dependencies
  close; minimize reaching outside its folder.

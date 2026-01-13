# Default Light Theme (Keep Dark Mode)

Use this instruction for AstroWind projects that should load in light mode by default but keep the dark mode toggle.

```
You are updating an AstroWind project so it loads in light mode by default, without disabling dark mode.

Requirements:
- Keep the dark mode toggle working and persistent.
- Do not force dark mode from OS preference unless the config explicitly says `system`.
- Only honor `localStorage.theme` if the user explicitly toggled the theme.

Steps to implement:
1) Set `ui.theme: 'light'` in `src/config.yaml`.
2) In `src/components/common/ApplyColorMode.astro`, compute the initial theme with a guard key like `aw-theme-explicit`.
   - If `ui.theme` ends with `:only`, apply that theme.
   - Else if `aw-theme-explicit` is set and `localStorage.theme` exists, apply that.
   - Else if `ui.theme === 'system'`, apply OS preference.
   - Else apply `ui.theme` (light).
3) In `src/components/common/BasicScripts.astro`, mirror the same init logic and set `aw-theme-explicit` when the user toggles the theme.

Deliverables:
- Updated `src/config.yaml`, `src/components/common/ApplyColorMode.astro`, and `src/components/common/BasicScripts.astro`.
- Ensure light loads first for new visitors and dark persists after a user toggle.
```

import { site } from "../data/site";
import { contact } from "../data/contact";
import { experience } from "../data/experience";
import { projects } from "../data/projects";

const STATUS_LABEL = {
  resolved: "resolved",
  monitoring: "monitoring",
  "in-progress": "in-progress",
};

// One shared command set for both the Ctrl/Cmd+K overlay and full-page
// terminal mode, so they can never drift apart. Returns the lines to
// print plus an optional `action` the caller performs — the command
// engine itself never touches the router, DOM, or view-mode state
// directly, since only the caller knows how to navigate / switch mode
// in its own context (modal vs full page).
//
// `context.canSwitchMode` controls whether `site`/`gui` is offered —
// only meaningful when actually running inside terminal mode.
export function runTerminalCommand(raw, context = {}) {
  const trimmed = raw.trim();
  const lines = [];
  let action = null;

  if (!trimmed) return { lines, action };

  const [cmd, ...rest] = trimmed.toLowerCase().split(/\s+/);
  const arg = rest.join(" ");

  function print(text, tone = "output") {
    lines.push({ text, tone });
  }

  switch (cmd) {
    case "help": {
      print("whoami            short bio");
      print("experience        work history (alias: history)");
      print("projects          list everything shipped (alias: ls)");
      print("status            deployment-log style summary");
      print("open <slug>       jump to a project, e.g. open zwazo");
      print("resume            download the CV (alias: cat resume)");
      print("contact           email / github / linkedin");
      print("clear             clear this screen");
      if (context.canSwitchMode) {
        print("site              switch back to the regular site (alias: gui, exit)");
      } else {
        print("exit              close (alias: close, q)");
      }
      break;
    }

    case "whoami": {
      print(site.title);
      print(site.description);
      break;
    }

    case "history":
    case "experience": {
      experience.forEach((role) => {
        print(`${role.company} — ${role.title}`, "accent");
        print(`  ${role.dates}`);
      });
      break;
    }

    case "ls":
    case "projects": {
      projects.forEach((p) => {
        print(`[${STATUS_LABEL[p.status] ?? p.status}] ${p.slug}`, "accent");
        print(`  ${p.title}`);
      });
      print("");
      print("run 'open <slug>' to jump to one");
      break;
    }

    case "status": {
      const total = projects.length;
      const resolved = projects.filter((p) => p.status === "resolved").length;
      const monitoring = projects.filter((p) => p.status === "monitoring").length;
      const inProgress = projects.filter((p) => p.status === "in-progress").length;
      print(
        `${total} systems tracked · ${resolved} resolved · ${monitoring} monitoring${
          inProgress ? ` · ${inProgress} in-progress` : ""
        }`,
        "accent"
      );
      print("0 unresolved incidents this session");
      break;
    }

    case "open": {
      const match = projects.find((p) => p.slug === arg);
      if (!match) {
        print(`no project matching '${arg}'`, "error");
        print(`try: ${projects.map((p) => p.slug).join(", ")}`);
        break;
      }
      print(`→ opening ${match.slug}...`, "accent");
      action = { type: "navigate", href: `/projects#${match.slug}` };
      break;
    }

    case "resume":
    case "cat": {
      if (cmd === "cat" && arg !== "resume") {
        print(`cat: ${arg || "(missing file)"}: no such file`, "error");
        break;
      }
      print("→ downloading resume.pdf...", "accent");
      action = { type: "download", href: contact.resumeHref };
      break;
    }

    case "contact": {
      print(`email     ${contact.email}`);
      print(`github    ${contact.github}`);
      print(`linkedin  ${contact.linkedin}`);
      break;
    }

    case "clear": {
      action = { type: "clear" };
      break;
    }

    case "site":
    case "gui": {
      if (context.canSwitchMode) {
        print("→ switching to site view...", "accent");
        action = { type: "mode", value: "site" };
      } else {
        print(`command not found: ${cmd} — type 'help' for a list`, "error");
      }
      break;
    }

    case "exit":
    case "close":
    case "q": {
      action = context.canSwitchMode ? { type: "mode", value: "site" } : { type: "close" };
      break;
    }

    default: {
      print(`command not found: ${cmd} — type 'help' for a list`, "error");
    }
  }

  return { lines, action };
}
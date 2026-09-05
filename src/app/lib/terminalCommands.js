import { site } from "../data/site";
import { contact } from "../data/contact";
import { experience } from "../data/experience";
import { projects } from "../data/projects";
import { skillGroups } from "../data/skills";

const STATUS_LABEL = {
  resolved: "resolved",
  monitoring: "monitoring",
  "in-progress": "in-progress",
};

// One shared command set for both the Ctrl/Cmd+K overlay and full-page
// terminal mode, so they can never drift apart. Returns the lines to
// print plus an optional `action` the caller performs - the command
// engine itself never touches the router, DOM, or view-mode state
// directly, since only the caller knows how to navigate / switch mode
// in its own context (modal vs full page).
//
// `context.canSwitchMode` controls whether `site`/`gui` is offered -
// only meaningful when actually running inside terminal mode.
export function runTerminalCommand(raw, context = {}) {
  const trimmed = raw.trim();
  const lines = [];
  let action = null;

  if (!trimmed) return { lines, action };

  const [cmd, ...rest] = trimmed.toLowerCase().split(/\s+/);
  const arg = rest.join(" ");

  function print(text, tone = "output", copyValue) {
    lines.push({ text, tone, copyValue });
  }

  switch (cmd) {
    case "help": {
      print("whoami            short bio");
      print("about             detailed bio");
      print("experience        work history (alias: history)");
      print("timeline          work history with dates");
      print("projects          list everything shipped (alias: ls)");
      print("read <slug>       read a project's case study");
      print("search <term>     find projects and technologies");
      print("random            open a random project");
      print("skills            list skills by category");
      print("stack             list every technology used");
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

    case "about": {
      print(site.title, "accent");
      print("Cloud and Platform Engineer focused on infrastructure that holds up under real conditions.");
      print("Focus: cloud infrastructure, DevOps practice, and site reliability engineering.");
      break;
    }

    case "history":
    case "experience": {
      experience.forEach((role) => {
        print(`${role.company} - ${role.title}`, "accent");
        print(`  ${role.dates}`);
      });
      break;
    }

    case "timeline": {
      experience.forEach((role) => print(`${role.dates}  ${role.company} - ${role.title}`, "accent"));
      break;
    }

    case "skills": {
      skillGroups.forEach((group) => {
        print(group.name, "accent");
        print(`  ${group.items.join(" · ")}`);
      });
      break;
    }

    case "stack": {
      const stack = [...new Set(projects.flatMap((project) => project.stack))].sort();
      print(stack.join(" · "), "accent");
      print(`${stack.length} distinct technologies across ${projects.length} projects.`);
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

    case "uptime": {
      const careerStart = new Date("2019-12-01T00:00:00Z");
      const years = ((Date.now() - careerStart.getTime()) / (365.25 * 24 * 60 * 60 * 1000)).toFixed(1);
      print(`${years} years in the field`, "accent");
      print("Since December 2019.");
      break;
    }

    case "tree": {
      print("neal-portfolio/", "accent");
      print("├── about/");
      print("├── contact/");
      print("├── projects/");
      print("├── experience/");
      print("└── terminal/");
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

    case "read": {
      const match = projects.find((p) => p.slug === arg);
      if (!match) {
        print(`no project matching '${arg}'`, "error");
        print(`try: ${projects.map((p) => p.slug).join(", ")}`);
        break;
      }
      print(match.title, "accent");
      print(`problem  ${match.problem}`);
      print(`response ${match.response}`);
      print(`result   ${match.result}`);
      break;
    }

    case "search": {
      if (!arg) {
        print("usage: search <term>", "error");
        break;
      }
      const term = arg.toLowerCase();
      const matches = projects.filter((project) =>
        [project.title, project.problem, project.response, project.result, ...project.stack]
          .join(" ")
          .toLowerCase()
          .includes(term)
      );
      if (!matches.length) {
        print(`no matches for '${arg}'`, "error");
        break;
      }
      matches.forEach((project) => print(`${project.slug} - ${project.title}`, "accent"));
      break;
    }

    case "neofetch": {
      print("neal@portfolio", "accent");
      print("─────────────");
      print("role       Cloud Platform / DevOps / SRE");
      print(`projects   ${projects.length}`);
      print(`stack      ${new Set(projects.flatMap((project) => project.stack)).size} technologies`);
      print("runtime    Next.js / React");
      break;
    }

    case "random": {
      const project = projects[Math.floor(Math.random() * projects.length)];
      print(`→ opening ${project.slug}...`, "accent");
      action = { type: "navigate", href: `/projects#${project.slug}` };
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
      print(`email     ${contact.email}`, "output", contact.email);
      print(`github    ${contact.github}`, "output", contact.github);
      print(`linkedin  ${contact.linkedin}`, "output", contact.linkedin);
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
        print(`command not found: ${cmd} - type 'help' for a list`, "error");
      }
      break;
    }

    // A couple of unlisted commands for anyone curious enough to try them -
    // deliberately left out of `help` so only power users find them.
    case "sudo": {
      print(`${arg ? `sudo: ${arg}: ` : ""}permission denied - nice try though.`, "error");
      break;
    }

    case "coffee": {
      print("☕ brewing...", "accent");
      print("done. +10% focus for the next 25 minutes.");
      break;
    }

    case "exit":
    case "close":
    case "q": {
      action = context.canSwitchMode ? { type: "mode", value: "site" } : { type: "close" };
      break;
    }

    default: {
      print(`command not found: ${cmd} - type 'help' for a list`, "error");
    }
  }

  return { lines, action };
}
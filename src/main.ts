import * as core from "@actions/core";
import * as github from "@actions/github";

async function run(): Promise<void> {
  try {
    const githubToken: string = core.getInput("github-token", {required: true});

    const issue = github.context.payload.issue;
    if (!issue) {
      core.warning("no issue, return");
      return;
    }
    core.info(`issue html_url: ${issue.html_url}`);
    core.warning(`issue number: ${issue.number}`);
    core.warning(`issue body: ${issue.body}`);
    core.warning(`issue: ${JSON.stringify(issue)}`);
    const body = issue.body;
    if (!body) {
      core.warning("empty issue body, return");
      return;
    }
    if (!body.includes("www.youtube.com/watch?v=")) {
      core.warning("not youtube video, return");
      return;
    }
    core.setOutput("url", body.trim());
    // const client = new github.GitHub(githubToken);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();

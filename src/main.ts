import * as core from "@actions/core";
import * as github from "@actions/github";

async function run(): Promise<void> {
  try {
    const githubToken: string = core.getInput("githubToken", {required: true});

    const issue = github.context.payload.issue;
    if (!issue) {
      core.debug("no issue, return");
      return;
    }

    core.debug(`issue number: ${issue.number}`);
    core.debug(`issue body: ${issue.body}`);
    // const client = new github.GitHub(githubToken);
    core.setOutput("issue body", issue.body);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();

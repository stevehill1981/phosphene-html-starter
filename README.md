# My first website

A plain HTML starting point for the Phosphene beginner course. No Astro, package installation or command typing is needed for the first lesson.

## Make your own copy

Choose **Use this template → Create a new repository**. Use your personal GitHub account, name it **my-first-website**, and choose **Public** for the free GitHub Pages route. This makes the files public; use practice text rather than personal details. Choose only the default branch.

In your new repository, choose **Code → Codespaces → Create codespace on main**. Use the two-core machine. The first start can take several minutes. The editor should open `index.html` and start the preview automatically.

Choose **Open in Browser** in the preview notification. If it is missing, find the **Ports** panel and open **My website preview**, port **8000**, in the browser. Keep its visibility **Private**. This is your working preview, not your published website.

## Make one change

1. In `index.html`, find `<h1>Places I like</h1>`.
2. Replace only `Places I like` with `Places I want to visit`.
3. Choose **File → Save** in the editor. On a keyboard, Windows uses Ctrl+S; macOS uses Command+S. On iPad, use the menu first if the shortcut affects Safari.
4. Switch to the preview tab and refresh that page. You should see the new heading.

Saving updates the file in the workspace. To keep a copy on GitHub, open **Source Control**, review the changed file, choose **Stage Changes** for that file, enter a short message, **Commit**, then **Sync Changes** or **Push**. Check `index.html` on github.com to confirm the change arrived. None of this enables public Pages hosting on its own.

## Stop and come back

Before taking a break, save, commit and sync your work. Visit [Your codespaces](https://github.com/codespaces), open the `…` menu for this workspace and choose **Stop codespace**. Closing its browser tab alone does not stop it. Later, open that same codespace instead of making another one. Saved workspace files survive a stop; unsynced work can be lost if the workspace is deleted.

## Keep it free

GitHub Free personal accounts currently include 120 core-hours per month (about 60 running hours on a two-core machine) and 15 GB-month of storage. Both are finite. Stopped workspaces still use storage. Do not add a payment method for this course. Without one, GitHub blocks usage when the allowance runs out. If your account already has a payment method, have someone verify that paid Codespaces usage is blocked before you start. A budget email alone is not a spending block.

Use one workspace and stop it when finished. The organisation route is optional and comes later; organisations do not receive the personal free Codespaces allowance. No paid extension, AI subscription or domain is required.

## Publish when ready

In your repository on github.com, choose **Settings → Pages → Deploy from a branch**, then **main** and **/(root)**, and save. Wait for the Pages deployment to finish, then use the **Visit site** link. Your project address will normally end in `/my-first-website/`. Subsequent synced changes on that branch will update the public site. Preview edits locally first.

## If something gets stuck

- **No preview:** wait for setup to finish, then look for port 8000 in **Ports**. Stop and resume this same workspace if the startup failed. Do not make another codespace to hide the failure.
- **Heading has not changed:** save the right `index.html`, then refresh the preview tab. Check that you changed the words between the tags.
- **Sync fails:** keep the workspace, note the message and ask for help. Do not delete or force-push it.
- **Allowance used up:** stop and wait for renewal. Do not enable paid usage to continue.
- **Touch selection is awkward:** use an external keyboard, or continue on Windows/macOS. The exact iPad workflow is awaiting a real learner test.

## What is included

`index.html` is the learner's page. `.devcontainer/` contains the workspace setup and a small static-file preview helper using Node's built-in modules. The preview starts at port 8000, does not change your HTML, and does not publish it. GitHub's standard stable universal container supplies Node; no npm package is installed. The public site needs only the HTML file.

The starter has local HTTP/startup checks. A hosted Codespaces cold start, GitHub Pages deployment and real iPad editing have not yet been verified. See the accompanying course trial for the observation checklist.

Official references checked 22 October 2026: [Codespaces usage](https://docs.github.com/en/billing/concepts/product-billing/github-codespaces), [starting/stopping](https://docs.github.com/en/codespaces/developing-in-a-codespace/stopping-and-starting-a-codespace), [template copies](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template), [Pages settings](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

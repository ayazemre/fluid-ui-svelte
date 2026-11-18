#!/usr/bin/env bash

build_package() {
  # Function metadata
  # Description: Builds the package with the npm build script, which builds the site and the library and runs the publish checks, from the repository root. It writes the progress to stderr and the output of the build to stderr, and nothing to stdout.
  # Input: none.
  # Exit: 0 when the build finishes, 1 when the repository root cannot be resolved or the build fails.
  local repository_root_path=""
  repository_root_path="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd -P)" || return 1

  printf '\033[94m%s\033[0m\n' "Starting build of the package with npm run build" >&2
  (cd "$repository_root_path" && npm run build) >&2 || {
    printf '\033[31m%s\033[0m\n' "Error: the build of the package failed, run npm run build to see the failing step" >&2
    return 1
  }

  printf '\033[32m%s\033[0m\n' "Build of the package finished" >&2
  return 0
}

check_changelog_version() {
  # Function metadata
  # Description: Checks that CHANGELOG.md holds an entry for the version in package.json, written as "## [version]". It writes the progress and the result to stderr and nothing to stdout.
  # Input: none.
  # Exit: 0 when the entry exists, 1 when the repository root cannot be resolved, the changelog cannot be read, the version cannot be read, or the entry is missing.
  local repository_root_path="" changelog_file_path="" package_version=""
  repository_root_path="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd -P)" || return 1

  changelog_file_path="$repository_root_path/CHANGELOG.md"
  if [ ! -r "$changelog_file_path" ]; then
    printf '\033[31m%s\033[0m\n' "Error: the changelog cannot be read: $changelog_file_path" >&2
    return 1
  fi

  printf '\033[94m%s\033[0m\n' "Starting check of the changelog entry for the package version" >&2
  package_version="$(read_package_field --field_name=version)" || return 1
  if ! grep -Fq "## [$package_version]" "$changelog_file_path"; then
    printf '\033[31m%s\033[0m\n' "Error: CHANGELOG.md has no entry for version $package_version, add a line '## [$package_version] - YYYY-MM-DD'" >&2
    return 1
  fi

  printf '\033[32m%s\033[0m\n' "Check of the changelog finished, CHANGELOG.md has an entry for $package_version" >&2
  return 0
}

check_format() {
  # Function metadata
  # Description: Runs the format check of the repository through the npm format script with --check, so no file is written. It writes the progress and the output of the formatter to stderr and nothing to stdout.
  # Input: none.
  # Exit: 0 when every file uses the format, 1 when the repository root cannot be resolved, a file differs, or the formatter fails.
  local repository_root_path=""
  repository_root_path="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd -P)" || return 1

  printf '\033[94m%s\033[0m\n' "Starting format check" >&2
  (cd "$repository_root_path" && npm run format -- --check) >&2 || {
    printf '\033[31m%s\033[0m\n' "Error: the format check failed, run npm run format to write the format of the files" >&2
    return 1
  }

  printf '\033[32m%s\033[0m\n' "Format check finished" >&2
  return 0
}

check_lint() {
  # Function metadata
  # Description: Runs oxlint in report mode, without --fix, so no file is written. It writes the progress and the findings of the linter to stderr and nothing to stdout.
  # Input: none.
  # Exit: 0 when the linter reports no error, 1 when the repository root cannot be resolved or the linter reports an error.
  local repository_root_path=""
  repository_root_path="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd -P)" || return 1

  printf '\033[94m%s\033[0m\n' "Starting lint check" >&2
  (cd "$repository_root_path" && npx oxlint) >&2 || {
    printf '\033[31m%s\033[0m\n' "Error: the lint check failed, run npm run lint to fix the findings that the linter can fix" >&2
    return 1
  }

  printf '\033[32m%s\033[0m\n' "Lint check finished" >&2
  return 0
}

check_node_version() {
  # Function metadata
  # Description: Checks that node and npm are on the PATH and that node is version 24 or higher, the version the package requires. It writes the progress and the reason of any failure to stderr and nothing to stdout.
  # Input: none.
  # Exit: 0 when node 24 or higher and npm are available, 1 when node or npm is missing or node is older than 24.
  local minimum_node_major_version="24" node_major_version=""

  printf '\033[94m%s\033[0m\n' "Starting check of node and npm" >&2
  if ! command -v npm >/dev/null 2>&1; then
    printf '\033[31m%s\033[0m\n' "Error: npm is not on the PATH, install node $minimum_node_major_version or higher" >&2
    return 1
  fi

  node_major_version="$(node -p 'process.versions.node.split(".")[0]')" || {
    printf '\033[31m%s\033[0m\n' "Error: node is not on the PATH, install node $minimum_node_major_version or higher" >&2
    return 1
  }
  if [ "$node_major_version" -lt "$minimum_node_major_version" ]; then
    printf '\033[31m%s\033[0m\n' "Error: node $node_major_version is installed, the package requires node $minimum_node_major_version or higher" >&2
    return 1
  fi

  printf '\033[32m%s\033[0m\n' "Check of node and npm finished, node major version is $node_major_version" >&2
  return 0
}

check_repository_shell_syntax() {
  # Function metadata
  # Description: Checks that every shell script under the repository root parses with bash -n. It writes the line Every script parses to stdout when all of them parse, and the list of scripts that do not parse to stderr.
  # Input: none.
  # Exit: 0 when every shell script parses, 1 when the repository root cannot be resolved or a script does not parse.
  local repository_root_path="" script_file_path="" unparsed_script_paths=""
  repository_root_path="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd -P)" || return 1

  while IFS= read -r script_file_path; do
    if ! bash -n "$script_file_path"; then
      unparsed_script_paths="$unparsed_script_paths $script_file_path"
    fi
  done < <(find "$repository_root_path" \( -name node_modules -o -name dist -o -name build \) -prune -o -type f -name "*.sh" -print)

  if [ -n "$unparsed_script_paths" ]; then
    printf '\033[31m%s\033[0m\n' "Error: the scripts do not parse:$unparsed_script_paths" >&2
    return 1
  fi

  printf '%s\n' "Every script parses"
  return 0
}

commit_repository_changes() {
  # Function metadata
  # Description: Stages every change of the repository and commits it with the commit message. It refuses to commit when the working tree has no change, and it writes the progress and the reasons to stderr and nothing to stdout.
  # Input: --commit_message=<commit message>.
  # Exit: 0 when the commit is created, 1 when the repository root cannot be resolved, the working tree has no change, or git fails, 2 when --commit_message is missing.
  local repository_root_path="" commit_message="" argument="" changed_entries=""
  repository_root_path="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd -P)" || return 1

  for argument in "$@"; do
    case "$argument" in
      --commit_message=*) commit_message="${argument#--commit_message=}" ;;
    esac
  done

  if [ -z "$commit_message" ]; then
    printf '\033[31m%s\033[0m\n' "Error: commit_repository_changes needs --commit_message" >&2
    return 2
  fi

  printf '\033[94m%s\033[0m\n' "Starting commit of the changes" >&2
  changed_entries="$(cd "$repository_root_path" && git status --porcelain)" || {
    printf '\033[31m%s\033[0m\n' "Error: the working tree status could not be read, check that the repository is a git repository" >&2
    return 1
  }
  if [ -z "$changed_entries" ]; then
    printf '\033[31m%s\033[0m\n' "Error: there is no change to commit, the working tree is clean" >&2
    return 1
  fi

  (cd "$repository_root_path" && git add --all && git commit --message "$commit_message") >&2 || {
    printf '\033[31m%s\033[0m\n' "Error: the commit failed, check the git user name and email of the repository" >&2
    return 1
  }

  printf '\033[32m%s\033[0m\n' "Commit of the changes finished" >&2
  return 0
}

install_browsers() {
  # Function metadata
  # Description: Installs the Chromium browser with the Playwright installer, run from the repository root, so the browser tests can start. It also installs the system dependencies of the browser when the CI variable is set, since that needs root on a CI runner. It writes the progress and the output of the installer to stderr, and nothing to stdout.
  # Input: the CI environment variable, which adds the system dependencies when it is set.
  # Exit: 0 when the browser is installed, 1 when the repository root cannot be resolved or the installer fails.
  local repository_root_path="" continuous_integration_variable="${CI:-}" playwright_install_flags=""
  repository_root_path="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd -P)" || return 1

  if [ -n "$continuous_integration_variable" ]; then
    playwright_install_flags="--with-deps"
  fi

  printf '\033[94m%s\033[0m\n' "Starting install of the Chromium browser with the Playwright installer" >&2
  (cd "$repository_root_path" && npx playwright install $playwright_install_flags chromium) >&2 || {
    printf '\033[31m%s\033[0m\n' "Error: the install of the Chromium browser failed, check the network to the Playwright download host and the system packages it needs" >&2
    return 1
  }

  printf '\033[32m%s\033[0m\n' "Install of the Chromium browser finished" >&2
  return 0
}

install_dependencies() {
  # Function metadata
  # Description: Installs the dependencies of the repository from the lock file with npm ci, run from the repository root. It writes the progress to stderr and the output of npm to stderr, and nothing to stdout.
  # Input: none.
  # Exit: 0 when the install finishes, 1 when the repository root cannot be resolved or npm ci fails.
  local repository_root_path=""
  repository_root_path="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd -P)" || return 1

  printf '\033[94m%s\033[0m\n' "Starting install of the dependencies with npm ci" >&2
  (cd "$repository_root_path" && npm ci) >&2 || {
    printf '\033[31m%s\033[0m\n' "Error: the install of the dependencies failed, check the package-lock.json is in sync with package.json and the registry can be reached" >&2
    return 1
  }

  printf '\033[32m%s\033[0m\n' "Install of the dependencies finished" >&2
  return 0
}

is_branch_name_valid() {
  # Function metadata
  # Description: Checks that a branch name uses the development or maintenance category followed by a kebab-case description. It writes nothing and reports the result through the return code.
  # Input: $1 the branch name.
  # Exit: 0 when the branch name is valid, 1 when it is not or when it is missing.
  local branch_name="${1:-}" branch_name_pattern='^(development|maintenance)/[a-z0-9]+(-[a-z0-9]+)*$'

  if [[ "$branch_name" =~ $branch_name_pattern ]]; then
    return 0
  fi
  return 1
}

is_commit_message_valid() {
  # Function metadata
  # Description: Checks that a commit message uses the development or maintenance type, followed by a description that starts with a lowercase letter and has no parentheses, so no scope is written. It writes nothing and reports the result through the return code.
  # Input: $1 the commit message.
  # Exit: 0 when the commit message is valid, 1 when it is not or when it is missing.
  local commit_message="${1:-}" commit_message_pattern='^(development|maintenance): [a-z][^()]*$'

  if [[ "$commit_message" =~ $commit_message_pattern ]]; then
    return 0
  fi
  return 1
}

is_version_higher() {
  # Function metadata
  # Description: Compares a candidate version with a published version with a version sort, and returns a code that says whether the candidate is higher. It writes nothing to stdout, and it writes the reason to stderr when an argument is missing.
  # Input: --candidate_version=<version> and --published_version=<version>.
  # Exit: 0 when the candidate version is higher than the published version, 1 when it is not, 2 when an argument is missing, 3 when the versions cannot be sorted.
  local candidate_version="" published_version="" argument="" lowest_version=""

  for argument in "$@"; do
    case "$argument" in
      --candidate_version=*) candidate_version="${argument#--candidate_version=}" ;;
      --published_version=*) published_version="${argument#--published_version=}" ;;
    esac
  done

  if [ -z "$candidate_version" ] || [ -z "$published_version" ]; then
    printf '\033[31m%s\033[0m\n' "Error: is_version_higher needs --candidate_version and --published_version" >&2
    return 2
  fi

  lowest_version="$(printf '%s\n' "$published_version" "$candidate_version" | sort -V | head -n1)" || return 3
  if [ "$lowest_version" = "$published_version" ] && [ "$published_version" != "$candidate_version" ]; then
    return 0
  fi
  return 1
}

publish_package() {
  # Function metadata
  # Description: Publishes the package to the npm registry with provenance and public access, run from the repository root. It runs with ignore scripts, so the prepack script does not rebuild the dist folder over the rewritten imports. It writes the progress and the output of npm to stderr, and nothing to stdout.
  # Input: none.
  # Exit: 0 when npm publish finishes, 1 when the repository root cannot be resolved or npm publish fails.
  local repository_root_path=""
  repository_root_path="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd -P)" || return 1

  printf '\033[94m%s\033[0m\n' "Starting npm publish with provenance" >&2
  (cd "$repository_root_path" && npm publish --provenance --access public --ignore-scripts) >&2 || {
    printf '\033[31m%s\033[0m\n' "Error: npm publish failed, check the trusted publishing setup of the package on npm and that the workflow has id-token write permission" >&2
    return 1
  }

  printf '\033[32m%s\033[0m\n' "npm publish finished" >&2
  return 0
}

push_repository_branch() {
  # Function metadata
  # Description: Pushes the branch to the origin remote and sets it as the upstream of the local branch. It never forces the push, so a rejected push leaves the remote branch as it is, and it writes the progress and the reasons to stderr and nothing to stdout.
  # Input: --branch_name=<branch name>.
  # Exit: 0 when the branch is pushed, 1 when the repository root cannot be resolved or git fails, 2 when --branch_name is missing.
  local repository_root_path="" branch_name="" argument=""
  repository_root_path="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd -P)" || return 1

  for argument in "$@"; do
    case "$argument" in
      --branch_name=*) branch_name="${argument#--branch_name=}" ;;
    esac
  done

  if [ -z "$branch_name" ]; then
    printf '\033[31m%s\033[0m\n' "Error: push_repository_branch needs --branch_name" >&2
    return 2
  fi

  printf '\033[94m%s\033[0m\n' "Starting push of the branch $branch_name" >&2
  (cd "$repository_root_path" && git push --set-upstream origin "$branch_name") >&2 || {
    printf '\033[31m%s\033[0m\n' "Error: the push of the branch $branch_name failed, check the origin remote and the access rights" >&2
    return 1
  }

  printf '\033[32m%s\033[0m\n' "Push of the branch $branch_name finished" >&2
  return 0
}

read_current_branch_name() {
  # Function metadata
  # Description: Reads the name of the checked out branch and writes it to stdout. It writes nothing to stdout when the call fails, and a detached HEAD fails because it has no branch name.
  # Input: none.
  # Exit: 0 when the branch name is written to stdout, 1 when the repository root cannot be resolved, git fails, or HEAD is detached.
  local repository_root_path="" branch_name=""
  repository_root_path="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd -P)" || return 1

  branch_name="$(cd "$repository_root_path" && git symbolic-ref --short HEAD 2>/dev/null)" || {
    printf '\033[31m%s\033[0m\n' "Error: the current branch could not be read, check that HEAD points to a branch and not to a detached commit" >&2
    return 1
  }
  printf '%s\n' "$branch_name"
  return 0
}

read_package_field() {
  # Function metadata
  # Description: Reads one top-level field of the package.json in the repository root and writes its value to stdout. It writes nothing to stdout when the call fails, and it writes the reason to stderr.
  # Input: --field_name=<top-level field name>.
  # Exit: 0 when the field value is written to stdout, 1 when the repository root cannot be resolved, package.json cannot be read, or the field is missing or empty, 2 when --field_name is missing.
  local repository_root_path="" field_name="" field_value="" argument=""
  repository_root_path="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd -P)" || return 1

  for argument in "$@"; do
    case "$argument" in
      --field_name=*) field_name="${argument#--field_name=}" ;;
    esac
  done

  if [ -z "$field_name" ]; then
    printf '\033[31m%s\033[0m\n' "Error: read_package_field needs --field_name" >&2
    return 2
  fi

  field_value="$(node -e 'const packageJson = require(process.argv[1]); const fieldValue = packageJson[process.argv[2]]; if (typeof fieldValue !== "string" || fieldValue === "") { process.exit(1); } process.stdout.write(fieldValue);' "$repository_root_path/package.json" "$field_name")" || {
    printf '\033[31m%s\033[0m\n' "Error: the field $field_name cannot be read from $repository_root_path/package.json, the file may be missing or the field may be empty" >&2
    return 1
  }

  printf '%s\n' "$field_value"
  return 0
}

read_published_version() {
  # Function metadata
  # Description: Reads the latest published version of the package from the npm registry and writes it to stdout. It writes 0.0.0 to stdout when the package has never been published, and it writes nothing to stdout and the reason to stderr when the registry cannot be read.
  # Input: --package_name=<package name>.
  # Exit: 0 when the published version or 0.0.0 is written to stdout, 1 when the repository root cannot be resolved or the registry cannot be read, 2 when --package_name is missing.
  local repository_root_path="" package_name="" argument="" registry_output="" published_version=""
  repository_root_path="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd -P)" || return 1

  for argument in "$@"; do
    case "$argument" in
      --package_name=*) package_name="${argument#--package_name=}" ;;
    esac
  done

  if [ -z "$package_name" ]; then
    printf '\033[31m%s\033[0m\n' "Error: read_published_version needs --package_name" >&2
    return 2
  fi

  printf '\033[94m%s\033[0m\n' "Starting read of the published version of $package_name" >&2
  registry_output="$(cd "$repository_root_path" && npm view "$package_name" version 2>&1)" || {
    if printf '%s\n' "$registry_output" | grep -q "E404"; then
      printf '%s\n' "Package $package_name has never been published, the published version is 0.0.0" >&2
      printf '%s\n' "0.0.0"
      return 0
    fi
    printf '\033[31m%s\033[0m\n' "Error: the published version of $package_name cannot be read from the npm registry, check the network and the registry access" >&2
    return 1
  }

  published_version="$(printf '%s\n' "$registry_output" | tail -n1)"
  printf '\033[32m%s\033[0m\n' "Read of the published version finished, the published version is $published_version" >&2
  printf '%s\n' "$published_version"
  return 0
}

rewrite_import_extensions() {
  # Function metadata
  # Description: Rewrites the relative imports that end in .ts to .js in the javascript, declaration, and svelte files of the dist folder, so the published package resolves its imports. It rewrites a file only when its content changes, keeps the file mode, and fails when a .ts import remains after the rewrite. It writes the progress and the reasons to stderr and nothing to stdout.
  # Input: none.
  # Exit: 0 when the rewrite finishes and no .ts import remains, 1 when the repository root cannot be resolved, the dist folder is missing, a file cannot be rewritten, or a .ts import remains.
  local repository_root_path="" dist_path="" sed_script="" ts_import_pattern="" file_path="" temp_path="" changed_count=0
  repository_root_path="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd -P)" || return 1

  dist_path="$repository_root_path/dist"
  if [ ! -d "$dist_path" ]; then
    printf '\033[31m%s\033[0m\n' "Error: the dist folder does not exist, run the build first: $dist_path" >&2
    return 1
  fi

  printf '\033[94m%s\033[0m\n' "Starting rewrite of the .ts imports to .js in $dist_path" >&2

  ts_import_pattern='(from[[:space:]]*|import[[:space:]]*\([[:space:]]*|import[[:space:]]+)(["'"'"'])(\.{1,2}/[^"'"'"']*)\.ts(["'"'"'])'
  sed_script='s#(from[[:space:]]*|import[[:space:]]*\([[:space:]]*|import[[:space:]]+)(["'"'"'])(\.{1,2}/[^"'"'"']*)\.ts(["'"'"'])#\1\2\3.js\4#g'

  while IFS= read -r file_path; do
    temp_path="$(mktemp)" || {
      printf '\033[31m%s\033[0m\n' "Error: a temporary file could not be created for the rewrite" >&2
      return 1
    }
    if ! sed -E "$sed_script" "$file_path" > "$temp_path"; then
      rm -f "$temp_path"
      printf '\033[31m%s\033[0m\n' "Error: the rewrite of the file failed: $file_path" >&2
      return 1
    fi
    if ! cmp -s "$temp_path" "$file_path"; then
      if ! cat "$temp_path" > "$file_path"; then
        rm -f "$temp_path"
        printf '\033[31m%s\033[0m\n' "Error: the rewritten content could not be written to: $file_path" >&2
        return 1
      fi
      changed_count=$((changed_count + 1))
    fi
    rm -f "$temp_path"
  done < <(find "$dist_path" -type f \( -name '*.js' -o -name '*.d.ts' -o -name '*.svelte' \))

  if grep -rqE "$ts_import_pattern" "$dist_path"; then
    printf '\033[31m%s\033[0m\n' "Error: .ts imports remain in the dist folder after the rewrite, the rewrite does not cover every import form" >&2
    return 1
  fi

  printf '\033[32m%s\033[0m\n' "Rewrite of the .ts imports finished, $changed_count files changed" >&2
  return 0
}

run_browser_tests() {
  # Function metadata
  # Description: Runs the browser tests with the npm test:browser script, which starts the built site with npm run start through the Playwright configuration and runs the Playwright suites. It writes the progress to stderr and the output of the tests to stderr, and nothing to stdout.
  # Input: none.
  # Exit: 0 when every browser test passes, 1 when the repository root cannot be resolved, a test fails, no browser test is found, or the site does not start.
  local repository_root_path=""
  repository_root_path="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd -P)" || return 1

  printf '\033[94m%s\033[0m\n' "Starting browser tests with npm run test:browser" >&2
  (cd "$repository_root_path" && npm run test:browser) >&2 || {
    printf '\033[31m%s\033[0m\n' "Error: the browser tests failed, a test failed, no browser test was found, or the site did not start with npm run start" >&2
    return 1
  }

  printf '\033[32m%s\033[0m\n' "Browser tests finished" >&2
  return 0
}

run_format_write() {
  # Function metadata
  # Description: Writes the format of the files of the repository through the npm format script, so the formatter may change files. It writes the progress and the output of the formatter to stderr and nothing to stdout.
  # Input: none.
  # Exit: 0 when the formatter finishes, 1 when the repository root cannot be resolved or the formatter fails.
  local repository_root_path=""
  repository_root_path="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd -P)" || return 1

  printf '\033[94m%s\033[0m\n' "Starting format of the files" >&2
  (cd "$repository_root_path" && npm run format) >&2 || {
    printf '\033[31m%s\033[0m\n' "Error: the format failed, check the output above" >&2
    return 1
  }

  printf '\033[32m%s\033[0m\n' "Format of the files finished" >&2
  return 0
}

run_lint_fix() {
  # Function metadata
  # Description: Runs the lint script of the repository, which runs oxlint with automatic fixes, so the linter may change files. It writes the progress and the output of the linter to stderr and nothing to stdout.
  # Input: none.
  # Exit: 0 when the linter reports no error, 1 when the repository root cannot be resolved or the linter reports an error it cannot fix.
  local repository_root_path=""
  repository_root_path="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd -P)" || return 1

  printf '\033[94m%s\033[0m\n' "Starting lint with automatic fixes" >&2
  (cd "$repository_root_path" && npm run lint) >&2 || {
    printf '\033[31m%s\033[0m\n' "Error: the lint failed, check the output above, and install the dependencies with npm install when they are missing" >&2
    return 1
  }

  printf '\033[32m%s\033[0m\n' "Lint with automatic fixes finished" >&2
  return 0
}

run_repository_integrity() {
  # Function metadata
  # Description: Runs the integrity checks in order: node version, dependency install, shell syntax, lint, format, changelog entry, then the current and published versions. It writes should_publish as a name=value line to stdout, and when the GITHUB_OUTPUT variable is set it appends the same line to that file, so the workflow can read the output. It writes the progress and the reasons to stderr, and a failing check stops the run.
  # Input: the GITHUB_OUTPUT environment variable when the run is inside GitHub Actions.
  # Exit: 0 when every check passes and the output is written, 1 when the repository root cannot be resolved, a check fails, or the GITHUB_OUTPUT file cannot be written.
  local repository_root_path="" package_name="" current_version="" published_version="" should_publish="false" version_comparison_exit_code=0 github_output_file_path="${GITHUB_OUTPUT:-}"
  repository_root_path="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd -P)" || return 1

  printf '\033[94m%s\033[0m\n' "Starting integrity checks" >&2

  check_node_version || return 1
  install_dependencies || return 1
  check_repository_shell_syntax >&2 || return 1
  check_lint || return 1
  check_format || return 1
  check_changelog_version || return 1

  package_name="$(read_package_field --field_name=name)" || return 1
  current_version="$(read_package_field --field_name=version)" || return 1
  published_version="$(read_published_version --package_name="$package_name")" || return 1

  is_version_higher --candidate_version="$current_version" --published_version="$published_version"
  version_comparison_exit_code=$?
  case "$version_comparison_exit_code" in
    0) should_publish="true" ;;
    1) should_publish="false" ;;
    *)
      printf '\033[31m%s\033[0m\n' "Error: the versions $current_version and $published_version could not be compared" >&2
      return 1
      ;;
  esac

  printf '%s\n' "should_publish=$should_publish"

  if [ -n "$github_output_file_path" ]; then
    printf '%s\n' "should_publish=$should_publish" >>"$github_output_file_path" || {
      printf '\033[31m%s\033[0m\n' "Error: the GITHUB_OUTPUT file cannot be written: $github_output_file_path" >&2
      return 1
    }
  fi

  printf '\033[32m%s\033[0m\n' "Integrity checks finished, current version $current_version, should publish $should_publish" >&2
  return 0
}

run_repository_publish() {
  # Function metadata
  # Description: Publishes the package to npm when its version is higher than the published version. It runs the node check, the dependency install, the version comparison, the build, the rewrite of the .ts imports in dist, and then npm publish with provenance and public access. It refuses to publish when the version is not higher, and it writes the progress and the reasons to stderr and nothing to stdout.
  # Input: none.
  # Exit: 0 when the package is published, 1 when the repository root cannot be resolved, a step fails, or the version is not higher than the published version.
  local repository_root_path="" package_name="" current_version="" published_version="" version_comparison_exit_code=0
  repository_root_path="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd -P)" || return 1

  printf '\033[94m%s\033[0m\n' "Starting publish of the package" >&2

  check_node_version || return 1
  install_dependencies || return 1

  package_name="$(read_package_field --field_name=name)" || return 1
  current_version="$(read_package_field --field_name=version)" || return 1
  published_version="$(read_published_version --package_name="$package_name")" || return 1

  is_version_higher --candidate_version="$current_version" --published_version="$published_version"
  version_comparison_exit_code=$?
  case "$version_comparison_exit_code" in
    0) ;;
    1)
      printf '\033[31m%s\033[0m\n' "Error: the publish is refused, version $current_version is not higher than the published version $published_version" >&2
      return 1
      ;;
    *)
      printf '\033[31m%s\033[0m\n' "Error: the versions $current_version and $published_version could not be compared" >&2
      return 1
      ;;
  esac

  build_package || return 1
  rewrite_import_extensions || return 1
  publish_package || return 1

  printf '\033[32m%s\033[0m\n' "Publish of $package_name@$current_version finished" >&2
  return 0
}

run_repository_push() {
  # Function metadata
  # Description: Pushes the current branch with a commit of every change. It checks the commit message and the branch name, then runs the lint with automatic fixes and the format write, commits every change with the commit message, and pushes the branch to origin without force. It refuses a branch that does not match the branch naming rules, and it writes the progress and the reasons to stderr and nothing to stdout.
  # Input: --commit_message=<type: description>, where the type is development or maintenance.
  # Exit: 0 when the branch is pushed, 1 when the repository root cannot be resolved, a step fails, or the branch name is not valid, 2 when the commit message is missing, malformed, or an argument is unknown.
  local repository_root_path="" commit_message="" argument="" branch_name=""
  repository_root_path="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd -P)" || return 1

  for argument in "$@"; do
    case "$argument" in
      --commit_message=*) commit_message="${argument#--commit_message=}" ;;
      *)
        printf '\033[31m%s\033[0m\n' "Error: push does not accept the argument $argument" >&2
        return 2
        ;;
    esac
  done

  if [ -z "$commit_message" ]; then
    printf '\033[31m%s\033[0m\n' "Error: push needs --commit_message=<type: description>" >&2
    return 2
  fi
  if ! is_commit_message_valid "$commit_message"; then
    printf '\033[31m%s\033[0m\n' "Error: the commit message must start with development: or maintenance:, followed by a description that starts with a lowercase letter and has no parentheses" >&2
    return 2
  fi

  printf '\033[94m%s\033[0m\n' "Starting push of the repository" >&2

  branch_name="$(read_current_branch_name)" || return 1
  if ! is_branch_name_valid "$branch_name"; then
    printf '\033[31m%s\033[0m\n' "Error: the push is refused, the branch $branch_name must start with development/ or maintenance/ and continue with a kebab-case description" >&2
    return 1
  fi

  run_lint_fix || return 1
  run_format_write || return 1
  commit_repository_changes --commit_message="$commit_message" || return 1
  push_repository_branch --branch_name="$branch_name" || return 1

  printf '\033[32m%s\033[0m\n' "Push of the repository finished" >&2
  return 0
}

run_repository_test() {
  # Function metadata
  # Description: Runs the test pipeline in order: node version check, dependency install, build, browser install, then browser tests. A failing step stops the run, and the reason is written to stderr.
  # Input: none.
  # Exit: 0 when every step passes, 1 when the repository root cannot be resolved or a step fails.
  local repository_root_path=""
  repository_root_path="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd -P)" || return 1

  printf '\033[94m%s\033[0m\n' "Starting test pipeline" >&2

  check_node_version || return 1
  install_dependencies || return 1
  build_package || return 1
  install_browsers || return 1
  run_browser_tests || return 1

  printf '\033[32m%s\033[0m\n' "Test pipeline finished, every step passed" >&2
  return 0
}

print_repository_help() {
  # Function metadata
  # Description: Prints the usage of the repository script with its operations to stdout. It writes nothing to stderr.
  # Input: none.
  # Exit: 0 always.
  printf '%s\n' "Usage: scripts/repository.sh <operation>"
  printf '%s\n' ""
  printf '%s\n' "Operations:"
  printf '%s\n' "  help              Show this message"
  printf '%s\n' "  check             Check the shell syntax of every script of the repository"
  printf '%s\n' "  integrity         Run the shell, lint, format, and changelog checks, then write should_publish to stdout and to GITHUB_OUTPUT when it is set, exits 1 when a check fails"
  printf '%s\n' "  test              Check node, install dependencies, build, run the browser tests, exits 1 when a step fails"
  printf '%s\n' "  push              Run the lint with fixes and the format, commit every change with --commit_message=<type: description>, then push the current branch, exits 1 when a step fails, exits 2 when the commit message is wrong"
  printf '%s\n' "  publish           Check node, install dependencies, refuse when the version is not higher than npm, build, then publish with provenance, exits 1 when a step fails"
  return 0
}

repository() {
  # Function metadata
  # Description: Dispatches the operations of the repository script to their functions after it checks the operation and its arguments. It writes the usage for help or the output of the operation to stdout, and the status of the operation to stderr.
  # Input: $1 the operation: help, check, integrity, test, publish, or push, with the arguments of that operation.
  # Exit: 0 when the operation or help finishes, 1 when the operation fails, 2 when no operation is given, the operation is unknown, or its arguments are wrong.
  local requested_operation_name="${1:-}" operation_exit_code=0

  if [ "$#" -eq 0 ]; then
    print_repository_help >&2
    exit 2
  fi

  case "$requested_operation_name" in
    help)
      print_repository_help
      exit 0
      ;;
    check)
      check_repository_shell_syntax
      operation_exit_code=$?
      ;;
    integrity)
      if [ "$#" -gt 1 ]; then
        printf '\033[31m%s\033[0m\n' "Error: integrity takes no argument" >&2
        exit 2
      fi
      run_repository_integrity
      operation_exit_code=$?
      ;;
    test)
      if [ "$#" -gt 1 ]; then
        printf '\033[31m%s\033[0m\n' "Error: test takes no argument" >&2
        exit 2
      fi
      run_repository_test
      operation_exit_code=$?
      ;;
    publish)
      if [ "$#" -gt 1 ]; then
        printf '\033[31m%s\033[0m\n' "Error: publish takes no argument" >&2
        exit 2
      fi
      run_repository_publish
      operation_exit_code=$?
      ;;
    push)
      run_repository_push "${@:2}"
      operation_exit_code=$?
      ;;
    *)
      printf '\033[31m%s\033[0m\n' "Error: unknown operation $requested_operation_name" >&2
      print_repository_help >&2
      exit 2
      ;;
  esac

  exit "$operation_exit_code"
}

repository "$@"

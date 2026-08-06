export type CodeToken = { type: string; value: string };

type Rule = { type: string; pattern: RegExp };

const keywords =
	/\b(?:import|export|from|default|const|let|var|function|return|if|else|for|of|in|while|do|switch|case|break|continue|new|class|extends|typeof|instanceof|await|async|try|catch|finally|throw|true|false|null|undefined|this|snippet|render)\b/;

const markupRules: Rule[] = [
	{ type: 'comment', pattern: /<!--[\s\S]*?(?:-->|$)/ },
	{ type: 'comment', pattern: /\/\/.*/ },
	{ type: 'tag', pattern: /<\/?[A-Za-z][\w.:-]*/ },
	{ type: 'punctuation', pattern: /\/?>/ },
	{ type: 'attribute', pattern: /[A-Za-z_:@][\w.:-]*(?=\s*=)/ },
	{ type: 'string', pattern: /"[^"]*"|'[^']*'|`[^`]*`/ },
	{ type: 'keyword', pattern: keywords },
	{ type: 'number', pattern: /\b\d+(?:\.\d+)?\b/ },
	{ type: 'function', pattern: /[A-Za-z_$][\w$]*(?=\()/ },
	{ type: 'punctuation', pattern: /[{}()[\];,]/ }
];

const scriptRules: Rule[] = [
	{ type: 'comment', pattern: /\/\/.*|\/\*[\s\S]*?(?:\*\/|$)/ },
	{ type: 'string', pattern: /"[^"]*"|'[^']*'|`[^`]*`/ },
	{ type: 'keyword', pattern: keywords },
	{ type: 'function', pattern: /[A-Za-z_$][\w$]*(?=\()/ },
	{ type: 'number', pattern: /\b\d+(?:\.\d+)?\b/ },
	{ type: 'punctuation', pattern: /[{}()[\];,.]/ }
];

const cssRules: Rule[] = [
	{ type: 'comment', pattern: /\/\*[\s\S]*?(?:\*\/|$)/ },
	{ type: 'keyword', pattern: /@[\w-]+/ },
	{ type: 'string', pattern: /"[^"]*"|'[^']*'/ },
	{ type: 'value', pattern: /#[0-9a-fA-F]{3,8}\b/ },
	{ type: 'property', pattern: /[-a-zA-Z]+(?=\s*:)/ },
	{ type: 'tag', pattern: /[.#&][-\w]+|::?[-\w]+/ },
	{ type: 'number', pattern: /-?\d*\.?\d+(?:[a-z%]+)?/ },
	{ type: 'punctuation', pattern: /[{};:,]/ }
];

const shellRules: Rule[] = [
	{ type: 'comment', pattern: /#.*/ },
	{ type: 'string', pattern: /"[^"]*"|'[^']*'/ },
	{ type: 'attribute', pattern: /(?:^|\s)-{1,2}[A-Za-z][\w-]*/ },
	{ type: 'number', pattern: /\b\d+(?:\.\d+)?\b/ }
];

const rulesByLanguage: Record<string, Rule[]> = {
	svelte: markupRules,
	html: markupRules,
	xml: markupRules,
	vue: markupRules,
	js: scriptRules,
	javascript: scriptRules,
	ts: scriptRules,
	typescript: scriptRules,
	json: scriptRules,
	css: cssRules,
	scss: cssRules,
	bash: shellRules,
	sh: shellRules,
	shell: shellRules,
	zsh: shellRules
};

const anchored = new Map<RegExp, RegExp>();

const sticky = (pattern: RegExp) => {
	let compiled = anchored.get(pattern);
	if (!compiled) {
		compiled = new RegExp(pattern.source, pattern.flags.replace('g', '') + 'y');
		anchored.set(pattern, compiled);
	}
	return compiled;
};

export function tokenizeLine(line: string, language: string): CodeToken[] {
	const rules = rulesByLanguage[language?.toLowerCase()];
	if (!rules || line === '') return [{ type: 'plain', value: line }];

	const tokens: CodeToken[] = [];
	let plain = '';
	let index = 0;

	const flushPlain = () => {
		if (plain) {
			tokens.push({ type: 'plain', value: plain });
			plain = '';
		}
	};

	while (index < line.length) {
		let matched = false;

		for (const rule of rules) {
			const pattern = sticky(rule.pattern);
			pattern.lastIndex = index;
			const result = pattern.exec(line);

			if (result && result[0]) {
				const leadingWhitespace = result[0].match(/^\s+/)?.[0] ?? '';
				plain += leadingWhitespace;
				flushPlain();
				tokens.push({ type: rule.type, value: result[0].slice(leadingWhitespace.length) });
				index += result[0].length;
				matched = true;
				break;
			}
		}

		if (!matched) {
			plain += line[index];
			index += 1;
		}
	}

	flushPlain();
	return tokens;
}

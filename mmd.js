String.prototype.replaceAll = function(find, replace) {
	if (typeof find == 'string') return this.split(find).join(replace);
	var t = this, i, j;
	while (typeof(i = find.shift()) == 'string' && typeof(j = replace.shift()) == 'string') t = t.replaceAll(i || '', j || '');
	return t;
};

function html(input) {
	return input.toString().replaceAll(['&', '<', '"'], ['&amp;', '&lt;', '&quot;']);
};
function markdown(src) {
	var h = '';
	function inlineEscape(s) {
		return html(s)
			.replace(/!\[([^\]]*)]\(([^(]+)\)/g, '<img alt="$1" src="$2">')
			.replace(/\[([^\]]+)]\(([^(]+)\)/g, '$1'.link('$2'))
			.replace(/`([^`]+)`/g, '<code>$1</code>')
			.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
			.replace(/\*([^*]+)\*/g, '<em>$1</em>');
	}
	src.replace(/^\s+|\r|\s+$/g, '').replace(/\t/g, '    ').split(/\n\n+/).forEach(function(b, f, R) {
		f = b[0];
		R = {
			'*': [(/\n\* /), '<ul><li>', '</li></ul>'],
			'1': [(/\n[1-9]\d*\.? /), '<ol><li>', '</li></ol>'],
			' ': [(/\n    /),'<pre><code>','</pre></code>','\n'],
			'>': [(/\n> /),'<blockquote>','</blockquote>','\n']
		}[f];
		h +=
			R ? R[1] + ('\n' + b)
				.split(R[0])
				.slice(1)
				.map(R[3] ? html : inlineEscape)
				.join(R[3]||'</li>\n<li>') + R[2]:
			f == '#' ? '<h' + (f = b.indexOf(' ')) + '>' + inlineEscape(b.slice(f + 1)) + '</h' + f + '>':
			f == '<' ? b:
			'<p>' + inlineEscape(b) + '</p>';
	});
	return h;
};

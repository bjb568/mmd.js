var testingCallbackFn = function(md, expectedHtml, parsedHtml, success) {};
function testParse(md, expectedHtml) {
    var parsedHtml = markdown(md);
    testingCallbackFn(md, expectedHtml, parsedHtml, expectedHtml === parsedHtml);
}
function runTests() {
    testParse("`code`", "<code>code</code>");
    testParse("**strong**", "<strong>strong</strong>");
    testParse("*emphasized*", "<em>emphasized</em>");
    testParse("**emphasized *inside* strong**", "<strong>emphasized <em>inside</em> strong</strong>");
    testParse("*strong **inside** emphasized*", "<em>strong <strong>inside</strong> emphasized</em>");
    testParse("* list item 1\n* list item 2\n* list item 3", "<ul><li>list item 1</li>\n<li>list item 2</li>\n<li>list item 3</li></ul>");
    testParse("- list item 1\n- list item 2\n- list item 3", "<ul><li>list item 1</li>\n<li>list item 2</li>\n<li>list item 3</li></ul>");
    testParse("> blockquote", "<blockquote>blockquote</blockquote>");
    testParse("> multiline blockquote\n> line 2", "<blockquote>multiline blockquote\nline 2</blockquote>");
    testParse("1. Numbered list item 1\n2. Numbered list item 2\n3. Numbered list item 3", "<ol><li>Numbered list item 1</li>\n<li>Numbered list item 2</li>\n<li>Numbered list item 3</li></ol>");
}
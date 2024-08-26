const cheerio = require('cheerio');

function fetchH1TextFromString(html) {
    const start = process.hrtime();

    // Load the HTML into cheerio
    const $ = cheerio.load(html);

    // Find the first <h1> tag
    const h1Text = $('h1').first().text();

    const elapsed = process.hrtime(start);
    const elapsedMs = elapsed[0] * 1000 + elapsed[1] / 1000000;
    console.log(`Node.js function execution time: ${elapsedMs.toFixed(3)} ms`);

    return h1Text;
}

const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Test Page</title>
    <style>
        .header { font-size: 24px; color: blue; }
        .sub-header { font-size: 20px; color: green; }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>Main Title</h1>
            <p>This is the main header of the page.</p>
        </header>
        
        <section>
            <div class="content">
                <h1>First Section Title</h1>
                <p>This is the first section.</p>
            </div>
            <div class="content">
                <h2>Subsection Title</h2>
                <p>This is a subsection within the first section.</p>
            </div>
        </section>

        <aside>
            <h1>Sidebar Title</h1>
            <p>This is the sidebar content.</p>
        </aside>

        <footer>
            <h3>Footer Title</h3>
            <p>This is the footer of the page.</p>
        </footer>
    </div>
</body>
</html>
`;

const h1Text = fetchH1TextFromString(html);
console.log('H1 Text:', h1Text);

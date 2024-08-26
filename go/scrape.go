package main

import (
	"fmt"
	"strings"
	"time"

	"github.com/PuerkitoBio/goquery"
)

func fetchH1TextFromString(html string) string {
	start := time.Now()

	// Parse the HTML from the string
	doc, err := goquery.NewDocumentFromReader(strings.NewReader(html))
	if err != nil {
		fmt.Println("Error:", err)
		return ""
	}

	// Find the first <h1> tag
	h1Text := doc.Find("h1").First().Text()

	elapsed := time.Since(start)
	fmt.Printf("Go function execution time: %s\n", elapsed)

	return h1Text
}

func main() {
	html := `
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
    `

	h1Text := fetchH1TextFromString(html)
	fmt.Println("H1 Text:", h1Text)
}

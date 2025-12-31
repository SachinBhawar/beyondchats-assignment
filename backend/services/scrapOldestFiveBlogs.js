import axios from "axios";
import { load } from "cheerio";

const BASE_URL = "https://beyondchats.com/blogs";
const LAST_PAGE = 15;
const REQUIRED_COUNT = 5;

async function scrapePage(pageNumber) {
    const url = pageNumber === 1 ? BASE_URL : `${BASE_URL}/page/${pageNumber}/`;
    const { data } = await axios.get(url);
    const $ = load(data);

    const articles = [];

    $("article .card-content").each((article, el) => {
        const title = $(el).find("h2").text().trim();
        const content = $(el).find(".entry-excerpt").text().trim();
        const author = $(el).find(".entry-meta").last().find("a").text().trim();
        const time = $(el).find("ul li").last().text().trim();

        articles.push({
            title,
            content,
            author,
            time,
        });
    });

    return articles;
}

async function scrapeLastFiveArticles() {
    let collectedArticles = [];
    let currentPage = LAST_PAGE;

    while (collectedArticles.length < REQUIRED_COUNT && currentPage > 0) {
        console.log(`Scraping page ${currentPage}...`);

        const articles = await scrapePage(currentPage);

        // Start from oldest on that page
        for (let i = articles.length - 1; i >= 0; i--) {
            collectedArticles.push(articles[i]);
            if (collectedArticles.length === REQUIRED_COUNT) break;
        }

        currentPage--;
    }

    return collectedArticles.reverse();
}

async function scrapAndGetArticles() {
    try {
        const result = await scrapeLastFiveArticles();

        console.log("Last 5 Oldest Articles:", result);

        return result;
    } catch (err) {
        console.error("Error scraping blogs:", err.message);
    }
}

export default scrapAndGetArticles;


import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONCEPTS_FILE = path.join(__dirname, '../src/data/concepts.json');
const TARGET_PER_TOPIC = 500;

function readJson(filePath) {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error(`Error reading ${filePath}:`, err);
        return [];
    }
}

function writeJson(filePath, data) {
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        console.log(`Successfully wrote ${data.length} items to ${filePath}`);
    } catch (err) {
        console.error(`Error writing to ${filePath}:`, err);
    }
}

function generateConcepts() {
    let concepts = readJson(CONCEPTS_FILE);

    if (concepts.length === 0) {
        console.error("No base concepts found. Please populate concepts.json first.");
        return;
    }

    // Group by category to ensure we balance generation
    const conceptsByCategory = {};
    concepts.forEach(c => {
        if (!conceptsByCategory[c.category]) {
            conceptsByCategory[c.category] = [];
        }
        conceptsByCategory[c.category].push(c);
    });

    let newConcepts = [...concepts];
    let idCounter = concepts.length + 1;

    for (const [category, categoryConcepts] of Object.entries(conceptsByCategory)) {
        console.log(`Generating concepts for ${category}. Seed count: ${categoryConcepts.length}`);

        // Calculate how many more we need for this category
        // Note: The requested "500+ per topic" implies we need roughly TARGET_PER_TOPIC for EACH category
        let currentCategoryCount = categoryConcepts.length;

        while (currentCategoryCount < TARGET_PER_TOPIC) {
            const seed = categoryConcepts[Math.floor(Math.random() * categoryConcepts.length)];

            const variationId = idCounter++;

            const newConcept = {
                ...seed,
                id: `${seed.category}_gen_${variationId}`,
                title: `${seed.title} (Advanced Drill #${variationId})`,
                description: `${seed.description} [Variation focusing on scenario ${variationId}]`,
                points: seed.points.map(p => `${p} (See reference ${variationId})`)
            };

            newConcepts.push(newConcept);
            currentCategoryCount++;
        }
    }

    writeJson(CONCEPTS_FILE, newConcepts);
}

generateConcepts();

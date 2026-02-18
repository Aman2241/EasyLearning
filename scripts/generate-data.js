
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, '../src/data');

const TOPICS = [
    { id: 'java', file: 'java-questions.json', prefix: 'java', title: 'Java Core' },
    { id: 'spring', file: 'spring-questions.json', prefix: 'spring', title: 'Spring Framework' },
    { id: 'springboot', file: 'springboot-questions.json', prefix: 'springboot', title: 'Spring Boot' },
    { id: 'mysql', file: 'mysql-questions.json', prefix: 'mysql', title: 'MySQL' },
    { id: 'coding', file: 'coding-questions.json', prefix: 'code', title: 'Coding Challenges' },
];

const TARGET_COUNT = 1000;

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

function generateQuestions() {
    TOPICS.forEach(topic => {
        const filePath = path.join(DATA_DIR, topic.file);
        let questions = readJson(filePath);

        // If we have existing questions, use them as seed
        const seedQuestions = [...questions];
        if (seedQuestions.length === 0) {
            console.warn(`No seed questions found for ${topic.title}. Skipping.`);
            return;
        }

        console.log(`Generating data for ${topic.title}. Current count: ${questions.length}`);

        let idCounter = questions.length + 1;

        while (questions.length < TARGET_COUNT) {
            // Pick a random seed question
            const seed = seedQuestions[Math.floor(Math.random() * seedQuestions.length)];

            const newQuestion = {
                ...seed,
                id: `${topic.prefix}_gen_${idCounter}`,
                question: `${seed.question} (Variation ${idCounter})`,
                difficulty: ['Basic', 'Intermediate', 'Advanced'][Math.floor(Math.random() * 3)]
            };

            questions.push(newQuestion);
            idCounter++;
        }

        writeJson(filePath, questions);
    });
}

generateQuestions();

import express from 'express';
import cors from 'cors';
import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3001;

// Helper to execute commands with timeout
const runCommand = (command, timeout = 5000) => {
    return new Promise((resolve, reject) => {
        exec(command, { timeout, maxBuffer: 1024 * 1024 }, (error, stdout, stderr) => {
            if (error && error.killed) {
                resolve({ stdout: "", stderr: "Error: Execution timed out." });
            } else if (error) {
                // Compilation errors often come in stderr, but sometimes error object has details
                resolve({ stdout, stderr: stderr || error.message });
            } else {
                resolve({ stdout, stderr });
            }
        });
    });
};

app.post('/api/execute', async (req, res) => {
    const { language, version, files } = req.body;

    // Fallback if 'code' is sent directly (from Codex attempt) or 'files' array (Piston format)
    let code = "";
    if (files && files.length > 0) {
        code = files[0].content;
    } else if (req.body.code) {
        code = req.body.code;
    }

    if (!code) {
        return res.status(400).json({ run: { output: "Error: No code provided.", code: 1 } });
    }

    const tempDir = path.join(process.cwd(), 'temp_exec');
    if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir);
    }

    try {
        let output = { stdout: "", stderr: "" };

        // Normalize language
        const lang = language.toLowerCase();

        if (lang === 'python' || lang === 'py') {
            const filePath = path.join(tempDir, 'script.py');
            fs.writeFileSync(filePath, code);
            output = await runCommand(`python3 "${filePath}"`);
        }
        else if (lang === 'javascript' || lang === 'js') {
            const filePath = path.join(tempDir, 'script.js');
            fs.writeFileSync(filePath, code);
            output = await runCommand(`node "${filePath}"`);
        }
        else if (lang === 'java') {
            // Java requires class name to match file name. We assume 'Main' or find it.
            // For simplicity, we enforce 'Main' class in the snippet or just save as Main.java
            const filePath = path.join(tempDir, 'Main.java');
            fs.writeFileSync(filePath, code);
            // Compile then run
            const compile = await runCommand(`javac "${filePath}"`);
            if (compile.stderr) {
                output = compile;
            } else {
                output = await runCommand(`cd "${tempDir}" && java Main`);
            }
        }
        else if (lang === 'c') {
            const filePath = path.join(tempDir, 'main.c');
            const outPath = path.join(tempDir, 'main_c');
            fs.writeFileSync(filePath, code);
            const compile = await runCommand(`gcc "${filePath}" -o "${outPath}"`);
            if (compile.stderr) {
                output = compile;
            } else {
                output = await runCommand(`"${outPath}"`);
            }
        }
        else if (lang === 'cpp' || lang === 'c++') {
            const filePath = path.join(tempDir, 'main.cpp');
            const outPath = path.join(tempDir, 'main_cpp');
            fs.writeFileSync(filePath, code);
            const compile = await runCommand(`g++ "${filePath}" -o "${outPath}"`);
            if (compile.stderr) {
                output = compile;
            } else {
                output = await runCommand(`"${outPath}"`);
            }
        }
        else {
            return res.json({ run: { output: "Error: Unsupported language for local execution.", code: 1 } });
        }

        // Clean up (optional, maybe keep for debug)
        // fs.rmSync(tempDir, { recursive: true, force: true });

        // Format info Piston-like structure for frontend compatibility
        res.json({
            run: {
                stdout: output.stdout,
                stderr: output.stderr,
                output: output.stdout + (output.stderr ? "\nError:\n" + output.stderr : ""),
                code: output.stderr ? 1 : 0
            }
        });

    } catch (error) {
        console.error("Local Execution Error:", error);
        res.status(500).json({ run: { output: "Server Error: " + error.message, code: 1 } });
    }
});

app.listen(PORT, () => console.log(`Local Execution Proxy running on port ${PORT}`));

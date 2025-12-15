const fs = require("fs")
const path = require("path")
const https = require("https")
const http = require("http")
const url = require("url")

// Configuration
const OUTPUT_DIR = path.join(__dirname, "../public/vendor")

const REQUEST_HEADERS = {
    "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    Accept: "*/*",
    "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
    "Cache-Control": "no-cache",
}

// The list of initial dependencies from your index.html
const INITIAL_RESOURCES = [
    // // CSS
    // "https://alifd.alicdn.com/npm/@alifd/theme-lowcode-light@0.2.1/variables.css",
    // "https://alifd.alicdn.com/npm/@alifd/theme-lowcode-light@0.2.1/dist/next.var.min.css",
    // "https://uipaas-assets.com/prod/npm/@alilc/lowcode-engine/1.3.3-beta.0/dist/css/engine-core.css",
    // "https://uipaas-assets.com/prod/npm/@alilc/lowcode-engine-ext/1.0.6/dist/css/engine-ext.css",
    // // JS
    // "https://g.alicdn.com/code/lib/react/16.14.0/umd/react.production.min.js",
    // "https://g.alicdn.com/code/lib/react-dom/16.14.0/umd/react-dom.production.min.js",
    // "https://g.alicdn.com/code/lib/prop-types/15.7.2/prop-types.js",
    // "https://g.alicdn.com/platform/c/react15-polyfill/0.0.1/dist/index.js",
    // "https://g.alicdn.com/platform/c/lodash/4.6.1/lodash.min.js",
    // "https://g.alicdn.com/mylib/moment/2.24.0/min/moment.min.js",
    // "https://g.alicdn.com/code/lib/alifd__next/1.24.18/next.min.js",
    // "https://uipaas-assets.com/prod/npm/@alilc/lowcode-engine/1.3.3-beta.0/dist/js/engine-core.js",
    // "https://uipaas-assets.com/prod/npm/@alilc/lowcode-engine-ext/1.0.6/dist/js/engine-ext.js",
    // "https://uipaas-assets.com/prod/npm/@alilc/lowcode-engine/1.3.3-beta.0/dist/css/react-simulator-renderer.css",
    // "https://uipaas-assets.com/prod/npm/@alilc/lowcode-engine/1.3.3-beta.0/dist/js/react-simulator-renderer.js",
    // "https://uipaas-assets.com/prod/npm/@alilc/lowcode-engine/1.3.3-beta.0/dist/js/react-simulator-renderer.js",
    // "https://alifd.alicdn.com/npm/@alilc/lowcode-materials@1.0.6/build/lowcode/meta.js",
    // "https://alifd.alicdn.com/npm/@alilc/lowcode-materials@1.0.6/build/lowcode/meta.design.js",
    // "https://alifd.alicdn.com/npm/@alilc/lowcode-materials@1.0.6/build/lowcode/meta.js",
    // "https://g.alicdn.com/platform/c/lodash/4.6.1/lodash.min.js",
    // "https://g.alicdn.com/mylib/moment/2.24.0/min/moment.min.js",
    // "https://g.alicdn.com/legao-comp/web_bundle_0724/@alife/theme-254/1.29.5/@alifd/next/1.24.18/theme.7c897c2.css",
    // "https://g.alicdn.com/legao-comp/web_bundle_0724/@alifd/next/1.24.18/main.d839380.js",
    // "https://g.alicdn.com/legao-comp/web_bundle_0724/@alife/theme-254/1.29.5/@alifd/next/1.24.18/theme.7c897c2.css",
    // "https://g.alicdn.com/legao-comp/web_bundle_0724/@alifd/next/1.24.18/main.d839380.js",
    // "https://g.alicdn.com/legao-comp/web_bundle_0724/@alife/theme-254/1.29.5/@alifd/next/1.24.18/theme.7c897c2.css",
    // "https://g.alicdn.com/legao-comp/web_bundle_0724/@alifd/next/1.24.18/main.d839380.js",
    // "https://g.alicdn.com/legao-comp/web_bundle_0724/@ali/vc-lcc-slot-render/1.0.1/view.adcade2.js",
    // "https://g.alicdn.com/legao-comp/web_bundle_0724/@ali/vc-lcc-slot-render/1.0.1/view.mobile.cf7bbf0.js",
    // "https://g.alicdn.com/legao-comp/web_bundle_0724/@ali/vc-lcc-slot-render/1.0.1/view.mobile.99ce7d1.css",
    // "https://g.alicdn.com/legao-comp/web_bundle_0724/@ali/vc-lcc-slot-render/1.0.1/view.mobile.rax.2aa120a.js",
    // "https://g.alicdn.com/legao-comp/web_bundle_0724/@ali/vc-lcc-slot-render/1.0.1/view.mobile.rax.99ce7d1.css",
    // "https://g.alicdn.com/legao-comp/web_bundle_0724/@ali/vc-lcc-slot-render/1.0.1/view.adcade2.js",
    // "https://g.alicdn.com/legao-comp/web_bundle_0724/@ali/vc-lcc-slot-render/1.0.1/view.mobile.cf7bbf0.js",
    // "https://g.alicdn.com/legao-comp/web_bundle_0724/@ali/vc-lcc-slot-render/1.0.1/view.mobile.99ce7d1.css",
    // "https://g.alicdn.com/legao-comp/web_bundle_0724/@ali/vc-lcc-slot-render/1.0.1/view.mobile.rax.2aa120a.js",
    // "https://g.alicdn.com/legao-comp/web_bundle_0724/@ali/vc-lcc-slot-render/1.0.1/view.mobile.rax.99ce7d1.css",
    // "https://alifd.alicdn.com/npm/@alilc/lowcode-materials@1.0.6/build/lowcode/meta.js",
    // "https://alifd.alicdn.com/npm/@alilc/lowcode-materials@1.0.6/build/lowcode/meta.design.js",
    // "https://alifd.alicdn.com/npm/@alilc/lowcode-materials@1.0.6/build/lowcode/meta.js",
    // "https://at.alicdn.com/t/font_2896595_33xhsbg9ux5.js",
    //"http://at.alicdn.com/t/a/font_2761185_ccl8ob63gmj.js",
    //     "https://alifd.alicdn.com/npm/@alilc/lowcode-materials@1.0.6/build/lowcode/meta.design.js",
    // "https://alifd.alicdn.com/npm/@alilc/lowcode-materials@1.0.6/build/lowcode/meta.js",
    // "https://alifd.alicdn.com/npm/@alilc/lowcode-materials@1.1.0-beta.0/build/lowcode/meta.design.js",
    // "https://alifd.alicdn.com/npm/@alilc/lowcode-materials@1.1.0-beta.0/build/lowcode/meta.js",
    // "https://g.alicdn.com/legao-comp/web_bundle_0724/@ali/vc-lcc-slot-render/1.0.1/view.adcade2.js",
    // "https://g.alicdn.com/legao-comp/web_bundle_0724/@ali/vc-lcc-slot-render/1.0.1/view.mobile.99ce7d1.css",
    // "https://g.alicdn.com/legao-comp/web_bundle_0724/@ali/vc-lcc-slot-render/1.0.1/view.mobile.cf7bbf0.js",
    // "https://g.alicdn.com/legao-comp/web_bundle_0724/@ali/vc-lcc-slot-render/1.0.1/view.mobile.rax.2aa120a.js",
    // "https://g.alicdn.com/legao-comp/web_bundle_0724/@ali/vc-lcc-slot-render/1.0.1/view.mobile.rax.99ce7d1.css",
    // "https://g.alicdn.com/legao-comp/web_bundle_0724/@alifd/next/1.24.18/main.d839380.js",
    // "https://g.alicdn.com/legao-comp/web_bundle_0724/@alife/theme-254/1.29.5/@alifd/next/1.24.18/theme.7c897c2.css",
    // "https://g.alicdn.com/legao-comp/web_bundle_0724/@alilc/lowcode-materials/1.1.0/main.08a9a0f.css",
    // "https://g.alicdn.com/legao-comp/web_bundle_0724/@alilc/lowcode-materials/1.1.0/main.ce2c579.js",
    // "https://g.alicdn.com/mylib/moment/2.24.0/min/moment.min.js",
    // "https://g.alicdn.com/platform/c/lodash/4.6.1/lodash.min.js",
    //"https://g.alicdn.com/code/lib/monaco-editor/0.31.1/min/vs/loader.js"




]

// State to track downloaded files and their mappings
const urlMap = new Map()
const processedUrls = new Set()
const downloadQueue = [...INITIAL_RESOURCES]

// Ensure directory exists
function ensureDir(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true })
    }
}

// Generate a local path for a URL
function getLocalPath(resourceUrl) {
    const parsed = url.parse(resourceUrl)
    const fileName = path.basename(parsed.pathname)

    // Create a structure like: vendor/host/path/to/file.js
    const cleanHost = parsed.host.replace(/[^a-z0-9]/gi, "_")
    const dirPath = path.dirname(parsed.pathname).replace(/^\//, "")

    return path.join(cleanHost, dirPath, fileName)
}

function downloadFile(resourceUrl) {
    return new Promise((resolve, reject) => {
        const proto = resourceUrl.startsWith("https") ? https : http
        const parsedUrl = url.parse(resourceUrl)

        const options = {
            hostname: parsedUrl.hostname,
            port: parsedUrl.port,
            path: parsedUrl.path,
            method: "GET",
            headers: REQUEST_HEADERS,
        }

        const req = proto.request(options, (res) => {
            // Handle redirects
            if (res.statusCode === 301 || res.statusCode === 302 || res.statusCode === 307 || res.statusCode === 308) {
                const redirectUrl = res.headers.location
                console.log(`  -> Redirecting to: ${redirectUrl}`)
                return downloadFile(redirectUrl).then(resolve).catch(reject)
            }

            if (res.statusCode !== 200) {
                return reject(new Error(`HTTP ${res.statusCode}: ${res.statusMessage} for ${resourceUrl}`))
            }

            const data = []
            res.on("data", (chunk) => data.push(chunk))
            res.on("end", () => {
                const buffer = Buffer.concat(data)
                if (buffer.length < 100) {
                    const preview = buffer.toString("utf8").substring(0, 100)
                    if (preview.toLowerCase().includes("<!doctype") || preview.toLowerCase().includes("<html")) {
                        return reject(new Error(`Received HTML instead of expected file type for ${resourceUrl}`))
                    }
                }
                resolve(buffer)
            })
        })

        req.on("error", reject)
        req.setTimeout(30000, () => {
            req.destroy()
            reject(new Error(`Timeout downloading ${resourceUrl}`))
        })
        req.end()
    })
}

// Scan CSS for url(...) and @import
function extractCssUrls(cssContent, baseUrl) {
    const urls = []
    const urlRegex = /url$$\s*(?:(["'])(.*?)\1|([^)\s]+))\s*$$/g
    let match

    const textContent = cssContent.toString("utf8")

    while ((match = urlRegex.exec(textContent)) !== null) {
        const rawUrl = match[2] || match[3]
        if (rawUrl.startsWith("data:")) continue

        try {
            const absoluteUrl = new url.URL(rawUrl, baseUrl).href
            urls.push({ original: rawUrl, absolute: absoluteUrl })
        } catch (e) {
            console.warn(`Could not parse URL in CSS: ${rawUrl}`)
        }
    }

    return urls
}

// Main processing loop
async function processQueue() {
    while (downloadQueue.length > 0) {
        const resourceUrl = downloadQueue.shift()

        if (processedUrls.has(resourceUrl)) continue
        processedUrls.add(resourceUrl)

        const localRelativePath = getLocalPath(resourceUrl)
        const fullLocalPath = path.join(OUTPUT_DIR, localRelativePath)

        if (fs.existsSync(fullLocalPath)) {
            const stats = fs.statSync(fullLocalPath)
            if (stats.size > 0) {
                console.log(`[Skip] Already exists: ${localRelativePath}`)
                urlMap.set(resourceUrl, localRelativePath.split(path.sep).join("/"))
                continue
            }
        }

        console.log(`Downloading: ${resourceUrl}`)

        try {
            ensureDir(path.dirname(fullLocalPath))
            const content = await downloadFile(resourceUrl)

            urlMap.set(resourceUrl, localRelativePath.split(path.sep).join("/"))

            // If it's a CSS file, we need to find nested assets
            if (resourceUrl.endsWith(".css")) {
                const nestedAssets = extractCssUrls(content, resourceUrl)
                for (const asset of nestedAssets) {
                    if (!processedUrls.has(asset.absolute)) {
                        console.log(`  -> Found nested asset: ${asset.absolute}`)
                        downloadQueue.push(asset.absolute)
                    }
                }
            }

            fs.writeFileSync(fullLocalPath, content)
            console.log(`  ✓ Saved to: ${localRelativePath}`)
        } catch (err) {
            console.error(`  ✗ Error: ${err.message}`)
            if (fs.existsSync(fullLocalPath)) {
                fs.unlinkSync(fullLocalPath)
            }
        }
    }
}

// Post-processing: Replace URLs in all files
function rewriteReferences() {
    console.log("\n=== Rewriting references in downloaded files ===")

    const filesToProcess = []

    function findFiles(dir) {
        const entries = fs.readdirSync(dir, { withFileTypes: true })
        for (const entry of entries) {
            const res = path.join(dir, entry.name)
            if (entry.isDirectory()) {
                findFiles(res)
            } else {
                filesToProcess.push(res)
            }
        }
    }

    findFiles(OUTPUT_DIR)

    for (const filePath of filesToProcess) {
        const ext = path.extname(filePath)
        if (ext !== ".css" && ext !== ".js") continue

        let content = fs.readFileSync(filePath, "utf8")
        let changed = false

        for (const [originalUrl, localRelPath] of urlMap.entries()) {
            if (content.includes(originalUrl)) {
                // Use absolute path from web root with forward slashes
                const replaceWith = "/vendor/" + localRelPath
                content = content.split(originalUrl).join(replaceWith)
                changed = true
            }
        }

        if (changed) {
            console.log(`Updated: ${path.relative(OUTPUT_DIR, filePath)}`)
            fs.writeFileSync(filePath, content)
        }
    }
}

async function run() {
    console.log("=== Starting Dependency Localization ===\n")
    ensureDir(OUTPUT_DIR)

    await processQueue()
    rewriteReferences()

    console.log("\n=== Complete! ===")
    console.log(`Downloaded ${urlMap.size} files to public/vendor/`)
    console.log("Use public/index-offline.html to test your offline setup.")
}

run().catch(console.error)

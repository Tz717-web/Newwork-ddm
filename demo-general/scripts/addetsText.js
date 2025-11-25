const fs = require("fs")
const path = require("path")

// Convert URL to local vendor path format
function urlToVendorPath(url) {
  try {
    // Handle protocol-relative URLs
    if (url.startsWith("//")) {
      url = "https:" + url
    }

    // Parse the URL
    const urlObj = new URL(url)
    const domain = urlObj.hostname.replace(/\./g, "_")
    const pathname = urlObj.pathname

    // Build vendor path
    return `vendor/${domain}${pathname}`
  } catch (error) {
    console.error(`[v0] Failed to convert URL: ${url}`, error.message)
    return url // Return original if conversion fails
  }
}

// Recursively traverse and convert URLs in JSON structure
function traverseAndConvert(obj, urlList) {
  if (typeof obj === "string") {
    // Check if it's a URL
    if (obj.startsWith("http://") || obj.startsWith("https://") || obj.startsWith("//")) {
      // Add to URL list
      urlList.add(obj)
      // Convert to vendor path
      return urlToVendorPath(obj)
    }
    return obj
  } else if (Array.isArray(obj)) {
    // Process each array element
    return obj.map((item) => traverseAndConvert(item, urlList))
  } else if (obj !== null && typeof obj === "object") {
    // Process each object property
    const result = {}
    for (const [key, value] of Object.entries(obj)) {
      result[key] = traverseAndConvert(value, urlList)
    }
    return result
  }
  return obj
}

// Main conversion function
async function convertJsonFile(inputPath, outputPath, urlListPath) {
  console.log("[v0] Starting URL conversion...")
  console.log("[v0] Reading input file:", inputPath)

  // Read input JSON file
  let jsonContent
  try {
    const fileContent = fs.readFileSync(inputPath, "utf-8")
    jsonContent = JSON.parse(fileContent)
  } catch (error) {
    console.error("[v0] Failed to read or parse input file:", error.message)
    process.exit(1)
  }

  // Create a Set to store unique URLs
  const urlList = new Set()

  // Convert all URLs to vendor paths
  console.log("[v0] Converting URLs to vendor paths...")
  const convertedJson = traverseAndConvert(jsonContent, urlList)

  // Write converted JSON to output file
  console.log("[v0] Writing converted JSON to:", outputPath)
  try {
    fs.writeFileSync(outputPath, JSON.stringify(convertedJson, null, 2), "utf-8")
    console.log("[v0] ✓ Converted JSON saved successfully")
  } catch (error) {
    console.error("[v0] Failed to write converted JSON:", error.message)
    process.exit(1)
  }

  // Write URL list to separate file
  console.log("[v0] Writing URL list to:", urlListPath)
  try {
    const urlArray = Array.from(urlList).sort()
    const urlListContent = urlArray.join("\n")
    fs.writeFileSync(urlListPath, urlListContent, "utf-8")
    console.log("[v0] ✓ URL list saved successfully")
    console.log(`[v0] Total unique URLs found: ${urlArray.length}`)
  } catch (error) {
    console.error("[v0] Failed to write URL list:", error.message)
    process.exit(1)
  }

  // Print summary
  console.log("\n=== Conversion Summary ===")
  console.log(`Total URLs found: ${urlList.size}`)
  console.log(`Converted JSON: ${outputPath}`)
  console.log(`URL list: ${urlListPath}`)
  console.log("\nNext steps:")
  console.log("1. Use the URL list file with your download script")
  console.log("2. Replace your original assets.json with the converted version")
  console.log("3. Ensure all files are downloaded to the correct vendor/ paths")
}

// Run the conversion
const INPUT_FILE = path.join(__dirname, "../public/assets-original.json")
const OUTPUT_FILE = path.join(__dirname, "../public/assets-local.json")
const URL_LIST_FILE = path.join(__dirname, "../public/urls-to-download.txt")

// Check if input file exists, if not, create it with default content
if (!fs.existsSync(INPUT_FILE)) {
  console.log("[v0] Input file not found, creating default assets-original.json...")
  const defaultContent = {
    components: [],
    packages: [],
    version: "1.1.0",
  }
  fs.mkdirSync(path.dirname(INPUT_FILE), { recursive: true })
  fs.writeFileSync(INPUT_FILE, JSON.stringify(defaultContent, null, 2), "utf-8")
  console.log("[v0] Please add your JSON content to:", INPUT_FILE)
  console.log("[v0] Then run this script again.")
  process.exit(0)
}

convertJsonFile(INPUT_FILE, OUTPUT_FILE, URL_LIST_FILE)

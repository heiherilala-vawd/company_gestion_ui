import { execFileSync } from 'child_process'
import { rmSync, readdirSync } from 'fs'

const outputDir = 'src/gen-ts'

// Clean output directory
try {
  rmSync(outputDir, { recursive: true, force: true })
} catch {}

console.log('Generating TypeScript client with OpenAPI Generator...')

try {
  execFileSync(
    'npx',
    [
      '@openapitools/openapi-generator-cli',
      'generate',
      '-i',
      'api.yml',
      '-g',
      'typescript-fetch',
      '-o',
      outputDir,
      '--additional-properties',
      'npmName=api-client,supportsES6=true,typescriptThreePlus=true,withSeparateModelsAndApi=true,modelPropertyNaming=original,enumPropertyNaming=original',
    ],
    { stdio: 'inherit', cwd: process.cwd() },
  )

  console.log(`✅ Generated TypeScript client in ${outputDir}`)
} catch (error) {
  console.error('❌ Failed to generate client:', error.message)
  process.exit(1)
}

// Show generated files
const files = readdirSync(outputDir)
console.log(`\nGenerated files (${files.length}):`, files.join(', '))

import path from 'path'
import { readJsonSync, writeFileSync } from 'fs-extra'

// Writes the current package.json version to `./src/errors/version.ts`.
const versionFilePath = path.join(__dirname, '../src/errors/version.ts')
const packageJsonPath = path.join(__dirname, '../package.json')
const packageVersion = readJsonSync(packageJsonPath).version

writeFileSync(versionFilePath, `export const version = '${packageVersion}'\n`)

const fs = require('fs')
const path = require('path')

function removeIfExists(targetPath) {
  if (fs.existsSync(targetPath)) {
    fs.rmSync(targetPath, { recursive: true, force: true })
  }
}

function ensureDirectory(targetPath) {
  fs.mkdirSync(targetPath, { recursive: true })
}

function main() {
  if (process.env.SKIP_TURBOPACK_CACHE_RESET === '1') {
    return
  }

  const stalePaths = [
    path.join(process.cwd(), 'build', 'turbopack'),
    path.join(process.cwd(), 'build', 'cache', 'turbopack'),
    path.join(process.cwd(), '.next', 'turbopack'),
    path.join(process.cwd(), '.next', 'cache', 'turbopack'),
  ]

  stalePaths.forEach(removeIfExists)

  ensureDirectory(path.join(process.cwd(), 'build', 'turbopack'))
}

main()

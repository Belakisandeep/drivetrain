import glob from 'fast-glob'

const exportNames = {
  blog: 'article',
  'used-engines-for-sale': 'caseStudy',
  'used-engines': 'brand'
}

export async function loadMDXMetadata(directory) {
  return (
    await Promise.all(
      (
        await glob('**/page.mdx', { cwd: `src/app/${directory}` })
      ).map(async (filename) => {
        let id = filename.replace(/\/page\.mdx$/, '')
        return {
          id,
          href: `/${directory}/${id}`,
          ...(await import(`../app/${directory}/${filename}`))[
          exportNames[directory]
          ],
        }
      })
    )
  ).sort((a, b) => b.date.localeCompare(a.date))
}

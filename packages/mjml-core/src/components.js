import fs from 'fs'
import path from 'path'
import { kebabCase } from 'lodash'
import { registerDependencies } from 'mjml-validator'

const components = {}

const except = [
  'mjml',
  'mjml-browser',
  'mjml-cli',
  'mjml-migrate',
  'mjml-core',
  'mjml-parser-xml',
  'mjml-preset-core',
  'mjml-validator',
  'mjml-include',
]
fs.readdirSync(path.resolve(__dirname, '../../../packages')).forEach((file) => {
  if (except.includes(file)) return
  components[file.replace('ml', '').replace('-head-', '-')] = require(
    path.resolve(__dirname, `../../../packages/${file}/lib/index.js`),
  )
})

export function assignComponents(target, source) {
  for (const component of source) {
    target[component.componentName || kebabCase(component.name)] = component
  }
}

export function registerComponent(Component, options = {}) {
  assignComponents(components, [Component])

  if (Component.dependencies && options.registerDependencies) {
    registerDependencies(Component.dependencies)
  }
}

export default components

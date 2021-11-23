module.exports = {
  // 转义
  transform: {
    '^.+\\.vue$': 'vue3-jest',
    '^.+\\.js$': 'babel-jest',
    '^.+\\.(t|j)sx?$': 'ts-jest',
  },
  moduleFileExtensions: ['vue', 'js', 'json', 'jsx', 'ts', 'tsx', 'node'],
  testEnvironment: 'jsdom',
  transformIgnorePatterns: ['/node_modules/(?!(lodash-es)/)'],
}
